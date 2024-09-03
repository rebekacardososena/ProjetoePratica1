

/* ======== CÓDIGO JAVASCRIPT - SELECIONA TÊNIS AO CLICAR NA IMAGEM, APÓS ALGUNS SEGUNDOS ELA RETORNA A APRESENTAR A IMAGEM PRINCIPAL ======== */

let originalImageSrc = document.getElementById('main-image').src;

function changeImage(newSrc) {
    const mainImage = document.getElementById('main-image');

    mainImage.src = newSrc;

    setTimeout(() => {
        mainImage.src = originalImageSrc;
    }, 30000); // 3000 milissegundos = 3 segundos
}

/* ================================================== */














