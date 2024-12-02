import { useLocation, useParams } from "react-router-dom"; // Replace useHistory with useLocation
import useAnswers from "../../hooks/useAnswers";
import Analysis from "../Analysis";
import Summary from "../Summary";
import _ from "lodash";

export default function Result() {
  const { id } = useParams();
  const location = useLocation(); // Use useLocation to get location
  const { state } = location; // Access 'state' from location
  const { qna } = state; // Access qna from state
  const { loading, error, answers } = useAnswers(id);
  // console.log(answers);

  function calculateScore() {
    let score = 0;
    answers.forEach((question, index1) => {
      let correctIndexes = [];
      let checkedIndexes = [];

      question.options.forEach((option, index2) => {
        if (option.correct) correctIndexes.push(index2);
        if (qna[index1].options[index2].checked) {
          checkedIndexes.push(index2);
          option.checked = true;
        }
      });
      if(_.isEqual(correctIndexes, checkedIndexes)){
        score = score + 5;
      }
    });
    return score;
  }

  const userScore = calculateScore();

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>An Error Occurred...</div>}
      {answers &&
        answers.length > 0 && ( // Fix condition here
          <>
            <Summary score = {userScore} noq = {answers.length} />
            <Analysis answers = {answers} />
          </>
        )}
    </>
  );
}
