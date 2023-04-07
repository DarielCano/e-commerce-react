import React from "react";
import "../../stylesheet/Navbar.css";
import CartWidget from "./CartWidget";
import logoStore from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import "../../stylesheet/gral-styles/site-styles.css";

function Navbar({ numProd }) {
  return (
    <div className="navbar">
      <Link to="/e-commerce-react/" className="logo">
        <img src={logoStore} alt="logo store" />
      </Link>

      <div className="navBar_right">
        <nav>
          <ul className="navbar__links">
            <NavLink
              to={"/e-commerce-react/category/playeras"}
              className={({ isActive }) =>
                isActive ? "is-active enlace" : "enlace"
              }
            >
              Playeras
            </NavLink>
            <NavLink
              to={"/e-commerce-react/category/gorras"}
              className={({ isActive }) =>
                isActive ? "is-active enlace" : "enlace"
              }
            >
              Gorras
            </NavLink>
            <NavLink
              to={"/e-commerce-react/category/sudaderas"}
              className={({ isActive }) =>
                isActive ? "is-active enlace" : "enlace"
              }
            >
              Sudaderas
            </NavLink>
          </ul>
        </nav>
        <CartWidget numProd={numProd} />
      </div>
    </div>
  );
}

export default Navbar;
