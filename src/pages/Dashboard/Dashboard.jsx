import React from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import { motion } from "framer-motion";
import bg from "../../assets/images/1.jfif";

import bookingsIcon from "../../assets/images/hot2.png";
import toursIcon from "../../assets/images/res.png";
import hotelsIcon from "../../assets/images/pp.png";
import revenueIcon from "../../assets/images/pay.png";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen rounded-lg shadow-xl  overflow-hidden">
      <Sidebar />
      <main className="flex-1 pt-5 pb-5 px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.02}}
          className="bg-white rounded-lg p-6 shadow-xl mb-8 border-l-4 border-[#10AAB2]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.8)), url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-2xl font-bold text-gray-800"
          >
            Welcome to Echoes Of The Past Dashboard
          </motion.h1>
          <p className="text-gray-600 mt-2">
            Manage bookings, monitor trends, and explore data to deliver the
            best experiences.
          </p>
        </motion.div>

        {/* Metrics Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 bg-cover bg-center border-t-4 border-[#10AAB2] rounded-lg shadow-lg p-6"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.8)), url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.05}}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <span className="text-gray-700">{activity.description}</span>
                <span className="text-gray-500 text-sm">{activity.time}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </main>
    </div>
  );
};

const MetricCard = ({ title, value, icon, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1, rotate: -5 }}
      transition={{ duration: 0.6 }}
      className="rounded-lg p-6 shadow-md transition-all transform hover:shadow-xl"
      style={{ backgroundColor: color }}
    >
      <div className="flex items-center mb-4">
        <img src={icon} alt={title} className="w-10 h-10 mr-4" />
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </motion.div>
  );
};

const metrics = [
  {
    title: "Bookings",
    value: "1,245",
    icon: bookingsIcon,
    color: "#5cc4c9",
  },
  {
    title: "Available Tours",
    value: "250",
    icon: toursIcon,
    color: "#E6C78A",
  },
  {
    title: "Hotel Reservations",
    value: "834",
    icon: hotelsIcon,
    color: "#92826b",
  },
  {
    title: "Total Revenue",
    value: "$500K",
    icon: revenueIcon,
    color: "#5cc4c9",
  },
];

const recentActivities = [
  { description: "New booking from John Doe", time: "2 mins ago" },
  { description: "Tour package updated", time: "10 mins ago" },
  { description: "Hotel reservation canceled", time: "1 hour ago" },
  { description: "Added a new tour: Desert Safari", time: "3 hours ago" },
  { description: "Revenue report generated", time: "5 hours ago" },
];

export default Dashboard;
