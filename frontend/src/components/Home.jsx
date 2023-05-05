import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">¡Bienvenido/a!</h2>
      <div className="flex space-x-4">
        <Link to="/rpsls">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Piedra papel tijeras
          </button>
        </Link>
        <Link to="/tamagotchi">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Tamagotchi
          </button>
        </Link>
      </div>
      <Link to="/records">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3">
            Records
          </button>
        </Link>
    </div>
  );
};

export default Home;
