
/* ============ INÍCIO DO CÓDIGO JAVASCRIPT - ACESSO POR MEIO DO LOGIN ============ */

/*
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
*/

/* ============ FIM DO CÓDIGO JAVASCRIPT - ACESSO POR MEIO DO LOGIN ============ */


/* ============ INÍCIO DO CÓDIGO JAVASCRIPT - ACESSO POR MEIO DO LOGIN ============ */
/*
document.getElementById('loginForm').addEventListener('submit', function (event) {
    // Previne o envio padrão do formulário
    event.preventDefault();

    // Obtém os valores dos campos
    var email = document.getElementById('loginEmail').value.trim();
    var password = document.getElementById('loginPassword').value.trim();

    // Obtém os elementos de mensagem de erro
    var emailError = document.getElementById('emailError');
    var passwordError = document.getElementById('passwordError');

    // Limpa mensagens de erro anteriores
    emailError.textContent = '';
    passwordError.textContent = '';

    // Valida e-mail
    if (!email) {
        emailError.textContent = 'O e-mail é obrigatório.';
    } else if (!validateEmail(email)) {
        emailError.textContent = 'O e-mail fornecido não é válido.';
    }

    // Valida senha
    if (!password) {
        passwordError.textContent = 'A senha é obrigatória.';
    } else if (password.length < 6) {
        passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres.';
    }

    // Verifica se há erros antes de enviar o formulário
    if (!emailError.textContent && !passwordError.textContent) {
        // Aqui você pode prosseguir com o envio do formulário, por exemplo, usando AJAX
        // Enviar o formulário ou fazer outra ação desejada
        console.log('Formulário válido. Pronto para enviar!');
        // Para fins de demonstração, vamos apenas exibir uma mensagem de sucesso
        alert('Login realizado com sucesso!');
    }
});

// Função para validar o formato do e-mail
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
*/

/* ============ FIM DO CÓDIGO JAVASCRIPT - ACESSO POR MEIO DO LOGIN ============ */



/* ============ INÍCIO DO CÓDIGO JAVASCRIPT - ACESSO POR MEIO DO LOGIN ============ */

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = document.getElementById('loginEmail').value.trim();
    var password = document.getElementById('loginPassword').value.trim();

    var emailError = document.getElementById('emailError');
    var passwordError = document.getElementById('passwordError');

    emailError.textContent = '';
    passwordError.textContent = '';

    if (!email) {
        emailError.textContent = 'O e-mail é obrigatório.';
    } else if (!validateEmail(email)) {
        emailError.textContent = 'O e-mail fornecido não é válido.';
    }

    if (!password) {
        passwordError.textContent = 'A senha é obrigatória.';
    } else if (password.length < 6) {
        passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres.';
    }

    if (!emailError.textContent && !passwordError.textContent) {
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Login realizado com sucesso!');
                } else {
                    alert('Erro: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }
});

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/* ============ FIM DO CÓDIGO JAVASCRIPT - ACESSO POR MEIO DO LOGIN ============ */


