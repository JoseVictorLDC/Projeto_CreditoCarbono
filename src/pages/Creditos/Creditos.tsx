import "./Creditos.css"
import React, { useContext } from 'react';
import { useState } from 'react';
import SaoPaulo1 from "../../components/Marketplaces/SaoPaulo/SaoPaulo1";
import SaoPaulo100 from "../../components/Marketplaces/SaoPaulo/SaoPaulo100";

type Props = {estado: string}
const Creditos = (props: Props) => {
    const [Creditos, setCreditos] = useState<string>(1);
    const Estado = props.estado

    var [clique, updateClique] = useState(false);

    function countClique() {
      updateClique(true);
    }
  
    if(Creditos != "" && clique == true) {
        if(Estado == "São Paulo (SP)" ) {
            if(Creditos == "1") {
                return (
                    <SaoPaulo1 estado={Estado} creditos={Creditos}></SaoPaulo1>
                )
            } else if(Creditos == "100") {
                return (
                    <SaoPaulo100 estado={Estado} creditos={Creditos}></SaoPaulo100>
                )
            }
        }
    }

    return (
        <>
            <div className="container d-flex align-items-center justify-content-center">
                <div className="cardVendedor">
                    <div className="card-body">
                        <h2 className='text-center mb-4'>Quantidade de créditos de carbono</h2>
                        <form>
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-md-12">
                                        <select
                                            value={Creditos}
                                            className="form-control"
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                                setCreditos(e.target.value)
                                            }
                                        >
                                            <option> </option>
                                            <option>1</option>
                                            <option>100</option>
                                            <option>1000</option>
                                            <option>10000</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <a onClick={countClique} className="button">OK</a>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Creditos;