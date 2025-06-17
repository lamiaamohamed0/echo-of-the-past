import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import generalIcon from "../../assets/images/icon.png";
import usersIcon from "../../assets/images/ico2.png";
import productsIcon from "../../assets/images/egypt.png";
import ordersIcon from "../../assets/images/giza.png";
import categoriesIcon from "../../assets/images/cat.png";

const links = [
  {
    id: 1,
    name: "General",
    link: "/dashboard",
    icon: generalIcon,
  },
  {
    id: 2,
    name: "Users",
    link: "/dashboard/user",
    icon: usersIcon,
  },
  {
    id: 3,
    name: "Hotels",
    link: "/dashboard/Hotels",
    icon: productsIcon,
  },
  {
    id: 4,
    name: "Trips",
    link: "/dashboard/Trips",
    icon: ordersIcon,
  },

];

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex w-64 p-6 bg-[#e6c78a6b] shadow-xl rounded-lg">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="px-4"
      >
        <ul className="space-y-4">
          {links.map((link) => (
            <motion.li
              key={link.id}
              whileHover={{ scale: 1.05, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to={link.link}
                className={`flex items-center space-x-3 rounded-lg p-3 text-lg font-medium transition-all ${
                  pathname === link.link
                    ? "bg-[#10AAB2] text-white"
                    : "text-black hover:bg-[#E6C78A] hover:text-white"
                }`}
              >
                <img src={link.icon} alt={link.name} className="w-6 h-6" />
                <span>{link.name}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default Sidebar;