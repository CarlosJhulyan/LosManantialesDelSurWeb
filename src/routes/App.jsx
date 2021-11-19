import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Context } from "../Context";

import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import TypeServices from '../pages/TypeServices';
import RegisterPackage from '../pages/RegisterPackage';
import RegisterPayment from '../pages/RegisterPayment';
import Register from '../pages/Register';
import PackageTracking from '../pages/PackageTracking';
import UpdateCliente from '../pages/UpdateCliente';
import Passage from '../pages/Passage';

function App() {
  const { isAuth } = useContext(Context);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<TypeServices />} path="/servicio" />
        <Route element={<Dashboard />} path="/cliente" />
        <Route element={<RegisterPayment />} path="/cliente/registro-pago" />
        <Route element={<RegisterPackage />} path="/cliente/registro-paquete" />
        <Route element={<Register />} path="/cliente/registro" />
        <Route element={<PackageTracking />} path="/cliente/seguimiento-paquete" /> 
        {
          isAuth && <Route element={<UpdateCliente />} path="/cliente/actualizar-datos" />
        }
        <Route element={<Passage />} path="/cliente/compra-pasaje" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
