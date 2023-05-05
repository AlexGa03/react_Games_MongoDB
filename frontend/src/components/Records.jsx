import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Records() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [partidas, setPartidas] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const fetchPartidas = async () => {
    const response = await fetch('http://localhost:3000/partidas');
    const jsonData = await response.json();
    setPartidas(jsonData);
  };
  const fetchMascotas = async () => {
    const response = await fetch('http://localhost:3000/mascotas');
    const jsonData = await response.json();
    setMascotas(jsonData);
  };
  useEffect(() => {
    fetchMascotas();
  }, []);
  useEffect(() => {
    fetchPartidas();
  }, []);
    
  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-800">
      <div className="rounded-lg p-8 bg-white">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl mb-4 text-center font-bold">Registros</h1>
          <div className="flex justify-between">
            <button
              className={`btnRec text-xl font-bold ${
                selectedGame === "tamagotchi" ? "underline" : ""
              }`}
              onClick={() => handleGameClick("tamagotchi")}
            >
              Tamagotchi
            </button>
            <button
              className={`btnRec text-xl font-bold ${
                selectedGame === "rpsls" ? "underline" : ""
              }`}
              onClick={() => handleGameClick("rpsls")}
            >
              RPSLS
            </button>
          </div>
          {selectedGame === "tamagotchi" && (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Nivel de hambre</th>
                    <th>Nivel de energía</th>
                    <th>Nivel de felicidad</th>
                    <th>Fecha de nacimiento</th>
                  </tr>
                </thead>
                <tbody>
                  {mascotas.map((tamagotchi) => (
                    <tr key={tamagotchi._id}>
                      <td>{tamagotchi.nombre}</td>
                      <td>{tamagotchi.nivelHambre}</td>
                      <td>{tamagotchi.nivelEnergia}</td>
                      <td>{tamagotchi.nivelFelicidad}</td>
                      <td>{tamagotchi.fechaNacimiento}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedGame === "rpsls" && (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Jugador</th>
                    <th>Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  {partidas.map((partida) => (
                    <tr key={partida._id}>
                      <td>{partida.fecha}</td>
                      <td>{partida.jugador}</td>
                      <td>{partida.resultado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Link to="/">
        <button className="mt-5 left-0 mb-4 ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Volver
        </button>
      </Link>
    </div>
  );
}
export default Records;
