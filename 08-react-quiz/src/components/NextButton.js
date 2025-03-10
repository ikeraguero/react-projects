import { useQuiz } from "../context/QuizContext";

function NextButton() {
  const { dispatch, answer, index, status } = useQuiz();
  if (answer === null && status !== "finish") return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({
          type: `${
            index < 14 && status === "active"
              ? "nextQuestion"
              : status === "finish"
              ? "restart"
              : "finish"
          }`,
        })
      }
    >
      {index < 14 && status === "active"
        ? "Next"
        : status === "finish"
        ? "Restart"
        : "Finish"}
    </button>
  );
}

export default NextButton;
