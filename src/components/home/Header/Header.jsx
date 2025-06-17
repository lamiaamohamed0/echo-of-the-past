import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaCaretDown, FaPlane } from "react-icons/fa";
import { gsap } from "gsap";
import { useSelector } from "react-redux";
import logo from "../../../assets/images/logo222.png";
import bannerImgOne from "../../../assets/images/b.jpg"; // Your banner image
import { navBarList } from "../../../constants";
import Flex from "../../designLayouts/Flex";
import "./Header.css"; // Assuming custom CSS

const Header = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser")) || null;
  const products = useSelector((state) => state.orebiReducer.products || []);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const bannerRef = useRef();
  const userMenuRef = useRef(null); // Ref for detecting clicks outside user menu

  // Check if we are on the homepage
  const isHomePage = location.pathname === "/";

  // GSAP animation for the banner on homepage
  useEffect(() => {
    if (isHomePage) {
      gsap.to(bannerRef.current, {
        scale: 1.1,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, [isHomePage]);

  // Close the dropdown menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUser(false); // Close the menu if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup event listener
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="w-full relative bg-[#0d2238]">
      {/* Conditionally render the banner */}
      {isHomePage && (
        <div className="relative w-full h-[100vh]">
          <div
            ref={bannerRef}
            className="absolute top-0 left-0 w-full h-full banner-background"
            style={{ backgroundImage: `url(${bannerImgOne})` }}
          ></div>
          <div className="absolute inset-0  top-1/2  items-center justify-center text-center text-white z-20">
            <div className="px-2 pb-390 text-left pl-20">
              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-Inter mb-4 leading-tight tracking-wide drop-shadow-md animate-fade-in font-extrabold  text-[80px]">
                EGYPT </h1>

              {/* Subtitle */}
              <p className="text-lg lg:text-xl max-w-3xl  mb-4 leading-relaxed opacity-90 animate-slide-up font-Inter ">
                Let us be your guide through a journey filled with unforgettable moments, deep within the heart of Egypt’s timeless wonders!
              </p>

              {/* Button */}
              <button
                onClick={() => navigate("/shop")}
                className="bg-gradient-to-r font-Inter from-[#46A29F] to-[#E6C78A] hover:from-[#E6C78A] hover:to-[#46A29F] text-[#fdfaf4] font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-bounce-slow"
              >
                Plan Your Trip
              </button>
            </div>
          </div>


          {/* Overlay for the header */}
          <div className="absolute top-0 left-0 w-full z-50 bg-gradient-to-b from-black/40 via-transparent to-transparent">
            {/* Header */}
            <nav className="h-20 px-11 max-w-container mx-auto relative flex items-center justify-between ">
              {/* Left Section: Logo */}
              <div className="w-1/4 flex justify-start">
                <Link to="/">
                  <img className="  w-40 object-cover  -mt-8 " src={logo} alt="Logo" />
                </Link>
              </div>

              {/* Center Section: Navigation Links */}
              <div className="w-1/2 hidden lg:flex justify-center">
                <ul className="flex items-center w-auto gap-6 text-[#E6C78A] ">
                  {navBarList.map(({ _id, title, link }) => (
                    <NavLink
                      key={_id}
                      className="text-lg font-medium  hover:rounded-lg text-[#fdfaf4]  transition-all duration-300"
                      to={link}
                      state={{ data: location.pathname.split("/")[1] }}
                    >
                      <li>{title}</li>
                    </NavLink>
                  ))}
                </ul>
              </div>

              {/* Right Section: Icons & User Menu */}
              <div className="w-1/4 flex justify-end items-center gap-4">
                {/* Cart Icon */}
                <Link to="/cart">
                  <div className="relative">
                    <FaPlane className="w-6 h-6 text-[#E6C78A]" />
                    <span className="absolute top-0 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-[#46A29F] text-white">
                      {products.length > 0 ? products.length : 0}
                    </span>
                  </div>
                </Link>

                {/* User Menu */}
                <div
                  ref={userMenuRef} // Attach the ref to the user menu
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click from bubbling up
                    setShowUser(!showUser); // Toggle the dropdown visibility
                  }}
                  className="relative flex items-center cursor-pointer"
                >
                  <FaUser className="text-[#E6C78A] hover:scale-125 transition-transform duration-300" />
                  <FaCaretDown className="text-[#E6C78A]" />
                  {showUser && (
                    <ul className="absolute right-0  w-50 mt-32 bg-[#46A29F] items-center justify-center shadow-lg rounded-lg border border-[#E6C78A] flex flex-col">
                      {!user ? (
                        <>
                          <li
                            onClick={() => {
                              setShowUser(false);
                              navigate("/signin");
                            }}
                            className="px-4 py-2  text-sm text-[#fdfaf4]  cursor-pointer mb-1 mt-1"
                          >
                            Login
                          </li>
                          <li
                            onClick={() => {
                              setShowUser(false);
                              navigate("/signup");
                            }}
                            className="px-4 py-2  text-sm text-[#fdfaf4]  cursor-pointer"
                          >
                            SignUp
                          </li>
                        </>
                      ) : (
                        <>
                          {user?.isAdmin && (
                            <Link
                              onClick={() => setShowUser(false)}
                              to="/dashboard"
                              className="linkStyle"
                            >
                              Dashboard
                            </Link>
                          )}
                          <li
                            onClick={() => {
                              setShowUser(false);
                              handleLogout();
                              navigate("/");
                            }}
                            className="px-4 py-2 text-sm text-[#fdfaf4]  cursor-pointer"
                          >
                            Logout
                          </li>
                        </>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </nav>
            {/* Banner Content */}

          </div>
        </div>
      )}


      {/* Regular Header for other pages */}
      {!isHomePage && (
        <div className="w-full bg-[#fdfaf4] h-20 sticky top-0 z-50 pharaoh-header mb-40">
          <nav className="h-full px-4 max-w-container mx-auto relative ">
            <Flex className="flex items-center justify-between h-full w-full mb-11">
              {/* Left Section: Logo */}
              <div className="w-1/4 flex justify-start">
                <Link to="/">
                  <img className="w-40 object-cover -mt-8" src={logo} alt="Logo" />
                </Link>
              </div>

              {/* Center Section: Navigation Links */}
              <div className="w-1/2 hidden lg:flex justify-center">
                <ul className="flex items-center w-auto gap-6 text-[#E6C78A]">
                  {navBarList.map(({ _id, title, link }) => (
                    <NavLink
                      key={_id}
                      className="text-lg font-medium hover:text-[#5F4C34] relative text-black transition-all duration-300"
                      to={link}
                      state={{ data: location.pathname.split("/")[1] }}
                    >
                      <li className="relative group">
                        {title}
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#E6C78A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                      </li>
                    </NavLink>
                  ))}
                </ul>
              </div>


              {/* Right Section: Icons & User Menu */}
              <div className="w-1/4 flex justify-end items-center gap-4">
                <div className="flex items-center gap-2">
                  {/* Cart Icon */}
                  <Link to="/cart">
                    <div className="relative">
                      <FaPlane className="w-6 h-6 text-[#E6C78A]" />
                      <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-[#46A29F] text-white">
                        {products.length > 0 ? products.length : 0}
                      </span>
                    </div>
                  </Link>

                  {/* User Menu */}
                  <div
                    ref={userMenuRef} // Attach the ref to the user menu
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click from bubbling up
                      setShowUser(!showUser); // Toggle the dropdown visibility
                    }}
                    className="relative flex items-center cursor-pointer"
                  >
                    <FaUser className="text-[#E6C78A] hover:scale-125 transition-transform duration-300" />
                    <FaCaretDown className="text-[#E6C78A]" />

                    {showUser && (
                      <ul className="absolute right-0 w-50 mt-32 bg-[#46A29F] flex flex-col items-center justify-center shadow-lg rounded-lg border border-[#E6C78A]">
                        {!user ? (
                          <>
                            <li
                              onClick={() => {
                                setShowUser(false);
                                navigate("/signin");
                              }}
                              className="px-4 py-2 text-sm text-[#fdfaf4] cursor-pointer mb-1 mt-1"
                            >
                              Login
                            </li>
                            <li
                              onClick={() => {
                                setShowUser(false);
                                navigate("/signup");
                              }}
                              className="px-4 py-2 text-sm text-[#fdfaf4] cursor-pointer"
                            >
                              SignUp
                            </li>
                          </>
                        ) : (
                          <>
                            {user?.isAdmin && (
                              <Link
                                onClick={() => setShowUser(false)}
                                to="/dashboard"
                                className="px-4 py-2 text-sm text-[#fdfaf4] cursor-pointer"
                              >
                                Dashboard
                              </Link>
                            )}
                            <li
                              onClick={() => {
                                setShowUser(false);
                                handleLogout();
                                navigate("/");
                              }}
                              className="px-4 py-2 text-sm text-[#fdfaf4] cursor-pointer"
                            >
                              Logout
                            </li>
                          </>
                        )}
                      </ul>
                    )}
                  </div></div>


              </div>
            </Flex>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;
