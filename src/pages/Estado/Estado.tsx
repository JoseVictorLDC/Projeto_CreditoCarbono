import "./Estado.css"
import React, { createContext } from 'react';
import { useState } from 'react';
import Creditos from "../Creditos/Creditos";

const Estado = () => {
  const [Estado, setEstado] = useState<string>('');

  var [clique, updateClique] = useState(false);

  function countClique() {
    updateClique(true);
  }

  if(Estado != "" && clique == true) {
    return (
        <Creditos estado={Estado}></Creditos>
    )
  }

  return (
    <>
        <div className="container d-flex align-items-center justify-content-center">
          <div className="cardVendedor">
            <div className="card-body">
              <h2 className='text-center mb-4'>Estado</h2>
              <form>
                <div className="mb-3">
                  <div className="row">
                    <div className="col-md-12">
                      <select
                        value={Estado}
                        className="form-control"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          setEstado(e.target.value)
                        }
                      >
                        <option></option>
                        <option>Acre (AC) </option>
                        <option>Alagoas (AL) </option>
                        <option>Amapá (AP) </option>
                        <option>Amazonas (AM) </option>
                        <option>Bahia (BA) </option>
                        <option>Ceará (CE) </option>
                        <option>Distrito Federal (DF) </option>
                        <option>Espírito Santo (ES) </option>
                        <option>Goiás (GO) </option>
                        <option>Maranhão (MA) </option>
                        <option>Mato Grosso (MT) </option>
                        <option>Mato Grosso do Sul (MS) </option>
                        <option>Minas Gerais (MG) </option>
                        <option>Pará (PA) </option>
                        <option>Paraíba (PB) </option>
                        <option>Paraná (PR) </option>
                        <option>Pernambuco (PE) </option>
                        <option>Piauí (PI) </option>
                        <option>Rio de Janeiro (RJ) </option>
                        <option>Rio Grande do Norte (RN) </option>
                        <option>Rio Grande do Sul (RS) </option>
                        <option>Rondônia (RO) </option>
                        <option>Roraima (RR) </option>
                        <option>Santa Catarina (SC) </option>
                        <option>São Paulo (SP) </option>
                        <option>Sergipe (SE) </option>
                        <option>Tocantins (TO) </option>
                      </select>
                    </div>
                  </div>
                </div>
                <br></br>
                <button onClick={countClique} className="button">OK</button>
              </form>
            </div>
          </div>
        </div>
    </>
  );
};

export default Estado;