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


  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isDead) {
        setAge((age) => age + 1);
        setHealth((health) => Math.max(0, health - 5));
        setHappiness((happiness) => Math.max(0, happiness - 5));
        setHunger((hunger) => Math.max(0, hunger - 5));
        setEnergy((energy) => Math.max(0, energy - 5));
      }
    }, 3000);
    return () => clearInterval(intervalId);
  },[isDead]);
  useEffect(() => {
    if (health === 0 || happiness === 0 || hunger === 0 || energy === 0) {
      setNameEditable(false);
      handleDeath();
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
    setDiscipline(100);
    setAge(0);
  };
  const handleDeath = () => {
    clearInterval(intervalId);
    setIsDead(true);
  };

  const feed = () => {
    setHealth((health) => Math.min(100, health + 5));
    setHunger((hunger) => Math.min(100, hunger + 20));
    setHappiness((happiness) => Math.min(100, happiness + 5));
    setEnergy((energy) => Math.min(100, energy + 5));
  };
  const play = () => {
    setHappiness((happiness) => Math.min(100, happiness + 20));
    setHealth((health) => Math.min(100, health - 5));
    setHunger((hunger) => Math.min(100, hunger - 5));
    setEnergy((energy) => Math.max(0, energy - 20));
  };
  const sleep = () => {
    setHappiness((happiness) => Math.min(100, happiness - 5));
    setHealth((health) => Math.min(100, health + 10));
    setHunger((hunger) => Math.min(100, hunger - 5));
    setEnergy((energy) => Math.min(100, energy + 10));
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
        <img className="state" src={getFaceStatus(health)}></img>
        <div className="stats">
          <p>Age: {age}</p>
          <p>
            Health:
            <div
              className="progress-bar"
              style={{
                width: `${health}%`,
                backgroundColor: getBarColor(health),
              }}
            >
              {health}
            </div>
          </p>
          <p>
            Happiness:
            <div
              className="progress-bar"
              style={{
                width: `${happiness}%`,
                backgroundColor: getBarColor(happiness),
              }}
            >
              {happiness}
            </div>
          </p>
          <p>
            Hunger:
            <div
              className="progress-bar"
              style={{
                width: `${hunger}%`,
                backgroundColor: getBarColor(hunger),
              }}
            >
              {hunger}
            </div>
          </p>
          <p>
            Energy:
            <div
              className="progress-bar"
              style={{
                width: `${energy}%`,
                backgroundColor: getBarColor(energy),
              }}
            >
              {energy}
            </div>
          </p>
        </div>
        {health === 0 || happiness === 0 || hunger === 0 || energy === 0? (
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
            {isDead && <button onClick={handleRestart}>Restart</button>}
          </div>
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
