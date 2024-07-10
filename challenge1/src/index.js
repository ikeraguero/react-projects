import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

const skills = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "#0000FF",
  },
  {
    skill: "JavaScript",
    level: "intermediate",
    color: "#FFFF00",
  },
  {
    skill: "Linux",
    level: "beginner",
    color: "#ffA500",
  },
];

function App() {
  return (
    <div className="card">
      <Avatar photo="./images/iker.jpg" />
      <div className="data">
        <Data />
        <SkillList />
      </div>
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
    <div>
      <h1>Iker Aguero Pires</h1>
      <span>
        Student and aspiring developer. When not coding, I enjoy listen to
        music, being with my friends and watch Formula 1 races.
      </span>
    </div>
  );
}

function Skill({ skillObj }) {
  return (
    <li className="skill" style={{ backgroundColor: skillObj.color }}>
      <span>{skillObj.skill}</span>
      <span>
        {skillObj.level === "beginner" && "👶"}
        {skillObj.level === "intermediate" && "👍"}
        {skillObj.level === "advanced" && "💪"}
      </span>
    </li>
  );
}

function SkillList() {
  return (
    <ul className="skill-list">
      {skills.map((skill) => (
        <Skill skillObj={skill} />
      ))}
    </ul>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
