import { useEffect, useReducer } from "react";

import Header from "./components/Header.js";
import Main from "./Main.js";
import Loader from "./components/Loader.js";
import Error from "./components/Error.js";
import StartScreen from "./components/StartScreen.js";
import Question from "./components/Question.js";
import Progress from "./components/Progress.js";
import NextButton from "./components/NextButton.js";
import FinishScreen from "./components/FinishScreen.js";
import "./index.css";

export default function App() {
  const initalState = {
    status: "loading",
    questions: [],
    index: 0,
    points: 0,
    highscore: 0,
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
      case "finishQuiz":
        return {
          ...state,
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
          status: "finished",
        };
      case "restart":
        return {
          ...state,
          index: 0,
          points: 0,
          answer: null,
          status: "active",
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initalState);
  const { status, questions, index, points, highscore, answer } = state;
  const hasAnswered = answer !== null ? true : false;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  console.log(maxPoints);

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
          <>
            <Progress
              questions={questions}
              index={index}
              answer={answer}
              maxPoints={maxPoints}
              points={points}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              hasAnswered={hasAnswered}
            />
            {hasAnswered && (
              <NextButton
                dispatch={dispatch}
                index={index}
                questions={questions}
              />
            )}
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
