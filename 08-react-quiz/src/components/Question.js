import Options from "./Options";

function Question({ question, dispatch, answer, curPoints }) {
  const {
    correctOption,
    id,
    options,
    points,
    question: questionName,
  } = question;

  return (
    <div>
      <h4>{questionName}</h4>
      <Options
        options={options}
        dispatch={dispatch}
        answer={answer}
        correctOption={correctOption}
        curPoints={curPoints}
      />
    </div>
  );
}

export default Question;
