import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";

export const AuthContext = createContext([]);

export function AuthContextProvider({ children }) {
  const [userLogin, setUserLogin] = useState(() => {
    if (auth.currentUser !== null) return true;
    else return false;
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogin(true);
        if (user.emailVerified) {
          setTimeout(() => {
            Swal.fire({
              title: `Bienvenid@ ${user.displayName ?? " "} `,
              text: " YA puede comprar con nosotros!!",
            });
          }, 2000);
        }
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ userLogin, setUserLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
