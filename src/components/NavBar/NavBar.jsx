import { NavLink } from "react-router-dom";
import './NavBar.css';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/movies">Movies</NavLink></li>
        <li><NavLink to="/tvs">TV series</NavLink></li>
      </ul>
    </nav>
  )
}

export default NavBar;
