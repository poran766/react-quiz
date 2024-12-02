import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useQuestions from "../../hooks/useQuestions";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";

const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "questions": {
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    }
    case "answer": {
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked = action.value;
      return questions;
    }
    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const { loading, error, questions } = useQuestions(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { videoTitle } = state;
  // console.log(videoTitle);

  const [qna, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   dispatch({
  //     type: "questions",
  //     value: questions,
  //   });
  // }, [questions]);

  useEffect(() => {
    if (questions.length > 0 && (!qna || questions.length !== qna.length)) {
      dispatch({
        type: "questions",
        value: questions,
      });
    }
  }, [questions, qna]);

  function handleAnswerChange(e, index) {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  //User clicks the next button for the next questions

  function nextQuestion() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
    }
  }
  //User clicks the previous button for the previous questions

  function prevQuestion() {
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  }

  //Calculate percentage value of progress bar

  const percentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  // Result function

  async function result() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);
    await set(resultRef, {
      [id]: qna,
    });
    navigate(`/result/${id}`, {
      state: { qna },
    });
  }

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>An Error Occured...</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>

          <Answers input options={qna[currentQuestion].options} handleChange={handleAnswerChange} />
          <ProgressBar next={nextQuestion} prev={prevQuestion} progress={percentage} result={result} />
          <MiniPlayer id={id} title={videoTitle} />
        </>
      )}
    </>
  );
}
