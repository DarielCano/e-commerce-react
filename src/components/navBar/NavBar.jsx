import React from "react";
import "../../stylesheet/Navbar.css";
import CartWidget from "./CartWidget";
import logoStore from "../../assets/logo.png";

function Navbar({}) {
  return (
    <div className="navbar">
      <a href="#" className="logo">
        <img src={logoStore} alt="logo store" />
      </a>
      <div className="navBar_right">
        <nav>
          <ul className="navbar__links">
            <li>
              <a href="#">Camisas</a>
            </li>
            <li>
              <a href="#">Tenis</a>
            </li>
            <li>
              <a href="#">Bermudas</a>
            </li>
            <li>
              <a href="#">Sudaderas</a>
            </li>
          </ul>
        </nav>
        <CartWidget numProd={0} />
      </div>
    </div>
  );
}

export default Navbar;
