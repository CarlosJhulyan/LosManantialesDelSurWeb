import React, { useContext } from "react";

import { Context } from "../../context";

const Footer = () => {
  const { signOut, isAuth } = useContext(Context);

  return (
    <footer className="footer-client" style={{ display: "flex",justifyContent: "space-between", alignItems: "flex-end" }}>
      <small style={{ fontSize: 10, marginTop: 10 }}>&copy; 2021 <b>Los Manantiales Del Sur SRL</b> - Todos los derechos reservados</small>
      {
        isAuth && <i style={{ cursor: "pointer" }} className="fa fa-door-open" onClick={() => signOut()} />
      }
    </footer>
  )
}

export default Footer;