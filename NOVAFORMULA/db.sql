CREATE DATABASE nodeGameTeste;
USE nodeGameTeste;

INSERT INTO Plataforma (plataformaNome) VALUES 
    ('PlayStation 4'),
    ('Xbox One'),
    ('PC'),
    ('Nintendo Switch');

-- Tabela Plataforma
CREATE TABLE Plataforma (
    plataformaID INT PRIMARY KEY AUTO_INCREMENT,
    plataformaNome VARCHAR(255) NOT NULL
);

-- Tabela User
CREATE TABLE User (
    userID INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(100) NOT NULL,
    userSurname VARCHAR(100) NOT NULL,
    userEmail VARCHAR(80) NOT NULL,
    userPassword VARCHAR(255) NOT NULL, -- Aumentado para 255 para bcrypt
    userAddress VARCHAR(255) NOT NULL,
    UNIQUE (userEmail)
);

-- Tabela Jogo
CREATE TABLE Jogo (
    jogosID INT PRIMARY KEY AUTO_INCREMENT,
    jogosNome VARCHAR(255) NOT NULL,
    jogosDescricao TEXT NOT NULL,
    jogosLancamento VARCHAR(100),
    jogosDesenvolvedora VARCHAR(255),
    jogosNota FLOAT,
    jogosTipo VARCHAR(100),
    jogosCategories VARCHAR(100),
    jogosPlataforma INT,
    jogosPrice INT,
    jogosImg VARCHAR(255),
    jogosTrailer VARCHAR(255),
    FOREIGN KEY (jogosPlataforma) REFERENCES Plataforma(plataformaID)
);

-- Tabela Pedidos
CREATE TABLE Pedidos (
    pedidosID INT PRIMARY KEY AUTO_INCREMENT,
    pedidosChaves INT UNIQUE,
    pedidosTransacao INT,
    pedidosUser INT,
    FOREIGN KEY (pedidosUser) REFERENCES User(userID)
);

-- Tabela Carrinho
CREATE TABLE Carrinho (
    carrinhoID INT PRIMARY KEY AUTO_INCREMENT,
    carrinhoValor FLOAT,
    carrinhoUser INT,
    FOREIGN KEY (carrinhoUser) REFERENCES User(userID)
);

-- Tabela CarrinhoJogo
CREATE TABLE CarrinhoJogo (
    carrinhoID INT,
    jogoID INT,
    PRIMARY KEY (carrinhoID, jogoID),
    FOREIGN KEY (carrinhoID) REFERENCES Carrinho(carrinhoID),
    FOREIGN KEY (jogoID) REFERENCES Jogo(jogosID)
);

-- Tabela Transacao
CREATE TABLE Transacao (
    transacaoID INT PRIMARY KEY AUTO_INCREMENT,
    transacaoData DATE,
    transacaoValor FLOAT,
    transacaoStatus VARCHAR(255),
    transacaoCarrinho INT,
    transacaoPedido INT,
    FOREIGN KEY (transacaoCarrinho) REFERENCES Carrinho(carrinhoID),
    FOREIGN KEY (transacaoPedido) REFERENCES Pedidos(pedidosID)
);

-- Tabela Chaves
CREATE TABLE Chaves (
    chavesID BIGINT PRIMARY KEY
);

-- Tabela ChavesJogos
CREATE TABLE ChavesJogos (
    chavesID BIGINT,
    jogosID INT,
    PRIMARY KEY (chavesID, jogosID),
    FOREIGN KEY (chavesID) REFERENCES Chaves(chavesID),
    FOREIGN KEY (jogosID) REFERENCES Jogo(jogosID)
);

-- Tabela ListaDesejos
CREATE TABLE ListaDesejos (
    desejoID INT PRIMARY KEY AUTO_INCREMENT,
    desejoJogos INT,
    FOREIGN KEY (desejoJogos) REFERENCES Jogo(jogosID)
);
