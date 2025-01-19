function Options({ options, dispatch, answer, correctOption, curPoints }) {
  const hasAnswered = answer != null;
  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            !hasAnswered ? "" : index === correctOption ? "correct" : "wrong"
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "answer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
