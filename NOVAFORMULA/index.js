const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(express.static("node_modules/bootstrap/dist"));

app.get("/", (req, res) => {
  res.render("home", {
    style: "home.css",
    about: "Home",
  });
});

app.get("/register", (req, res) => {
  res.render("register", {
    style: "register.css",
    about: "Register",
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    style: "login.css",
    about: "Login",
  });
});

// ############## FINALIZAR COMPRA #############
app.get("/finishbuy", (req, res) => {
  const sql = `SELECT
      Jogo.jogosNome,
      Jogo.jogosPrice AS PrecoJogo,
      MIN(ChavesJogos.chavesID) AS ChaveID
    FROM
      Jogo
    JOIN CarrinhoJogo ON Jogo.jogosID = CarrinhoJogo.jogoID
    JOIN Carrinho ON CarrinhoJogo.carrinhoID = Carrinho.carrinhoID
    JOIN ChavesJogos ON CarrinhoJogo.jogoID = ChavesJogos.jogosID
    JOIN Chaves ON ChavesJogos.chavesID = Chaves.chavesID
    WHERE
      Carrinho.carrinhoID = 1
    GROUP BY
      Jogo.jogosID, Jogo.jogosNome, Jogo.jogosPrice`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const jogo = data;
    res.render("finishbuy", {
      jogo: jogo,
      style: "finishbuy.css",
      about: "Finish",
    });
  });
});

// ################ carrinho ##############

app.get("/carrinho", (req, res) => {
  const carrinhoID = 1; // Substitua pelo carrinho desejado

  // Consulta para obter os jogos no carrinho com o total de preço
  const sqlJogos = `
    SELECT
      Carrinho.carrinhoID,
      Jogo.jogosNome,
      SUM(Jogo.jogosPrice) AS PrecoTotal
    FROM
      Jogo
      JOIN CarrinhoJogo ON Jogo.jogosID = CarrinhoJogo.jogoID
      JOIN Carrinho ON CarrinhoJogo.carrinhoID = Carrinho.carrinhoID
    WHERE
      Carrinho.carrinhoID = ${carrinhoID}
    GROUP BY
      Carrinho.carrinhoID, 
      Jogo.jogosNome
    WITH ROLLUP
    HAVING Carrinho.carrinhoID IS NOT NULL OR Jogo.jogosNome IS NOT NULL`;

  conn.query(sqlJogos, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Erro ao recuperar dados do carrinho.");
    }

    const carrinhoData = data;
    const total = carrinhoData.reduce((acc, jogo) => acc + jogo.PrecoTotal, 0);

    // Consulta para obter o jogo mais caro no carrinho específico
    const sqlMaxPrice = `
      SELECT
        Jogo.jogosID,
        Jogo.jogosNome,
        Jogo.jogosImg,
        Jogo.jogosPrice
      FROM
        Jogo
        JOIN CarrinhoJogo ON Jogo.jogosID = CarrinhoJogo.jogoID
        JOIN Carrinho ON CarrinhoJogo.carrinhoID = Carrinho.carrinhoID
      WHERE
        Carrinho.carrinhoID = ${carrinhoID}
      ORDER BY Jogo.jogosPrice DESC
      LIMIT 1
    `;

    conn.query(sqlMaxPrice, (errMax, dataMax) => {
      if (errMax) {
        console.log(errMax);
        return res.status(500).send("Erro ao recuperar dados do carrinho.");
      }

      const maxInfo = dataMax[0];

      // Consulta para obter o jogo mais barato no carrinho específico
      const sqlMinPrice = `
        SELECT
          Jogo.jogosID,
          Jogo.jogosNome,
          Jogo.jogosImg,
          Jogo.jogosPrice
        FROM
          Jogo
          JOIN CarrinhoJogo ON Jogo.jogosID = CarrinhoJogo.jogoID
          JOIN Carrinho ON CarrinhoJogo.carrinhoID = Carrinho.carrinhoID
        WHERE
          Carrinho.carrinhoID = ${carrinhoID}
        ORDER BY Jogo.jogosPrice ASC
        LIMIT 1
      `;

      conn.query(sqlMinPrice, (errMin, dataMin) => {
        if (errMin) {
          console.log(errMin);
          return res.status(500).send("Erro ao recuperar dados do carrinho.");
        }

        const minInfo = dataMin[0];

        res.render("carrinho", {
          carrinhoData: carrinhoData,
          total: total,
          maxInfo: maxInfo,
          minInfo: minInfo,
          style: "carrinho.css",
          about: "Carrinho",
        });
      });
    });
  });
});

//   ###############  CATALOGO  ###############

app.get("/catalog", (req, res) => {
  const sql = `SELECT jogosID, jogosNome , jogosPrice, jogosImg ,jogosPlataforma FROM Jogo `;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const jogo = data;

    res.render("catalog", {
      jogo: jogo,
      style: "catalog.css",
      about: "Catalog",
    });
  });
});

// ############### SELECT CATALOGO POR PLATAFORMA COM JOIN ###############

app.get("/catalog/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT jogosID, 
                  jogosNome, 
                  jogosPrice, 
                  jogosImg ,
                  jogosPlataforma 
                FROM Jogo 
                JOIN Plataforma 
                ON Jogo.jogosPlataforma = Plataforma.plataformaID 
                WHERE Plataforma.plataformaID = '${id}'`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    jogo = data;

    res.render("plataform", {
      jogos: jogo,
      style: "plataform.css",
    });
  });
});

//  ############### SELECT CATALOGO POR TIPO  ###############

app.get("/catalog/tipo/:tipo", (req, res) => {
  const tipo = req.params.tipo;

  const sql = `SELECT jogosID, jogosNome, jogosPrice, jogosImg, jogosPlataforma, jogosTipo FROM Jogo WHERE jogosTipo = '${tipo}'`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    jogo = data;

    res.render("type", {
      jogos: jogo,
      style: "type.css",
      about: "Game type",
    });
  });
});

// ############### SELECT CATALOGO POR CATEGORIA COM COUNT ###############

app.get("/catalog/category/:category", (req, res) => {
  const category = req.params.category;

  const sql = `
    SELECT 
      jogosID, 
      jogosNome, 
      jogosPrice, 
      jogosImg, 
      jogosPlataforma, 
      jogosTipo,
      COUNT(*) OVER () AS TotalJogos 
    FROM 
      Jogo 
    WHERE 
      jogosCategories = '${category}'`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const jogos = data;

    res.render("category", {
      jogos: jogos,
      totalJogos: jogos.length > 0 ? jogos[0].TotalJogos : 0,
      style: "category.css",
      about: "Category",
      categoryName: category,
    });
  });
});

//  ###############  SELECT CATALOGO POR DESENVOLVEDORA  ###############

app.get("/catalog/development/:desenvolvedora", (req, res) => {
  const desenvolvedora = req.params.desenvolvedora;
  console.log(desenvolvedora);
  const sql = `SELECT jogosID, 
                      jogosNome,  
                      jogosPrice, 
                      jogosImg, 
                      jogosPlataforma, 
                      jogosTipo 
                FROM Jogo 
                WHERE jogosDesenvolvedora = '${desenvolvedora}'`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const jogo = data;

    console.log(jogo);

    res.render("development", {
      jogos: jogo,
      style: "development.css",
      about: "Development",
    });
  });
});

// ############## SELECT CATALOGO POR PREÇO #################

app.get("/catalog/price/:price", (req, res) => {
  const price = req.params.price;

  const sql = `SELECT jogosID, 
                      jogosNome, 
                      jogosPrice, 
                      jogosImg, 
                      jogosPlataforma, 
                      jogosTipo 
               FROM Jogo 
               WHERE jogosPrice < ${price}`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const jogos = data;

    res.render("price", {
      jogos: jogos,
      style: "price.css",
      about: "Price",
    });
  });
});

// ##################### ROTA JOGO SEPARADO ######################

app.get("/game/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT jogosID, 
                      jogosNome, 
                      jogosPrice, 
                      jogosImg, 
                      jogosPlataforma, 
                      jogosTipo,
                      jogosNota, 
                      jogosDescricao,
                      jogosLancamento, 
                      jogosDesenvolvedora,
                      jogosCategories, 
                      jogosTrailer
               FROM Jogo 
               WHERE jogosID = '${id}'`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    if (data.length === 0) {
      // Não há correspondência para o ID fornecido
      res.status(404).send("Jogo não encontrado");
      return;
    }

    const jogo = data[0];

    res.render("game", {
      jogo: jogo,
      style: "game.css",
      about: "Game",
    });
  });
});

// ################### PERFIL DO USUÁRIO #############

app.get("/perfil/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT 
        u.userID,
        u.userName,
        u.userSurname,
        u.userEmail,
        u.userAddress,
        c.carrinhoID,
        cj.jogoID,
        j.jogosNome,
        j.jogosDesenvolvedora,
        j.jogosTipo,
        j.jogosCategories,
        j.jogosDescricao,
        j.jogosPrice,
        j.jogosImg
    FROM User u
    LEFT JOIN Carrinho c ON u.userID = c.carrinhoUser
    LEFT JOIN CarrinhoJogo cj ON c.carrinhoID = cj.carrinhoID
    LEFT JOIN Jogo j ON cj.jogoID = j.jogosID
    WHERE u.userID = ${id}`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const info = data;
    res.render("perfil", {
      style: "perfil.css",
      about: "Perfil",
      info: info,
    });
  });
});

// ##### INSERT USER #####
app.post("/user/register", (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const adress = req.body.adress;
  const email = req.body.email;
  const password = req.body.password;

  // Verificar se o usuário já existe
  const checkDuplicateSql = `SELECT COUNT(*) AS count FROM user WHERE userEmail = '${email}'`;

  conn.query(checkDuplicateSql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Erro interno do servidor");
    }

    const count = result[0].count;

    if (count === 0) {
      // O email não existe, então podemos inserir o novo usuário
      const insertSql = `INSERT INTO user (userName, userSurname, userAddress, userEmail, userPassword) VALUES ('${name}', '${surname}', '${adress}', '${email}', '${password}')`;

      conn.query(insertSql, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Erro interno do servidor");
        }

        console.log("Usuário inserido com sucesso");
        res.redirect("/");
      });
    } else {
      console.log("Usuário com este email já existe.");

      res.status(400).send("Usuário com este email já existe.");
    }
  });
});

// ##################### UPDATE SENHA GET USUÁRIO #########################

app.get("/update/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM User WHERE userID = ${id}`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const register = data[0];

    res.render("update", {
      register: register,
      style: "update.css",
      about: "Update User",
    });
  });
});

// ##################### UPDATE POST SENHA #########################

app.post("/user/update", (req, res) => {
  const id = req.body.userID; // Alterado de req.body.id para req.body.userID
  const password = req.body.password;

  const sql = `UPDATE User SET  userPassword = '${password}' WHERE userID = ${id}`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/");
    console.log("Senha Atualizada com sucesso!");
  });
});

// ###################### INSERT NO CARRINHO ####################
app.post("/insert/carrinho", (req, res) => {
  const id = req.body.id;
  const carrinhoID = 1; // Defina o carrinhoID conforme necessário

  const checkIfExistsSQL = `SELECT * FROM CarrinhoJogo WHERE carrinhoID = ? AND jogoID = ?`;
  const insertSQL = `INSERT INTO CarrinhoJogo (carrinhoID, jogoID) VALUES (1, '${id}')`;

  conn.query(checkIfExistsSQL, [carrinhoID, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Erro interno do servidor");
    }

    if (result.length === 0) {
      // O registro não existe, então podemos inserir
      conn.query(insertSQL, [carrinhoID, id], (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Erro ao inserir jogo no carrinho");
        }
        console.log("Jogo inserido com sucesso no carrinho");
        res.redirect("/catalog");
      });
    } else {
      console.log("O jogo já está no carrinho");
      res.redirect("/catalog");
    }
  });
});

//    ############### SEARCH #####################
app.post("/catalog/search", (req, res) => {
  const search = req.body.search;

  // Consulta SQL corrigida com a tabela e colunas especificadas
  const sql = `
    SELECT jogosID, 
            jogosNome, 
            jogosPrice, 
            jogosImg, 
            jogosPlataforma, 
            jogosTipo
    FROM Jogo
    WHERE jogosNome LIKE '%${search}%'
  `;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Erro na pesquisa.");
    }

    const resultadosPesquisa = data;

    // Renderize a página ou envie os resultados da pesquisa para o cliente
    res.render("search", {
      jogo: resultadosPesquisa,
      style: "search.css",
      about: "search",
    });
  });
});

//   ################### LIMPANDO CARRINHO COM DELETE ###############
app.post("/delete/carrinho", (req, res) => {
  const deleteSQL = `DELETE FROM CarrinhoJogo
  WHERE carrinhoID = 1`;

  conn.query(deleteSQL, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Erro ao excluir item do carrinho");
    }
    console.log("Jogo removido com sucesso do carrinho");
    res.redirect("/");
  });
});

// Rota GET para obter uma entrega específica por ID
app.get("/api/entrega/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM ENTREGA WHERE COD_ENTREGA = ?";

  conn.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (results.length === 0) {
      return res.status(404).send({ message: "Entrega não encontrada" });
    }

    res.json(results[0]);
  });
});

// conexão mysql
const conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "nodegameteste",
});

conn.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conectou ao MySQL");

    app.listen(3000, () => {
      console.log("App funcionando");
    });
  }
});

conn.on("error", (err) => {
  console.error("Erro de conexão com o MySQL:", err);
});
