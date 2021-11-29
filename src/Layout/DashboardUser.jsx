import React from "react";

import Header from "../components/Client/Header";
import Footer from "../components/Client/Footer";

const DashboardUser = ({ children, title, description }) => {
  return (
    <div className="dashboard-user">
      <Header />
      <div className="dashboard-user-window">
        <h2 className="dashboard-user-window__title">{title}</h2>
        <p>{description}</p>
        <div>
          {
            children
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DashboardUser;