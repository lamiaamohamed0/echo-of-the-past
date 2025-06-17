import React, { useState } from "react";

import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import Cairo from "../../../assets/images/CairoHotel.jfif";
import lux from "../../../assets/images/lux.jpeg";
import elgouna from "../../../assets/images/elgouna.jpeg";
import dahab from "../../../assets/images/dahab.jpeg";
import nuwiba from "../../../assets/images/nwee.webp";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { motion } from "framer-motion";
import ScrollTrigger from "react-scroll-trigger";

const MyHotels= () => {
  const [isInView, setIsInView] = useState(false);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="w-full pb-16">
      <div className="flex items-center justify-between pt-5">
      <Heading heading="Hotels" /> </div>

      <ScrollTrigger
        onEnter={() => setIsInView(true)} // Trigger animation when section comes into view
        onExit={() => setIsInView(false)} // Trigger animation when section leaves view
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 200,
            rotate: 10, // Start with a slight rotation
          }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 200,
            rotate: isInView ? 0 : 10, // Reset rotation when in view
          }}
          transition={{ duration: 0.6 }}
        >
          <Slider {...settings}>
            <div className="px-2">
              <Product
                _id="100001"
                img={Cairo} // Correctly pass the image source
                productName="Cairo, Egypt"
                price="44.00"
                badge={true}
                des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
                 // Location icon passed here
              />
            </div>
            <div className="px-2">
              <Product
                _id="100002"
                img={lux} // Correctly pass the image source
                productName="Luxor, Egypt"
                price="250.00"
                badge={true}
                des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
                // Location icon passed here
              />
            </div>
            <div className="px-2">
              <Product
                _id="100003"
                img={elgouna} // Correctly pass the image source
                productName="El Gouna, Egypt"
                price="80.00"
                badge={true}
                des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
              // Location icon passed here
              />
            </div>
            <div className="px-2">
              <Product
                _id="100004"
                img={dahab} // Correctly pass the image source
                productName="Dahab, Egypt"
                price="60.00"
                badge={false}
                // Location icon passed here
              />
            </div>
            <div className="px-2">
              <Product
                _id="100005"
                img={nuwiba} // Correctly pass the image source
                productName="Nuweiba, Egypt"
                price="60.00"
                badge={false}
               // Location icon passed here
              />
            </div>
          </Slider>
        </motion.div>
      </ScrollTrigger>
    </div>
  );
};

export default MyHotels;
