import React, {useEffect, useState } from "react";
import axios from "axios";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { BiHotel } from "react-icons/bi";
import { MdOutlineLabelImportant } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Front_Handles";
import { motion } from "framer-motion";
import ScrollTrigger from 'react-scroll-trigger';
import { MdLocationOn } from "react-icons/md"; 
import { useNavigate } from "react-router-dom";
import Heading from "../../components/home/Products/Heading";
import Badge from "../../components/home/Products/Badge";
import Cairo from "../../assets/images/CairoHotel.jfif";
import lux from "../../assets/images/lux.jpeg";
import elgouna from "../../assets/images/elgouna.jpeg";
import dahab from "../../assets/images/dahab.jpeg";
import nuwiba from "../../assets/images/nwee.webp";
import { toast } from 'react-toastify';

const About = () => {
  const dispatch = useDispatch();
  const [isInView, setIsInView] = useState(false);
  const [wishList, setWishList] = useState([]); // stores the list of wishlisted items
  const navigate = useNavigate();

  const handleProductDetails = (product) => {
    const rootId = String(product.productName).toLowerCase().split(" ").join("");
    navigate(`/product/${rootId}`, { state: { item: product } });
  };
const [Hotels, setHotels] = useState([]);
  useEffect(() => {
    axios.get("http://echoesofthepast.runasp.net//api/Hotel/GetAllHotel")
      .then((response) => {
        setHotels(response.data.data.result);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  }, []);
  const handleWishList = (product) => {
    // Check if the item is already wishlisted
    if (wishList.some(item => item._id === product._id)) {
      // If already in wish list, remove from list and show removed toast
      setWishList(wishList.filter(item => item._id !== product._id));
      toast.info("Removed from Wish List", { 
        style: { backgroundColor: '#E6C78A', color: '#333' }
      });
    } else {
      // Add to wish list and show added toast
      setWishList([...wishList, product]);
      toast.success("Added to Wish List", { 
        style: { backgroundColor: '#46A29F', color: '#fff' }
      });
    }
  };

  return (
    <div className="w-full pb-16 px-4 lg:px-8">
      <div className="flex items-center justify-between pt-5 px-4 md:px-8">
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <BiHotel className="text-3xl mb-6 text-[#46A29F] transition duration-300 ease-in-out transform hover:text-dark" />
          <Heading 
            heading="Explore Our Exclusive Hotels" 
            className="text-3xl font-bold text-[#46A29F] transition duration-300 ease-in-out transform hover:text-dark"
          />
        </motion.div>
      </div>

      <ScrollTrigger onEnter={() => setIsInView(true)} onExit={() => setIsInView(false)} >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >

        { Hotels.map((hotel) => (
            <motion.div
              key={hotel._id}
              className="relative group border border-gray-200 rounded-2xl shadow-lg bg-white transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              {/* Hotel Image and Wishlist Icon */}
              <div className="relative w-full h-64 overflow-hidden rounded-t-2xl group-hover:scale-105 transition-transform duration-300">
                <img className="w-full h-full object-cover" src={hotel.img} alt={hotel.productName} />
                {hotel.badge && (
                  <div className="absolute top-4 left-4">
                    <Badge text="Featured" />
                  </div>
                )}
                <div className="absolute top-4 right-4 text-[#E6C78A] cursor-pointer">
                  {wishList.some(item => item._id === hotel._id) ? (
                    <BsSuitHeartFill
                      size={24}
                      className="text-red-500 opacity-80 hover:opacity-100 transition duration-200"
                      onClick={() => handleWishList(hotel)}
                    />
                  ) : (
                    <BsSuitHeart
                      size={24}
                      className="opacity-80 hover:opacity-100 transition duration-200"
                      onClick={() => handleWishList(hotel)}
                    />
                  )}
                </div>
              </div>

              {/* Hotel Details & Actions */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MdLocationOn size={20} className="text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-[#46A29F] transition-colors duration-300">
                    {hotel.productName}
                  </h2>
                </div>
                <p className="text-sm text-gray-600 mb-4">Price: <span className="font-semibold">{hotel.price} per night</span></p>

                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() =>
                      dispatch(
                        addToCart({
                          _id: hotel._id,
                          name: hotel.productName,
                          quantity: 1,
                          image: hotel.img,
                          price: hotel.price,
                          badge: hotel.badge,
                        })
                      )
                    }
                    className="px-6 py-2 text-white text-sm rounded-lg bg-[#46A29F] hover:bg-[#4CB2B8] transition duration-300 flex items-center gap-2"
                  >
                    Reserve It <BiHotel />
                  </button>
                  <button
                    onClick={() => handleProductDetails(hotel)}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition duration-300 flex items-center gap-2"
                  >
                    View Details <MdOutlineLabelImportant />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </ScrollTrigger>
    </div>
  );
};

export default About;
