import { useState } from "react";
import "./index.css";

function App() {
  const [bill, setBill] = useState(0);
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  return (
    <div className="App">
      <BillPrice bill={bill} setBill={setBill} />
      <ServiceTip setPercentage={setPercentage1} percentage={percentage1}>
        How did you like the service{" "}
      </ServiceTip>
      <ServiceTip setPercentage={setPercentage2} percentage={percentage2}>
        {" "}
        How did your friend like the service?{" "}
      </ServiceTip>
      {bill > 0 && (
        <>
          <PayTotal bill={bill} percentages={[percentage1, percentage2]} />
          <Reset
            setBill={setBill}
            setPercentages={[setPercentage1, setPercentage2]}
          />{" "}
          :
        </>
      )}
    </div>
  );
}

function BillPrice({ bill, setBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>
    </div>
  );
}

function ServiceTip({ setPercentage, percentage, children }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => setPercentage(Number(e.target.value))}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing (20%)</option>
      </select>
    </div>
  );
}

function PayTotal({ bill, percentages }) {
  const tip =
    percentages.reduce((curSum, a) => curSum + a, 0) / percentages.length;
  return (
    <h2>
      You pay ${bill + tip} (${bill} + ${tip})
    </h2>
  );
}

function Reset({ setBill, setPercentages }) {
  function handleReset() {
    setBill(0);
    setPercentages.forEach((percentage) => percentage(0));
  }
  return <button onClick={handleReset}>Reset</button>;
}

export default App;
