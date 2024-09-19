function FinishScreen({ points, maxPoints, highscore }) {
  const percentage = points / maxPoints;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} points (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">Highscore: {highscore} points</p>
    </>
  );
}

export default FinishScreen;
