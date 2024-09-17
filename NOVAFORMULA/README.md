# Express-Handlebars-Nuuvem

Uma réplica do site Nuuvem utilizando Handlebars, MySQL, Node.js com Express, Bootstrap e CSS.

## Sumário

1. [Sobre o Projeto](#sobre-o-projeto)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Instalação](#instalação)
4. [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
5. [Execução do Projeto](#execução-do-projeto)
6. [Contribuição](#contribuição)
7. [Licença](#licença)

## Sobre o Projeto

O Nuuvem Replica é um projeto que visa reproduzir as principais funcionalidades do site Nuuvem, oferecendo uma plataforma responsiva de distribuição digital de jogos e softwares. Desenvolvido como parte de um projeto educacional, o objetivo é praticar o uso de tecnologias web modernas.
<br/>

**Atenção** : A home é estatica, porém todo o resto esta integrado

- **Design no figma** : https://www.figma.com/file/6FCSPhRwQr8E478csWZZ1M/Nuuvem?type=design&node-id=0%3A1&mode=design&t=d1EPEfpVgy2q3Hw4-1

## Tecnologias Utilizadas

- **Handlebars**: <br> Template engine que simplifica a geração de HTML. Ele permite a criação de templates reutilizáveis, facilitando a manipulação de dados dinâmicos e a renderização dinâmica de conteúdo em páginas da web.
- **MySQL**: <br> Sistema de gerenciamento de banco de dados relacional (RDBMS) amplamente utilizado. Ele fornece uma estrutura organizada para armazenar e recuperar dados de forma eficiente. No contexto do seu projeto, o MySQL é responsável por armazenar informações essenciais, como dados de usuários, produtos ou qualquer outra informação relevante para a aplicação.
- **Node.js e Express**: <br> Ambiente de execução JavaScript do lado do servidor que permite a construção de aplicativos web escaláveis. Express é um framework para Node.js que simplifica o processo de criação de aplicativos web e APIs. Juntos, Node.js e Express formam uma base sólida para a construção de servidores web eficientes e rápidos.
- **Bootstrap e CSS**: <br> **Bootstrap** é um framework de design front-end que facilita a criação de interfaces web responsivas e visualmente atraentes. Ele fornece uma coleção de estilos, componentes e scripts JavaScript prontos para uso. <br> **CSS** (Cascading Style Sheets) é uma linguagem de estilo que controla a apresentação visual de documentos HTML. <br> Ao combinar Bootstrap e CSS, é possivel garantir uma experiência única e agradável para os usuários.

## Instalação

Certifique-se de ter o Node.js e o MySQL instalados em sua máquina antes de prosseguir.

```bash
# Clone o repositório
git clone https://github.com/Tauan-dev/Express-Handlebars-Nuuvem.git

# Acesse o diretório do projeto
cd Express-Handlebars-Nuuvem

# Inicie o projeto

npm init -y

# Instale as dependências
npm install nodemon express, express-handlebars mysql bootstrap

```

## Configuração do Banco de Dados

Crie um banco de dados MySQL chamado nuuvem.
Importe o arquivo bd.sql para criar as tabelas necessárias.

Após os inserts e Updates no banco, insira um carrinho, onde no workbench :

```bash
INSERT INTO Carrinho (carrinhoID) VALUES (1);
```

## Execução do Projeto

```bash
npm start
```

Configure no package.json

```bash
 "scripts": {
    "start": "nodemon ./index.js start localhost 3000"
  },
```

## Inicie o servidor

Acesse o projeto em http://localhost:3000 no seu navegador.

## Possíveis Melhorias

- **Integração de Pagamento**: Adicionar uma funcionalidade de pagamento real utilizando serviços como PayPal ou Stripe.
- **Autenticação e Autorização**: Melhorar o sistema de autenticação, incluindo a integração de OAuth com redes sociais e a autorização de acesso baseado em papéis.
- **Otimização de Performance**: Analisar e otimizar o desempenho do site, especialmente em termos de carregamento de páginas e tempo de resposta do servidor.
- **Testes Automatizados**: Implementar uma suíte de testes automatizados para garantir a qualidade e a estabilidade do código.

## Contribuição

Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novas funcionalidades. Por favor, abra uma issue para discutir grandes mudanças antes de enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.
