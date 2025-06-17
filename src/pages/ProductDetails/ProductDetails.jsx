import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import { FaDownload, FaInfoCircle, FaConciergeBell, FaBed } from "react-icons/fa";

const sidebarData = [
  { id: "productInfo", label: "Hotel Info", icon: <FaInfoCircle /> },
  { id: "ficheTech", label: "Facilities", icon: <FaConciergeBell /> },
  { id: "description", label: "Description", icon: <FaBed /> },
];

const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState({});
  const [activeSection, setActiveSection] = useState("productInfo");

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  useEffect(() => {
    setProductInfo(location.state?.item || {});
    setPrevLocation(location.pathname);
  }, [location]);

  return (
    <div className="w-full mx-auto">
      <div className="max-w-container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-10">
          {/* Sidebar */}
          <div className="md:col-span-1 bg-[#e6c78a67] rounded-lg p-6 space-y-4">
            <div className="mb-6">
              <img
                className="w-full h-auto rounded-lg transition-transform duration-300 transform hover:scale-105"
                src={productInfo.img}
                alt={productInfo.name}
              />
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
                    <span>{section.icon}</span>
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Content Area */}
          <div className="md:col-span-2 bg-[#e6c78a10] shadow-md border-t-4 border-[#10AAB2] rounded-lg p-6">
            {/* Display Content Based on Active Section */}
            {activeSection === "productInfo" && (
              <motion.div
                initial={{ opacity: 0, y: 200, rotate: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                }}
                transition={{ duration: 0.6 }}
              >
                <ProductInfo productInfo={productInfo} />
              </motion.div>
            )}

            {activeSection === "ficheTech" && (
              <motion.div
                initial={{ opacity: 0, y: 200, rotate: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xl font-semibold text-[#2C3E50] mb-4">Facilities</h2>
                <table className="table-auto w-full my-4">
                  <tbody>
                    {productInfo.ficheTech?.map((row) => (
                      <tr key={row.label}>
                        <td className="border px-4 py-2 text-sm text-gray-800 font-semibold">
                          {row.label}
                        </td>
                        <td className="border px-4 py-2 text-sm text-gray-600">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="my-4 text-md text-[#34495E] leading-relaxed">
                  Our hotel offers a range of top-class facilities to enhance your stay:
                  <ul className="list-inside list-disc mt-2 pl-6">
                    <li>Free High-Speed Wi-Fi</li>
                    <li>24/7 Reception and Concierge</li>
                    <li>Fully Air-conditioned Rooms</li>
                    <li>On-site Restaurant with International Menu</li>
                    <li>State-of-the-Art Fitness Center</li>
                    <li>Swimming Pool and Spa</li>
                    <li>24/7 Room Service</li>
                    <li>Complimentary Shuttle Services</li>
                  </ul>
                  <p className="mt-4 text-[#5D6D7E]">
                    These world-class amenities ensure that your stay is both enjoyable and stress-free.
                  </p>
                </p>
              </motion.div>
            )}

            {activeSection === "description" && (
              <motion.div
                initial={{ opacity: 0, y: 200, rotate: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                }}
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
                  {productInfo.description || "Contact Us: [Hotel Address], Phone: [Phone Number], Email: [Email Address]"}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
