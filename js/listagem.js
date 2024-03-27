const apiUrl = 'http://localhost:3000/produtos';

const buscarProdutosAPI = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar produtos da API:', error);
        return [];
    }
};

const formatarProdutos = (produtos) => {
    return produtos.map(produto => ({
        id: parseInt(produto.id),
        nome: produto.nome,
        valor: parseFloat(produto.valor).toFixed(2)
    })).sort((produtoA, produtoB) => produtoA.valor - produtoB.valor);
};

const buscarEFormatarProdutos = async () => {
    const produtosAPI = await buscarProdutosAPI();
    return formatarProdutos(produtosAPI);
};


const carregarProdutosNaTabela = async () => {
    const produtos = await buscarEFormatarProdutos();
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