import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/dashboard/Sidebar";
import { MdLocationOn, MdEdit, MdDelete } from "react-icons/md";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axios from "axios";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [newTrip, setNewTrip] = useState({
    title: "",
    price: "",
    img: null,
    description: "",
    location: "",
    duration: "",
  });
  const [editTrip, setEditTrip] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("loggedInUser"))?.token;

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = () => {
    axios.get("http://echoesofthepast.runasp.net/api/Trip/GetAllTrips")
      .then((res) => {
        const tripData = res.data?.data;
        if (Array.isArray(tripData)) {
          setTrips(tripData);
        } else {
          console.warn("Unexpected API format", res.data);
        }
      })
      .catch((err) => console.error("Error fetching trips", err));
  };

  const handleWishList = (trip) => {
    if (wishList.some((item) => item.id === trip.id)) {
      setWishList(wishList.filter((item) => item.id !== trip.id));
      toast.info("Removed from Wish List");
    } else {
      setWishList([...wishList, trip]);
      toast.success("Added to Wish List");
    }
  };

  const handleDeleteTrip = (id) => {
    axios.delete(`http://echoesofthepast.runasp.net/api/Trip/DeleteTrip/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setTrips(trips.filter((trip) => trip.id !== id));
        toast.success("Trip Deleted Successfully");
      })
      .catch((err) => {
        console.error("Error deleting trip", err);
        toast.error("Failed to delete trip");
      });
  };

  const handleAddTrip = () => {
    const { title, price, img, description, location, duration } = newTrip;
    if (!title || !price || !img || !description || !location || !duration) {
      toast.warning("Please fill in all fields");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("Name", title);
    formData.append("Price", price);
    formData.append("Description", description);
    formData.append("Location", location);
    formData.append("Duration", duration);
    formData.append("Img", img);

    axios.post("http://echoesofthepast.runasp.net/api/Trip/AddTrip", formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        toast.success("Trip Added Successfully");
        setNewTrip({
          title: "", price: "", img: null, description: "", location: "", duration: ""
        });
        fetchTrips();
      })
      .catch((err) => {
        console.error("Error adding trip", err);
        toast.error("Failed to add trip");
      })
      .finally(() => setLoading(false));
  };

  const handleEditTrip = (id) => {
    const { title, price, img, description, location, duration } = newTrip;
    if (!title || !price || !description || !location || !duration) {
      toast.warning("Please fill in all fields");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("Name", title);
    formData.append("Price", price);
    formData.append("Description", description);
    formData.append("Location", location);
    formData.append("Duration", duration);
    if (img) formData.append("Img", img);

    axios.put(`http://echoesofthepast.runasp.net/api/Trip/EditTrip/${id}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        toast.success("Trip Updated Successfully", {
          style: { background: "#C0E6A8", color: "#000" },
        });
        setNewTrip({
          title: "", price: "", img: null, description: "", location: "", duration: ""
        });
        setEditTrip(null);
        fetchTrips();
      })
      .catch((err) => {
        console.error("Error updating trip", err);
        toast.error("Failed to update trip");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-6 p-4 w-full">
        <div className="container mx-auto p-4">
          <div className="flex gap-4 mb-6">
            <input type="text" placeholder="Title" className="border p-3 rounded-md w-full" value={newTrip.title} onChange={(e) => setNewTrip({ ...newTrip, title: e.target.value })} />
            <input type="text" placeholder="Price" className="border p-3 rounded-md w-full" value={newTrip.price} onChange={(e) => setNewTrip({ ...newTrip, price: e.target.value })} />
            <input type="file" accept="image/*" className="border p-3 rounded-md w-full" onChange={(e) => setNewTrip({ ...newTrip, img: e.target.files[0] })} />
            <input type="text" placeholder="Location" className="border p-3 rounded-md w-full" value={newTrip.location} onChange={(e) => setNewTrip({ ...newTrip, location: e.target.value })} />
            <input type="text" placeholder="Duration" className="border p-3 rounded-md w-full" value={newTrip.duration} onChange={(e) => setNewTrip({ ...newTrip, duration: e.target.value })} />
            <textarea placeholder="Description" className="border p-3 rounded-md w-full" value={newTrip.description} onChange={(e) => setNewTrip({ ...newTrip, description: e.target.value })} />
            <button disabled={loading} onClick={editTrip ? () => handleEditTrip(editTrip.id) : handleAddTrip} className={`px-6 py-2 rounded-md ml-4 text-sm ${loading ? 'bg-gray-400' : 'bg-[#E6C78A] text-white hover:scale-105 transform transition-all'}`}>
              {editTrip ? "Update Trip" : "Add Trip"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
            {trips.map((trip) => (
              <motion.div key={trip.id} className="border rounded-xl shadow-lg bg-white hover:scale-105 transition-transform">
                <div className="relative w-full h-60 overflow-hidden rounded-t-xl">
                  <img className="w-full h-full object-cover" src={trip.img} alt={trip.name} />
                  <div className="absolute top-4 right-4 cursor-pointer">
                    {wishList.some((item) => item.id === trip.id) ? (
                      <BsSuitHeartFill size={26} className="text-red-500" onClick={() => handleWishList(trip)} />
                    ) : (
                      <BsSuitHeart size={26} className="text-gray-500" onClick={() => handleWishList(trip)} />
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
                    <MdLocationOn size={20} className="text-[#46A29F]" /> {trip.location}
                  </h2>
                  <p className="text-sm text-gray-600">Price: ${trip.price}</p>
                  <p className="text-sm text-gray-600">Duration: {trip.duration}</p>
                  <div className="flex justify-between mt-5">
                    <button className="px-4 py-2 bg-[#46A29F] text-white rounded flex items-center gap-2 hover:scale-105" onClick={() => {
                      setEditTrip(trip);
                      setNewTrip({
                        title: trip.name,
                        price: trip.price,
                        img: null,
                        description: trip.description,
                        location: trip.location,
                        duration: trip.duration,
                      });
                    }}>
                      <MdEdit /> Edit
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded flex items-center gap-2 hover:scale-105" onClick={() => handleDeleteTrip(trip.id)}>
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

export default Trips;
