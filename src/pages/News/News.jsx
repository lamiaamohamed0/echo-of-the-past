import React from "react";
import { motion } from "framer-motion";
import bg from "../../assets/images/v1.png";
import bg2 from "../../assets/images/v2.png";
import bg3 from "../../assets/images/v3.png";
import artifactIcon from "../../assets/images/anubis.png"
const statues = [
  {
    id: 1,
    image: bg,
    title: "Tutankhamun's Golden Mask",
    description:
      "The mask is one of the most iconic symbols of ancient Egypt, representing the young pharaoh's beauty and power.",
  },
  {
    id: 2,
    image: bg2,
    title: "Statue of Ramses II",
    description:
      "A massive depiction of the great pharaoh who ruled for 66 years, celebrated for his architectural achievements.",
  },
  {
    id: 3,
    image: bg3,
    title: "Bust of Nefertiti",
    description:
      "This masterpiece represents the queen's elegance and is a symbol of feminine beauty in ancient Egypt.",
  },
];

const News = () => {
  return (
    <div className="container mx-auto py-10 px-4 bg-[#fdfaf4]">
      <div className="flex items-center justify-center mb-6">
        <img src={artifactIcon} alt="Artifact Icon" className="w-10 h-10 mr-3" />
        <h1 className="text-3xl sm:text-4xl font-bold text-black">
          Ancient Egyptian Artifacts
        </h1>
      </div>

      {/* Card Layout */}
      <div className="flex flex-wrap justify-between items-center gap-10">
        {statues.map((statue, index) => (
          <div
            key={statue.id}
            className="flex flex-col md:flex-row items-center w-full h-280 gap-6 p-6 md:col-span-2 bg-[#e6c78a10] shadow-md border-t-4 border-[#10AAB2] rounded-lg  transition-all duration-300 hover:scale-15 hover:shadow-xl transform hover:translate-y-[-5px] hover:cursor-pointer"
            style={{
              flexDirection: index % 2 === 0 ? "row" : "row-reverse", // Flip the layout direction
            }}
          >
            {/* Image Section */}
            <motion.div
              initial={{
                x: index % 2 === 0 ? "100vw" : "-100vw",
                opacity: 0,
              }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="relative w-30 h-80 md:w-1/3 "
            >
              <img
                src={statue.image}
                alt={statue.title}
                className="w-full h-full   transition-all hover:scale-110"
              />
            </motion.div>

            {/* Text Section */}
            <motion.div
              initial={{
                x: index % 2 === 0 ? "-100vw" : "100vw",
                opacity: 0,
              }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="w-full md:w-1/2 lg:w-2/3"
            >
              <h3 className="text-2xl font-semibold text-[#46A29F] transition-all duration-300 ease-in-out hover:text-[#e6c78a] mb-4">
                {statue.title}
              </h3>
              <p className="text-base text-gray-700 transition-all duration-300 ease-in-out hover:text-[#46A29F] mb-4">
                {statue.description}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
