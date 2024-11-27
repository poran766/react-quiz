

import Classes from "../styles/Question.module.css";
import Answers from "./Answers"

export default function Question() {
  return (
    <div className={Classes.question}>
      <div className={Classes.qtitle}>
        <span className="material-icons-outlined"> help_outline </span>
        Here goes the question from Learn with Sumit?
      </div>
<Answers />
    </div>
  );
}
