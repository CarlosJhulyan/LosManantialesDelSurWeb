import React from "react";

import Header from "../components/Client/Header";

const DashboardClient = ({ children }) => {
  return (
    <div className="dashboard-client">
      <Header />
      <div className="dashboard-client-window">
        {
          children
        }
      </div>
    </div>
  )
}

export default DashboardClient;