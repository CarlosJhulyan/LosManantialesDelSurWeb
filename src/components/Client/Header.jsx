import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context";

import Logotipo from '../../logotipo-white.svg'

const Header = () => {
  const { isAuth } = useContext(Context);
  
  return (
    <header className="header-client">
      <div className="header-client__user">
        {
          isAuth && (
            <>
              <i className="fa fa-user" />
              <span>Mariano Gomez Quispe</span>
            </>
          )
        }
      </div>
      <img className="header-client__logo" src={Logotipo} alt="Logotipo" />
      {
        isAuth ? 
        <Link className="header-client__setting" to="/cliente/actualizar-datos">
          <i className="fa fa-cog" />
        </Link> : <span />
      }
    </header>
  )
}

export default Header;