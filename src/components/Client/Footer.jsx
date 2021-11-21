import React, { useContext } from "react";

import { Context } from "../../context";

const Footer = () => {
  const { signOut } = useContext(Context);

  return (
    <footer className="footer-client">
      <i className="fa fa-door-open" onClick={() => signOut()} />
    </footer>
  )
}

export default Footer;