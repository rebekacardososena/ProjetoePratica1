


/* ======== CÓDIGO JAVASCRIPT - AO CLICAR EM COMPRAR O CLIENTE SERÁ DIRECIONADO A PÁGINA PARA FINALIZAR O PEDIDO ======== */

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', function (event) {
        if (event.target.matches('[id^="buyButton"]')) {
            handleBuyButtonClick(event);
        }
    });

    // Atualiza o estado inicial dos elementos
    updateInstallments();
});



// Função que será chamada quando o botão "COMPRAR!" for clicado
function handleBuyButtonClick(event) {
    // Obtém o cardElement correspondente, assumindo que o botão está dentro de um card
    const cardElement = event.currentTarget.closest('.card'); // Certifique-se de ajustar o seletor para corresponder à sua estrutura

    if (cardElement) {
        openBuyPage(cardElement);
    }
}

// Adiciona o listener de evento ao botão "COMPRAR!"
document.addEventListener('DOMContentLoaded', () => {
    const buyButtons = document.querySelectorAll('.buy-button'); // Use uma classe comum ou um seletor apropriado
    buyButtons.forEach(button => {
        button.addEventListener('click', handleBuyButtonClick);
    });

    // Atualiza o estado inicial dos elementos
    updateInstallments();
});



function openBuyPage(cardElement) {
    // Captura os dados do card clicado
    const productBrand = cardElement.dataset.marca;
    const productModel = cardElement.dataset.modelo;
    const productCode = cardElement.dataset.codigo;
    const productPrice = parseFloat(cardElement.dataset.price);
    const installmentAmount = parseFloat(cardElement.dataset.installment);
    const discountPrice = parseFloat(cardElement.dataset.discount);
    const productInfo = cardElement.dataset.info;

    // Preenche o formulário na página de compra
    const buyPage = document.getElementById('buyPage');

    document.getElementById('product-title').textContent = ` - Informações do Produto -`;
    document.getElementById('product-info').textContent = productInfo;
    document.getElementById('product-brand').textContent = productBrand;
    document.getElementById('product-model').textContent = productModel;
    document.getElementById('product-gender').textContent = cardElement.dataset.genero;
    document.getElementById('product-code').textContent = productCode;
    document.getElementById('product-price').textContent = `R$ ${productPrice.toFixed(2)}`;
    document.getElementById('product-installment').textContent = `R$ ${installmentAmount.toFixed(2)}`;

    // Define o preço original e o preço com desconto
    document.getElementById('price-original').textContent = `R$ ${productPrice.toFixed(2)}`;
    document.getElementById('price-discount').textContent = `R$ ${discountPrice.toFixed(2)}`;
    document.getElementById('installment-info').style.display = 'block';
    document.getElementById('installments').value = '10'; // Define o número padrão de parcelas como 10
    document.getElementById('installments').disabled = false; // Habilita a seleção de parcelas

    // Atualiza a mensagem de desconto com base no método de pagamento selecionado
    updateInstallments(); // Atualiza a visibilidade e valores baseados no método de pagamento

    // Mostra a página de compra
    buyPage.style.display = 'block';
}

// Fecha a página de compra
function closeBuyPage() {
    document.getElementById('buyPage').style.display = 'none';
}

// Atualiza o valor da parcela e o desconto conforme o método de pagamento
function updateInstallments() {
    const paymentMethod = document.getElementById('payment-method').value;
    const installmentsSelect = document.getElementById('installments');
    const discountMessage = document.getElementById('discount-message');
    const installmentInfo = document.getElementById('installment-info');

    if (paymentMethod === 'parcelado') {
        installmentsSelect.disabled = false;
        installmentInfo.style.display = 'block'; // Mostra a informação de parcelamento
        discountMessage.style.display = 'none'; // Oculta a mensagem de desconto
    } else {
        installmentsSelect.disabled = true;
        installmentsSelect.value = '1'; // Reseta para 1 parcela
        installmentInfo.style.display = 'none'; // Oculta a informação de parcelamento

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

    updatePrice(); // Atualiza o preço ao mudar o método de pagamento
}

// Atualiza o preço e parcelamento conforme a quantidade e o método de pagamento
function updatePrice() {
    const unitPrice = parseFloat(document.getElementById('price-original').textContent.replace('R$ ', '').replace(',', '.'));
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

        document.getElementById('price-discount').textContent = `R$ ${totalPrice.toFixed(2)}`;
        document.getElementById('installment').textContent = `R$ ${installmentAmount} reais`;
        document.getElementById('installments-count').textContent = paymentMethod === 'parcelado' ? `${installments}x` : 'N/A';
    } else {
        document.getElementById('price-discount').textContent = 'R$ 0,00';
        document.getElementById('installment').textContent = 'R$ 0,00';
        document.getElementById('installments-count').textContent = '0x';
    }
}

// Certifique-se de adicionar o listener de evento se a opção de pagamento for 'parcelado' ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updateInstallments(); // Atualiza o estado inicial dos elementos
});







