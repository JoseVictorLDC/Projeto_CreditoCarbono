import NavBar from "./components/NavBar/NavBar";
import TelaInicial from './components/TelaInicial/TelaInicial';
import Loja from './components/Loja/Loja';
import Doacao from './components/Doacao/Doacao';
import Comprador from './components/Comprador/Comprador';
import Vendedor from './components/Vendedor/Vendedor';

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
    case "/Comprador":
      component = <Comprador></Comprador>
      break;
    case "/Vendedor":
      component = <Vendedor></Vendedor>
      break;
  }

  return (
    <>
      <NavBar />
      {component}
    </>
  );
};

export default App;

