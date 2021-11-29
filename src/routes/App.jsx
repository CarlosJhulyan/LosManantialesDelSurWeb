import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Context } from "../context";

import Home from '../pages/Home';
import Dashboard from '../pages/Client/Dashboard';
import TypeServices from '../pages/Client/TypeServices';
import RegisterPackage from '../pages/Client/RegisterPackage';
import RegisterPayment from '../pages/Client/RegisterPayment';
import Client from '../pages/Client/Client';
import PackageTracking from '../pages/Client/PackageTracking';
import Passage from '../pages/Client/Passage';
import SignInClient from "../pages/Client/SignInClient";

import DashboardUser from '../pages/User/Dashboard';
import Clients from "../pages/User/Clients";

function App() {
  const { isAuth } = useContext(Context);

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
        <Route component={PackageTracking} path="/cliente/seguimiento-paquete" />
        <Route
         component={TypeServices} path="/servicio" />
        <Route component={SignInClient} path="/cliente/ingresar" />

        <Route exact component={DashboardUser} path="/usuario" />
        <Route component={Clients} path="/usuario/clientes" />

        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
