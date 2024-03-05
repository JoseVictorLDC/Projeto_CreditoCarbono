import React, { useState } from 'react';
import "./Vendedor.css"
import AuthProvider from '../AuthProvider/AuthProvider';
import "../../../firebaseConfig"; // Add this line prevent firebase not loading error
import { getFirestore, addDoc, collection } from "firebase/firestore";

const Vendedor: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [tamanhoTerreno, setTamanhoTerreno] = useState<string>('');
  const [estado, setEstado] = useState<string>('');
  const [cidade, setCidade] = useState<string>('');
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');

  const db = getFirestore();

  const saveDataToFirestore = async () => {
      const docRef = await addDoc(collection(db, "Credito de Carbono"), {
        EMAIL: email,
        TAMANHO: tamanhoTerreno,
        ESTADO: estado,
        CIDADE: cidade,
        LATITUDE: latitude,
        LONGITUDE: longitude,
      });
      alert("Informações salvas com sucesso!");

      setEmail('');
      setTamanhoTerreno('');
      setEstado('');
      setCidade('');
      setLatitude('');
      setLongitude('');
  };
  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="cardVendedor">
        <div className="card-body">
          <h2 className='text-center mb-4'>Vendedor</h2>
            <div className="mb-3">
              <label>Email</label>
              <div className="row">
                <div className="col-md-12">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label>Tamanho do Terreno</label>
              <div className="row">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tamanho do terreno"
                    value={tamanhoTerreno}
                    onChange={(e) => setTamanhoTerreno(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label>Estado</label>
              <div className="row">
                <div className="col-md-12">
                  <select
                    value={estado}
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

            <div className="mb-3">
              <label>Cidade</label>
              <div className="row">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label>Latitude</label>
              <div className="row">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label>Longitude</label>
              <div className="row">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <br></br>
            <button className='buttonVendedor' onClick={saveDataToFirestore}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default Vendedor;
