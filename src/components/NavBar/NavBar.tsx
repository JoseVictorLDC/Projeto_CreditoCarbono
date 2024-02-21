import "./NavBar.css"
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ConnectWallet, lightTheme } from "@thirdweb-dev/react";

const NavBar = () => {

  return (
    <>
      <div className="linhaNav">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <a className="navbar-brand" href="/Home">Projeto_CreditoCarbono</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/TelaInicial">Tela inicial</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/SobreNos">Sobre Nós</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/FaleConosco">Fale Conosco</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Loja">Loja</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/ListaNFT">Liste seu NFT</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Doacao">Doação</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Perfil">Perfil</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="connectButton">
          <ConnectWallet
            theme={lightTheme({
              colors: {
                accentText: "#318c31",
                accentButtonBg: "#318c31",
              },
            })}
            btnTitle={"Sua carteira"}
            modalTitle={"Escolha sua carteira"}
            auth={{ loginOptional: false }}
            modalSize={"wide"}
            welcomeScreen={{
              subtitle:
                "Conecte sua carteira para interagir com a página",
              title: "Projeto_CreditoCarbono",
            }}
            modalTitleIconUrl={""}
            showThirdwebBranding={false}
          />
        </div>
      </div>
    </>
  );
};

export default NavBar;