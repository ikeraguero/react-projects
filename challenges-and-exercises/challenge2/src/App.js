import React from "react";
import { useState } from "react";
import "./index.css";

export default function App() {
  return <Counter />;
}

function Counter() {
  let [step, setStep] = useState(1);
  let [count, setCount] = useState(0);
  const now = new Date();
  const date = new Date(new Date(now).setDate(now.getDate() + count));

  function handlePreviousCount() {
    setCount((c) => c - step);
  }

  function handleNextCount() {
    setCount((c) => c + step);
  }

  function handleSlide(e) {
    setStep(Number(e.target.value));
  }

  function handleClick() {
    setCount(0);
    setStep(1);
  }

  return (
    <div className="counter">
      <div className="step">
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) => handleSlide(e)}
        />
        {step}
      </div>
      <div className="count">
        <button onClick={handlePreviousCount}>-</button>
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        ></input>
        <button onClick={handleNextCount}>+</button>
      </div>
      {`${count !== 0 ? Math.abs(count) : ""} ${
        count > 0
          ? "days from today is"
          : count === 0
          ? "Today is"
          : "days ago was"
      } ${date.toDateString()}`}
      {count !== 0 ? <button onClick={handleClick}>Reset</button> : ""}
    </div>
  );
}
