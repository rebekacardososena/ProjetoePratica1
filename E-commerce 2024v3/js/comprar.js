

/* ======== CÓDIGO JAVASCRIPT - SELECIONA TÊNIS AO CLICAR NA IMAGEM, APÓS ALGUNS SEGUNDOS ELA RETORNA A APRESENTAR A IMAGEM PRINCIPAL ======== */

/*

function buyNow() {
    // Exibe a seção de compra
    document.getElementById('buyPage').classList.add('active');
}

function closeBuyPage() {
    // Oculta a seção de compra
    document.getElementById('buyPage').classList.remove('active');
}

function addToCart() {
    alert('Produto adicionado ao carrinho!');
}

*/


/* ======== CÓDIGO JAVASCRIPT - CALCULO DE COMPRA DO SAPATO ======== */
/*
function updateInstallments() {
    const paymentMethod = document.getElementById('payment-method').value;
    const installmentsSelect = document.getElementById('installments');
    const discountMessage = document.getElementById('discount-message');
    const installmentInfo = document.getElementById('installment-info');

    if (paymentMethod === 'parcelado') {
        installmentsSelect.disabled = false;
        installmentInfo.style.display = 'block'; // Mostra a informação de parcelamento
        discountMessage.style.display = 'none'; // Oculta a mensagem de desconto
        updatePrice(); // Atualiza o preço ao habilitar a seleção de parcelas
    } else {
        installmentsSelect.disabled = true;
        installmentsSelect.value = '1'; // Reseta para 1 parcela
        installmentInfo.style.display = 'none'; // Oculta a informação de parcelamento
        updatePrice(); // Atualiza o preço para o valor do pagamento selecionado

        // Define a mensagem de desconto conforme o método de pagamento
        switch (paymentMethod) {
            case 'boleto':
                discountMessage.textContent = 'Desconto especial de 5% para pagamento no boleto!';
                break;
            case 'PIX':
                discountMessage.textContent = 'Desconto especial de 7% para pagamento via PIX!';
                break;
            case 'avista':
                discountMessage.textContent = 'Desconto especial de 7% para pagamento à vista!';
                break;
            default:
                discountMessage.textContent = ''; // Oculta a mensagem se não for um método com desconto
        }
        discountMessage.style.display = 'block'; // Mostra a mensagem de desconto
    }
}

function updatePrice() {
    const unitPrice = 399.99; // O preço de desconto por unidade
    const amountInput = document.getElementById('amount');
    const installmentsSelect = document.getElementById('installments');
    const paymentMethod = document.getElementById('payment-method').value;
    const quantity = parseInt(amountInput.value, 10);
    const installments = parseInt(installmentsSelect.value, 10);

    // Verifica se quantity e installments são números válidos e não são zero
    if (!isNaN(quantity) && quantity > 0) {
        let totalPrice = unitPrice * quantity;

        // Aplica descontos conforme o método de pagamento
        switch (paymentMethod) {
            case 'boleto':
                totalPrice *= 0.95; // Aplica 5% de desconto
                break;
            case 'PIX':
            case 'avista':
                totalPrice *= 0.93; // Aplica 7% de desconto
                break;
            case 'parcelado':
                // Sem desconto para parcelado
                break;
        }

        const installmentAmount = paymentMethod === 'parcelado'
            ? (totalPrice / installments).toFixed(2)
            : 'N/A'; // Se não for parcelado, não exibe valor de parcela

        document.getElementById('price-discount').textContent = `R$ ${totalPrice.toFixed(2)} reais`;
        document.getElementById('installment').textContent = `R$ ${installmentAmount} reais`;
        document.getElementById('installments-count').textContent = paymentMethod === 'parcelado' ? `${installments}x` : 'N/A';
    } else {
        document.getElementById('price-discount').textContent = 'R$ 0,00 reais';
        document.getElementById('installment').textContent = 'R$ 0,00 reais';
        document.getElementById('installments-count').textContent = '0x';
    }
}

// Certifique-se de adicionar o listener de evento se a opção de pagamento for 'parcelado' ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updateInstallments(); // Atualiza o estado inicial dos elementos
});



/* ================================================== */

/*
function openBuyPage(cardElement) {
    // Captura os dados do card clicado
    const productName = cardElement.dataset.name;
    const productCode = cardElement.dataset.codigo;
    const productPrice = parseFloat(cardElement.dataset.price);
    const installmentAmount = parseFloat(cardElement.dataset.installment);
    const discountPrice = parseFloat(cardElement.dataset.discount);

    // Preenche o formulário na página de compra
    const buyPage = document.getElementById('buyPage');

    buyPage.querySelector('h2').textContent = `Compra - ${productName}`;
    buyPage.querySelector('#price-original').textContent = `De: R$ ${productPrice.toFixed(2)} reais`;
    buyPage.querySelector('#price-discount').textContent = `Por: R$ ${discountPrice.toFixed(2)} reais`;
    buyPage.querySelector('#installment').textContent = `R$ ${installmentAmount.toFixed(2)} reais`;

    // Atualiza a visibilidade da informação de parcelamento
    buyPage.querySelector('#installment-info').style.display = 'block';
    buyPage.querySelector('#installments').value = '10'; // Define o número padrão de parcelas como 10
    buyPage.querySelector('#installments').disabled = false; // Habilita a seleção de parcelas

    // Atualiza a mensagem de desconto com base no método de pagamento selecionado
    updateInstallments(); // Atualiza a visibilidade e valores baseados no método de pagamento

    // Mostra a página de compra
    buyPage.style.display = 'block';
}

// Fecha a página de compra
function closeBuyPage() {
    document.getElementById('buyPage').style.display = 'none';
}

// Função que pode ser usada para atualizar informações adicionais, se necessário
function updateInstallments() {
    const paymentMethod = document.getElementById('payment-method').value;
    const installmentsSelect = document.getElementById('installments');
    const discountMessage = document.getElementById('discount-message');
    const installmentInfo = document.getElementById('installment-info');

    if (paymentMethod === 'parcelado') {
        installmentsSelect.disabled = false;
        installmentInfo.style.display = 'block'; // Mostra a informação de parcelamento
        discountMessage.style.display = 'none'; // Oculta a mensagem de desconto
        updatePrice(); // Atualiza o preço ao habilitar a seleção de parcelas
    } else {
        installmentsSelect.disabled = true;
        installmentsSelect.value = '1'; // Reseta para 1 parcela
        installmentInfo.style.display = 'none'; // Oculta a informação de parcelamento
        updatePrice(); // Atualiza o preço para o valor do pagamento selecionado

        // Define a mensagem de desconto conforme o método de pagamento
        switch (paymentMethod) {
            case 'boleto':
                discountMessage.textContent = 'Desconto especial de 5% para pagamento no boleto!';
                break;
            case 'PIX':
                discountMessage.textContent = 'Desconto especial de 7% para pagamento via PIX!';
                break;
            case 'avista':
                discountMessage.textContent = 'Desconto especial de 7% para pagamento à vista!';
                break;
            default:
                discountMessage.textContent = ''; // Oculta a mensagem se não for um método com desconto
        }
        discountMessage.style.display = 'block'; // Mostra a mensagem de desconto
    }
}

// Atualiza o preço e parcelamento conforme a quantidade e o método de pagamento
function updatePrice() {
    const unitPrice = 599.00; // Preço por unidade
    const amountInput = document.getElementById('amount');
    const installmentsSelect = document.getElementById('installments');
    const paymentMethod = document.getElementById('payment-method').value;
    const quantity = parseInt(amountInput.value, 10);
    const installments = parseInt(installmentsSelect.value, 10);

    if (!isNaN(quantity) && quantity > 0) {
        let totalPrice = unitPrice * quantity;

        // Aplica descontos conforme o método de pagamento
        switch (paymentMethod) {
            case 'boleto':
                totalPrice *= 0.95; // Aplica 5% de desconto
                break;
            case 'PIX':
            case 'avista':
                totalPrice *= 0.93; // Aplica 7% de desconto
                break;
            case 'parcelado':
                // Sem desconto para parcelado
                break;
        }

        const installmentAmount = paymentMethod === 'parcelado'
            ? (totalPrice / installments).toFixed(2)
            : 'N/A'; // Se não for parcelado, não exibe valor de parcela

        document.getElementById('price-discount').textContent = `R$ ${totalPrice.toFixed(2)} reais`;
        document.getElementById('installment').textContent = `R$ ${installmentAmount} reais`;
        document.getElementById('installments-count').textContent = paymentMethod === 'parcelado' ? `${installments}x` : 'N/A';
    } else {
        document.getElementById('price-discount').textContent = 'R$ 0,00 reais';
        document.getElementById('installment').textContent = 'R$ 0,00 reais';
        document.getElementById('installments-count').textContent = '0x';
    }
}

// Certifique-se de adicionar o listener de evento se a opção de pagamento for 'parcelado' ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updateInstallments(); // Atualiza o estado inicial dos elementos
});


*/
