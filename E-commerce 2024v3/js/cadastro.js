

/* ============ INÍCIO DO CÓDIGO - HTML: CADASTRO DE USUÁRIO E SENHA ============ */

/*
// Função para validar o CPF (simples validação com base na quantidade de dígitos)
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11) return false; // Verifica se o CPF tem 11 dígitos
    return true;
}

// Função para validar o formato do telefone e celular (simples validação)
function validarTelefone(numero) {
    const telefonePattern = /^\d{10,11}$/; // Aceita 10 ou 11 dígitos
    return telefonePattern.test(numero.replace(/\D/g, ''));
}

// Função para validar o formulário antes do envio
function validarFormulario(event) {
    event.preventDefault(); // Impede o envio do formulário para validar os dados

    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const celular = document.getElementById('celular').value;
    const email = document.getElementById('email').value;

    // Validação de CPF
    if (!validarCPF(cpf)) {
        alert('CPF inválido. Por favor, insira um CPF com 11 dígitos.');
        return;
    }

    // Validação de telefone e celular
    if (!validarTelefone(telefone)) {
        alert('Telefone inválido. Por favor, insira um número de telefone válido.');
        return;
    }

    if (!validarTelefone(celular)) {
        alert('Celular inválido. Por favor, insira um número de celular válido.');
        return;
    }

    // Validação de e-mail
    if (!email.includes('@')) {
        alert('E-mail inválido. Por favor, insira um e-mail válido.');
        return;
    }

    // Se todas as validações passaram, você pode prosseguir com o envio ou outras ações
    alert('Formulário enviado com sucesso!');
    // Você pode aqui chamar o método para enviar o formulário ou manipular os dados conforme necessário
    document.getElementById('registration-form').submit();
}

// Adiciona um listener para o evento de envio do formulário
document.getElementById('registration-form').addEventListener('submit', validarFormulario);

*/

/* ============ FIM DO CÓDIGO - HTML: CADASTRO DE USUÁRIO E SENHA ============ */


/* ============ INÍCIO DO CÓDIGO - HTML: CADASTRO DE USUÁRIO E SENHA ============ */

document.getElementById('registration-form').addEventListener('submit', function (event) {
    event.preventDefault();
    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll('.error').forEach(el => el.remove());

    // Get form elements
    const nome = document.getElementById('nome');
    const cpf = document.getElementById('cpf');
    const telefone = document.getElementById('telefone');
    const celular = document.getElementById('celular');
    const dataNascimento = document.getElementById('data-nascimento');
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');
    const cep = document.getElementById('cep');
    const rua = document.getElementById('rua');
    const numero = document.getElementById('numero');
    const bairro = document.getElementById('bairro');
    const cidade = document.getElementById('cidade');
    const estado = document.getElementById('estado');

    // Function to show error message
    function showError(input, message) {
        const error = document.createElement('span');
        error.className = 'error';
        error.textContent = message;
        input.insertAdjacentElement('afterend', error);
        isValid = false;
    }

    // Validate Nome
    if (nome.value.trim() === '') {
        showError(nome, 'Nome completo é obrigatório.');
    }

    // Validate CPF
    const cpfPattern = /^\d{11}$/;
    if (!cpfPattern.test(cpf.value)) {
        showError(cpf, 'CPF deve ter 11 dígitos.');
    }

    // Validate Celular
    const celularPattern = /^\d{11}$/;
    if (!celularPattern.test(celular.value)) {
        showError(celular, 'Celular deve ter 11 dígitos.');
    }

    // Validate Data de Nascimento
    if (dataNascimento.value === '') {
        showError(dataNascimento, 'Data de nascimento é obrigatória.');
    }

    // Validate Email
    if (email.value === '' || !email.checkValidity()) {
        showError(email, 'E-mail inválido.');
    }

    // Validate Senha
    if (senha.value.length < 6) {
        showError(senha, 'A senha deve ter pelo menos 6 caracteres.');
    }

    // Validate Endereço
    if (cep.value.trim() === '') {
        showError(cep, 'CEP é obrigatório.');
    }
    if (rua.value.trim() === '') {
        showError(rua, 'Rua é obrigatória.');
    }
    if (numero.value.trim() === '') {
        showError(numero, 'Número é obrigatório.');
    }
    if (bairro.value.trim() === '') {
        showError(bairro, 'Bairro é obrigatório.');
    }
    if (cidade.value.trim() === '') {
        showError(cidade, 'Cidade é obrigatória.');
    }
    if (estado.value === '') {
        showError(estado, 'Estado é obrigatório.');
    }

    // If form is valid, you can submit it here
    if (isValid) {
        alert('Formulário enviado com sucesso!');
        // Uncomment the line below to actually submit the form
        // this.submit();
    }
});

/* ============ FIM DO CÓDIGO - HTML: CADASTRO DE USUÁRIO E SENHA ============ */
