import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";

import Login from "./components/Login/Login";
import AppRoutes from "./route/AppRoutes";

import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

import Swal from "sweetalert2";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [session, setSession] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified || user.emailVerified != null) {
          if (session == false) {
            const timer = setTimeout(() => {
              Swal.fire({
                title: `Bienvenid@ ${auth.currentUser.displayName}`,
                text: "Ya puede comenzar a comprar con nosotros",
              });
            }, 2000);
            setSession(true);
          }
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
            element={<AppRoutes login={session} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
