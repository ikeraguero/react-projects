import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import Error from "./components/Error";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, status: "loading" };
    case "ready":
      return { ...state, questions: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "error" };
    case "active":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "answer":
      const question = state.questions[state.index];
      const awardedPoints = question.points;
      return {
        ...state,
        hasAnswered: true,
        answer: action.payload,
        points: state.answer
          ? state.points
          : action.payload === question.correctOption
          ? state.points + awardedPoints
          : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        hasAnswered: false,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finish",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "tick":
      return { ...state, secondsRemaining: state.secondsRemaining - 1 };
    case "restart":
      return {
        ...initialState,
        status: "active",
        questions: state.questions,
        highscore: state.highscore,
      };
    default:
      throw new Error("Unknown action");
  }
}

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  points: 0,
  answer: null,
  highscore: 0,
  secondsRemaining: null,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    points,
    answer,
    highscore,
    secondsRemaining,
  } = state;
  const numQuestions = questions.length;
  const curQuestion = questions[index];
  const maxPossiblePoints = questions
    .map((question) => question.points)
    .reduce((acc, cur) => acc + cur, 0);

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "ready", payload: data }))
      .catch(dispatch({ type: "error" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              maxPossiblePoints={maxPossiblePoints}
              points={points}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              question={curQuestion}
              answer={answer}
              curPoints={points}
            />
          </>
        )}
        {status === "finish" && (
          <FinishScreen points={points} highscore={highscore} />
        )}
        <Footer>
          {status === "active" && (
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
          )}
          {(status === "active" || status === "finish") && (
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              status={status}
            />
          )}
        </Footer>
      </Main>
    </div>
  );
}

export default App;
