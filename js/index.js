const apiUrl = 'http://localhost:3000/produtos';

document.addEventListener("DOMContentLoaded", function () {
    const formProduto = document.getElementById("formProduto");
    formProduto.addEventListener("submit", function (event) {
        event.preventDefault();
        const nomeProduto = document.getElementById("nomeProduto").value;
        const descricaoProduto = document.getElementById("descricaoProduto").value;
        const valorProduto = parseFloat(document.getElementById("valorProduto").value).toFixed(2);
        const disponivelProduto = document.getElementById("disponivelProduto").value;

        const novoProduto = {
            nome: nomeProduto,
            descricao: descricaoProduto,
            valor: valorProduto,
            disponivel: disponivelProduto === "sim" ? true : false
        };

        axios.post(apiUrl, novoProduto)
            .then(function (response) {
                console.log('Produto adicionado com sucesso:', response.data);
                formProduto.reset();
                window.location.href = "../pages/listagem.html";
            })
            .catch(function (error) {
                console.error('Erro ao adicionar produto:', error);
            });
        formProduto.reset();
        window.location.href = "../pages/listagem.html";
    });
});