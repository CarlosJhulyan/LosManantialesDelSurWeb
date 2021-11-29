import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "antd";

import { Context } from "../../context";

import Logotipo from '../../logotipo-white.svg'

const Header = () => {
  const { isAuth, globalData } = useContext(Context);
  
  return (
    <header className="header-client">
      <div className="header-client__user">
        {
          isAuth && (
            <>
              <Avatar src="https://joeschmoe.io/api/v1/random" />
              <span> {globalData.data.nombres}</span>
            </>
          )
        }
      </div>
      <img className="header-client__logo" src={Logotipo} alt="Logotipo" />
      {
        isAuth ? 
        <Link className="header-client__setting" to="/cliente/actualizar">
          <i className="fa fa-cog" />
        </Link> : <span />
      }
    </header>
  )
}

export default Header;