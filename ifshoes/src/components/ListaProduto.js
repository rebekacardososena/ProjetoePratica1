import React from 'react';
import Produto from './Produtos';

const produtos = [
  {
    marca: 'Asics',
    modelo: 'Gel Quantum 180',
    genero: 'Masculino',
    codigo: '#TASICSGQM',
    preco: 739.90,
    parcela: 73.99,
  },
  {
    marca: 'Asics',
    modelo: 'Noosa Tri 15',
    genero: 'Masculino',
    codigo: '#TASICSNTM',
    preco: 899.90,
    parcela: 89.99,
  },
  // Adicione mais produtos aqui
];

const Produtos = () => {
  return (
    <div className="produtos">
      {produtos.map((produto, index) => (
        <Produto key={index} {...produto} />
      ))}
    </div>
  );
};

export default Produtos;