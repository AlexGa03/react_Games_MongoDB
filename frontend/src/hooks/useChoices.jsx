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
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [userMessage, setUserMessage] = useState(null);
  const [computerMessage, setComputerMessage] = useState(null);
  const [result, setResult] = useState(null);
  const [disabled, setDisabled] = useState(false);

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

  const reset = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setUserMessage(null);
    setComputerMessage(null);
    setResult(null);
    setDisabled(false);
  };

  return {
    userChoice,
    computerChoice,
    userMessage,
    computerMessage,
    result,
    disabled,
    handlePlay,
    reset,
    options
  };
}

export default useChoices;
