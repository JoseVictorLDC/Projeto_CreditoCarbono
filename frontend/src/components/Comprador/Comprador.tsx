import Produtos from "../Produtos/Produtos";
import "./Comprador.css"

const Comprador = () => {
  return (
    <>
      <h1 className="centerLoja">Loja</h1>
      <div className="colunaGeral">
      <Produtos imagem="../../public/Imagem1.jpg" titulo="Estado" cidade1="cidade" cidade2="cidade" cidade3="cidade"/>
      <Produtos imagem="../../public/Imagem2.jpg" titulo="Estado" cidade1="cidade" cidade2="cidade" cidade3="cidade"/>
      <Produtos imagem="../../public/Imagem3.jpg" titulo="Estado" cidade1="cidade" cidade2="cidade" cidade3="cidade"/>
      <Produtos imagem="../../public/Imagem4.jpg" titulo="Estado" cidade1="cidade" cidade2="cidade" cidade3="cidade"/>

      <Produtos imagem="../../public/Imagem5.jpg" titulo="Estado" cidade1="cidade" cidade2="cidade" cidade3="cidade"/>
      <Produtos imagem="../../public/Imagem6.jpg" titulo="Estado" cidade1="cidade" cidade2="cidade" cidade3="cidade"/>
      <Produtos imagem="../../public/Imagem1.jpg" titulo="Estado" cidade1="cidade" cidade2="cidade" cidade3="cidade"/>
      <Produtos imagem="../../public/Imagem2.jpg" titulo="Estado" cidade1="cidade" cidade2="cidade" cidade3="cidade"/>

      <Produtos imagem="../../public/Imagem3.jpg" titulo="Estado" cidade1="cidade" cidade2="cidade" cidade3="cidade"/>
      <Produtos imagem="../../public/Imagem4.jpg" titulo="Estado" cidade1="cidade" cidade2="cidade" cidade3="cidade"/>
      <Produtos imagem="../../public/Imagem5.jpg" titulo="Estado" cidade1="cidade" cidade2="cidade" cidade3="cidade"/>
      <Produtos imagem="../../public/Imagem6.jpg" titulo="Estado" cidade1="cidade" cidade2="cidade" cidade3="cidade"/>
      </div>
    </>
  );
};

export default Comprador;