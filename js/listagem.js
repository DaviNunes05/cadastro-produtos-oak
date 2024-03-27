const apiUrl = 'http://localhost:3000/produtos';

const buscarProdutos = async () => {
    try {
        const response = await axios.get(apiUrl);
        const produtosFormatados = response.data.map(produto => ({
            id: parseInt(produto.id),
            nome: produto.nome,
            valor: parseFloat(produto.valor).toFixed(2)
        }));

        produtosFormatados.sort((produtoA, produtoB) => {
            return produtoA.valor - produtoB.valor;
        });

        return produtosFormatados;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return [];
    }
};

const carregarProdutosNaTabela = async () => {
    const produtos = await buscarProdutos();
    const tabelaProduto = document.getElementById('tabelaProduto').getElementsByTagName('tbody')[0];
    produtos.forEach(produto => {
        const novaLinha = tabelaProduto.insertRow();
        const cell1 = novaLinha.insertCell(0);
        const cell2 = novaLinha.insertCell(1);
        const cell3 = novaLinha.insertCell(2);
        cell1.textContent = produto.nome;
        cell2.textContent = `R$ ${produto.valor}`;
        cell3.innerHTML = 
            `<span title="Excluir" onclick="excluirProduto(${produto.id})">
                <i class="fas fa-trash-alt"></i>
            </span>`;
    });
};

const excluirProduto = async (id) => {
    try {
        await axios.delete(`${apiUrl}/${id}`);
        console.log('Produto excluído com sucesso:', id);
        carregarProdutosNaTabela();
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
    }
};

carregarProdutosNaTabela();