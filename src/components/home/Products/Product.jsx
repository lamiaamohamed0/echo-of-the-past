import React, { useState } from "react";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { BiHotel } from "react-icons/bi";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/Front_Handles";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ScrollTrigger from 'react-scroll-trigger';
import {  MdLocationOn } from "react-icons/md"; 

const Product = (props) => {
  const dispatch = useDispatch();
  const _id = props.productName;
  const idString = (_id) => String(_id).toLowerCase().split(" ").join("");
  const rootId = idString(_id);
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();
  const productItem = props;
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: { item: productItem },
    });
  };

  const handleWishList = () => {
    if (isWishlisted) {
      setWishList(wishList.filter((item) => item._id !== props._id));
      toast.info("Removed from Wish List", { 
        style: { backgroundColor: '#E6C78A', color: '#333' } 
      });
    } else {
      toast.success("Added to Wish List", { 
        style: { backgroundColor: '#46A29F', color: '#fff' }
      });
      setWishList([...wishList, props]);
    }
    setIsWishlisted(!isWishlisted);
  };

  return (
    <ScrollTrigger
      onEnter={() => console.log("Section Entered")}
      onExit={() => console.log("Section Exited")}
    >
      <motion.div
        className="relative group border border-gray-200 rounded-2xl shadow-lg bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Product Image and Wishlist */}
        <div className="relative w-full h-64 group-hover:scale-105 transition-all duration-500">
          <Image
            className="w-full h-full object-cover rounded-t-2xl"
            imgSrc={props.img}
          />
          {props.badge && (
            <div className="absolute top-4 left-4">
              <Badge text="Featured" />
            </div>
          )}
          <div className="absolute top-4 right-4 text-[#E6C78A] cursor-pointer">
            {isWishlisted ? (
              <BsSuitHeartFill
                size={24}
                className="text-red-500 opacity-80 hover:opacity-100 transition duration-200"
                onClick={handleWishList}
              />
            ) : (
              <BsSuitHeart
                size={24}
                className="opacity-80 hover:opacity-100 transition duration-200"
                onClick={handleWishList}
              />
            )}
          </div>
        </div>

        {/* Product Details and Buttons */}
        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <MdLocationOn size={20} className="text-gray-500" /> {/* Location Icon */}
            <h2 className="text-lg font-semibold text-primeColor group-hover:text-dark">
              {props.productName}
            </h2>
          </div>
          <p className="text-xs text-gray-500">{props.color}</p>

          <div className="flex items-center justify-between mt-3 space-x-3">
            <button
              onClick={() => dispatch(
                addToCart({
                  _id: props._id,
                  name: props.productName,
                  quantity: 1,
                  image: props.img,
                  badge: props.badge,
                  price: props.price,
                  colors: props.color,
                })
              )}
              className="px-4 py-2 text-white text-sm rounded-full hover:bg-primeColor-dark transition duration-300 flex items-center gap-2"
              style={{ backgroundColor: '#46A29F' }}
            >
              Reserve It <BiHotel />
            </button>
            <button
              onClick={handleProductDetails}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition duration-300 flex items-center gap-2"
            >
              View Details <MdOutlineLabelImportant />
            </button>
          </div>
        </div>
      </motion.div>
    </ScrollTrigger>
  );
};

export default Product;
