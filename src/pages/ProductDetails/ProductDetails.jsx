import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import { FaInfoCircle, FaConciergeBell, FaBed } from "react-icons/fa";

const sidebarData = [
  { id: "productInfo", label: "Hotel Info", icon: <FaInfoCircle /> },
  { id: "ficheTech", label: "Facilities", icon: <FaConciergeBell /> },
  { id: "description", label: "Description", icon: <FaBed /> },
];

const ProductDetails = () => {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const [activeSection, setActiveSection] = useState("productInfo");
  const [error, setError] = useState(null);

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  useEffect(() => {
    console.log("Fetching hotel with ID:", id);

    axios
      .get(`http://echoesofthepast.runasp.net/api/Hotel/${id}`)
      .then((response) => {
        console.log("API Response:", response.data);

        const result =
          response.data?.result ||
          response.data?.data?.result ||
          response.data?.data ||
          response.data;

        if (result && result.id) {
          setProductInfo(result);
          setError(null);
        } else {
          console.warn("Invalid response format:", response.data);
          setError("Hotel details not found.");
        }
      })
      .catch((err) => {
        console.error("Hotel fetch error:", err);
        setError("Hotel not found or server error.");
      });
  }, [id]);

  return (
    <div className="w-full mx-auto">
      <div className="max-w-container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-10">

          {/* Sidebar */}
          <div className="md:col-span-1 bg-[#e6c78a67] rounded-lg p-6 space-y-4">
            <div className="mb-6">
              {productInfo?.img ? (
                <img
                  className="w-full h-auto rounded-lg transition-transform duration-300 transform hover:scale-105"
                  src={productInfo.img.startsWith("http") ? productInfo.img : `http://echoesofthepast.runasp.net/${productInfo.img}`}
                  alt={productInfo.name}
                />
              ) : (
                <div className="text-gray-400 italic text-center">No Image Available</div>
              )}
            </div>

            <ul>
              {sidebarData.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleSectionChange(section.id)}
                    className={`w-full text-left py-2 px-4 text-lg transition-colors duration-300 ${
                      activeSection === section.id
                        ? "bg-[#46A29F] text-white"
                        : "bg-gray-200 text-gray-700"
                    } hover:bg-[#46A29F] hover:text-white rounded-lg focus:outline-none`}
                  >
                    <span className="mr-2 inline-block">{section.icon}</span>
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div className="md:col-span-2 bg-[#e6c78a10] shadow-md border-t-4 border-[#10AAB2] rounded-lg p-6">

            {error ? (
              <div className="text-red-500 text-center text-lg">{error}</div>
            ) : !productInfo ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : (
              <>
                {activeSection === "productInfo" && (
                  <motion.div
                    initial={{ opacity: 0, y: 200, rotate: 10 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ProductInfo productInfo={productInfo} />
                  </motion.div>
                )}

                {activeSection === "ficheTech" && (
                  <motion.div
                    initial={{ opacity: 0, y: 200, rotate: 10 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-xl font-semibold text-[#2C3E50] mb-4">Facilities</h2>
                    {productInfo?.ficheTech?.length ? (
                      <table className="table-auto w-full my-4">
                        <tbody>
                          {productInfo.ficheTech.map((row, index) => (
                            <tr key={index}>
                              <td className="border px-4 py-2 text-sm text-gray-800 font-semibold">{row.label}</td>
                              <td className="border px-4 py-2 text-sm text-gray-600">{row.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-gray-500">No facilities information available.</p>
                    )}
                  </motion.div>
                )}

                {activeSection === "description" && (
                  <motion.div
                    initial={{ opacity: 0, y: 200, rotate: 10 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-xl font-semibold text-[#2C3E50] mb-4">Rooms & Dining</h2>
                    <div className="text-md text-[#34495E] leading-relaxed">
                      <strong className="font-semibold text-[#16A085]">Rooms:</strong>
                      <ul className="list-inside list-disc mt-2 pl-6">
                        <li>Standard: Cozy rooms with essential amenities.</li>
                        <li>Deluxe: Elegant rooms with upgraded amenities or a scenic view.</li>
                        <li>Suites: Spacious suites offering separate living areas and premium services.</li>
                      </ul>
                      <strong className="font-semibold text-[#16A085] mt-4 block">Dining:</strong>
                      <ul className="list-inside list-disc mt-2 pl-6">
                        <li>Restaurant: A fusion of local and international flavors.</li>
                        <li>Café: Light snacks and beverages available throughout the day.</li>
                        <li>Room Service: Delightful meals and drinks served to your room 24/7.</li>
                      </ul>
                    </div>
                    <p className="mt-4 text-[#5D6D7E]">
                      {productInfo.description || "Contact us at: [Phone] - [Email] - [Address]"}
                    </p>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
