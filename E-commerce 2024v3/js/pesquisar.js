


/* ============= CÓDIGO JAVASCRIPT: PESQUISA - FILTRAGEM DE CARDS POR: MARCA, MODELO, GENERO, MAIOR E MENOR VALOR ============= */


/* ============= CÓDIGO JAVASCRIPT - Nº 01: FAZ BUSCAR POR MAIOR E MENOR VALOR NA PÁGINA (FUNCIONAL) ============= */

document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio real do formulário

    const query = document.getElementById('search-input').value.toLowerCase();
    const cards = Array.from(document.querySelectorAll('.card'));

    cards.forEach(card => {
        const marca = card.getAttribute('data-marca').toLowerCase();
        const modelo = card.getAttribute('data-modelo').toLowerCase();
        const codigo = card.getAttribute('data-codigo').toLowerCase();
        const genero = card.getAttribute('data-genero').toLowerCase();

        // Verificar se a query corresponde a qualquer um dos atributos
        const isMatch = (text, query) => text.includes(query);

        // Checando se a query corresponde a qualquer dos atributos de texto
        const matches = isMatch(marca, query) ||
                        isMatch(modelo, query) ||
                        isMatch(codigo, query) ||
                        isMatch(genero, query);

        if (matches) {
            card.style.display = 'block'; // Mostra o card
        } else {
            card.style.display = 'none'; // Oculta o card
        }
    });
});


/* ============= CÓDIGO JAVASCRIPT - Nº 02: FAZ BUSCAR POR MAIOR E MENOR VALOR NA PÁGINA (FUNCIONAL) ============= */

document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio real do formulário

    const query = document.getElementById('search-input').value.toLowerCase();
    const cards = Array.from(document.querySelectorAll('.card'));

    cards.forEach(card => {
        const marca = card.getAttribute('data-marca').toLowerCase();
        const modelo = card.getAttribute('data-modelo').toLowerCase();
        const codigo = card.getAttribute('data-codigo').toLowerCase();
        const genero = card.getAttribute('data-genero').toLowerCase();
        
        // Convertendo valores para numéricos se eles forem números
        const menorValor = parseFloat(card.getAttribute('data-menorValor')) || -Infinity;
        const maiorValor = parseFloat(card.getAttribute('data-maiorValor')) || Infinity;

        // Verificar se a query corresponde a qualquer um dos atributos
        const isMatch = (text, query) => text.includes(query);

        // Verificar se a query é um valor numérico
        const isQueryNumeric = !isNaN(parseFloat(query)) && isFinite(query);
        const queryNum = parseFloat(query);

        // Checando se a query corresponde a qualquer dos atributos de texto ou se está dentro do intervalo de valores
        const matches = isMatch(marca, query) ||
                        isMatch(modelo, query) ||
                        isMatch(codigo, query) ||
                        isMatch(genero, query) ||
                        (isQueryNumeric && queryNum >= menorValor && queryNum <= maiorValor);

        if (matches) {
            card.style.display = 'block'; // Mostra o card
        } else {
            card.style.display = 'none'; // Oculta o card
        }
    });
});


/* ============= CÓDIGO JAVASCRIPT - Nº 03: FAZ BUSCAR POR MAIOR E MENOR VALOR NA PÁGINA DE PRODUTOS (INCOMPLETO E FUNCIONAL) ============= */

document.addEventListener('DOMContentLoaded', function () {
    // Função para extrair valores dos cartões e identificar o menor e o maior valor
    function identifyPriceRange() {
        const cards = Array.from(document.querySelectorAll('.card'));
        let minPrice = Infinity;
        let maxPrice = -Infinity;

        cards.forEach(card => {
            const priceText = card.querySelector('.valorTotal').textContent.trim();
            // Remove "R$" e substitui a vírgula por ponto para conversão correta
            const priceValue = parseFloat(priceText.replace('R$', '').replace(',', '.'));

            if (!isNaN(priceValue)) {
                if (priceValue < minPrice) minPrice = priceValue;
                if (priceValue > maxPrice) maxPrice = priceValue;
            }
        });

        return { minPrice, maxPrice };
    }

    // Função para realizar a busca
    function performSearch(query) {
        const cards = Array.from(document.querySelectorAll('.card'));
        const { minPrice, maxPrice } = identifyPriceRange();

        cards.forEach(card => {
            const marca = card.getAttribute('data-marca').toLowerCase();
            const modelo = card.getAttribute('data-modelo').toLowerCase();
            const codigo = card.getAttribute('data-codigo').toLowerCase();
            const genero = card.getAttribute('data-genero').toLowerCase();

            const priceText = card.querySelector('.valorTotal').textContent.trim();
            const priceValue = parseFloat(priceText.replace('R$', '').replace(',', '.'));

            // Verificar se a consulta corresponde a qualquer um dos atributos de texto
            const isMatch = (text, query) => text.includes(query);

            // Verificar se a consulta é um valor numérico
            const isQueryNumeric = !isNaN(parseFloat(query)) && isFinite(query);
            const queryNum = parseFloat(query);

            // Checando se a consulta corresponde a qualquer dos atributos de texto ou se está dentro do intervalo de valores
            const matches = isMatch(marca, query) ||
                            isMatch(modelo, query) ||
                            isMatch(codigo, query) ||
                            isMatch(genero, query) ||
                            (isQueryNumeric && queryNum >= minPrice && queryNum <= maxPrice);

            if (matches) {
                card.style.display = 'block'; // Mostra o card
            } else {
                card.style.display = 'none'; // Oculta o card
            }
        });
    }

    // Evento de envio do formulário de busca
    document.getElementById('search-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio real do formulário
        const query = document.getElementById('search-input').value.toLowerCase();
        performSearch(query);
    });
});



/* ============= CÓDIGO JAVASCRIPT - Nº 04: FAZ BUSCAR POR MAIOR E MENOR VALOR NA PÁGINA DE PRODUTOS (COMPLETO E FUNCIONAL) ============= */

document.addEventListener('DOMContentLoaded', function () {
    // Função para extrair valores dos cartões e identificar o menor e o maior valor
    function identifyPriceRange() {
        const cards = Array.from(document.querySelectorAll('.card'));
        let minPrice = Infinity;
        let maxPrice = -Infinity;

        cards.forEach(card => {
            const priceText = card.querySelector('.valorTotal').textContent.trim();
            // Remove "R$" e substitui a vírgula por ponto para conversão correta
            const priceValue = parseFloat(priceText.replace('R$', '').replace(',', '.'));

            if (!isNaN(priceValue)) {
                if (priceValue < minPrice) minPrice = priceValue;
                if (priceValue > maxPrice) maxPrice = priceValue;
            }
        });

        return { minPrice, maxPrice };
    }

    // Função para realizar a busca
    function performSearch(query) {
        const cards = Array.from(document.querySelectorAll('.card'));
        const { minPrice, maxPrice } = identifyPriceRange();

        // Convertendo a consulta para número, se possível
        const queryNum = parseFloat(query.replace(',', '.'));

        // Tolerância para valores próximos
        const tolerance = 0.1; // 10% de margem de erro, ajuste conforme necessário

        cards.forEach(card => {
            const marca = card.getAttribute('data-marca').toLowerCase();
            const modelo = card.getAttribute('data-modelo').toLowerCase();
            const codigo = card.getAttribute('data-codigo').toLowerCase();
            const genero = card.getAttribute('data-genero').toLowerCase();

            const priceText = card.querySelector('.valorTotal').textContent.trim();
            const priceValue = parseFloat(priceText.replace('R$', '').replace(',', '.'));

            // Verificar se a consulta corresponde a qualquer um dos atributos de texto
            const isMatch = (text, query) => text.includes(query);

            // Verificar se a consulta é um valor numérico
            const isQueryNumeric = !isNaN(queryNum) && isFinite(queryNum);

            // Checando se a consulta corresponde a qualquer dos atributos de texto ou está dentro da margem de erro dos valores
            const matches = isMatch(marca, query) ||
                            isMatch(modelo, query) ||
                            isMatch(codigo, query) ||
                            isMatch(genero, query) ||
                            (isQueryNumeric && priceValue >= (queryNum - queryNum * tolerance) && priceValue <= (queryNum + queryNum * tolerance));

            if (matches) {
                card.style.display = 'block'; // Mostra o card
            } else {
                card.style.display = 'none'; // Oculta o card
            }
        });
    }

    // Evento de envio do formulário de busca
    document.getElementById('search-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio real do formulário
        const query = document.getElementById('search-input').value.toLowerCase();
        performSearch(query);
    });
});



/* ============= CÓDIGO JAVASCRIPT - Nº 05: OCULTA O SLIDERSHOW AO FAZER UMA BUSCA NA PÁGINA DE PRODUTOS (COMPLETO E FUNCIONAL) ============= */

document.addEventListener('DOMContentLoaded', function () {
    // Função para identificar o menor e o maior valor dos produtos
    function identifyPriceRange() {
        const cards = Array.from(document.querySelectorAll('.card'));
        let minPrice = Infinity;
        let maxPrice = -Infinity;

        cards.forEach(card => {
            const priceText = card.querySelector('.valorTotal').textContent.trim();
            const priceValue = parseFloat(priceText.replace('R$', '').replace(',', '.'));

            if (!isNaN(priceValue)) {
                if (priceValue < minPrice) minPrice = priceValue;
                if (priceValue > maxPrice) maxPrice = priceValue;
            }
        });

        return { minPrice, maxPrice };
    }

    // Função para realizar a busca
    function performSearch(query) {
        const cards = Array.from(document.querySelectorAll('.card'));
        const { minPrice, maxPrice } = identifyPriceRange();

        const queryNum = parseFloat(query.replace(',', '.'));
        const tolerance = 0.1; // Margem de erro de 10%

        cards.forEach(card => {
            const marca = card.getAttribute('data-marca').toLowerCase();
            const modelo = card.getAttribute('data-modelo').toLowerCase();
            const codigo = card.getAttribute('data-codigo').toLowerCase();
            const genero = card.getAttribute('data-genero').toLowerCase();

            const priceText = card.querySelector('.valorTotal').textContent.trim();
            const priceValue = parseFloat(priceText.replace('R$', '').replace(',', '.'));

            const isMatch = (text, query) => text.includes(query);
            const isQueryNumeric = !isNaN(queryNum) && isFinite(queryNum);

            const matches = isMatch(marca, query) ||
                            isMatch(modelo, query) ||
                            isMatch(codigo, query) ||
                            isMatch(genero, query) ||
                            (isQueryNumeric && priceValue >= (queryNum - queryNum * tolerance) && priceValue <= (queryNum + queryNum * tolerance));

            if (matches) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Ocultar o slideshow
        const slideshow = document.getElementById('slideshow');
        if (slideshow) {
            slideshow.classList.add('hidden');
        }
    }

    // Evento de envio do formulário de busca
    document.getElementById('search-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const query = document.getElementById('search-input').value.toLowerCase();
        performSearch(query);
    });
});







