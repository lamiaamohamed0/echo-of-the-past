import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/dashboard/Sidebar";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { MdLocationOn, MdEdit, MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AOS from "aos"; 
import "aos/dist/aos.css";

import Cairo from "../../../assets/images/CairoHotel.jfif";
import lux from "../../../assets/images/lux.jpeg";
import elgouna from "../../../assets/images/elgouna.jpeg";
import dahab from "../../../assets/images/dahab.jpeg";
import nuwiba from "../../../assets/images/nwee.webp";

gsap.registerPlugin(ScrollTrigger); 

const Hotels = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([
    { id: 1, img: Cairo, name: "Cairo, Egypt", price: "44.00", badge: true },
    { id: 2, img: lux, name: "Luxor, Egypt", price: "250.00", badge: true },
    { id: 3, img: elgouna, name: "El Gouna, Egypt", price: "80.00", badge: true },
    { id: 4, img: dahab, name: "Dahab, Egypt", price: "60.00", badge: false },
    { id: 5, img: nuwiba, name: "Nuweiba, Egypt", price: "60.00", badge: false },
  ]);

  const [wishList, setWishList] = useState([]);
  const [newHotel, setNewHotel] = useState({ name: "", price: "", img: "" });
  const [editHotel, setEditHotel] = useState(null);

  const handleWishList = (hotel) => {
    if (wishList.some((item) => item.id === hotel.id)) {
      setWishList(wishList.filter((item) => item.id !== hotel.id));
      toast.info("Removed from Wish List");
    } else {
      setWishList([...wishList, hotel]);
      toast.success("Added to Wish List");
    }
  };

  const handleDeleteHotel = (id) => {
    setHotels(hotels.filter((hotel) => hotel.id !== id));
    toast.error("Hotel Deleted");
  };

  const handleAddHotel = () => {
    if (!newHotel.name || !newHotel.price || !newHotel.img) {
      toast.warning("Please fill in all fields", {
        style: { background: "#E6C78A", color: "#000" }, 
      });
      return;
    }
    if (editHotel) {
      setHotels(
        hotels.map((hotel) => (hotel.id === editHotel.id ? { ...editHotel, ...newHotel } : hotel))
      );
      setEditHotel(null);
      toast.success("Hotel Updated Successfully");
    } else {
      const newId = hotels.length + 1;
      setHotels([...hotels, { ...newHotel, id: newId, badge: false }]);
      toast.success("Hotel Added Successfully");
    }
    setNewHotel({ name: "", price: "", img: "" });
  };

  const handleEditHotel = (hotel) => {
    setNewHotel(hotel);
    setEditHotel(hotel);
  };


  useEffect(() => {
    AOS.init({ duration: 800 }); 
  }, []);

  useEffect(() => {
    gsap.utils.toArray(".hotel-item").forEach((element) => {
      gsap.fromTo(
        element, 
        { opacity: 0, y: 80, scale: 0.95 }, 
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
          stagger: 0.25,
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            end: "top 30%",
            scrub: true,
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-6 p-4 w-full">
        <div className="container mx-auto p-4">
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Hotel Name"
              className="border p-3 rounded-md w-full lg:w-[300px] text-sm focus:outline-none"
              value={newHotel.name}
              onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Price"
              className="border p-3 rounded-md w-full lg:w-[200px] text-sm focus:outline-none"
              value={newHotel.price}
              onChange={(e) => setNewHotel({ ...newHotel, price: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="border p-3 rounded-md w-full lg:w-[250px] text-sm focus:outline-none"
              value={newHotel.img}
              onChange={(e) => setNewHotel({ ...newHotel, img: e.target.value })}
            />
            <button
              onClick={handleAddHotel}
              className="bg-[#E6C78A] text-white px-6 py-2 rounded-md ml-4 text-sm transition-all ease-out transform hover:scale-105"
            >
              {editHotel ? "Update Hotel" : "Add Hotel"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
            {hotels.map((hotel) => (
              <motion.div
                key={hotel.id}
                className="hotel-item relative group border border-gray-300 rounded-xl shadow-lg bg-white transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
                data-aos="fade-up" // Add AOS animation trigger
              >
                <div className="relative w-full h-60 overflow-hidden rounded-t-xl">
                  <img className="w-full h-full object-cover" src={hotel.img} alt={hotel.name} />
                  <div className="absolute top-4 left-4">
                    {hotel.badge && (
                      <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 cursor-pointer">
                    {wishList.some((item) => item.id === hotel.id) ? (
                      <BsSuitHeartFill
                        size={26}
                        className="text-red-500"
                        onClick={() => handleWishList(hotel)}
                      />
                    ) : (
                      <BsSuitHeart size={26} className="text-gray-500" onClick={() => handleWishList(hotel)} />
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
                    <MdLocationOn size={20} className="text-[#46A29F]" /> {hotel.name}
                  </h2>
                  <p className="text-sm text-gray-600">Price: ${hotel.price} per night</p>
                  <div className="flex justify-between mt-5">
                    <button
                      className="px-4 py-2 bg-[#46A29F] text-white rounded flex items-center gap-2 transition-transform duration-300 hover:scale-105"
                      onClick={() => handleEditHotel(hotel)}
                    >
                      <MdEdit className="mr-2" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteHotel(hotel.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded flex items-center gap-2 transition-transform duration-300 hover:scale-105"
                    >
                      <MdDelete className="mr-2" /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hotels;
