function Options({ question }) {
  return (
    <div className="options">
      {question.options.map((question) => (
        <button className="btn btn-option">{question}</button>
      ))}
    </div>
  );
}

export default Options;
