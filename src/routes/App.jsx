import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Context } from "../context";

import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import TypeServices from '../pages/TypeServices';
import RegisterPackage from '../pages/RegisterPackage';
import RegisterPayment from '../pages/RegisterPayment';
import Client from '../pages/Client';
import PackageTracking from '../pages/PackageTracking';
import UpdateCliente from '../pages/UpdateCliente';
import Passage from '../pages/Passage';

function App() {
  //const { isAuth } = useContext(Context);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={Home} path="/" />
        <Route component={Client} path="/cliente/registro" />
        <Route component={Client} path="/cliente/actualizar" />
        <Route exact component={Dashboard} path="/cliente" />
        <Route component={RegisterPayment} path="/cliente/registro-pago" />
        <Route component={Passage} path="/cliente/compra-pasaje" />
        <Route component={RegisterPackage} path="/cliente/registro-paquete" />
        <Route component={UpdateCliente} path="/cliente/actualizar-datos" />
        <Route component={PackageTracking} path="/cliente/seguimiento-paquete" />
        <Route component={TypeServices} path="/servicio" />
        <Redirect to="/" from="*" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
