

/* ======== CÓDIGO JAVASCRIPT - SELECIONA TÊNIS AO CLICAR NA IMAGEM, APÓS ALGUNS SEGUNDOS ELA RETORNA A APRESENTAR A IMAGEM PRINCIPAL ======== */
/*
let originalImageSrc = document.getElementById('main-image').src;

function changeImage(newSrc) {
    const mainImage = document.getElementById('main-image');

    mainImage.src = newSrc;

    setTimeout(() => {
        mainImage.src = originalImageSrc;
    }, 30000); // 3000 milissegundos = 3 segundos
}
*/
/* ================================================== */


let originalImageSrc = document.getElementById('main-image').src;

const imageMap = {
    'asics': {
        'gel-quantum-180': {
            '1': './img/tenis/asics/Tênis ASICS Gel Quantum 180 1.png',
            '2': './img/tenis/asics/Tênis ASICS Gel Quantum 180 2.png',
            '3': './img/tenis/asics/Tênis ASICS Gel Quantum 180 3.png',
            '4': './img/tenis/asics/Tênis ASICS Gel Quantum 180 4.png',
            '5': './img/tenis/asics/Tênis ASICS Gel Quantum 180 5.png',
        },
        // Adicione outras marcas e modelos conforme necessário
    },
    'adidas': {
        'dame-certified': {
            '1': './img/tenis/adidas/Tênis Adidas Dame Certified Masculino 1.png',
            '2': './img/tenis/adidas/Tênis Adidas Dame Certified Masculino 2.png',
            '3': './img/tenis/adidas/Tênis Adidas Dame Certified Masculino 3.png',
            '4': './img/tenis/adidas/Tênis Adidas Dame Certified Masculino 4.png',
            '5': './img/tenis/adidas/Tênis Adidas Dame Certified Masculino 5.png',
        },
        // Adicione outros modelos conforme necessário
    },
    // Adicione outras marcas conforme necessário
};

function changeImage(brand, model, code) {
    const mainImage = document.getElementById('main-image');
    const newSrc = imageMap[brand]?.[model]?.[code];

    if (newSrc) {
        mainImage.src = newSrc;

        setTimeout(() => {
            mainImage.src = originalImageSrc;
        }, 30000); // 30000 milissegundos = 30 segundos
    } else {
        console.error('Imagem não encontrada para:', brand, model, code);
    }
}
















