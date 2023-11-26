const chaveDaApi = "b0d8605bffef4750aca234126232511";

const botaoDeBusca = document.querySelector(".btn-busca");

botaoDeBusca.addEventListener("click", async () => {
    const cidade = document.getElementById("input-busca").value;

    if (!cidade) return;

    try {
        const dados = await buscarDadosDaCidade(cidade);

        if (dados)  {preencherDadosNaTela(dados, cidade);
        limparErro();} else {
            exibirErro("Cidade não encontrada");
        }
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
        exibirErro("Erro ao buscar dados. Tente novamente mais tarde.");
    }
});

async function buscarDadosDaCidade(cidade) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`;

   try {
    const resposta = await fetch(apiUrl);

    if (resposta.status !== 200) return;

    const dados = await resposta.json();

    return dados;
} catch (erro) {
    console.error("Erro ao buscar dados da API:", erro);
    throw erro;
}
}

function preencherDadosNaTela(dados, cidade) {

    const temperatura = dados.current.temp_c;
    const condicao = dados.current.condition.text;
    const umidade = dados.current.humidity;
    const velocidadeDoVento = dados.current.wind_kph;
    const iconeCondicao = dados.current.condition.icon;

    document.getElementById("cidade").textContent = cidade;

    document.getElementById("temperatura").textContent = `${temperatura} °C`;

    document.getElementById("condicao").textContent = condicao;

    document.getElementById("umidade").textContent = `${umidade}%`;

    document.getElementById("velocidade-do-vento").textContent = `${velocidadeDoVento}km/h`;

    document.getElementById("icone-condicao").setAttribute("src", iconeCondicao);
}

function exibirErro(mensagem) {
    const mensagemErro = document.getElementById("mensagem-erro");

    mensagemErro.textContent = mensagem;

    mensagemErro.style.color = "red";
}

function limparErro() {
    const mensagemErro = document.getElementById("mensagem-erro");
    mensagemErro.textContent = "";
}