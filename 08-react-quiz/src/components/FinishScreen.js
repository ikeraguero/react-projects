import RestartButton from "./RestartButton";
function FinishScreen({ points, maxPoints, highscore, dispatch }) {
  const percentage = points / maxPoints;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} points (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <RestartButton dispatch={dispatch} />
    </>
  );
}

export default FinishScreen;
