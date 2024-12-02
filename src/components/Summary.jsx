/* eslint-disable react/prop-types */
import { useMemo } from "react";
import SuccessImage from "../assets/images/success.png";
import useFetch from "../hooks/useFetch";
import classes from "../styles/Summary.module.css";

export default function Summary({ score, noq }) {
  const getKeyword = useMemo(() => {
    if ((score / (noq * 5)) * 100 < 50) {
      return "failed";
    } else if ((score / (noq * 5)) * 100 < 75) {
      return "good";
    } else if ((score / (noq * 5)) * 100 < 100) {
      return "very good";
    } else {
      return "excellent";
    }
  }, [score, noq]);


  // Fetching data from Unsplash API with proper headers
  const { loading, error, result } = useFetch(`https://api.unsplash.com/search/photos?page=1&query=${getKeyword}&per_page=1`, "GET", {
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API}`,
    "Content-Type": "application/json",
  });

  // Logging the result to inspect the structure of the response
  console.log(result);

  // const image = result ? results?.photos[0].src.medium : SuccessImage;
  const image = result?.results?.[0]?.urls?.regular || SuccessImage;

  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        {/* progress bar will be placed here */}
        <p className={classes.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>
      {loading && <div className={classes.badge}>Loading your badge...</div>}

      {error && <div className={classes.badge}>An error occured!</div>}
      {!loading && !error && (
        <div className={classes.badge}>
          <img src={image} alt="Success Image" />
        </div>
      )}
    </div>
  );
}
