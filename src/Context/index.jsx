import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => {
    return window.sessionStorage.getItem('token') ? true : false;
  });

  const [globalData, setglobalData] = useState(JSON.parse(sessionStorage.getItem('data')) ? JSON.parse(sessionStorage.getItem('data')) : {
    paquete: {},
    pasaje: {},
    destino: '',
    origen: '',
    total: 0.0,
    data: {}
  });

  useEffect(() => {
    sessionStorage.setItem('data', JSON.stringify(globalData));
  }, [ globalData ]);

  const value = {
    isAuth,
    globalData,
    signIn: () => {
      console.log('Entrar');
    },
    signUp: token => {
      window.sessionStorage.setItem('token', token);
      setIsAuth(window.sessionStorage.getItem('token') ? true : false);
    },
    signOut: () => {
      window.sessionStorage.removeItem('token');
      sessionStorage.removeItem('data');
      setIsAuth(window.sessionStorage.getItem('token') ? true : false);
    },
    setData: data => {
      setglobalData(data);
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