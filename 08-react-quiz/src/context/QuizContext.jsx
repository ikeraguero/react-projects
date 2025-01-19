import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();

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

export function QuizProvider({ children }) {
  const [
    { questions, status, index, points, answer, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const curQuestion = questions[index];
  const maxPossiblePoints = questions
    .map((question) => question.points)
    .reduce((acc, cur) => acc + cur, 0);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        points,
        answer,
        highscore,
        secondsRemaining,
        numQuestions,
        curQuestion,
        maxPossiblePoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  return useContext(QuizContext);
}
