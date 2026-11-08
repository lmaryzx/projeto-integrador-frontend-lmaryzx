
/*
Tema: Analisador de produtos da Confeitaria Doce Encanto.

Entrada: O usuário informa um limite de estoque.
Processamento: O programa analisa os produtos,
classifica seus estoques e identifica suas categorias.
Saída: Uma tabela com os produtos e um resumo do estoque.

PSEUDOCÓDIGO:
1. Criar uma lista com os produtos da confeitaria.
2. Solicitar ao usuário um limite de estoque.
3. Validar o valor informado.
4. Percorrer os produtos da lista.
5. Classificar cada produto conforme seu estoque.
6. Identificar a categoria de cada produto.
7. Calcular o estoque total e identificar o maior estoque.
8. Exibir os resultados e permitir uma nova análise.
*/

/*
TESTE DE MESA
Entrada utilizada: limite = 10

Iteração | Produto             | Estoque | Classificação  | Total
1        | Brigadeiro gourmet  | 30      | Estoque normal | 30
2        | Brownie             | 12      | Estoque normal | 42
3        | Bolo decorado       | 3       | Estoque baixo  | 45

O acumulador começa em 0 e recebe o estoque
de cada produto durante a repetição.
*/

// Lista de produtos da Confeitaria Doce Encanto
const produtos = [
    { nome: "Brigadeiro gourmet", estoque: 30, categoria: "Doces" },
    { nome: "Brownie", estoque: 12, categoria: "Bolos" },
    { nome: "Bolo decorado", estoque: 3, categoria: "Bolos" },
    { nome: "Sobremesa no pote", estoque: 18, categoria: "Sobremesas" },
    { nome: "Beijinho", estoque: 0, categoria: "Doces" }
];

// Controla se o usuário deseja realizar outra análise
let continuar;

do {
    // Solicita ao usuário um limite de estoque
    const entrada = prompt("Digite o limite de estoque para análise:");

    // Converte o texto digitado em número
    const limite = Number(entrada);

    // Verifica se o valor informado é válido
    if (
        entrada === null ||
        entrada.trim() === "" ||
        !Number.isFinite(limite) ||
        limite < 0 ||
        !Number.isInteger(limite)
    ) {
        alert("Valor inválido! Digite um número inteiro maior ou igual a zero.");
    } else {
        alert(`Limite de estoque definido: ${limite} unidades.`);

        // Variáveis para armazenar os resultados da análise
        let estoqueTotal = 0;
        let maiorEstoque = produtos[0];
        const resultados = [];

        // Percorre todos os produtos da confeitaria
        for (const produto of produtos) {
            let classificacao;

            if (produto.estoque === 0) {
                classificacao = "Esgotado";
            } else if (produto.estoque <= limite) {
                classificacao = "Estoque baixo";
            } else {
                classificacao = "Estoque normal";
            }

            // Identifica a categoria de cada produto
            let descricaoCategoria;

            switch (produto.categoria) {
                case "Doces":
                    descricaoCategoria = "Doces tradicionais e gourmet";
                    break;

                case "Bolos":
                    descricaoCategoria = "Bolos e brownies";
                    break;

                case "Sobremesas":
                    descricaoCategoria = "Sobremesas especiais";
                    break;

                default:
                    descricaoCategoria = "Categoria não identificada";
            }

            console.log(
                `${produto.nome} | ${descricaoCategoria} | ${classificacao}`
            );

            // Soma a quantidade de produtos disponíveis
            estoqueTotal += produto.estoque;

            // Verifica qual produto possui o maior estoque
            if (produto.estoque > maiorEstoque.estoque) {
                maiorEstoque = produto;
            }

            // Guarda os resultados para apresentar em uma tabela
            resultados.push({
                nome: produto.nome,
                categoria: descricaoCategoria,
                estoque: produto.estoque,
                classificacao: classificacao
            });
        }

        // Apresenta os resultados organizados
        console.table(resultados);

        console.log(`Estoque total: ${estoqueTotal} unidades.`);
        console.log(
            `Produto com maior estoque: ${maiorEstoque.nome} (${maiorEstoque.estoque} unidades).`
        );
    }

    // Pergunta se o usuário deseja repetir a análise
    continuar = confirm("Deseja realizar outra análise de estoque?");

} while (continuar);
