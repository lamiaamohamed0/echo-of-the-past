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
import axios from "axios";

const Hotels = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [newHotel, setNewHotel] = useState({ name: "", price: "", img: "" });
  const [editHotel, setEditHotel] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("loggedInUser"))?.token;
  console.log(token)
  console.log(hotels);
  
  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = () => {
    axios.get("http://echoesofthepast.runasp.net/api/Hotel/GetAllHotel")
      .then((response) => {
        const hotelData = response.data?.data?.result;
        if (Array.isArray(hotelData)) {
          setHotels(hotelData);
        } else {
          console.warn("Unexpected API format", response.data);
        }
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };

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
    axios.delete(`http://echoesofthepast.runasp.net/api/Hotel/DeleteHotel/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setHotels(hotels.filter((hotel) => hotel.id !== id));
        toast.success("Hotel Deleted Successfully");
      })
      .catch((error) => {
        console.error("Delete Hotel Error:", error);
        toast.error("Failed to delete hotel");
      });
  };

  const handleAddHotel = () => {
    if (!newHotel.name || !newHotel.price || (!newHotel.img && !editHotel)) {
      toast.warning("Please fill in all fields", {
        style: { background: "#E6C78A", color: "#000" },
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("Name", newHotel.name);
    formData.append("Price", newHotel.price);
    if (newHotel.img) formData.append("Img", newHotel.img);

    const request = axios.post("http://echoesofthepast.runasp.net/api/Hotel/Addnew", formData, {
          headers: { Authorization: `Bearer ${token}` }
        });

  

    request.then(() => {
      toast.success(editHotel ? "Hotel Updated Successfully" : "Hotel Added Successfully");
      setNewHotel({ name: "", price: "", img: "" });
      setEditHotel(null);
      fetchHotels();
    })
    .catch((error) => {
      console.error("Hotel Error:", error);
      toast.error("Failed to process hotel");
    })
    .finally(() => setLoading(false));
  };

const handleEditHotel = async (id) => {
  try {
    if (!newHotel.name || !newHotel.price || (!newHotel.img && !editHotel?.img)) {
      toast.warning("Please fill in all fields", {
        style: { background: "#E6C78A", color: "#000" },
      });
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("Name", newHotel.name);
    formData.append("Price", newHotel.price);
    
    // إضافة الصورة فقط إذا تم اختيار واحدة جديدة
    if (newHotel.img) formData.append("Img", newHotel.img);

    const res = await axios.put(
      `http://echoesofthepast.runasp.net/api/Hotel/UpdateHotel/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      toast.success("Hotel updated successfully", {
        style: { background: "#C0E6A8", color: "#000" },
      });
      // تحديث بيانات الفندق أو إغلاق المودال حسب الحاجة
    } else {
      toast.error("Failed to update hotel", {
        style: { background: "#F5A9A9", color: "#000" },
      });
    }

    fetchHotels()

  } catch (error) {
    console.error(error);
    toast.error("An error occurred, please try again", {
      style: { background: "#F5A9A9", color: "#000" },
    });
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    AOS.init({ duration: 800 }); 
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".hotel-item").forEach((element) => {
      gsap.fromTo(element, { opacity: 0, y: 80, scale: 0.95 }, {
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
      });
    });
  }, [hotels]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-6 p-4 w-full">
        <div className="container mx-auto p-4">
          <div className="flex gap-4 mb-6">
            <input type="text" placeholder="Hotel Name" className="border p-3 rounded-md w-full lg:w-[300px] text-sm" value={newHotel.name} onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })} />
            <input type="text" placeholder="Price" className="border p-3 rounded-md w-full lg:w-[200px] text-sm" value={newHotel.price} onChange={(e) => setNewHotel({ ...newHotel, price: e.target.value })} />
            <input type="file" accept="image/*" className="border p-3 rounded-md w-full lg:w-[250px] text-sm" onChange={(e) => setNewHotel({ ...newHotel, img: e.target.files[0] })} />
            <button disabled={loading} onClick={handleAddHotel} className={`px-6 py-2 rounded-md ml-4 text-sm ${loading ? 'bg-gray-400' : 'bg-[#E6C78A] text-white hover:scale-105 transform transition-all'}`}>
              {editHotel ? "Update Hotel" : "Add Hotel"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
            {hotels.map((hotel) => (
              <motion.div key={hotel.id} className="hotel-item relative group border border-gray-300 rounded-xl shadow-lg bg-white hover:scale-105 hover:shadow-xl transition-transform" data-aos="fade-up">
                <div className="relative w-full h-60 overflow-hidden rounded-t-xl">
                  <img className="w-full h-full object-cover" src={hotel.img}alt={hotel.name} />
                  <div className="absolute top-4 right-4 cursor-pointer">
                    {wishList.some((item) => item._id === hotel.id) ? (
                      <BsSuitHeartFill size={26} className="text-red-500" onClick={() => handleWishList(hotel)} />
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
                    <button className="px-4 py-2 bg-[#46A29F] text-white rounded flex items-center gap-2 hover:scale-105 transform" onClick={() => handleEditHotel(hotel.id)}>
                      <MdEdit /> Edit
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded flex items-center gap-2 hover:scale-105 transform" onClick={() => handleDeleteHotel(hotel.id)}>
                      <MdDelete /> Delete
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
