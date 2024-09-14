

/* ============ INÍCIO DO CÓDIGO: API/CRUD: LOGIN E SENHA ============ */

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do banco de dados
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'sua_senha_mysql',
    database: 'seu_banco_de_dados'
});

// Conexão com o banco de dados
const db = pool.promise();

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'E-mail e senha são obrigatórios.' });
    }

    try {
        const [rows] = await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
        res.status(201).json({ success: true, message: 'Usuário criado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao salvar o usuário.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

/* ============ FIM DO CÓDIGO: API/CRUD: LOGIN E SENHA ============ */


