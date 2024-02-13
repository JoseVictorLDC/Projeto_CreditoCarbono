import "./Produtos.css"

type Props = { imagem: string, titulo: string, cidade1: string, cidade2: string, cidade3: string }

const Produtos = (props: Props) => {
    return (
        <div className="boxProdutos">
            <div className="colunaProdutos">
                <img src={props.imagem} alt="imagem" className="imagemProdutos"></img>
                <br></br>
                <h2>{props.titulo}</h2>

                <div className="cidades">
                <h4>{props.cidade1}</h4>
                <h4>{props.cidade2}</h4>
                <h4>{props.cidade3}</h4>
                </div>
                <button className="buttonProdutos">Comprar</button>
            </div>
        </div>
    );

}

export default Produtos;