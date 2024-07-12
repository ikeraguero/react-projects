const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

//purple: #7950f2

export default function App() {
  let step = 1;
  return (
    <div className="steps">
      <div className="numbers">
        <div className={`number ${step >= 1 ? "active" : ""}`}>1</div>
        <div className={`number ${step >= 2 ? "active" : ""}`}>2</div>
        <div className={`number ${step >= 3 ? "active" : ""}`}>3</div>
      </div>
      <p className="message">{messages[step - 1]}</p>
      <div className="buttons">
        <button
          className="button"
          style={{ backgroundColor: "#7950f2", color: "#fff" }}
        >
          Previous
        </button>
        <button
          className="button"
          style={{ backgroundColor: "#7950f2", color: "#fff" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
