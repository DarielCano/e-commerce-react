import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "../components/navBar/NavBar";
import ItemListContainer from "../components/itemListContainer/ItemListContainer";
import ItemDetailContainer from "../components/itemDetailContainer/ItemDetailContainer";
import Cart from "../components/Cart/Cart";
import ShopContainer from "../components/ShopContainer/ShopContainer";

import "../App.css";

function AppRoutes({ login }) {
  return (
    <div className="myApp">
      {login ? (
        <>
          <Navbar />
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
