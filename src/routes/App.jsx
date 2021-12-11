import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Context } from "../context";

import Home from '../pages/Home';
import Dashboard from '../pages/Client/Dashboard';
import RegisterPackage from '../pages/Client/RegisterPackage';
import RegisterPayment from '../pages/Client/RegisterPayment';
import Client from '../pages/Client/Client';
import PackageTracking from '../pages/Client/PackageTracking';
import Passage from '../pages/Client/Passage';
import SignIn from "../pages/SignIn";

import DashboardUser from '../pages/User/Dashboard';
import Clients from "../pages/User/Clients";
import Users from "../pages/User/Users";
import UpdateStatus from "../pages/User/UpdateStatus";
import Codes from "../pages/User/Codes";
import PricesPercent from "../pages/User/PricesPercent";
import Prices from "../pages/User/Prices";

function App() {
  const { isAuth, globalData } = useContext(Context);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={Home} path="/" />
        {
          !isAuth && <Redirect from="/cliente" to="/ingresar" />
        }
        {
          !isAuth && <Redirect from="/usuario" to="/ingresar" />
        }
        {
          isAuth && <Redirect from="/ingresar" to={`/${globalData.data.rol !== 'cliente' ? 'usuario' : 'cliente'}`} />
        }
        {
          isAuth && <Redirect from="/registro" to={`/${globalData.data.rol !== 'cliente' ? 'usuario' : 'cliente'}/actualizar`} />
        }
        {
          globalData.data.rol !== 'cliente' ? <Redirect from="/cliente" to="/usuario" /> : <Redirect from="/usuario" to="/cliente" />
        }
        <Route component={Client} path="/registro" />
        <Route component={Client} path="/cliente/actualizar" />
        <Route exact component={Dashboard} path="/cliente" />
        <Route component={RegisterPayment} path="/cliente/registro-pago" />
        <Route component={Passage} path="/cliente/compra-pasaje" />
        <Route component={RegisterPackage} path="/cliente/registro-paquete" />
        <Route component={PackageTracking} path="/cliente/seguimiento-paquete" />
        <Route component={SignIn} path="/ingresar" />

        <Route exact component={DashboardUser} path="/usuario" />
        <Route component={Clients} path="/usuario/clientes" />
        <Route component={Users} path="/usuario/usuarios" />
        <Route component={UpdateStatus} path="/usuario/estados" />
        <Route component={Codes} path="/usuario/codigos" />
        <Route component={PricesPercent} path="/usuario/tarifas" />
        <Route component={Prices} path="/usuario/precios" />
        <Route component={Client} path="/usuario/actualizar" />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
