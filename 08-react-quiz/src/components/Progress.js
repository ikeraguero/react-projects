function Progress({ questions, index, answer, maxPoints, points }) {
  return (
    <header className="progress">
      <progress
        max={questions.length}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {questions.length}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints} points
      </p>
    </header>
  );
}

export default Progress;
