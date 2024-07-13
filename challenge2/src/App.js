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

  function handlePreviousStep() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNextStep() {
    setStep((s) => s + 1);
  }

  function handlePreviousCount() {
    setCount((c) => c - step);
  }

  function handleNextCount() {
    setCount((c) => c + step);
  }

  return (
    <div className="counter">
      <div className="step">
        <button onClick={handlePreviousStep}>-</button>
        <div>Step: {step}</div>
        <button onClick={handleNextStep}>+</button>
      </div>
      <div className="count">
        <button onClick={handlePreviousCount}>-</button>
        <div>Count: {count}</div>
        <button onClick={handleNextCount}>+</button>
      </div>
      {`${count} days from now is ${date.toDateString()}`}
    </div>
  );
}
