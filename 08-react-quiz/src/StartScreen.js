function StartScreen({ dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the React quiz!</h2>
      <h3>Questions to test your react mastery!</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startQuiz" })}
      >
        Let's Start!
      </button>
    </div>
  );
}

export default StartScreen;
