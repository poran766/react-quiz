/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import classes from "../styles/ProgressBar.module.css";
import Button from "./Button";
export default function ProgressBar({ prev, next, progress, result }) {
  const [tooltip, setTooltip] = useState();
  const tooltipRef = useRef();

  function toggleTooltip() {
    if (tooltip) {
      setTooltip(false);
      tooltipRef.current.style.display = "none";
    } else {
      setTooltip(true);
      tooltipRef.current.style.left = `calc(${progress}% - 65px)`;
      tooltipRef.current.style.display = "block";
    }
  }

  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton} onClick={prev}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={tooltipRef}>
          {progress}% Complete!
        </div>
        <div className={classes.rangeBody}>
          <div className={classes.progress} style={{ width: `${progress}%` }} onMouseOver={toggleTooltip} onMouseOut={toggleTooltip}></div>
        </div>
      </div>

      <Button className={classes.next} onClick={progress === 100 ? result : next}>
        <span>{progress === 100 ? "Submit Quiz" : "Next Question"} </span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
}
