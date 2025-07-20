import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

function Navigation() {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  
  return (
    <header>
      <nav className={css.nav}>
        <NavLink to="/" className={buildLinkClass} end>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;