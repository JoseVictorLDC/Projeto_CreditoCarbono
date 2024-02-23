import NavBar from "./components/NavBar/NavBar";
import TelaInicial from './pages/TelaInicial/TelaInicial';
import Loja from './components/Loja/Loja';
import Doacao from "./components/Doacao/Doacao"
import Vendedor from './components/Vendedor/Vendedor';
import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import ListaNFT from './components/ListaNFT/ListaNFT';
import NFTpagina from './components/NFT/NFTcards';
import Perfil from './components/Perfil/Perfil';
import SobreNos from './pages/SobreNos/SobreNos';
import FaleConosco from './pages/FaleConosco/FaleConosco';
import Estado from './pages/Estado/Estado';
import Creditos from './pages/Creditos/Creditos';
import MarketplaceAcre from './components/Marketplaces/SaoPaulo/SaoPaulo1';
import {
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
  rainbowWallet,
} from "@thirdweb-dev/react";

const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: '1f8d0de46336eb54eb510f411e8cddcb',
  chains: [sepolia],
  ssr: true,
});

const client = new QueryClient();

const App = () => {
  let component
  switch (window.location.pathname) {
    case "/":
      component = <TelaInicial></TelaInicial>
      break;
    case "/TelaInicial":
      component = <TelaInicial></TelaInicial>
      break;
    case "/Loja":
      component = <Loja></Loja>
      break;
    case "/Doacao":
      component = <Doacao></Doacao>
      break;
    case "/Vendedor":
      component = <Vendedor></Vendedor>
      break;
    case "/ListaNFT":
      component = <ListaNFT></ListaNFT>
      break;
    case "/NFTpagina":
      component = <NFTpagina></NFTpagina>
      break;
    case "/Perfil":
      component = <Perfil></Perfil>
      break;
    case "/SobreNos":
      component = <SobreNos></SobreNos>
      break;
    case "/FaleConosco":
      component = <FaleConosco></FaleConosco>
      break;
    case "/Estado":
      component = <Estado></Estado>
      break;
    case "/Creditos":
      component = <Creditos></Creditos>
      break;
    case "/MarketplaceAcre":
      component = <MarketplaceAcre></MarketplaceAcre>
      break;
  }
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThirdwebProvider
          ChainId={sepolia}
          supportedWallets={[
            metamaskWallet({ recommended: true }),
            coinbaseWallet({ recommended: true }),
            walletConnect({ recommended: true }),
            localWallet(),
            embeddedWallet({
              auth: {
                options: [
                  "email",
                  "google",
                  "apple",
                  "facebook",
                ],
              },
            }),
            rainbowWallet(),
          ]}
          authConfig={{
            authUrl: "/api/auth",
            domain: "https://example.com",
          }}>
          <NavBar />
          {component}
        </ThirdwebProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;