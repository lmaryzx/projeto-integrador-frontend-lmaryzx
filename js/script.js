// Produtos da Confeitaria Doce Encanto
const produtos = [
    { nome: "Brigadeiro gourmet", preco: 4, estoque: 30 },
    { nome: "Brownie", preco: 8, estoque: 12 },
    { nome: "Bolo decorado", preco: 120, estoque: 3 },
    { nome: "Sobremesa no pote", preco: 12, estoque: 18 },
    { nome: "Beijinho", preco: 3, estoque: 0 }
];
// Calcula o valor do estoque de um produto
function calcularValorEstoque(produto, desconto = 0) {
    const valorTotal = produto.preco * produto.estoque;
    const valorDesconto = valorTotal * (desconto / 100);

    return valorTotal - valorDesconto;
}
console.log(calcularValorEstoque(produtos[0]));
console.log(calcularValorEstoque(produtos[0], 10));

// Classifica os produtos conforme o preço
function classificarPreco(produto) {
    if (produto.preco <= 5) {
        return "Econômico";
    } else if (produto.preco <= 15) {
        return "Intermediário";
    } else {
        return "Premium";
    }
}

console.log(classificarPreco(produtos[0]));
console.log(classificarPreco(produtos[1]));
console.log(classificarPreco(produtos[2]));

// MAP: cria uma lista com informações dos produtos
const produtosAnalisados = produtos.map(function(produto) {
    return {
        nome: produto.nome,
        preco: produto.preco,
        estoque: produto.estoque,
        classificacao: classificarPreco(produto),
        valorEstoque: calcularValorEstoque(produto)
    };
});

// FILTER: seleciona os produtos com estoque disponível
const produtosDisponiveis = produtos.filter(function(produto) {
    return produto.estoque > 0;
});

// REDUCE: calcula o valor total do estoque da confeitaria
const valorTotalEstoque = produtos.reduce(function(total, produto) {
    return total + calcularValorEstoque(produto);
}, 0);

// Mostra os resultados no Console
console.table(produtosAnalisados);
console.log("Produtos disponíveis:", produtosDisponiveis);
console.log(`Valor total do estoque: R$ ${valorTotalEstoque.toFixed(2)}`);

// Seleciona a área do HTML onde os resultados aparecerão
const areaResultados = document.querySelector("#resultado-analise");

// Cria um contêiner para organizar os produtos
const listaProdutos = document.createElement("div");
listaProdutos.classList.add("grade-produtos");

// Cria os cartões dos produtos na página
function criarCartoes(produtosAnalisados) {
    produtosAnalisados.forEach(function(produto) {

    // Cria um cartão para cada produto
    const cartao = document.createElement("article");
    cartao.classList.add("produto");

    // Cria o título do produto
    const titulo = document.createElement("h3");
    titulo.textContent = produto.nome;

    // Cria a informação do preço
    const preco = document.createElement("p");
    preco.textContent = `Preço: R$ ${produto.preco.toFixed(2)}`;

    // Cria a informação do estoque
    const estoque = document.createElement("p");
    estoque.textContent = `Estoque: ${produto.estoque} unidades`;

    // Cria a classificação do produto
    const classificacao = document.createElement("p");
    classificacao.textContent = `Classificação: ${produto.classificacao}`;

    // Aplica uma classe CSS conforme a classificação
if (produto.classificacao === "Econômico") {
    classificacao.classList.add("economico");
} else if (produto.classificacao === "Intermediário") {
    classificacao.classList.add("intermediario");
} else {
    classificacao.classList.add("premium");
}

    // Adiciona as informações ao cartão
    cartao.append(titulo, preco, estoque, classificacao);

    // Adiciona o cartão à lista
    listaProdutos.append(cartao);
    });
}
criarCartoes(produtosAnalisados);

// Cria o resumo do estoque
const resumo = document.createElement("p");
resumo.textContent = `Valor total do estoque: R$ ${valorTotalEstoque.toFixed(2)}`;

// Adiciona os resultados à página
if (areaResultados !== null) {
    areaResultados.append(listaProdutos, resumo);
} else {
    console.error("A área de resultados não foi encontrada no HTML.");
}