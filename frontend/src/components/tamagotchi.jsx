import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Tamagotchi.css";
import happy from "../assets/happy.jpg";
import normal from "../assets/normal.jpg";
import triste from "../assets/triste.jpg";
import dead from "../assets/dead.webp";
import playImg from "../assets/play.png";
import sleepImg from "../assets/sleep.png";
import feedImg from "../assets/feed.png";
function Tamagotchi() {
  const [name, setName] = useState("Tamagotchi");
  const [nameInput, setNameInput] = useState("");
  const [nameEditable, setNameEditable] = useState(true);
  const [age, setAge] = useState(0);
  const [hunger, setHunger] = useState(100);
  const [health, setHealth] = useState(100);
  const [happiness, setHappiness] = useState(100);
  const [energy, setEnergy] = useState(100);
  const [isDead, setIsDead] = useState(false);
  const [isAlive, setIsAlive] = useState(true);
  const [intervalId, setIntervalId] = useState(null);
  const [date, setDate] = useState("");
  const [canInteract, setCanInteract] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isDead) {
        console.log(age);
        
        setAge((age) => age + 1);
        setHealth((health) => Math.max(0, health - 5));
        setHappiness((happiness) => Math.max(0, happiness - 5));
        setHunger((hunger) => Math.max(0, hunger - 5));
        setEnergy((energy) => Math.max(0, energy - 5));
        
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, [isDead]);
  useEffect(()=>{
    if (age > 0 && date == "") {
      setDate(new Date().toLocaleString());
      console.log(date);
    }
    if (age >= 1) {
      setCanInteract(true);
    }
  },[age]);

  useEffect(() => {
    if (health === 0 || happiness === 0 || hunger === 0 || energy === 0) {
      console.log("dead");
      setNameEditable(false);
      handleDeath();
      console.log(isDead);
    }
  }, [health, happiness, hunger]);

  const handleChangeName = (event) => {
    setNameInput(event.target.value);
  };

  const handleSubmitName = (event) => {
    event.preventDefault();
    if (nameInput) {
      setName(nameInput);
      setNameInput("");
      setNameEditable(false);
    }
  };

  const handleEditName = () => {
    setNameEditable(true);
  };

  const handleResetName = () => {
    setName("Tamagotchi");
    setNameEditable(true);
  };
  const handleRestart = () => {
    setIsDead(false);
    setHunger(100);
    setHappiness(100);
    setEnergy(100);
    setHealth(100);
    setAge(0);
    setDate("");
  };
  const handleDeath = () => {
    clearInterval(intervalId);
    setIsDead(true);
     // Datos a enviar a la API
  const tamagotchiData = {
    fechaNacimiento: date,
    nombre: name,
    nivelHambre: hunger,
    nivelEnergia: energy,
    nivelFelicidad: happiness,
  };

  // Realizar la solicitud POST a la API
  fetch('http://localhost:3000/mascotas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tamagotchiData),
  })
    .then((response) => {
      // Manejar la respuesta de la API
      if (response.ok) {
        console.log('Datos del Tamagotchi enviados correctamente.');
      } else {
        console.log('Error al enviar los datos del Tamagotchi.');
      }
    })
    .catch((error) => {
      console.log('Error en la solicitud POST:', error);
    });
  };

  const feed = () => {
    if (canInteract) {
    setHealth((health) => Math.min(100, health + 5));
    setHunger((hunger) => Math.min(100, hunger + 20));
    setHappiness((happiness) => Math.min(100, happiness + 5));
    setEnergy((energy) => Math.min(100, energy + 5));
    }
  };
  const play = () => {
    if (canInteract) {
    setHappiness((happiness) => Math.min(100, happiness + 20));
    setHealth((health) => Math.min(100, health - 5));
    setHunger((hunger) => Math.min(100, hunger - 5));
    setEnergy((energy) => Math.max(0, energy - 20));
    }
  };
  const sleep = () => {
    if (canInteract) {
    setHappiness((happiness) => Math.min(100, happiness - 5));
    setHealth((health) => Math.min(100, health + 10));
    setHunger((hunger) => Math.min(100, hunger - 5));
    setEnergy((energy) => Math.min(100, energy + 10));
    }
  };
  const getBarColor = (value) => {
    if (value > 80) {
      return "green";
    } else if (value > 20) {
      return "yellow";
    } else {
      return "red";
    }
  };
  const getFaceStatus = (value) => {
    if (value > 80) {
      return happy;
    } else if (value > 20) {
      return normal;
    } else if (value > 0) {
      return triste;
    } else {
      return dead;
    }
  };
  const getLowestStatusValue = () => {
    return Math.min(health, happiness, hunger, energy);
  };
  
  return (
    <div className="main">
      <div className="screen">
        <h1 className="text-3xl font-bold mb-4">
          {nameEditable ? (
            <>
              <form
                onSubmit={handleSubmitName}
                className="flex justify-between items-center"
              >
                <input
                  type="text"
                  value={nameInput}
                  onChange={handleChangeName}
                  className="border border-gray-300 px-4 py-2 w-4/5 mr-2"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  OK
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="border border-gray-300 px-4 py-2">{name}</div>
              <button
                onClick={handleEditName}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Edit
              </button>
            </>
          )}
        </h1>
        <img className="state" src={getFaceStatus(getLowestStatusValue())}></img>
        <div className="stats">
          <p>Age: {age}</p>
          <p className="mt-4">Fecha de nacimiento: {date}</p>

          <p>Health:</p>
          <div
            className="progress-bar"
            style={{
              width: `${health}%`,
              backgroundColor: getBarColor(health),
            }}
          >
            {health}
          </div>

          <p>Happiness:</p>
          <div
            className="progress-bar"
            style={{
              width: `${happiness}%`,
              backgroundColor: getBarColor(happiness),
            }}
          >
            {happiness}
          </div>

          <p>Hunger:</p>
          <div
            className="progress-bar"
            style={{
              width: `${hunger}%`,
              backgroundColor: getBarColor(hunger),
            }}
          >
            {hunger}
          </div>

          <p>Energy:</p>
          <div
            className="progress-bar"
            style={{
              width: `${energy}%`,
              backgroundColor: getBarColor(energy),
            }}
          >
            {energy}
          </div>
        </div>
        {health === 0 || happiness === 0 || hunger === 0 || energy === 0 ? (
          <div>
            <p>Your Tamagotchi has died.</p>
          </div>
        ) : (
          
          <div>
            <div className="butts">
              <button className="btt" onClick={feed}>
                <img className="buttImg" src={feedImg}></img>
              </button>
              <button className="btt" onClick={play}>
                <img className="buttImg" src={playImg}></img>
              </button>
              <button className="btt" onClick={sleep}>
                <img className="buttImg" src={sleepImg}></img>
              </button>
            </div>
          </div>
        )}
        {isDead && (
          <button
            onClick={handleRestart}
            className="mt-7 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          >
            Restart
          </button>
        )}
      </div>
      <Link to="/">
        <button className="mt-7 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
          Volver
        </button>
      </Link>
    </div>
  );
}
export default Tamagotchi;
