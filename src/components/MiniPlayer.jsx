/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import classes from "../styles/MiniPlayer.module.css";

export default function MiniPlayer({ title, id }) {
  const miniPlayerRef = useRef();
  const [status, setStatus] = useState(false);
  const videoURL = `https://www.youtube.com/watch?v=${id}`;

  function toggleMiniPlayer() {
    if (!status) {
      miniPlayerRef.current.classList.remove(classes.floatingBtn);

      setStatus(true);
    } else {
      miniPlayerRef.current.classList.add(classes.floatingBtn);

      setStatus(false);
    }
  }

  return (
    <div className={`${classes.miniPlayer} ${classes.floatingBtn}`} ref={miniPlayerRef} onClick={toggleMiniPlayer}>
      <span className={`material-icons-outlined ${classes.open}`}>
        {"  "}
        play_circle_filled{"  "}
      </span>
      <span className={`material-icons-outlined ${classes.close}`} onClick={toggleMiniPlayer}>
        {" "}
        close{" "}
      </span>
      {status && <ReactPlayer className={classes.player} url={videoURL} width="300px" height="168px" playing={status} controls />}
      <p>{title}</p>
    </div>
  );
}
