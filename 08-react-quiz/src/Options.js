function Options({ question, dispatch, hasAnswered }) {
  function handleAnswer(index) {
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
          }
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
