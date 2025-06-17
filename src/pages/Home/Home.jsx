import React from "react";
import MyTrips from "../../components/home/Trips/MyTrips";
import MyHotels from "../../components/home/myHotels/myHotels";
import EgyptAttractions from "../../components/home/Attraction/Attraction";
import ContactLink from "../../components/home/Contactlink/Contactlink";
import bg from "../../assets/images/bb.jfif";

const Home = () => {
  return (
    <>
      {/* Section without image */}
      <div className="w-full mx-auto bg-[#fdfaf4]"style={{
      position: 'relative'}}>
        <div className="max-w-container mx-auto px-4">
          <EgyptAttractions />
        </div>
      </div>

      {/* Section with background image */}
      <div
        className="w-full mx-auto"
        style={{
          position: "relative",
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${bg})`,
          backgroundPosition: "center",
          
          
        }}
      >
        <div className="max-w-container mx-auto px-4">
          <MyHotels/>
          <MyTrips />
          <ContactLink />
      
        </div>
      </div>
    </>
  );
};

export default Home;


