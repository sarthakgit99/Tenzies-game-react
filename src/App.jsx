import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Die from "./Components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";
const App = () => {
  const [data, setData] = React.useState(allNewDice());
  const [tenzie, setTenzie] = React.useState(false);
  const [count,setCount]=React.useState(0);
  React.useEffect(() => {
    const allHeld = data.every((die) => die.isHeld);
    const first = data[0].value;
    const sameValue = data.every((die) => die.value === first);
    if (allHeld && sameValue) {
      setTenzie(true);
      console.log("you won congratulations !");
    }
  }, [data]);
  function genDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  function allNewDice() {
    const dice = [];
    for (let i = 0; i < 10; i++) {
      dice.push(genDice());
    }
    return dice;
  }
  function rollDice() {
    if (!tenzie) {
      setCount(count+1);
      setData((oldData) =>
        oldData.map((die) => {
          return die.isHeld ? die : genDice();
        })
      );
    }
    else{
      setCount(0);
      setTenzie(false);
      setData(allNewDice());
    }
  }
  function hold(id) {
    setData((oldData) =>
      oldData.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  const diceElement = data.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={() => hold(die.id)}
    />
  ));
  return (
    <main>
      {tenzie && <Confetti width={1500} height={500}/>}
      <h1 className="title">Tenzies</h1>
      <p className="info">
        Roll untill all dies are the same.Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="Dice-container">{diceElement}</div>
      <div className="info">Moves -  {count}</div>
      <button onClick={rollDice}>{tenzie ? "New Game" : "Roll"}</button>
    </main>
  );
};
export default App;
