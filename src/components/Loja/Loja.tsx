import "./Loja.css"
import React from 'react';

const Loja = () => {
  return (
    <>
      <div className="center">
        <div className="coluna">
          <h1>Escolha uma das opções abaixo:</h1>

          <div className="linhaLoja">
            <a href="./Comprador" className="button">Comprador</a>
            <a href="./Vendedor" className="button">Vendedor</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loja;