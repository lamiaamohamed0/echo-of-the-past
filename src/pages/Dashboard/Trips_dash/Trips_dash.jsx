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

const Trips = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([
    {
      _id: "trip1011",
      title: "Explore Cairo",
      price: "400.00",
      duration: "7 Days",
      location: "Cairo, Egypt",
      badge: "Top Destination",
      description: "Visit the Great Pyramids, the Sphinx, and the famous Egyptian Museum.",
      img: Cairo,
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
      img: elgouna,
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
    {
      _id: "trip1015",
      title: "Nuweiba Adventure",
      price: "350.00",
      duration: "5 Days",
      location: "Nuweiba, Egypt",
      description: "Explore the tranquil beaches and waters of Nuweiba.",
      img: nuwiba,
    },
  ]);

  const [wishList, setWishList] = useState([]);
  const [newTrip, setNewTrip] = useState({
    title: "",
    price: "",
    img: "",
    description: "",
    location: "",
    duration: "", // Add duration to the new trip state
  });
  const [editTrip, setEditTrip] = useState(null);

  // Handle wish list
  const handleWishList = (trip) => {
    if (wishList.some((item) => item._id === trip._id)) {
      setWishList(wishList.filter((item) => item._id !== trip._id));
      toast.info("Removed from Wish List");
    } else {
      setWishList([...wishList, trip]);
      toast.success("Added to Wish List");
    }
  };

  // Handle delete trip
  const handleDeleteTrip = (id) => {
    setTrips(trips.filter((trip) => trip._id !== id));
    toast.error("Trip Deleted");
  };

  // Handle add/edit trip
  const handleAddTrip = () => {
    if (!newTrip.title || !newTrip.price || !newTrip.img || !newTrip.location || !newTrip.duration || !newTrip.description) {
      toast.warning("Please fill in all fields", {
        style: { background: "#E6C78A", color: "#000" }, // Changes background and text color
      });
      return;
    }

    if (editTrip) {
      setTrips(
        trips.map((trip) =>
          trip._id === editTrip._id ? { ...editTrip, ...newTrip } : trip
        )
      );
      setEditTrip(null);
      toast.success("Trip Updated Successfully");
    } else {
      const newId = trips.length + 1;
      setTrips([
        ...trips,
        {
          ...newTrip,
          _id: `trip${newId}`,
          badge: "New",
          description: newTrip.description, // Add the description
        },
      ]);
      toast.success("Trip Added Successfully");
    }

    setNewTrip({
      title: "",
      price: "",
      img: "",
      description: "",
      location: "",
      duration: "", // Reset the duration field
    });
  };

  // Handle edit trip
  const handleEditTrip = (trip) => {
    setNewTrip({
      title: trip.title,
      price: trip.price,
      img: trip.img,
      description: trip.description,
      location: trip.location,
      duration: trip.duration, // Set duration for editing
    });
    setEditTrip(trip);
  };

  useEffect(() => {
    AOS.init({ duration: 800 });
    gsap.utils.toArray(".trip-item").forEach((element) => {
      gsap.fromTo(
        element,
        { y: 80, scale: 0.95 }, // Starts with y position and scale effect (no opacity transition)
        {
          y: 0,
          scale: 1, // Ends with normal scale and position
          duration: 1.8,
          ease: "power3.out",
          stagger: 0.25,
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            end: "top 5%",
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
      <div className="mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Trip Title"
            className="border p-3 rounded-md text-sm focus:outline-none"
            value={newTrip.title}
            onChange={(e) => setNewTrip({ ...newTrip, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Price"
            className="border p-3 rounded-md text-sm focus:outline-none"
            value={newTrip.price}
            onChange={(e) => setNewTrip({ ...newTrip, price: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            placeholder="Image URL"
            className="border p-3 rounded-md text-sm focus:outline-none"
            value={newTrip.img}
            onChange={(e) => setNewTrip({ ...newTrip, img: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            className="border p-3 rounded-md text-sm focus:outline-none"
            value={newTrip.location}
            onChange={(e) => setNewTrip({ ...newTrip, location: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            placeholder="Duration"
            className="border p-3 rounded-md text-sm focus:outline-none"
            value={newTrip.duration}
            onChange={(e) => setNewTrip({ ...newTrip, duration: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="border p-3 rounded-md text-sm focus:outline-none w-full mt-4 lg:mt-0"
            value={newTrip.description}
            onChange={(e) => setNewTrip({ ...newTrip, description: e.target.value })}
          ></textarea>
        </div>
        <button
          onClick={handleAddTrip}
          className="bg-[#E6C78A] text-white px-6 py-2 rounded-md mt-6 text-sm transition-all ease-out transform hover:scale-105"
        >
          {editTrip ? "Update Trip" : "Add Trip"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
        {trips.map((trip) => (
          <motion.div
            key={trip._id}
            className="trip-item relative group border border-gray-300 rounded-xl shadow-lg bg-white transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
            data-aos="fade-up"
          >
            <div className="relative w-full h-60 overflow-hidden rounded-t-xl">
              <img className="w-full h-full object-cover" src={trip.img} alt={trip.title} />
              <div className="absolute top-4 left-4">
                {trip.badge && (
                  <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs">
                    {trip.badge}
                  </span>
                )}
              </div>
              <div className="absolute top-4 right-4 cursor-pointer">
                {wishList.some((item) => item._id === trip._id) ? (
                  <BsSuitHeartFill
                    size={26}
                    className="text-red-500"
                    onClick={() => handleWishList(trip)}
                  />
                ) : (
                  <BsSuitHeart size={26} className="text-gray-500" onClick={() => handleWishList(trip)} />
                )}
              </div>
            </div>
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
                <MdLocationOn size={20} className="text-[#46A29F]" /> {trip.location}
              </h2>
              <p className="text-sm text-gray-600">{trip.description}</p>
              <p className="text-sm text-gray-600">Price: ${trip.price}</p>
              <p className="text-sm text-gray-600">Duration: {trip.duration}</p>
              <div className="flex justify-between mt-5">
                <button
                  className="px-4 py-2 bg-[#46A29F] text-white rounded flex items-center gap-2 transition-transform duration-300 hover:scale-105"
                  onClick={() => handleEditTrip(trip)}
                >
                  <MdEdit className="mr-2" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteTrip(trip._id)}
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

export default Trips;

