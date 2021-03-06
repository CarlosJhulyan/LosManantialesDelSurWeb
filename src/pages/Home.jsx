import React from "react";

import Header from "../components/Header";
import Carousel from "../components/Carousel";
import Contact from "../components/Contact";
import AboutUs from "../components/AboutUs";
import OurAgencies from "../components/OurAgencies";
import OurServices from "../components/OurServices";
import Access from "../components/Access";
import Footer from "../components/Footer";


const Home = () => {
    return (
      <div>
        <Header />
        <Carousel />
        <Contact />
        <AboutUs />
        <OurAgencies />
        <Access />
        <OurServices />
        <Footer />
      </div>
    )
}

export default Home;







