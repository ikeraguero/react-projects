import { useQuiz } from "../context/QuizContext";
import Options from "./Options";

function Question() {
  const { curQuestion } = useQuiz();
  const { question: questionName } = curQuestion;

  return (
    <div>
      <h4>{questionName}</h4>
      <Options />
    </div>
  );
}

export default Question;
