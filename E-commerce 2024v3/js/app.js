











// API - ACESSO DO USUARIO

const apiBaseUrl = 'http://10.25.2.100:3000/usuarios';

// Função para adicionar um novo usuário
async function adicionarUsuario(event) {
    event.preventDefault(); // Impede o envio do formulário

    const formData = new FormData(document.getElementById('registration-form'));
    const data = Object.fromEntries(formData.entries());
    data.ofertas = data.ofertas === 'on'; // Converte checkbox

    try {
        const response = await fetch(apiBaseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Erro ao adicionar usuário');
        }
        alert('Usuário adicionado com sucesso!');
        document.getElementById('registration-form').reset();
    } catch (error) {
        console.error(error);
    }
}

// Configura o evento de envio do formulário
document.getElementById('registration-form').addEventListener('submit', adicionarUsuario);





//

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuração do CORS
app.use(cors());

// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sua_senha',
    database: 'formulario_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL');
});

// Rota para obter todos os registros
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Rota para adicionar um novo registro
app.post('/usuarios', (req, res) => {
    const { nome, sexo, cpf, telefone, celular, data_nascimento, email, senha, cep, rua, numero, complemento, referencia, bairro, cidade, estado, ofertas } = req.body;

    const sql = 'INSERT INTO usuarios (nome, sexo, cpf, telefone, celular, data_nascimento, email, senha, cep, rua, numero, complemento, referencia, bairro, cidade, estado, ofertas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [nome, sexo, cpf, telefone, celular, data_nascimento, email, senha, cep, rua, numero, complemento, referencia, bairro, cidade, estado, ofertas ? 1 : 0];

    db.query(sql, values, (err, results) => {
        if (err) throw err;
        res.status(201).json({ id: results.insertId, ...req.body });
    });
});

// Rota para atualizar um registro
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, sexo, cpf, telefone, celular, data_nascimento, email, senha, cep, rua, numero, complemento, referencia, bairro, cidade, estado, ofertas } = req.body;

    const sql = 'UPDATE usuarios SET nome = ?, sexo = ?, cpf = ?, telefone = ?, celular = ?, data_nascimento = ?, email = ?, senha = ?, cep = ?, rua = ?, numero = ?, complemento = ?, referencia = ?, bairro = ?, cidade = ?, estado = ?, ofertas = ? WHERE id = ?';
    const values = [nome, sexo, cpf, telefone, celular, data_nascimento, email, senha, cep, rua, numero, complemento, referencia, bairro, cidade, estado, ofertas ? 1 : 0, id];

    db.query(sql, values, (err, results) => {
        if (err) throw err;
        res.json({ id, ...req.body });
    });
});

// Rota para excluir um registro
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Registro excluído com sucesso' });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});








