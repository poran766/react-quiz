import logo from "../assets/images/logo-bg.png";
import Account from "./Account";
// import classes from "./styles/Nav.module.css";
import classes from '../styles/Nav.module.css'
export default function Nav() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <a href="index.html" className={classes.brand}>
            <img src={logo} alt="Quiz App" />
            <h3>Quiz App</h3>
          </a>
        </li>
      </ul>
      <Account />
    </nav>
  );
}
