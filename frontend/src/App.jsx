import "./App.css";
// Importamos los componentes necesarios de la librería react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Importamos los componentes que vamos a utilizar en cada ruta
import Home from "./components/Home";
import Game1 from "./components/rpsls";
import Game2 from "./components/tamagotchi";
import Records from "./components/Records";
// Creamos nuestro componente App
function App() {
  return (
    // Envolvemos todas nuestras rutas con BrowserRouter
    <BrowserRouter>
      {/* Indicamos nuestras rutas utilizando el componente Routes */}
      <Routes>
        {/* Definimos una ruta para la página principal, que muestra el 
componente Home */}
        <Route path="/" element={<Home />} />
        {/* Definimos una ruta para el juego 1, que muestra el componente 
Game1 */}
        <Route path="/rpsls" element={<Game1 />} />
        {/* Definimos una ruta para el juego 2, que muestra el componente 
Game2 */}
        <Route path="/tamagotchi" element={<Game2 />} />
        {}
        <Route path="/records" element={<Records />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
