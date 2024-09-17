
/*
function showSection(sectionId) {
    // Esconde todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Mostra a seção selecionada
    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = 'block';
    }
}

// Exibir a seção de visão geral por padrão
showSection('overview');
*/




// ======================================================================================== //



/*
// Dados para os gráficos
const totalProductsData = {
    labels: ['Total de Produtos'],
    datasets: [{
        label: 'Total de Produtos',
        data: [150],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }]
};

const missingProductsData = {
    labels: ['Produtos em Falta'],
    datasets: [{
        label: 'Produtos em Falta',
        data: [20],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
};

const lastPurchaseData = {
    labels: ['5 de Setembro de 2024'],
    datasets: [{
        label: 'Última Compra',
        data: [1], // Valor fictício para o gráfico de linha
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        tension: 0.1
    }]
};

const totalStockData = {
    labels: ['Estoque Total'],
    datasets: [{
        label: 'Estoque Total',
        data: [1200],
        backgroundColor: ['rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 206, 86, 1)'],
        borderWidth: 1
    }]
};

// Inicialização dos gráficos
const ctxTotalProducts = document.getElementById('totalProductsChart').getContext('2d');
const ctxMissingProducts = document.getElementById('missingProductsChart').getContext('2d');
const ctxLastPurchase = document.getElementById('lastPurchaseChart').getContext('2d');
const ctxTotalStock = document.getElementById('totalStockChart').getContext('2d');

new Chart(ctxTotalProducts, {
    type: 'bar',
    data: totalProductsData,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

new Chart(ctxMissingProducts, {
    type: 'bar',
    data: missingProductsData,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

new Chart(ctxLastPurchase, {
    type: 'line',
    data: lastPurchaseData,
    options: {
        scales: {
            x: {
                display: false // Esconde o eixo X para melhor visualização
            },
            y: {
                beginAtZero: true
            }
        }
    }
});

new Chart(ctxTotalStock, {
    type: 'pie',
    data: totalStockData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return 'Estoque Total: ' + tooltipItem.raw;
                    }
                }
            }
        }
    }
});








// ======================================================================================== //

// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const productTableBody = document.getElementById('product-table-body');
    const productModal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close-btn');
    const productForm = document.getElementById('product-form');
    const submitBtn = document.getElementById('submit-btn');
    let editingProductId = null;

    const products = [
        { id: '001', name: 'Produto A', category: 'Categoria 1', quantity: 50, price: 'R$ 20,00', supplier: 'Fornecedor X' },
        { id: '002', name: 'Produto B', category: 'Categoria 2', quantity: 30, price: 'R$ 15,00', supplier: 'Fornecedor Y' }
        // Adicione mais produtos conforme necessário
    ];

    const renderProducts = () => {
        productTableBody.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
                <td>${product.supplier}</td>
                <td>
                    <button class="btn-edit" data-id="${product.id}">Editar</button>
                    <button class="btn-delete" data-id="${product.id}">Excluir</button>
                </td>
            `;
            productTableBody.appendChild(row);
        });

        document.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', (event) => {
                const id = event.target.getAttribute('data-id');
                openEditProductModal(id);
            });
        });

        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', (event) => {
                const id = event.target.getAttribute('data-id');
                deleteProduct(id);
            });
        });
    };

    const openEditProductModal = (id) => {
        const product = products.find(p => p.id === id);
        if (product) {
            document.getElementById('product-id').value = product.id;
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-category').value = product.category;
            document.getElementById('product-quantity').value = product.quantity;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-supplier').value = product.supplier;
            document.getElementById('modal-title').textContent = 'Editar Produto';
            editingProductId = id;
            productModal.style.display = 'block';
        }
    };

    const openAddProductModal = () => {
        document.getElementById('product-id').value = '';
        document.getElementById('product-name').value = '';
        document.getElementById('product-category').value = '';
        document.getElementById('product-quantity').value = '';
        document.getElementById('product-price').value = '';
        document.getElementById('product-supplier').value = '';
        document.getElementById('modal-title').textContent = 'Adicionar Produto';
        editingProductId = null;
        productModal.style.display = 'block';
    };

    const closeProductModal = () => {
        productModal.style.display = 'none';
    };

    const saveProduct = (event) => {
        event.preventDefault();
        const id = document.getElementById('product-id').value;
        const name = document.getElementById('product-name').value;
        const category = document.getElementById('product-category').value;
        const quantity = document.getElementById('product-quantity').value;
        const price = document.getElementById('product-price').value;
        const supplier = document.getElementById('product-supplier').value;

        if (editingProductId) {
            const index = products.findIndex(p => p.id === editingProductId);
            products[index] = { id, name, category, quantity, price, supplier };
        } else {
            products.push({ id, name, category, quantity, price, supplier });
        }

        closeProductModal();
        renderProducts();
    };

    const deleteProduct = (id) => {
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products.splice(index, 1);
            renderProducts();
        }
    };

    const printReport = () => {
        let reportContent = '<h1>Relatório de Produtos</h1><table><thead><tr><th>ID</th><th>Nome</th><th>Categoria</th><th>Quantidade</th><th>Preço Unitário</th><th>Fornecedor</th></tr></thead><tbody>';
        products.forEach(product => {
            reportContent += `<tr><td>${product.id}</td><td>${product.name}</td><td>${product.category}</td><td>${product.quantity}</td><td>${product.price}</td><td>${product.supplier}</td></tr>`;
        });
        reportContent += '</tbody></table>';
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Relatório de Produtos</title></head><body>');
        printWindow.document.write(reportContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    // Event Listeners
    document.getElementById('btn-add-product').addEventListener('click', openAddProductModal);
    document.getElementById('btn-print-report').addEventListener('click', printReport);
    closeBtn.addEventListener('click', closeProductModal);
    productForm.addEventListener('submit', saveProduct);

    // Initial Render
    renderProducts();
});




// ======================================================================== //




document.addEventListener('DOMContentLoaded', () => {
    const productModal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close-btn');
    const productForm = document.getElementById('product-form');
    const productTableBody = document.getElementById('product-table-body');
    let editingProductId = null;

    // Open modal for adding a product
    document.getElementById('btn-add-product').addEventListener('click', () => {
        editingProductId = null;
        document.getElementById('modal-title').textContent = 'Adicionar Produto';
        productForm.reset();
        productModal.style.display = 'block';
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    // Submit form
    productForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const productData = {
            id: document.getElementById('product-id').value,
            name: document.getElementById('product-name').value,
            category: document.getElementById('product-category').value,
            quantity: document.getElementById('product-quantity').value,
            price: document.getElementById('product-price').value,
            supplier: document.getElementById('product-supplier').value
        };

        if (editingProductId) {
            updateProduct(productData);
        } else {
            addProduct(productData);
        }

        productModal.style.display = 'none';
    });

    // Function to add product
    function addProduct(product) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${Date.now()}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
            <td>${product.supplier}</td>
            <td>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Excluir</button>
            </td>
        `;
        productTableBody.appendChild(row);

        row.querySelector('.edit-btn').addEventListener('click', () => {
            editingProductId = product.id;
            document.getElementById('modal-title').textContent = 'Editar Produto';
            document.getElementById('product-id').value = product.id;
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-category').value = product.category;
            document.getElementById('product-quantity').value = product.quantity;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-supplier').value = product.supplier;
            productModal.style.display = 'block';
        });

        row.querySelector('.delete-btn').addEventListener('click', () => {
            row.remove();
        });
    }

    // Function to update product
    function updateProduct(product) {
        const rows = productTableBody.querySelectorAll('tr');
        rows.forEach(row => {
            if (row.querySelector('td').textContent == product.id) {
                row.querySelectorAll('td')[1].textContent = product.name;
                row.querySelectorAll('td')[2].textContent = product.category;
                row.querySelectorAll('td')[3].textContent = product.quantity;
                row.querySelectorAll('td')[4].textContent = product.price;
                row.querySelectorAll('td')[5].textContent = product.supplier;
            }
        });
    }
});





document.getElementById('btn-print-report').addEventListener('click', () => {
    window.print();
});




document.addEventListener('DOMContentLoaded', () => {
    // Total de Produtos
    const totalProductsCtx = document.getElementById('totalProductsChart').getContext('2d');
    new Chart(totalProductsCtx, {
        type: 'bar',
        data: {
            labels: ['Produto A', 'Produto B', 'Produto C'],
            datasets: [{
                label: 'Total de Produtos',
                data: [10, 20, 30],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Produtos em Falta
    const missingProductsCtx = document.getElementById('missingProductsChart').getContext('2d');
    new Chart(missingProductsCtx, {
        type: 'pie',
        data: {
            labels: ['Produto A', 'Produto B', 'Produto C'],
            datasets: [{
                label: 'Produtos em Falta',
                data: [5, 10, 15],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
        }
    });

    // Última Compra
    const lastPurchaseCtx = document.getElementById('lastPurchaseChart').getContext('2d');
    new Chart(lastPurchaseCtx, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março'],
            datasets: [{
                label: 'Última Compra',
                data: [20, 10, 5],
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Estoque Total
    const totalStockCtx = document.getElementById('totalStockChart').getContext('2d');
    new Chart(totalStockCtx, {
        type: 'doughnut',
        data: {
            labels: ['Categoria A', 'Categoria B', 'Categoria C'],
            datasets: [{
                label: 'Estoque Total',
                data: [100, 200, 300],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
        }
    });
});

*/

// ========================================================================





document.addEventListener('DOMContentLoaded', function () {
    // Adicione o código JavaScript necessário aqui para a funcionalidade dos modais, tabelas dinâmicas, etc.
});






// Certifique-se de que o script só será executado após o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    // Verifica se o Chart.js está carregado
    if (typeof Chart !== 'undefined') {
        // Configuração dos dados e opções para o gráfico Total de Produtos
        const totalProductsChart = document.getElementById('totalProductsChart').getContext('2d');
        new Chart(totalProductsChart, {
            type: 'bar',
            data: {
                labels: ['Produto A', 'Produto B', 'Produto C', 'Produto D'],
                datasets: [{
                    label: 'Total de Produtos',
                    data: [50, 30, 70, 40],
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

        // Configuração dos dados e opções para o gráfico Produtos em Falta
        const missingProductsChart = document.getElementById('missingProductsChart').getContext('2d');
        new Chart(missingProductsChart, {
            type: 'pie',
            data: {
                labels: ['Produto A', 'Produto B', 'Produto C'],
                datasets: [{
                    label: 'Produtos em Falta',
                    data: [10, 20, 15],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });

        // Configuração dos dados e opções para o gráfico Última Compra
        const lastPurchaseChart = document.getElementById('lastPurchaseChart').getContext('2d');
        new Chart(lastPurchaseChart, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Última Compra',
                    data: [30, 50, 40, 60, 70],
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1
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

        // Configuração dos dados e opções para o gráfico Estoque Total
        const totalStockChart = document.getElementById('totalStockChart').getContext('2d');
        new Chart(totalStockChart, {
            type: 'doughnut',
            data: {
                labels: ['Categoria A', 'Categoria B', 'Categoria C'],
                datasets: [{
                    label: 'Estoque Total',
                    data: [100, 200, 150],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 159, 64, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });
    } else {
        console.error('Chart.js não está carregado.');
    }
});



// ==================================================================================

