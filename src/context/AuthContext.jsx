import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext([]);

export function AuthContextProvider({ children }) {
  const [session, setSession] = useState(() => {
    let localSession = sessionStorage.getItem("session");
    if (localSession) {
      return (localSession = sessionStorage.getItem("session"));
    } else {
      return false;
    }
  });

  useEffect(() => {
    sessionStorage.setItem("session", session);
  }, [session]);
  return (
    <AuthContext.Provider value={{ setSession, session }}>
      {children}
    </AuthContext.Provider>
  );
}
