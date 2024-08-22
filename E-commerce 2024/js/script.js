

/* ============ INÍCIO DO CÓDIGO JAVASCRIPT - SLIDESHOW DE IMAGENS ============ */

const slider = document.querySelector(".slider");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const slides = document.querySelectorAll(".slide");
const slideIcons = document.querySelectorAll(".slide-icon");
const numberOfSlides = slides.length;
var slideNumber = 0;

// SLIDE DO BOTÃO - NEXT-BTN

nextBtn.addEventListener("click", () => {
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });
    slideIcons.forEach((slideIcon) => {
        slideIcon.classList.remove("active");
    });

    slideNumber++;

    if (slideNumber > (numberOfSlides - 1)) {
        slideNumber = 0;
    }

    slides[slideNumber].classList.add("active");
    slideIcons[slideNumber].classList.add("active");

});

// SLIDE PREVISUALIZAÇÃO DA IMAGEM

prevBtn.addEventListener("click", () => {
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });
    slideIcons.forEach((slideIcon) => {
        slideIcon.classList.remove("active");
    });

    slideNumber--;

    if (slideNumber < 0) {
        slideNumber = numberOfSlides - 1;
    }

    slides[slideNumber].classList.add("active");
    slideIcons[slideNumber].classList.add("active");
});

// SLIDE AUTOMATICO DA IMAGEM

var playSlider;

var repeater = () => {
    playSlider = setInterval(function () {
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });
        slideIcons.forEach((slideIcon) => {
            slideIcon.classList.remove("active");
        });

        slideNumber++;

        if (slideNumber > (numberOfSlides - 1)) {
            slideNumber = 0;
        }

        slides[slideNumber].classList.add("active");
        slideIcons[slideNumber].classList.add("active");

    }, 2000);
}
repeater();

// O SLIDE PARA AO PASSAR O MOUSE POR CIMA DA IMAGEM

slider.addEventListener("mouseover", () => {
    clearInterval(playSlider);
});

// O SLIDE VOLTA A PASSAR AS IMAGENS AO RETIRAR O MOUSE

slider.addEventListener("mouseout", () => {
    repeater();
});

/* ============ FIM DO CÓDIGO JAVASCRIPT - SLIDESHOW DE IMAGENS ============ */


/* ============ INÍCIO DO CÓDIGO JAVASCRIPT - REALIZA A COMPRA OU ADICIONA O PRODUTO NO CARRINHO ============ */

// Função para quando o botão "Comprar Agora" é clicado
function buyNow() {
    alert('Você clicou em Comprar Agora!');
}

// Função para quando o botão "Adicionar ao Carrinho" é clicado
function addToCart() {
    alert('Produto adicionado ao carrinho!');
}

/* ============ FIM DO CÓDIGO JAVASCRIPT - REALIZA A COMPRA OU ADICIONA O PRODUTO NO CARRINHO ============ */





/* ============ INÍCIO DO CÓDIGO JAVASCRIPT - ACESSO POR MEIO DO LOGIN OU DE CADASTRO ============ */

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    // Adicione lógica para verificar as credenciais
    alert(`Login: ${email}, Senha: ${password}`);
});

document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    // Adicione lógica para o registro do usuário
    alert(`Cadastro: ${name}, Email: ${email}, Senha: ${password}`);
});

document.getElementById('facebookLogin').addEventListener('click', function () {
    // Adicione lógica para o login com Facebook
    alert('Login com Facebook');
});

document.getElementById('googleLogin').addEventListener('click', function () {
    // Adicione lógica para o login com Google
    alert('Login com Google');
});

/* ============ FIM DO CÓDIGO JAVASCRIPT - ACESSO POR MEIO DO LOGIN OU DE CADASTRO ============ */












