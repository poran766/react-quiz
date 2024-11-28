import { Link } from "react-router-dom";
import classes from "../styles/Account.module.css";

export default function Brand() {
  return (
    <div className={classes.account}>
      <span className="material-icons-outlined" title="Account">
        account_circle
      </span>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>

      {/* <span class="material-icons-outlined" title="Logout"> logout </span> */}
    </div>
  );
}
