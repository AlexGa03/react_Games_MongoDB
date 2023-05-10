import { useState, useEffect } from "react";

const getResult = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return 0;
  }
  if (options[userChoice].beats.includes(computerChoice)) {
    return 1;
  }
  return 2;
};

const options = [
  { id: 0, name: "Piedra", emoji: "👊", beats: [2, 3] },
  { id: 1, name: "Papel", emoji: "🖐️", beats: [0, 4] },
  { id: 2, name: "Tijeras", emoji: "✌️", beats: [1, 3] },
  { id: 3, name: "Lagarto", emoji: "🤏", beats: [1, 4] },
  { id: 4, name: "Spock", emoji: "🖖", beats: [2, 0] },
];

function useChoices() {
  const [name, setName] = useState("");
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [userMessage, setUserMessage] = useState(null);
  const [computerMessage, setComputerMessage] = useState(null);
  const [result, setResult] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);
  const [gameResult, setGameResult] = useState("");

  useEffect(() => {
    if (userChoice !== null) {
      setUserMessage(
        `Has elegido ${options[userChoice]?.emoji} - ${options[userChoice]?.name}`
      );
    }
  }, [userChoice]);

  useEffect(() => {
    if (userChoice !== null) {
      setComputerMessage(
        `El ordenador ha elegido ${options[computerChoice]?.emoji} - ${options[computerChoice]?.name}`
      );
    }
  }, [computerChoice]);

  const handlePlay = (userChoice) => {
    setUserChoice(userChoice);
    setDisabled(true);
    const randomChoice = Math.floor(Math.random() * 5);

    setTimeout(() => {
      setComputerChoice(randomChoice);
    }, 1500);

    setTimeout(() => {
      setResult(getResult(userChoice, randomChoice));
    }, 1500);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleSubmitName = (event) => {
    event.preventDefault();
    if (name) {
      setIsNameSubmitted(true);
    }
  };

  const reset = () => {
    setName("");
    setUserChoice(null);
    setComputerChoice(null);
    setUserMessage(null);
    setComputerMessage(null);
    setResult(null);
    setDisabled(false);
  };

  useEffect(() => {
    if (!result) {
      setIsNameSubmitted(false);
      setName("");
    }
  }, [result]);
  useEffect(() => {
    if (result !== null) {
      // Determinar el resultado del juego
      let gameOutcome;
      if (result === 0) {
        gameOutcome = "Empate";
      } else if (result === 1) {
        gameOutcome = "Ganó el jugador";
      } else {
        gameOutcome = "Ganó la computadora";
      }

      // Crear el objeto con la información del juego
      const gameInfo = {
        jugador: name,
        fecha: new Date().toISOString(),
        resultado: gameOutcome,
      };

      // Enviar la información a la API de Express
      fetch("http://localhost:3000/partidas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameInfo),
      })
        .then((response) => response.json())
        .then((data) => {
          // Manejar la respuesta de la API si es necesario
          console.log(data);
        })
        .catch((error) => {
          // Manejar los errores en caso de que la solicitud falle
          console.error("Error al enviar los datos del juego:", error);
        });

      // Guardar el resultado del juego en el estado
      setGameResult(gameOutcome);
    }
  }, [result]);
  return {
    name,
    userChoice,
    computerChoice,
    userMessage,
    computerMessage,
    result,
    disabled,
    isNameSubmitted,
    handlePlay,
    handleChangeName,
    handleSubmitName,
    reset,
    options,
    gameResult,
  };
}

export default useChoices;
