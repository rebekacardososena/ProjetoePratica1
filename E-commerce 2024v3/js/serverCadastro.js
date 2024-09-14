


/* ============ INÍCIO DO CÓDIGO: API/CRUD: CADASTRO DE CLIENTE / USUÁRIO ============ */

// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuração do CORS
app.use(cors());

// Configuração do body-parser para JSON
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Substitua pelo seu usuário
    password: '', // Substitua pela sua senha
    database: 'formulario_db' // Substitua pelo nome do seu banco de dados
});

// Conectar ao banco de dados
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1);
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// Rota para receber os dados do formulário
app.post('/submit', (req, res) => {
    const {
        nome,
        sexo,
        cpf,
        telefone,
        celular,
        dataNascimento,
        email,
        senha,
        cep,
        rua,
        numero,
        complemento,
        referencia,
        bairro,
        cidade,
        estado,
        ofertas
    } = req.body;

    // Consulta SQL para inserir os dados
    const query = `
        INSERT INTO formulario (
            nome, sexo, cpf, telefone, celular, dataNascimento, email, senha,
            cep, rua, numero, complemento, referencia, bairro, cidade, estado, ofertas
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        nome, sexo, cpf, telefone, celular, dataNascimento, email, senha,
        cep, rua, numero, complemento, referencia, bairro, cidade, estado, ofertas ? 1 : 0
    ];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            return res.status(500).json({ error: 'Erro ao inserir dados' });
        }
        res.status(200).json({ message: 'Dados inseridos com sucesso!' });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

/* ============ FIM DO CÓDIGO: API/CRUD: LOGIN E SENHA ============ */

