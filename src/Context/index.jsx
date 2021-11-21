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
      setIsAuth(true);
    },
    signOut: () => {
      setIsAuth(false);
      window.sessionStorage.removeItem('token');
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