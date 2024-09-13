import { useState } from "react";
import Options from "./Options";

function Question({ question }) {
  return (
    <>
      <h4>{question.question}</h4>
      <Options question={question} />
    </>
  );
}

export default Question;
