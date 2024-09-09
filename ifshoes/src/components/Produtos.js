import React from 'react';

const Produto = ({ marca, modelo, genero, codigo, preco, parcela }) => {
  return (
    <div className="produto">
      <h2>{marca} {modelo}</h2>
      <p>Gênero: {genero}</p>
      <p>Código: {codigo}</p>
      <p>Preço: R$ {preco}</p>
      <p>ou {parcela}x de R$ {parcela}</p>
      <p>FRETE GRÁTIS!</p>
    </div>
  );
};

export default Produto;