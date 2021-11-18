import React from "react";

import Header from "../components/Header";
import Carousel from "../components/Carousel";
import Contact from "../components/Contact";
import AboutUs from "../components/AboutUs";
import OurAgencies from "../components/OurAgencies";
import OurServices from "../components/OurServices";
import Access from "../components/Access";
import Access from "../pages/Dashboard";
import Access from "../pages/PackageTracking";
import Access from "../pages/Passage";
import Access from "../pages/Registration";
import Access from "../pages/RegistrationPackage";
import Access from "../pages/RegistrationPayment";
import Access from "../pages/TypeServices";
import Access from "../pages/UpdateCliente";


const Home = () => {
    return (
      <div>
        <Header />
        <Carousel />
        <Contact />
        <AboutUs />
        <OurAgencies />
        <OurServices />
        <Access />
      </div>
    )
}

export default Home;







