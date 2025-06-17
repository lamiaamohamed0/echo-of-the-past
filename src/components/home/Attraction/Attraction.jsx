import React, { useRef, useEffect,useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import pyramidsImage from "./../../../assets/images/pyramids.jfif";
import NileImage from "./../../../assets/images/nile.jfif";
import redseaImage from "./../../../assets/images/redsea.jfif";
import laImage from "./../../../assets/images/la.jfif";

const EgyptAttractions = () => {
  const attractions = [
    {
      imgSrc: pyramidsImage,
      title: "The Pyramids & Sphinx",
      description: "Marvel at one of the Seven Wonders of the World and uncover the mysteries of ancient Egyptian civilization.",
      rating: 5,
    },
    {
      imgSrc: NileImage,
      title: "The Nile River",
      description: "Experience enchanting boat rides along the Nile and discover stunning views and unforgettable moments.",
      rating: 5,
    },
    {
      imgSrc: redseaImage,
      title: "The Red Sea & Sharm El Sheikh",
      description: "Relax on sandy beaches and enjoy marine activities like snorkeling and diving in the crystal-clear Red Sea.",
      rating: 5,
    },
    {
      imgSrc: laImage,
      title: "Luxor & Aswan",
      description: "Visit the world's largest open-air museum and explore incredible temples and ancient wonders.",
      rating: 5,
    },
  ];

  
  const controls = useAnimation();

  const { inView, ref } = useInView({
    triggerOnce: false, 
    threshold: 0.2, 
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible"); 
    } else {
      controls.start("hidden"); 
    }
  }, [inView, controls]);

  
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  const [isClicked, setIsClicked] = useState(false);
  const handleCardClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <div
      ref={ref}
      className="py-20 px-6 md:px-16 lg:px-32 bg-[#fdfaf4]"
      >
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
        >
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Discover Egypt's Top Attractions
          </h1>
          <p className="text-lg text-gray-600">
            Explore the must-see destinations in Egypt! From the Pyramids and the
            Sphinx in Giza to the temples of Luxor and Karnak, and bustling
            bazaars in Cairo to the Red Sea's vibrant beaches. Each place tells a
            story, and each visit takes you on a journey through thousands of
            years of history.
          </p>
        </motion.div>
  
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {attractions.map((attraction, index) => (
            <motion.div
              key={index}
              className="relative bg-white shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:border-2 hover:border-yellow-500 group"
              variants={cardVariants}
              whileHover={{
                scale: 1,
                rotate: 1.6,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
              }}
              onClick={handleCardClick}
              style={{ transform: isClicked ? "scale(1.1)" : "scale(1.01)" }}
            >
              <div className="relative overflow-hidden group h-56">
                <motion.img
                  src={attraction.imgSrc}
                  alt={attraction.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-60 transition-opacity duration-400"></div>
              </div>
              <div className="p-6">
                <motion.h2
                  className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-[#E6C78A] transition-colors duration-200"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  {attraction.title}
                </motion.h2>
                <motion.p
                  className="text-gray-600 mb-4 group-hover:text-gray-800 transition-colors duration-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  {attraction.description}
                </motion.p>
                <div className="flex items-center">
                  {Array.from({ length: attraction.rating }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-[#E6C78A] text-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  };
  
export default EgyptAttractions;
