function FinishScreen({ points, highscore }) {
  return (
    <>
      <p className="result">
        <span>You scored {points} points</span>
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
    </>
  );
}

export default FinishScreen;
