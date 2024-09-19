import { useEffect, useReducer } from "react";

import Header from "./Header.js";
import Main from "../Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import Progress from "./Progress.js";
import NextButton from "./NextButton.js";
import FinishScreen from "./FinishScreen.js";
import Footer from "./Footer.js";
import Timer from "./Timer.js";
import "../index.css";

export default function App() {
  const SECS_PER_QUESTION = 40;
  const initalState = {
    status: "loading",
    questions: [],
    index: 0,
    points: 0,
    highscore: 0,
    secondsRemaining: 0,
    answer: null,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return { ...state, status: "ready", questions: action.payload };
      case "dataFailed":
        return { ...state, status: "failed", questions: [] };
      case "startQuiz":
        return {
          ...state,
          status: "active",
          secondsRemaining: state.questions.length * SECS_PER_QUESTION,
        };
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
          secondsRemaining: state.questions.length * SECS_PER_QUESTION,
          status: "active",
        };
      case "tick":
        console.log("tick");
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining - 1 === 0 ? "finished" : state.status,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initalState);
  const {
    status,
    questions,
    index,
    points,
    highscore,
    secondsRemaining,
    answer,
  } = state;
  const hasAnswered = answer !== null ? true : false;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

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
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              {hasAnswered && (
                <NextButton
                  dispatch={dispatch}
                  index={index}
                  questions={questions}
                />
              )}
            </Footer>
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
