function StartScreen({ questions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{questions} questions to teste your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "active" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
