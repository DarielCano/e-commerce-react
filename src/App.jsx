import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import AppRoutes from "./route/AppRoutes";
import { ToastContainer } from "react-toastify";

import { AuthContext } from "./context/AuthContext";

import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Swal from "sweetalert2";

function App() {
  const { session, setSession } = useContext(AuthContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified == false) {
          setSession(false);
        } else {
          Swal.fire({
            title: `Bienvenido ${user?.displayName} `,
            text: " YA puede comprar con nosotros!!",
          });
        }
      } else {
        setSession(false);
      }
    });
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
