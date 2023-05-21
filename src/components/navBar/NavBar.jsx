import { TbUserOff, TbUser } from "react-icons/tb";
import { useRef, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

import CartWidget from "../CartWidget/CartWidget";
import logoStore from "../../assets/logo.png";
import { AuthContext } from "../../context/AuthContext";

import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";

import "./Navbar.css";
import "../../stylesheet/gral-styles/site-styles.css";

function Navbar({ navBarBg }) {
  const { userLogin, setUserLogin } = useContext(AuthContext);

  let menu = useRef();
  const nav = useRef();
  const navigate = useNavigate();

  const sesionName = () => {
    const nameData = auth.currentUser.displayName.split(" ");

    return nameData[0];
  };
  const startSession = () => {
    setUserLogin(false);
    navigate("/e-commerce-react/login");
  };

  const closeSession = async () => {
    setUserLogin(false);
    navigate("/e-commerce-react/");
    try {
      const userClose = await signOut(auth);
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
    <div className={navBarBg ? "navbar navBackgroud " : "navbar"} ref={nav}>
      <Link to="/e-commerce-react/" className="logo">
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
          {userLogin == true ? (
            <div className="user-access" onClick={closeSession}>
              <p>{sesionName()}</p>
              <TbUserOff className="userOff-btn" />
            </div>
          ) : (
            <div className="user-access" onClick={startSession}>
              <p>Acceder</p>
              <TbUser className="userOff-btn" />
            </div>
          )}

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
