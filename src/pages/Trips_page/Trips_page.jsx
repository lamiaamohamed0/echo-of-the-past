import React, { useEffect, useState } from "react";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { BiHotel } from "react-icons/bi";
import { MdOutlineLabelImportant, MdLocationOn } from "react-icons/md";
import { FaPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Front_Handles";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ScrollTrigger from "react-scroll-trigger";
import Heading from "../../components/home/Products/Heading";

const Trip = () => {
  const [isInView, setIsInView] = useState(false);
  const [Trips, setTrips] = useState([]);
  const [wishListStatus, setWishListStatus] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchTrips = async () => {
    try {
      const res = await fetch("http://echoesofthepast.runasp.net/api/Trip/GetAllTrips");
      const data = await res.json();
      setTrips(data.data || []);
    } catch (err) {
      console.error("Error fetching trips", err);
      toast.error("Failed to load trips");
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleWishList = (id) => {
    setWishListStatus((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      toast[updated[id] ? "success" : "info"](
        updated[id] ? "Added to Wish List" : "Removed from Wish List",
        {
          style: {
            backgroundColor: updated[id] ? "#46A29F" : "#E6C78A",
            color: updated[id] ? "#fff" : "#000",
          },
        }
      );
      return updated;
    });
  };

  return (
    <div className="w-full pb-20">
      <div className="flex items-center justify-between px-6 lg:px-20 mb-6">
        <motion.div className="flex items-center space-x-2">
          <Heading
            heading="Find Your Next Adventure"
            className="text-3xl font-bold text-[#46A29F]"
          />
        </motion.div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 lg:px-20">
        {Trips.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 text-lg">
            No trips available yet.
          </p>
        ) : (
          Trips.map((trip) => (
            <ScrollTrigger
              key={trip._id}
              onEnter={() => setIsInView(true)}
              onExit={() => setIsInView(false)}
            >
              <motion.div
                className="relative group border border-gray-200 rounded-2xl shadow-lg bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                initial={{ opacity: 0, y: 200, rotate: 10 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  y: isInView ? 0 : 200,
                  rotate: isInView ? 0 : 60,
                }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-full h-64 group-hover:scale-105 transition-all duration-500">
                  <img
                    src={
                      trip.img?.startsWith("http")
                        ? trip.img
                        : `http://echoesofthepast.runasp.net/Imgs/Trips/${trip.img}`
                    }
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
                        className="text-red-500"
                        onClick={() => handleWishList(trip._id)}
                      />
                    ) : (
                      <BsSuitHeart
                        size={24}
                        className="text-gray-500"
                        onClick={() => handleWishList(trip._id)}
                      />
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold">{trip.name}</h2>
                  <p className="text-sm text-gray-500">
                    {trip.duration} - {trip.location}
                  </p>
                  <p className="text-sm text-gray-700">{trip.description}</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">
                    ${trip.price}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={() =>
                        dispatch(
                          addToCart({
                            _id: trip._id,
                            name: trip.name,
                            quantity: 1,
                            image: trip.img,
                            price: trip.price,
                            badge: trip.badge,
                          })
                        )
                      }
                      className="px-6 py-2 text-white text-sm rounded-lg bg-[#46A29F] hover:bg-[#4CB2B8] transition duration-300 flex items-center gap-2"
                    >
                      Reserve It <BiHotel />
                    </button>
                  </div>

                  <div className="mt-4 text-sm text-gray-600 space-y-1">
                    <p>
                      <MdLocationOn className="inline mr-1" />
                      Location: {trip.location}
                    </p>
                    <p>
                      <MdOutlineLabelImportant className="inline mr-1" />
                      Duration: {trip.duration}
                    </p>
                    <p>
                      <FaPlane className="inline mr-1" />
                      Travel Type: {trip.badge || "Standard"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </ScrollTrigger>
          ))
        )}
      </div>
    </div>
  );
};

export default Trip;
