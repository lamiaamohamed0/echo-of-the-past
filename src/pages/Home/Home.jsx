// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import MyHotels from "../../components/home/myHotels/myHotels";
// import EgyptAttractions from "../../components/home/Attraction/Attraction";
// import ContactLink from "../../components/home/Contactlink/Contactlink";
// import bg from "../../assets/images/bb.jfif";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Home = () => {
//   const [trips, setTrips] = useState([]);
//   const [hotels, setHotels] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://echoesofthepast.runasp.net/api/Trip/GetAllTrips")
//       .then((response) => {
//         const tripData = response.data?.data;
//         if (Array.isArray(tripData)) {
//           setTrips(tripData);
//         } else {
//           console.warn("Unexpected API format", response.data);
//         }
//       })
//       .catch((error) => {
//         console.error("API error:", error);
//       });

//     axios
//       .get("http://echoesofthepast.runasp.net/api/Hotel/GetAllHotel")
//       .then((response) => {
//         const hotelData = response.data?.data?.result;
//         if (Array.isArray(hotelData)) {
//           setHotels(hotelData);
//         } else {
//           console.warn("Unexpected API format", response.data);
//         }
//       })
//       .catch((error) => {
//         console.error("API error:", error);
//       });
//   }, []);

//   const handleReserve = (type, name) => {
//     toast.success(`${type} "${name}" reserved successfully!`);
//   };

//   const handleViewDetails = (item) => {
//     navigate(`/product/${item.id}`, { state: { item } });
//   };

//   return (
//     <>
//       {/* Egypt Attractions Section */}
//       <div className="w-full mx-auto bg-[#fdfaf4] py-8">
//         <div className="max-w-container mx-auto px-4">
//           <EgyptAttractions />
//         </div>
//       </div>

//       {/* Hotels + Trips Section */}
//       <div
//         className="w-full mx-auto py-12"
//         style={{
//           backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${bg})`,
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="max-w-container mx-auto px-4">
//           {/* Hotels Header */}
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-semibold text-black">Explore Our Hotels</h2>
//           </div>

//           {/* Hotels Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
//             {hotels.map((hotel) => (
//               <div
//                 key={hotel.id}
//                 className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
//               >
//                 <img
//                   src={`http://echoesofthepast.runasp.net/Imgs/Hotels/${hotel.img}`}
//                   alt={hotel.name}
//                   className="w-full h-48 object-cover rounded-lg mb-3"
//                 />
//                 <h2 className="text-lg font-semibold text-gray-800">{hotel.name}</h2>
//                 <div className="flex flex-col mt-4 gap-2">
//                   <button
//                     onClick={() => handleReserve("Hotel", hotel.name)}
//                     className="bg-[#46A29F] text-white py-2 px-4 rounded-lg hover:bg-[#3b8e8c] transition duration-300"
//                   >
//                     Reserve it
//                   </button>
//                   <button
//                     onClick={() => handleViewDetails(hotel)}
//                     className="bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300"
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Trips Header */}
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-semibold text-black">Explore Your Egypt Trips</h2>
//             <button
//               onClick={() => navigate("/shop")}
//               className="text-[#46A29F] hover:underline text-xl font-bold"
//             >
//               See More
//             </button>
//           </div>

//           {/* Trips Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
//             {trips.map((trip) => (
//               <div
//                 key={trip.id}
//                 className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
//               >
//                 <img
//                   src={`http://echoesofthepast.runasp.net/Imgs/Trips/${trip.img}`}
//                   alt={trip.name}
//                   className="w-full h-48 object-cover rounded-lg mb-3"
//                 />
//                 <h2 className="text-lg font-semibold text-gray-800">{trip.name}</h2>
//                 <p className="text-sm text-gray-600 mt-1 mb-2 line-clamp-2">{trip.description}</p>
//                 <p className="text-sm text-gray-700">
//                   <span className="font-semibold">Price:</span> {trip.price}
//                 </p>
//                 <p className="text-sm text-gray-700 mb-3">
//                   <span className="font-semibold">Duration:</span> {trip.duration}
//                 </p>
//                 <button
//                   onClick={() => handleReserve("Trip", trip.name)}
//                   className="w-full bg-[#46A29F] text-white py-2 px-4 rounded-lg hover:bg-[#3b8e8c] transition duration-300"
//                 >
//                   Reserve it
//                 </button>
//               </div>
//             ))}
//           </div>

//           <ContactLink />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyHotels from "../../components/home/myHotels/myHotels";
import EgyptAttractions from "../../components/home/Attraction/Attraction";
import ContactLink from "../../components/home/Contactlink/Contactlink";
import bg from "../../assets/images/bb.jfif";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [trips, setTrips] = useState([]);
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://echoesofthepast.runasp.net/api/Trip/GetAllTrips")
      .then((response) => {
        const tripData = response.data?.data;
        if (Array.isArray(tripData)) {
          setTrips(tripData);
        } else {
          console.warn("Unexpected API format", response.data);
        }
      })
      .catch((error) => {
        console.error("API error:", error);
      });

    axios
      .get("http://echoesofthepast.runasp.net/api/Hotel/GetAllHotel")
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
  }, []);

  const handleReserve = (type, name) => {
    toast.success(`${type} "${name}" reserved successfully!`);
  };

  const handleViewDetails = (item) => {
    navigate(`/product/${item.id}`, { state: { item } });
  };

  return (
    <>
      <div className="w-full mx-auto bg-[#fdfaf4] py-8">
        <div className="max-w-container mx-auto px-4">
          <EgyptAttractions />
        </div>
      </div>

      <div
        className="w-full mx-auto py-12"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${bg})`,
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-black">Explore Our Hotels</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
              >
                <img
                  src={
                    hotel.img?.startsWith("http")
                      ? hotel.img
                      : `http://echoesofthepast.runasp.net/Imgs/Hotels/${hotel.img}`
                  }
                  alt={hotel.name}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h2 className="text-lg font-semibold text-gray-800">{hotel.name}</h2>
                <div className="flex flex-col mt-4 gap-2">
                  <button
                    onClick={() => handleReserve("Hotel", hotel.name)}
                    className="bg-[#46A29F] text-white py-2 px-4 rounded-lg hover:bg-[#3b8e8c] transition duration-300"
                  >
                    Reserve it
                  </button>
                  <button
                    onClick={() => handleViewDetails(hotel)}
                    className="bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-black">Explore Your Egypt Trips</h2>
            <button
              onClick={() => navigate("/shop")}
              className="text-[#46A29F] hover:underline text-xl font-bold"
            >
              See More
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
              >
                <img
                  src={
                    trip.img?.startsWith("http")
                      ? trip.img
                      : `http://echoesofthepast.runasp.net/Imgs/Trips/${trip.img}`
                  }
                  alt={trip.name}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h2 className="text-lg font-semibold text-gray-800">{trip.name}</h2>
                <p className="text-sm text-gray-600 mt-1 mb-2 line-clamp-2">{trip.description}</p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Price:</span> {trip.price}
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <span className="font-semibold">Duration:</span> {trip.duration}
                </p>
                <button
                  onClick={() => handleReserve("Trip", trip.name)}
                  className="w-full bg-[#46A29F] text-white py-2 px-4 rounded-lg hover:bg-[#3b8e8c] transition duration-300"
                >
                  Reserve it
                </button>
              </div>
            ))}
          </div>

          <ContactLink />
        </div>
      </div>
    </>
  );
};

export default Home;