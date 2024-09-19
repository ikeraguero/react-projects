function Options({ question, dispatch, hasAnswered, answer }) {
  function handleAnswer(index) {
    if (hasAnswered) {
      return;
    }
    dispatch({ type: "newAnswer", payload: index });
  }
  return (
    <div className="options">
      {question.options.map((quest, i) => (
        <button
          key={i}
          className={`btn btn-option ${
            hasAnswered
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : " "
          } ${answer === i ? "answer" : ""}
          }`}
          onClick={() => handleAnswer(i)}
        >
          {quest}
        </button>
      ))}
    </div>
  );
}

export default Options;
