import React from "react";

import Header from "../components/Client/Header";
import Footer from "../components/Client/Footer";

const DashboardClient = ({ children, title, description }) => {
  return (
    <div className="dashboard-client">
      <Header />
      <div className="dashboard-client-window">
        <h2 className="dashboard-client-window__title">{title}</h2>
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

export default DashboardClient;