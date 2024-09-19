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
        return { ...state, status: "ready", questions: action.payload };
      case "dataFailed":
        return { ...state, status: "failed", questions: [] };
      case "startQuiz":
        return { ...state, status: "active" };
      case "newAnswer":
        console.log(
          action.payload === state.questions[state.index]["correctOption"]
        );
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === state.questions[state.index]["correctOption"]
              ? state.points + state.questions[state.index]["points"]
              : state.points,
        };
      case "nextQuestion":
        return { ...state, index: state.index + 1, answer: null };
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

  console.log(state);
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
