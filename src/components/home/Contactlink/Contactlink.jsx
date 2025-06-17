import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContactPhoto from "../../../assets/images/p.jfif";
import { motion } from "framer-motion";

const ContactLink = () => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when 10% of the section is in view
    );

    const element = document.getElementById("contactLink");
    if (element) observer.observe(element);

    return () => element && observer.unobserve(element);
  }, []);

  return (
    <Link to="/contact">
      <motion.div
        id="contactLink"
        initial={{
          opacity: 0,
          y: 200,
          rotate: 10, // Initial rotation
        }}
        animate={{
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : 200,
          rotate: isInView ? 0 : 10, // Rotate back when in view
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative rounded-full shadow-md w-full h-[35vh] md:w-[70%] lg:w-[100%] mx-auto mb-20 bg-[#f3f3f3] md:bg-transparent overflow-hidden"
      >
        {/* Background Image */}
        <img
          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition duration-500"
          src={ContactPhoto}
          alt="Explore Egypt"
        />
        {/* Overlay Content */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-6 p-8 md:p-12 bg-gradient-to-t from-black/70 to-transparent">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-white text-center"
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -30 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Explore Egypt
          </motion.h1>
          <motion.p
            className="text-sm md:text-base font-medium text-white/80 leading-relaxed text-center"
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            Ready to embark on your journey? Contact us now to plan your perfect
            Egyptian vacation!
          </motion.p>
          <motion.button
            className="px-6 py-2 bg-[#46A29F] text-white font-semibold rounded-full shadow-md hover:bg-[#E6C78A] hover:text-black transform hover:scale-105 transition-all duration-300"
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
            transition={{ duration: 1.4 }}
          >
            Contact Us
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
};

export default ContactLink;
