function NextButton({ dispatch }) {
  function handleNextQuestion() {
    console.log("Teste");
    dispatch({ type: "nextQuestion" });
  }
  return (
    <div>
      <button className="btn btn-ui" onClick={() => handleNextQuestion()}>
        Next Question
      </button>
    </div>
  );
}

export default NextButton;
