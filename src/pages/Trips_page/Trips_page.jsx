import React, { useEffect, useState } from "react";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { BiHotel } from "react-icons/bi";
import { MdOutlineLabelImportant, MdLocationOn } from "react-icons/md";
import { FaPlane } from "react-icons/fa";
import { IoMdAirplane } from "react-icons/io";
import { motion } from "framer-motion";
import ScrollTrigger from "react-scroll-trigger";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Front_Handles";
import axios from "axios";
import { toast } from "react-toastify";

import Heading from "../../components/home/Products/Heading";
import Badge from "../../components/home/Products/Badge";

const Trip = () => {
  const [isInView, setIsInView] = useState(false);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [wishListStatus, setWishListStatus] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/Trip/GetAllTrips")
      .then((response) => {
        console.log("Raw trips response:", response.data);
        // If your API returns { data: [...] } or { trips: [...] }, adjust here:
        const list = Array.isArray(response.data)
          ? response.data
          : response.data.trips ?? response.data.data ?? [];
        setTrips(list);
      })
      .catch((err) => {
        console.error("API error:", err);
        setError("Failed to load trips. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleWishList = (id) => {
    setWishListStatus((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      toast[next[id] ? "success" : "info"](
        next[id] ? "Added to Wish List" : "Removed from Wish List",
        {
          style: {
            backgroundColor: next[id] ? "#46A29F" : "#E6C78A",
            color: next[id] ? "#fff" : "#333",
          },
        }
      );
      return next;
    });
  };

  const handleProductDetails = (trip) => {
    const rootId = trip.title.toLowerCase().split(" ").join("");
    navigate(`/product/${rootId}`, { state: { item: trip } });
  };

  if (loading) {
    return (
      <div className="w-full text-center py-20">
        <p>Loading trips…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-20 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full pb-20">
      <div className="flex items-center justify-between px-6 lg:px-20 mb-6">
        <motion.div
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <IoMdAirplane className="text-3xl text-[#46A29F]" />
          <Heading
            heading="Find Your Next Adventure"
            className="text-3xl font-bold text-[#46A29F]"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 lg:px-20">
        {trips.map((trip) => (
          <ScrollTrigger
            onEnter={() => setIsInView(true)}
            onExit={() => setIsInView(false)}
            key={trip._id}
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
              {/* Image & Wishlist */}
              <div className="relative w-full h-64 overflow-hidden rounded-t-2xl group-hover:scale-105 transition-transform duration-500">
                <img
                  src={trip.img}
                  alt={trip.title}
                  className="w-full h-full object-cover"
                />
                {trip.badge && (
                  <Badge text={trip.badge} className="absolute top-4 left-4" />
                )}
                <div className="absolute top-4 right-4 cursor-pointer">
                  {wishListStatus[trip._id] ? (
                    <BsSuitHeartFill
                      size={24}
                      className="text-red-500 opacity-80 hover:opacity-100"
                      onClick={() => handleWishList(trip._id)}
                    />
                  ) : (
                    <BsSuitHeart
                      size={24}
                      className="opacity-80 hover:opacity-100"
                      onClick={() => handleWishList(trip._id)}
                    />
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{trip.title}</h2>
                  <p className="text-sm font-medium text-gray-600">
                    ${trip.price}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  {trip.duration} – {trip.location}
                </p>
                <p className="text-sm text-gray-700">{trip.description}</p>

                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() =>
                      dispatch(
                        addToCart({
                          _id: trip._id,
                          name: trip.title,
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
                  <button
                    onClick={() => handleProductDetails(trip)}
                    className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300"
                  >
                    Details <MdOutlineLabelImportant />
                  </button>
                </div>

                <div className="mt-4 space-y-1 text-sm text-gray-600">
                  <p>
                    <MdLocationOn className="inline mr-1" />
                    {trip.location}
                  </p>
                  <p>
                    <MdOutlineLabelImportant className="inline mr-1" />
                    {trip.duration}
                  </p>
                  <p>
                    <FaPlane className="inline mr-1" />
                    {trip.badge || "Standard"}
                  </p>
                </div>
              </div>
            </motion.div>
          </ScrollTrigger>
        ))}
      </div>
    </div>
  );
};

export default Trip;
