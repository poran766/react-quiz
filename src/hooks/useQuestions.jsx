import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useQuestions(videoID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function fetchQuestions() {
      //Database Related works here
      const db = getDatabase();
      const quizRef = ref(db, "quiz/" + videoID + "/questions");
      const quizQuery = query(quizRef, orderByKey());
      try {
        setError(false);
        setLoading(true);
        // Request firebase database
        const snapshot = await get(quizQuery);
        setLoading(false);
        // if (snapshot.exists()) {
        //   setQuestions((prevQuestions) => {
        //     return [...prevQuestions, ...Object.values(snapshot.val())];
        //   });
        // } else {
        //   setQuestions([]);
        // }
        if (snapshot.exists()) {
          setQuestions(Object.values(snapshot.val())); // Overwrites instead of appending
        } else {
          setQuestions([]); // Clears the state if no data
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    fetchQuestions();
  }, [videoID]);
  return {
    loading,
    error,
    questions,
  };
}
