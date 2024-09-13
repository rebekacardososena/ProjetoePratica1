const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const pool = require('./db/conn')

app.use(express.json())

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
  
app.post('/user/register', async (req, res) => {
    const { nome, sobreNome, phone, email, senha, cep, rua, cidade, uf } = req.body;

    if(!nome){
        res.status(422)
        .json({
            message:"Por favor insira um nome"
        })
        return
    }

    if(!sobreNome){
        res.status(422)
        .json({
            message:"Por favor insira um sobre nome"
        })
        return
    }
    
    if(!phone){
        res.status(422)
        .json({
            message:"Por favor insira um telefone"
        })
        return
    }

    if(!email){
        res.status(422)
        .json({
            message:"Por favor insira um email"
        })
        return
    }

    if(!senha){
        res.status(422)
        .json({
            message:"Por favor insira uma senha"
        })
        return
    }

    try {
        const checkEmailSql = "SELECT email FROM users WHERE email = ? LIMIT 1";
        pool.query(checkEmailSql, [email], async (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Erro ao consultar o banco de dados",
                    error: err
                });
            }

            if (results.length > 0) {
                return res.status(409).json({
                    message: "Email já registrado"
                });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(senha, salt);

            const insertUserSql = "INSERT INTO users (nome, sobrenome, phone, email, senha) VALUES (?, ?, ?, ?, ?)";
            const dados = [nome, sobreNome, phone, email, hashedPassword];

            pool.query(insertUserSql, dados, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: "Erro ao registrar usuário",
                        error: err
                    });
                }

                const userId = result.insertId; // Captura o ID do usuário registrado

                // Inserir endereço
                const insertEnderecoSql = `
                    INSERT INTO endereco (cep, rua, cidade, uf, id_user)
                    VALUES (?, ?, ?, ?, ?)
                `;
                const enderecoDados = [cep, rua, cidade, uf, userId];

                pool.query(insertEnderecoSql, enderecoDados, (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            message: "Erro ao salvar o endereço",
                            error: err
                        });
                    }

                    res.status(201).json({
                        message: "Registrado com sucesso e endereço salvo!",
                        userId: userId
                    });
                });
            });
        });
    } catch (err) {
        res.status(500).json({
            message: "Erro ao processar a senha",
            error: err
        });
    }
});


app.post('/user/login', (req, res) => {
    const { email, senha } = req.body;

    // Validação dos campos obrigatórios
    if (!email) {
        return res.status(422).json({
            message: "Digite seu email!"
        });
    }

    if ( !senha) {
        return res.status(422).json({
            message: "Digite sua senha!"
        });
    }

    const sql = "SELECT senha FROM users WHERE email = ? LIMIT 1";
    const dados = [email];

    pool.query(sql, dados, (error, results) => {
        if (error) {
            return res.status(500).json({
                message: "Erro ao consultar o banco de dados",
                error
            });
        }

        if (results.length > 0) {
            const user = results[0];

            bcrypt.compare(senha, user.senha, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: "Erro ao comparar senhas",
                        error: err
                    });
                }
                if (result) {
                    return res.status(200).json({
                        message: "Login bem-sucedido"
                    });
                } else {
                    return res.status(401).json({
                        message: "Senha ou email esta incorreto!"
                    });
                }
            });
        } else {
            return res.status(404).json({
                message: "Usuário não encontrado"
            });
        }
    });
});

app.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, sobreNome, phone, email, senha, cep, rua, cidade, uf } = req.body;

    if (!id || !nome || !sobreNome || !phone || !email || !senha) {
        return res.status(422).json({
            message: "Todos os campos obrigatórios são necessários"
        });
    }

    try {
        // Hash da senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);

        // Atualizar usuário
        const updateUserSql = "UPDATE users SET nome = ?, sobrenome = ?, phone = ?, email = ?, senha = ? WHERE id_user = ?";
        const userData = [nome, sobreNome, phone, email, hashedPassword, id];

        pool.query(updateUserSql, userData, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Erro ao atualizar o usuário",
                    error: err
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }

            // Atualizar o endereço, se fornecido
            if (cep || rua || cidade || uf) {
                const updateEnderecoSql = `
                    UPDATE endereco
                    SET cep = COALESCE(?, cep),
                        rua = COALESCE(?, rua),
                        cidade = COALESCE(?, cidade),
                        uf = COALESCE(?, uf)
                    WHERE id_user = ?
                `;
                const enderecoData = [cep, rua, cidade, uf, id];

                pool.query(updateEnderecoSql, enderecoData, (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            message: "Erro ao atualizar o endereço",
                            error: err
                        });
                    }

                    res.status(200).json({
                        message: "Usuário e endereço atualizados com sucesso"
                    });
                });
            } else {
                res.status(200).json({
                    message: "Usuário atualizado com sucesso"
                });
            }
        });
    } catch (err) {
        res.status(500).json({
            message: "Erro ao processar a senha",
            error: err
        });
    }
});


// Rota para deletar um usuário pelo ID

app.delete('/user/:id', (req, res) => {

    // Obtém o ID do usuário a partir dos parâmetros da URL
    const { id } = req.params;

    // Verifica se o ID foi fornecido na solicitação
    if (!id) {
        return res.status(422).json({
            message: "O ID do usuário é obrigatório"
        });
    }

    // SQL para deletar o usuário com o ID especificado
    const sql = "DELETE FROM users WHERE id_user = ?";
    const dados = [id];

    // Executa a consulta SQL para deletar o usuário
    pool.query(sql, dados, (err, result) => {
        
        // Se ocorrer um erro durante a execução da consulta, retorna um erro 500
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Erro ao deletar o usuário",
                error: err
            });
        }

        // Se nenhum usuário foi afetado pela consulta (não encontrado), retorna um erro 404
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Usuário não encontrado"
            });
        }

        // Se a exclusão for bem-sucedida, retorna uma mensagem de sucesso com status 200
        res.status(200).json({
            message: "Usuário deletado com sucesso"
        });
    });
});


//           PRODUTOS!!


// Rota para obter a lista de produtos
app.get('/', (req, res) => {

    // Consulta SQL para obter todos os produtos
    const sql = `
        SELECT 
            p.id_produto, 
            p.titulo, 
            p.descricao, 
            p.preco, 
            c.nome AS categoria, 
            u.nome AS vendedor 
        FROM produto p
        LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
        LEFT JOIN users u ON p.id_user = u.id_user
    `;

    pool.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Erro ao consultar o banco de dados",
                error: err
            });
        }

        res.status(200).json(results);
    });
});


//CADASTRAR PRODUTO

app.post('/produtos/cadastrar', (req, res) => {
    const { titulo, descricao, preco, id_user, id_categoria } = req.body;

    // Validação dos campos obrigatórios
    if (!titulo) {
        return res.status(422).json({
            message: "Precisa preencher o campo titulo"
        });
    }

    if(!preco){
        return res.status(422).json({
            message: "Precisa preencher o campo preço"
        });
    }

    if(!id_user){
        return res.status(422).json({
            message: "Precisa do id do vendedor"
        });
    }

    if(!id_categoria){
        return res.status(422).json({
            message: "Precisa do id da categoria"
        });
    }

    // Consulta SQL para inserir um novo produto
    const sql = `
        INSERT INTO produto (titulo, descricao, preco, id_user, id_categoria)
        VALUES (?, ?, ?, ?, ?)
    `;

    // Dados para a consulta
    const dados = [titulo, descricao, preco, id_user, id_categoria];

    // Executar a consulta
    pool.query(sql, dados, (err, result) => {
        if (err) {
            console.error("Erro ao cadastrar o produto:", err);
            return res.status(500).json({
                message: "Erro ao cadastrar o produto",
                error: err
            });
        }

        // Responder com sucesso e o ID do produto criado
        res.status(201).json({
            message: "Produto cadastrado com sucesso!",
            produtoId: result.insertId
        });
    });
});

app.post('/carrinho/adicionar', (req, res) => {
const { id_user, id_produto, quantidade } = req.body;

if (!id_user || !id_produto || quantidade == null) {
    return res.status(422).json({
        message: "ID do usuário, ID do produto e quantidade são obrigatórios"
    });
}

// Iniciar uma transação para garantir a integridade dos dados
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        return res.status(500).json({
            message: "Erro ao conectar ao banco de dados",
            error: err
        });
    }

    connection.beginTransaction((err) => {
        if (err) {
            connection.release();
            console.error("Erro ao iniciar a transação:", err);
            return res.status(500).json({
                message: "Erro ao iniciar a transação",
                error: err
            });
        }

        // Verificar se o carrinho já existe para o usuário
        const checkCarrinhoSql = "SELECT id_carrinho FROM carrinho WHERE id_user = ? LIMIT 1";
        connection.query(checkCarrinhoSql, [id_user], (err, results) => {
            if (err) {
                connection.rollback(() => connection.release());
                console.error("Erro ao verificar o carrinho:", err);
                return res.status(500).json({
                    message: "Erro ao verificar o carrinho",
                    error: err
                });
            }

            let carrinhoId;

            if (results.length > 0) {
                // Carrinho existe
                carrinhoId = results[0].id_carrinho;
            } else {
                // Criar um novo carrinho
                const createCarrinhoSql = "INSERT INTO carrinho (id_user) VALUES (?)";
                connection.query(createCarrinhoSql, [id_user], (err, result) => {
                    if (err) {
                        connection.rollback(() => connection.release());
                        console.error("Erro ao criar o carrinho:", err);
                        return res.status(500).json({
                            message: "Erro ao criar o carrinho",
                            error: err
                        });
                    }

                    carrinhoId = result.insertId;

                    // Adicionar o produto ao carrinho
                    addProdutoAoCarrinho(carrinhoId);
                });
            }

            if (carrinhoId) {
                // Adicionar o produto ao carrinho
                addProdutoAoCarrinho(carrinhoId);
            }

            function addProdutoAoCarrinho(carrinhoId) {
                const addProdutoSql = "INSERT INTO carrinho_produto (id_carrinho, id_produto, quantidade) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantidade = quantidade + VALUES(quantidade)";
                connection.query(addProdutoSql, [carrinhoId, id_produto, quantidade], (err) => {
                    if (err) {
                        connection.rollback(() => connection.release());
                        console.error("Erro ao adicionar o produto ao carrinho:", err);
                        return res.status(500).json({
                            message: "Erro ao adicionar o produto ao carrinho",
                            error: err
                        });
                    }

                    connection.commit((err) => {
                        if (err) {
                            connection.rollback(() => connection.release());
                            console.error("Erro ao confirmar a transação:", err);
                            return res.status(500).json({
                                message: "Erro ao confirmar a transação",
                                error: err
                            });
                        }

                        connection.release();
                        res.status(201).json({
                            message: "Produto adicionado ao carrinho com sucesso!"
                        });
                    });
                });
            }
        });
    });
});
});

app.post('/carrinho/remover', (req, res) => {
    const { id_user, id_produto, quantidade } = req.body;

    if (!id_user || !id_produto || quantidade == null) {
        return res.status(422).json({
            message: "ID do usuário, ID do produto e quantidade são obrigatórios"
        });
    }

    // Iniciar uma transação para garantir a integridade dos dados
    pool.getConnection((err, connection) => {
        if (err) {
            console.error("Erro ao conectar ao banco de dados:", err);
            return res.status(500).json({
                message: "Erro ao conectar ao banco de dados",
                error: err
            });
        }

        connection.beginTransaction((err) => {
            if (err) {
                connection.release();
                console.error("Erro ao iniciar a transação:", err);
                return res.status(500).json({
                    message: "Erro ao iniciar a transação",
                    error: err
                });
            }

            // Verificar se o carrinho existe para o usuário
            const checkCarrinhoSql = "SELECT id_carrinho FROM carrinho WHERE id_user = ? LIMIT 1";
            connection.query(checkCarrinhoSql, [id_user], (err, results) => {
                if (err) {
                    connection.rollback(() => connection.release());
                    console.error("Erro ao verificar o carrinho:", err);
                    return res.status(500).json({
                        message: "Erro ao verificar o carrinho",
                        error: err
                    });
                }

                if (results.length === 0) {
                    connection.rollback(() => connection.release());
                    return res.status(404).json({
                        message: "Carrinho não encontrado"
                    });
                }

                const carrinhoId = results[0].id_carrinho;

                // Remover ou ajustar a quantidade do produto no carrinho
                const removeProdutoSql = `
                    DELETE FROM carrinho_produto
                    WHERE id_carrinho = ? AND id_produto = ?;
                `;
                connection.query(removeProdutoSql, [carrinhoId, id_produto], (err) => {
                    if (err) {
                        connection.rollback(() => connection.release());
                        console.error("Erro ao remover o produto do carrinho:", err);
                        return res.status(500).json({
                            message: "Erro ao remover o produto do carrinho",
                            error: err
                        });
                    }

                    // Verificar se a quantidade do produto precisa ser ajustada
                    const checkQuantidadeSql = `
                        SELECT quantidade
                        FROM carrinho_produto
                        WHERE id_carrinho = ? AND id_produto = ?;
                    `;
                    connection.query(checkQuantidadeSql, [carrinhoId, id_produto], (err, results) => {
                        if (err) {
                            connection.rollback(() => connection.release());
                            console.error("Erro ao verificar a quantidade do produto:", err);
                            return res.status(500).json({
                                message: "Erro ao verificar a quantidade do produto",
                                error: err
                            });
                        }

                        if (results.length > 0) {
                            // Ajustar a quantidade se necessário
                            const produtoQuantidade = results[0].quantidade;
                            if (produtoQuantidade > quantidade) {
                                const updateQuantidadeSql = `
                                    UPDATE carrinho_produto
                                    SET quantidade = quantidade - ?
                                    WHERE id_carrinho = ? AND id_produto = ?;
                                `;
                                connection.query(updateQuantidadeSql, [quantidade, carrinhoId, id_produto], (err) => {
                                    if (err) {
                                        connection.rollback(() => connection.release());
                                        console.error("Erro ao ajustar a quantidade do produto:", err);
                                        return res.status(500).json({
                                            message: "Erro ao ajustar a quantidade do produto",
                                            error: err
                                        });
                                    }

                                    connection.commit((err) => {
                                        if (err) {
                                            connection.rollback(() => connection.release());
                                            console.error("Erro ao confirmar a transação:", err);
                                            return res.status(500).json({
                                                message: "Erro ao confirmar a transação",
                                                error: err
                                            });
                                        }

                                        connection.release();
                                        res.status(200).json({
                                            message: "Produto removido ou quantidade ajustada com sucesso!"
                                        });
                                    });
                                });
                            } else {
                                connection.commit((err) => {
                                    if (err) {
                                        connection.rollback(() => connection.release());
                                        console.error("Erro ao confirmar a transação:", err);
                                        return res.status(500).json({
                                            message: "Erro ao confirmar a transação",
                                            error: err
                                        });
                                    }

                                    connection.release();
                                    res.status(200).json({
                                        message: "Produto removido do carrinho com sucesso!"
                                    });
                                });
                            }
                        } else {
                            connection.commit((err) => {
                                if (err) {
                                    connection.rollback(() => connection.release());
                                    console.error("Erro ao confirmar a transação:", err);
                                    return res.status(500).json({
                                        message: "Erro ao confirmar a transação",
                                        error: err
                                    });
                                }

                                connection.release();
                                res.status(404).json({
                                    message: "Produto não encontrado no carrinho"
                                });
                            });
                        }
                    });
                });
            });
        });
    });
});


app.listen('5000')

