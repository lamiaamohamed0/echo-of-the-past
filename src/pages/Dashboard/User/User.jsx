import { useState, useEffect } from "react";
import Sidebar from "../../../components/dashboard/Sidebar";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion"; 
import userIcon from "../../../assets/images/pharaoh.png";  

const User = () => {
  // Sample user data
  const [userData, setUserData] = useState([
    { id: 1, name: "Reem Magdy", email: "ReemMagdy@example.com" },
    { id: 2, name: "Ali mohamed", email: "Alimohamed@example.com" },
    { id: 3, name: "amr ahmed", email: "amrahmed@example.com" },
  ]);

  useEffect(() => {
    AOS.init({ duration: 800 });  
  }, []);

  const handleDelete = (id) => {
    setUserData((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-6 p-6 w-full">
        <div className="container mx-auto bg-[#e6c78a10] shadow-md border-t-4 border-[#10AAB2] rounded-lg p-6" data-aos="fade-up">
          <h2 className="text-3xl font-semibold text-[#46A29F] text-center mb-6" data-aos="fade-right">
            {/* Replace FontAwesome icon with image */}
            <img src={userIcon} alt="User Icon" className="mr-2 w-12 h-12 inline-block" />
          </h2>

          {/* User Table */}
          <div className="overflow-hidden">
            <table className="w-full table-auto border-collapse table-fixed">
              <thead>
                <tr className="bg-[#E6C78A] text-white text-lg">
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                    className="border-b transition-all duration-500 ease-out hover:bg-[#46A29F]/10"
                    data-aos="fade-up"
                  >
                    <td className="px-6 py-4 text-center font-semibold">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-700">{user.name}</td>
                    <td className="px-6 py-4 text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:text-red-700 transition-transform transform duration-500 hover:scale-125 ease-out"
                      >
                        <i className="fas fa-times-circle text-2xl"></i>
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default User;
