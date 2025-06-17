import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/Front_Handles";

const ProductInfo = ({ productInfo }) => {
  const highlightStyle = {
    color: "#d0121a",
    fontWeight: "bold",
  };

  const renderDescription = () => {
    if (!productInfo.des) {
      return null;
    }

    const description = productInfo.des.split(/:(.*?)-/).map((part, index) => {
      return (
        <span key={index} style={index % 2 === 1 ? highlightStyle : {}}>
          {part}
        </span>
      );
    });

    return <>{description}</>;
  };

  const dispatch = useDispatch();
  
  // State for managing the current rating value
  const [rating, setRating] = useState(null); // Initially, no rating selected
  const [hoverRating, setHoverRating] = useState(null); // Store current hover rating temporarily

  // Load the rating from localStorage when the component mounts
  useEffect(() => {
    const savedRating = localStorage.getItem(`rating_${productInfo.id}`);
    if (savedRating) {
      setRating(parseInt(savedRating));
    }
  }, [productInfo.id]);

  const handleStarClick = (index) => {
    const newRating = index + 1;
    setRating(newRating); // Update the rating in state

    // Save the rating in localStorage so it persists across page reloads
    localStorage.setItem(`rating_${productInfo.id}`, newRating);
  };

  const handleStarHover = (index) => {
    setHoverRating(index + 1); // Update the hover rating while hovering
  };

  const handleStarHoverOut = () => {
    setHoverRating(null); // Reset the hover effect when mouse leaves
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-semibold text-[#46A29F]">{productInfo.productName}</h2>
      <p className="text-2xl font-semibold text-[#46A29F]">
        {productInfo.price} $
        <span className="text-xl font-semibold text-gray-400 line-through ml-2">{540}</span>
        <span className="text-xs ml-2 inline-flex items-center px-3 py-1 rounded-full bg-green-600 text-white">
          Offer
        </span>
      </p>
      <hr />
      <p className="text-base text-gray-700">{renderDescription()}</p>

      <div className="flex items-center gap-3 mt-4">
        <p className="text-sm font-medium">Leave a review </p>

        {/* Star Rating */}
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            onClick={() => handleStarClick(index)} // On click, set the rating
            onMouseEnter={() => handleStarHover(index)} // On hover, show hover rating
            onMouseLeave={handleStarHoverOut} // Reset when hover is removed
            className={`w-6 h-6 cursor-pointer transition-all duration-300 transform ${ 
              (hoverRating || rating) > index 
                ? "text-yellow-400"  // Color yellow if hovered or clicked
                : "text-gray-300" // Default gray when not hovered or clicked
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}
      </div>

      <button
        onClick={() =>
          dispatch(
            addToCart({
              _id: productInfo.id,
              name: productInfo.productName,
              quantity: 1,
              image: productInfo.img,
              badge: productInfo.badge,
              price: productInfo.price,
              colors: productInfo.color,
            })
          )
        }
        className="w-full py-4 bg-[#46A29F] hover:bg-[#3D8C80] transition-all duration-300 text-white text-lg font-titleFont rounded-lg"
      >
        Reserve It
      </button>
    </div>
  );
};

export default ProductInfo;
