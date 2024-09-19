import { useState } from "react";
import Options from "./Options";
import NextButton from "./NextButton";

function Question({ question, dispatch, answer }) {
  const hasAnswered = answer !== null ? true : false;
  return (
    <>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        hasAnswered={hasAnswered}
      />
      {hasAnswered && <NextButton dispatch={dispatch} />}
    </>
  );
}

export default Question;
