import { useState } from "react";
import Options from "./Options";

function Question({ questions }) {
  const [question, setQuestion] = useState(0);
  const curQuestion = questions.at(question);
  return (
    <>
      <h4>{curQuestion.question}</h4>
      <Options question={curQuestion} />
    </>
  );
}

export default Question;
