import { TbUserOff } from "react-icons/tb";
import { useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

import CartWidget from "../CartWidget/CartWidget";
import logoStore from "../../assets/logo.png";

import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";

import "./Navbar.css";
import "../../stylesheet/gral-styles/site-styles.css";

function Navbar() {
  let menu = useRef();
  const nav = useRef();
  let navigate = useNavigate();
  const [click, setClick] = useState(false);

  /*   window.addEventListener("scroll", (e) => {
    if (document.documentElement.scrollTop > 100) {
      nav.current.classList.add("scrollBackground");
    }
  }); */

  const closeSesion = async () => {
    try {
      sessionStorage.setItem("user", false);
      const userClose = await signOut(auth);
      navigate("/e-commerce-react/");
    } catch {
      (error) => {
        console.log(error);
      };
    }
  };

  const closeMenu = (e) => {
    menu.current.classList.toggle("active");
  };
  const handleMenu = (e) => {
    menu.current.classList.toggle("active");
  };

  return (
    <div className="navbar" ref={nav}>
      <Link to="/e-commerce-react/Inicio" className="logo">
        <img src={logoStore} alt="logo store" />
      </Link>

      <div className="navBar_right">
        <nav>
          <ul className="navbar__links" ref={menu} onClick={closeMenu}>
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
        <div className="right-icons">
          <TbUserOff className="userOff-btn" onClick={closeSesion} />
          <AiOutlineMenu className="burguer-btn" onClick={handleMenu} />

          <Link className="shop-cart" to="/e-commerce-react/cart">
            <CartWidget />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
