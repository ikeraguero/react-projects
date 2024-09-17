import { useEffect, useReducer } from "react";

import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import "./index.css";

export default function App() {
  const initalState = {
    status: "loading",
    questions: [],
    index: 0,
    points: 0,
    answer: null,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        console.log("Ok");
        return { ...state, status: "ready", questions: action.payload };
      case "dataFailed":
        return { ...state, status: "failed", questions: [] };
      case "startQuiz":
        return { ...state, status: "active" };
      case "newAnswer":
        return {
          ...state,
          answer: action.payload,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initalState);
  const { status, questions, index, points, answer } = state;

  useEffect(function () {
    async function getData() {
      try {
        const res = await fetch("http://localhost:9000/questions");
        if (!res.ok) throw new Error();
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        console.log(err);
        dispatch({ type: "dataFailed", payload: null });
      }
    }
    getData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "failed" && <Error />}
        {status === "ready" && <StartScreen dispatch={dispatch} />}
        {status === "active" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}
