import React, { useState } from 'react';
import "./Doacao.css"

const Doacao = () => {
    const [valor, setValor] = useState('');
      
    return (
        <>
            <div className="container d-flex align-items-center justify-content-center">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4">Doação</h2>
                        <form>
                            {/* Seção Valor */}
                            <div className="mb-3">
                                <h4>Valor</h4>
                                <div className="row">
                                    <div className="col-md-12">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="valor"
                                            placeholder="Sepolia"
                                            value={valor}
                                            onChange={(e) => setValor(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>

                        <button className='buttonDoacao'>Enviar</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Doacao;