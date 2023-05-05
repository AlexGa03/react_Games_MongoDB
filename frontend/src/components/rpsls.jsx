import { useState, useEffect } from "react";
import OptionButton from "./OptionButton";
import useChoices from "../hooks/useChoices";
import { Link } from 'react-router-dom';
export default function Game() {
  const {
    userChoice,
    computerChoice,
    userMessage,
    computerMessage,
    result,
    disabled,
    handlePlay,
    reset,
    options,
  } = useChoices();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-800">
      <div className="rounded-lg p-8 bg-white">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl mb-4 text-center font-bold">
            Rock-Paper-Scissors-Lizard-Spock
          </h1>
          {options.map((option) => (
            <OptionButton
              key={option.id}
              option={option}
              handlePlay={handlePlay}
              disabled={disabled}
            />
          ))}
          {userChoice !== null && <p className="text-xl mt-4">{userMessage}</p>}
          {computerChoice !== null && (
            <p className="text-xl mt-4">{computerMessage}</p>
          )}
          {result !== null && (
            <div className="mt-8">
              {result === 0 && <p className="text-xl mt-4">Empate</p>}
              {result === 1 && (
                <p className="text-xl mt-4">
                  Has ganado con {options[userChoice]?.name} contra{" "}
                  {options[computerChoice]?.name}
                </p>
              )}
              {result === 2 && (
                <p className="text-xl mt-4">
                  Has perdido con {options[userChoice]?.name} contra{" "}
                  {options[computerChoice]?.name}
                </p>
              )}
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-black font-semibold rounded-md shadow-md mt-4 px-6 py-3"
                onClick={reset}
              >
                Jugar otra vez
              </button>
              
            </div>
          )}
        </div>
      </div>
      <Link to="/">
                <button className="mt-7 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
                  Volver
                </button>
              </Link>
    </div>
  );
}
