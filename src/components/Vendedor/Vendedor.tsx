import React, { useState } from 'react';
import "./Vendedor.css"
import AuthProvider from '../AuthProvider/AuthProvider';

const Vendedor: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [tamanhoTerreno, setTamanhoTerreno] = useState<string>('');
  const [estado, setEstado] = useState<string>('');
  const [cidade, setCidade] = useState<string>('');
  const [arquivos, setArquivos] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setArquivos(files);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode enviar os dados para onde quiser, como uma API
    console.log({ email, tamanhoTerreno, estado, cidade, arquivos });
    // Limpar o formulário após enviar
    setEmail('');
    setTamanhoTerreno('');
    setEstado('');
    setCidade('');
    setArquivos([]);
  };

  return (
    <AuthProvider>
      <div className="container d-flex align-items-center justify-content-center">
        <div className="cardVendedor">
          <div className="card-body">
            <h2 className='text-center mb-4'>Vendedor</h2>
            <form onSubmit={handleSubmit}>


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
                <label>Anexar Arquivos</label>
                <div className="row">
                  <div className="col-md-12">
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>

              <br></br>
              <button type="submit" className='buttonVendedor'>Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Vendedor;
