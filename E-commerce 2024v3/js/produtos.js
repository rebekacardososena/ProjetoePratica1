

document.addEventListener('DOMContentLoaded', function () {
    // Referências aos elementos da página
    const productTableBody = document.getElementById('product-table-body');
    const productModal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close-btn');
    const addProductBtn = document.getElementById('btn-add-product');
    const productForm = document.getElementById('product-form');
    const productIdInput = document.getElementById('product-id');
    const modalTitle = document.getElementById('modal-title');

    // Dados de exemplo - você pode substituir por uma chamada de API ou outra fonte de dados
    const products = [
        { id: 1, brand: 'Marca A', model: 'Modelo X', code: '1234', gender: 'Unisex', category: 'Categoria 1', quantity: 10, price: '100.00', supplier: 'Fornecedor A' },
        { id: 2, brand: 'Marca B', model: 'Modelo Y', code: '5678', gender: 'Feminino', category: 'Categoria 2', quantity: 5, price: '150.00', supplier: 'Fornecedor B' },
        { id: 3, brand: 'Marca C', model: 'Modelo Z', code: '9101', gender: 'Masculino', category: 'Categoria 1', quantity: 20, price: '200.00', supplier: 'Fornecedor C' },
        { id: 4, brand: 'Marca D', model: 'Modelo W', code: '1121', gender: 'Unisex', category: 'Categoria 3', quantity: 15, price: '120.00', supplier: 'Fornecedor D' },
    ];

    // Função para atualizar a tabela de produtos
    function updateProductTable() {
        productTableBody.innerHTML = ''; // Limpar a tabela existente
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.brand}</td>
                <td>${product.model}</td>
                <td>${product.code}</td>
                <td>${product.gender}</td>
                <td>${product.category}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
                <td>${product.supplier}</td>
                <td>
                    <button class="edit-btn" data-id="${product.id}">Editar</button>
                    <button class="delete-btn" data-id="${product.id}">Excluir</button>
                </td>
            `;
            productTableBody.appendChild(row);
        });

        // Adiciona eventos de clique para os botões de editar e excluir
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const id = parseInt(this.getAttribute('data-id'));
                const productToEdit = products.find(p => p.id === id);
                openProductModal(productToEdit);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const id = parseInt(this.getAttribute('data-id'));
                const index = products.findIndex(p => p.id === id);
                if (index > -1) {
                    products.splice(index, 1);
                    updateProductTable();
                    updateCharts(); // Atualiza os gráficos após excluir um produto
                }
            });
        });
    }

    // Função para abrir o modal de adição/edição de produtos
    function openProductModal(product = {}) {
        modalTitle.textContent = product.id ? 'Editar Produto' : 'Adicionar Produto';
        productIdInput.value = product.id || '';
        document.getElementById('product-name').value = product.name || '';
        document.getElementById('product-category').value = product.category || '';
        document.getElementById('product-quantity').value = product.quantity || '';
        document.getElementById('product-price').value = product.price || '';
        document.getElementById('product-supplier').value = product.supplier || '';
        productModal.style.display = 'block';
    }

    // Função para fechar o modal
    function closeProductModal() {
        productModal.style.display = 'none';
    }

    // Manipula o envio do formulário do modal
    productForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const id = parseInt(productIdInput.value);
        const name = document.getElementById('product-name').value;
        const category = document.getElementById('product-category').value;
        const quantity = parseInt(document.getElementById('product-quantity').value);
        const price = document.getElementById('product-price').value;
        const supplier = document.getElementById('product-supplier').value;

        if (id) {
            // Editar produto existente
            const productIndex = products.findIndex(p => p.id === id);
            if (productIndex > -1) {
                products[productIndex] = { id, brand: products[productIndex].brand, model: products[productIndex].model, code: products[productIndex].code, gender: products[productIndex].gender, category, quantity, price, supplier };
                updateProductTable();
                updateCharts(); // Atualiza os gráficos após editar um produto
            }
        } else {
            // Adicionar novo produto
            const newId = products.length ? Math.max(products.map(p => p.id)) + 1 : 1;
            products.push({ id: newId, brand: 'Nova Marca', model: 'Novo Modelo', code: '0000', gender: 'Unisex', category, quantity, price, supplier });
            updateProductTable();
            updateCharts(); // Atualiza os gráficos após adicionar um novo produto
        }
        closeProductModal();
    });

    // Adiciona evento de clique para o botão de adicionar produto
    addProductBtn.addEventListener('click', function () {
        openProductModal();
    });

    // Adiciona evento de clique para o botão de fechar o modal
    closeBtn.addEventListener('click', closeProductModal);

    // Função para atualizar os gráficos
    function updateCharts() {
        // Dados para o gráfico de Quantidade por Categoria
        const categories = {};
        products.forEach(p => {
            if (!categories[p.category]) {
                categories[p.category] = 0;
            }
            categories[p.category] += p.quantity;
        });

        const categoryNames = Object.keys(categories);
        const categoryQuantities = Object.values(categories);

        const quantityByCategoryChart = new Chart(document.getElementById('quantityByCategoryChart'), {
            type: 'bar',
            data: {
                labels: categoryNames,
                datasets: [{
                    label: 'Quantidade por Categoria',
                    data: categoryQuantities,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Dados para o gráfico de Preço Médio por Categoria
        const categoryPrices = {};
        const categoryCounts = {};

        products.forEach(p => {
            if (!categoryPrices[p.category]) {
                categoryPrices[p.category] = 0;
                categoryCounts[p.category] = 0;
            }
            categoryPrices[p.category] += parseFloat(p.price);
            categoryCounts[p.category] += 1;
        });

        const averageCategoryPrices = categoryNames.map(name => categoryPrices[name] / categoryCounts[name]);

        const averagePriceByCategoryChart = new Chart(document.getElementById('averagePriceByCategoryChart'), {
            type: 'line',
            data: {
                labels: categoryNames,
                datasets: [{
                    label: 'Preço Médio por Categoria',
                    data: averageCategoryPrices,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Inicializa a tabela de produtos e os gráficos
    updateProductTable();
    updateCharts();
});






