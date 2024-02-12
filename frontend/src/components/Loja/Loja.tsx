import "./Loja.css"

const Loja = () => {
  return (
    <>
      <div className="center">
        <div className="coluna">
          <h1>Escolha uma das opções abaixo:</h1>

          <div className="linha">
            <a href="./Comprador" className="button">Comprador</a>
            <a href="./Vendedor" className="button">Vendedor</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loja;