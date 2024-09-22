function NextButton({ dispatch, index, questions }) {
  function handleNextQuestion() {
    dispatch({ type: "nextQuestion" });
  }

  function handleFinish() {
    dispatch({ type: "finishQuiz" });
  }
  if (index < questions.length - 1) {
    return (
      <div>
        <button className="btn btn-ui" onClick={() => handleNextQuestion()}>
          Next
        </button>
      </div>
    );
  }
  if (index === questions.length - 1) {
    return (
      <div>
        <button className="btn btn-ui" onClick={() => handleFinish()}>
          Finish
        </button>
      </div>
    );
  }
}

export default NextButton;
