import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { ToastContainer } from "react-toastify";

import Login from "./components/Login/Login";
import AppRoutes from "./route/AppRoutes";
import { AuthContext } from "./context/AuthContext";

import { auth } from "./firebase/config";

import Swal from "sweetalert2";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const { session } = useContext(AuthContext);

  useEffect(() => {
    if (session) {
      setTimeout(() => {
        Swal.fire({
          title: `Bienvenid@ ${auth.currentUser.displayName || ""}`,
          text: "Ya puede comenzar a comprar con nosotros!!! ",
        });
      }, 1000);
    } else {
      <Navigate to="/e-commerce-react/" />;
    }
  }, [session]);

  return (
    <div className="myApp">
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route
            path="/e-commerce-react/"
            element={<Login session={session} />}
          />

          <Route
            path="/e-commerce-react/*"
            element={<AppRoutes session={session} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
