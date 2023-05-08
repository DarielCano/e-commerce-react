import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "../components/navBar/NavBar";
import { useState, useContext } from "react";

import ItemListContainer from "../components/itemListContainer/ItemListContainer";
import ItemDetailContainer from "../components/itemDetailContainer/ItemDetailContainer";
import Cart from "../components/Cart/Cart";
import ShopContainer from "../components/ShopContainer/ShopContainer";
import { AuthContext } from "../context/AuthContext";

import "../App.css";

function AppRoutes() {
  const { session } = useContext(AuthContext);
  const [navBarBg, setNavBarBg] = useState(false);

  const changeNavBackground = () => {
    if (window.scrollY >= 100) {
      setNavBarBg(true);
    } else {
      setNavBarBg(false);
    }
  };

  window.addEventListener("scroll", changeNavBackground);

  return (
    <div className="myApp">
      {session ? (
        <>
          <Navbar navBarBg={navBarBg} />
          <Routes>
            <Route path="Inicio" element={<ItemListContainer />} />
            <Route path="category/:cid" element={<ItemListContainer />} />
            <Route path="detail/:pid" element={<ItemDetailContainer />} />
            <Route path="cart" element={<Cart />} />
            <Route path="my-shop/:shopId" element={<ShopContainer />} />
          </Routes>
        </>
      ) : (
        <Navigate to="/e-commerce-react/" />
      )}
    </div>
  );
}

export default AppRoutes;
