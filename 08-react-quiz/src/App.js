import { useEffect } from "react";
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
import { useQuiz } from "./context/QuizContext";

function App() {
  const { status, dispatch } = useQuiz();

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
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
          </>
        )}
        {status === "finish" && <FinishScreen />}
        <Footer>
          {status === "active" && <Timer />}
          {(status === "active" || status === "finish") && <NextButton />}
        </Footer>
      </Main>
    </div>
  );
}

export default App;
