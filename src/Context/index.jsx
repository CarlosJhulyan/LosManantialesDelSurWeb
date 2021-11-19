import React, { createContext, useState } from "react";

export const Context = createContext();

const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(true);

  const value = {
    isAuth,
    login: () => {
      console.log('Entrar');
    }, 
    register: () => {
      console.log('registrar');
    },
    logout: () => {
      console.log('salir');
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