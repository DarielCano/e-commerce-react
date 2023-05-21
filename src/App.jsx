import { useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";

import { ToastContainer } from "react-toastify";
import Navbar from "./components/navBar/NavBar";
import ItemListContainer from "./components/itemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/itemDetailContainer/ItemDetailContainer";
import Cart from "./components/Cart/Cart";
import ShopContainer from "./components/ShopContainer/ShopContainer";
import Error404 from "./pages/Error404";

import { AuthContext } from "./context/AuthContext";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
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
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route
            path="/e-commerce-react/"
            element={
              <>
                <Navbar navBarBg={navBarBg} />
                <ItemListContainer />
              </>
            }
          />

          <Route
            path="/e-commerce-react/category/:cid"
            element={
              <>
                <Navbar navBarBg={navBarBg} />
                <ItemListContainer />
              </>
            }
          />

          <Route
            path="/e-commerce-react/detail/:pid"
            element={
              <>
                <Navbar navBarBg={navBarBg} />
                <ItemDetailContainer />
              </>
            }
          />
          <Route
            path="/e-commerce-react/cart"
            element={
              <>
                <Navbar navBarBg={navBarBg} />
                <Cart />
              </>
            }
          />
          <Route
            path="/e-commerce-react/my-shop/:shopId"
            element={
              <>
                <Navbar navBarBg={navBarBg} />
                <ShopContainer />
              </>
            }
          />
          <Route path="*" element={<Error404 />} />

          <Route path="/e-commerce-react/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
