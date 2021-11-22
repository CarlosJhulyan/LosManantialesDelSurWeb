import React, { createContext, useState } from "react";

export const Context = createContext();

const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => {
    return window.sessionStorage.getItem('token') ? true : false;
  });

  const value = {
    isAuth,
    signIn: () => {
      console.log('Entrar');
    },
    signUp: token => {
      window.sessionStorage.setItem('token', token);
      setIsAuth(window.sessionStorage.getItem('token') ? true : false);
    },
    signOut: () => {
      window.sessionStorage.removeItem('token');
      setIsAuth(window.sessionStorage.getItem('token') ? true : false);
    }
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default {
  Provider,
  Consumer: Context.Consumer
}