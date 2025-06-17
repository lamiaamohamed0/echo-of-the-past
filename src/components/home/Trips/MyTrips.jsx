import React, { useState } from "react";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { FaPlane } from "react-icons/fa"; // Import the flight icon
import { MdOutlineLabelImportant } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/Front_Handles";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ScrollTrigger from 'react-scroll-trigger';
import Heading from "../Products/Heading"; 
import cairo  from "../../../assets/images/cairo.avif"
import lux  from "../../../assets/images/luxor.webp"
import nile  from "../../../assets/images/nile.avif"
import dahab  from "../../../assets/images/dah.webp"

// Sample trips data
const tripsData = [
  {
    _id: "trip1011",
    title: "Explore Cairo",
    price: "400.00",
    duration: "7 Days",
    location: "Cairo, Egypt",
    badge: "Top Destination",
    description: "Visit the Great Pyramids, the Sphinx, and the famous Egyptian Museum.",
    img: cairo,
  },
  {
    _id: "trip1012",
    title: "Luxor Adventure",
    price: "850.00",
    duration: "10 Days",
    location: "Luxor, Egypt",
    badge: "Exclusive",
    description: "A journey to ancient temples, tombs, and the Valley of the Kings.",
    img: lux,
  },
  {
    _id: "trip1013",
    title: "Sailing the Nile",
    price: "950.00",
    duration: "7 Days",
    location: "Nile River, Egypt",
    badge: "Luxury",
    description: "Take a luxurious cruise down the Nile to experience Egypt's rich heritage.",
    img: nile,
  },
  {
    _id: "trip1014",
    title: "Dahab Beach Holiday",
    price: "600.00",
    duration: "5 Days",
    location: "Dahab, Egypt",
    description: "Enjoy the beautiful beaches, diving, and relaxation in Dahab.",
    img: dahab,
  },
];

const MyTrips = (props) => {
  const [isInView, setIsInView] = useState(false);
  const dispatch = useDispatch();

   

  const [wishListStatus, setWishListStatus] = useState({});

  // Handle trip detail navigation

  // Handle adding/removing trips to/from the wishlist
  const handleWishList = (id) => {
    setWishListStatus((prevState) => {
      const updatedStatus = { ...prevState };
      updatedStatus[id] = !updatedStatus[id];

      if (updatedStatus[id]) {
        toast.success("Added to Wish List", { style: { backgroundColor: '#46A29F', color: '#fff' } });
      } else {
        toast.info("Removed from Wish List", { style: { backgroundColor: '#E6C78A', color: '#333' } });
      }
      return updatedStatus;
    });
  };

  return (
    <div className="w-full pb-20 ">
      <div className="flex items-center justify-between px-6 lg:px-20">
        <Heading heading="Explore Your Egypt Trips" />
        <motion.a
        href="/shop"
         // Keep the navigate behavior on click
        className="text-xl font-medium text-[#46A29F] hover:underline transition-transform duration-300 transform hover:scale-110 flex items-center gap-2"
        whileHover={{ scale: 1.1 }}
      >
        See More <MdOutlineLabelImportant />
      </motion.a>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 lg:px-20">
        {tripsData.map((trip) => (
          <ScrollTrigger
            onEnter={() => setIsInView(true)}
            onExit={() => setIsInView(false)}
            key={trip._id}
          >
            <motion.div
              className="relative group border border-gray-200 rounded-2xl shadow-lg bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              initial={{
                opacity: 0,
                y: 200,
                rotate: 10,
              }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 200,
                rotate: isInView ? 0 : 60,
              }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-full h-64 group-hover:scale-105 transition-all duration-500">
                <img
                  src={trip.img}
                  alt={trip.title}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
                {trip.badge && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white text-sm px-2 py-1 rounded">
                    {trip.badge}
                  </div>
                )}
                <div className="absolute top-4 right-4 text-[#E6C78A] cursor-pointer">
                  {wishListStatus[trip._id] ? (
                    <BsSuitHeartFill
                      size={24}
                      className="text-red-500 opacity-80 hover:opacity-100 transition duration-200"
                      onClick={() => handleWishList(trip._id)}
                    />
                  ) : (
                    <BsSuitHeart
                      size={24}
                      className="opacity-80 hover:opacity-100 transition duration-200"
                      onClick={() => handleWishList(trip._id)}
                    />
                  )}
                </div>
              </div>

              <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{trip.title}</h2>
                  <p className="text-sm font-medium text-gray-600">${trip.price}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {trip.duration} - {trip.location}
                </p>
                <p className="text-sm text-gray-700">{trip.description}</p>

                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={() => dispatch(
                      addToCart({
                        _id: trip._id,
                        name: trip.title,
                        quantity: 1,
                        image: trip.img,
                        price: trip.price,
                        location: trip.location,
                      })
                    )}
                    className="px-4 py-2 text-white text-sm rounded-full hover:bg-primeColor-dark transition duration-300 flex items-center gap-2"
                    style={{ backgroundColor: '#46A29F' }}
                  >
                    Reserve It <FaPlane />
                  </button>
                 
                </div>
              </div>
            </motion.div>
          </ScrollTrigger>
        ))}
      </div>
    </div>
  );
};

export default MyTrips;
