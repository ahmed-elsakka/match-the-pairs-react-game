import logo from "./logo.svg";
import "./App.css";
import Header from "./Header/Header";
import { useEffect, useState } from "react";
import { cardImages } from "./ImageData/ImageData";
import  Card  from "./Card/Card";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [fastestTime, setFastestTime] = useState(null);
  const [cards, setCards] = useState([]);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleChoice = (card) => {
    if(isRunning) {
      choiceOne ? setChoiceTwo(card): setChoiceOne(card);
    }
  };

  function reset() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  }

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}));

    setCards(shuffledCards);
  };

  useEffect(() => {
    shuffleCards();
  }, []);


  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          const updatedCards = prevCards.map((card) => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true};
            } else {
              return card;
            }
          });

          if(updatedCards.every((card) => card.matched)) {
            handleRestart();
          }

          return updatedCards;
        });
        
        reset();
      } else {
        setTimeout(() => reset(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleRestart = () => {
    if (isRunning) {
      setIsRunning(false);
      if (fastestTime === null || fastestTime > time) {
        setFastestTime(time);
      }
      setTime(0);
      shuffleCards();
    }
  };

  return (
    <div className="App">
      <Header
        handleRestart={handleRestart}
        handleStart={handleStart}
        time={time}
        fastestTime={fastestTime}
      />
      <div className="card-grid">
        {
          cards.map((card) => (
            <div key={card.id}>
              <Card 
                card={card}
                handleChoice={handleChoice}
                flipped={card === choiceOne || card === choiceTwo || card.matched}
                disabled={disabled}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
