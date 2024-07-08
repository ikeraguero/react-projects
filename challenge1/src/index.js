import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

function App() {
  return (
    <div className="card">
      <Avatar photo="./images/iker.jpg" />
      <Data />
    </div>
  );
}

function Avatar(props) {
  return (
    <div className="avatar">
      <img src={props.photo} alt="Avatar" />
    </div>
  );
}

function Data() {
  return (
    <div className="data">
      <h1>Iker Aguero Pires</h1>
      <span>
        Student and aspiring developer. When not coding, I enjoy listen to
        music, being with my friends and watch Formula 1 races.
      </span>
      <div className="skill-list">
        <Skill skill="HTML+CSS" color="Blue" emoji="💪" />
        <Skill skill="JavaScript" color="Yellow" emoji="💪" />
        <Skill skill="Linux" color="Orange" emoji="💪" />
      </div>
    </div>
  );
}

function Skill(props) {
  return (
    <div className="skill" style={{ backgroundColor: props.color }}>
      {props.skill} {props.emoji}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
