import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Signphoto from "../../assets/images/logo.png";
import { gsap } from "gsap";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import "./Signup.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    gsap.fromTo(
      ".left-section",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    // reset errors
    setErrClientName("");
    setErrEmail("");
    setErrPassword("");
    setErrConfirmPassword("");
    setSuccessMsg("");

    if (!checked) {
      alert("You must agree to the Terms of Service and Privacy Policy");
      return;
    }

    let isValid = true;
    if (!clientName.trim()) {
      setErrClientName("Enter your name");
      isValid = false;
    }
    if (!email.trim()) {
      setErrEmail("Enter your email");
      isValid = false;
    }
    if (!password) {
      setErrPassword("Create a password");
      isValid = false;
    } else if (password.length < 6) {
      setErrPassword("Passwords must be at least 6 characters");
      isValid = false;
    }
    if (!confirmPassword) {
      setErrConfirmPassword("Confirm your password");
      isValid = false;
    } else if (confirmPassword !== password) {
      setErrConfirmPassword("Passwords do not match");
      isValid = false;
    }

    if (!isValid) return;

    try {
      const response = await axios.post(
        "http://echoesofthepast.runasp.net/api/User/Account/Register",
        {
          userName: clientName,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }
      );

      if ([200, 201].includes(response.status)) {
        setSuccessMsg("Account created successfully!");
        setClientName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => navigate("/signin"), 2000);
      }
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data) {
        const data = error.response.data;
        if (typeof data === "object") {
          if (data.userName) setErrClientName(data.userName);
          if (data.email) setErrEmail(data.email);
          if (data.password) setErrPassword(data.password);
          if (data.confirmPassword) setErrConfirmPassword(data.confirmPassword);
          if (!data.userName && !data.email && !data.password && !data.confirmPassword) {
            alert("Registration failed: " + JSON.stringify(data));
          }
        } else {
          alert("Registration failed: " + data);
        }
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{ backgroundColor: "#fdfaf4" }}
    >
      {/* Left Section */}
      <div className="w-1/3 hidden lgl:inline-flex h-full text-white relative left-section">
        <div
          className="w-[550px] h-full px-10 flex flex-col items-center justify-center relative"
          style={{ backgroundColor: "#E6C78A" }}
        >
          <div
            className="w-[350px] h-[450px] flex justify-center items-center rounded-3xl mb-6 relative moving-section"
            style={{ backgroundColor: "#46A29F" }}
          >
            <div className="absolute top-20 left-70 flex flex-col items-center justify-center text-center z-0">
              <h1
                className="font-titleFont text-5xl font-medium mb-2 opacity-95"
                style={{
                  color: "white",
                  textShadow: "4px 6px 10px rgba(0, 0, 0, 0.4)",
                }}
              >
                Unlock The Secrets Of Egypt!
              </h1>
            </div>
            <div className="absolute bottom-0 right-10 flex flex-col items-center justify-center text-center z-50">
              <Link to="/">
                <img
                  src={Signphoto}
                  alt="logoImg"
                  className="w-70 h-70 object-contain"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lgl:w-1/2 h-full flex items-center justify-center">
        {successMsg ? (
          <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center px-4">
            <p className="text-green-500 font-medium text-center mb-6">
              {successMsg}
            </p>
            <Link to="/signin">
              <button className="w-full h-10 bg-primeColor text-gray-200 rounded-md font-semibold hover:bg-black hover:text-white duration-300">
                Go to Sign In
              </button>
            </Link>
          </div>
        ) : (
          <form
            className="w-full lgl:w-[450px] h-screen flex items-center justify-center"
            onSubmit={handleSignUp}
          >
            <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-auto scrollbar-thin scrollbar-thumb-primeColor">
              <h1
                className="font-titleFont font-semibold text-3xl mb-4 text-center"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                SIGN UP
              </h1>

              {/* Full Name */}
              <div className="flex flex-col mb-4">
                <label className="text-base font-semibold mb-1">Full Name</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#46A29F]" />
                  <input
                    type="text"
                    placeholder="Firstname Lastname"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full h-8 pl-10 rounded-md border outline-none px-4"
                    style={{ backgroundColor: "#e4d1aee0" }}
                  />
                </div>
                {errClientName && (
                  <p className="text-sm text-red-500 mt-1">{errClientName}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col mb-4">
                <label className="text-base font-semibold mb-1">Email</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#46A29F]" />
                  <input
                    type="email"
                    placeholder="user@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-8 pl-10 rounded-md border outline-none px-4"
                    style={{ backgroundColor: "#e4d1aee0" }}
                  />
                </div>
                {errEmail && (
                  <p className="text-sm text-red-500 mt-1">{errEmail}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col mb-4">
                <label className="text-base font-semibold mb-1">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#46A29F]" />
                  <input
                    type="password"
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-8 pl-10 rounded-md border outline-none px-4"
                    style={{ backgroundColor: "#e4d1aee0" }}
                  />
                </div>
                {errPassword && (
                  <p className="text-sm text-red-500 mt-1">{errPassword}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col mb-4">
                <label className="text-base font-semibold mb-1">Confirm Password</label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#46A29F]" />
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-8 pl-10 rounded-md border outline-none px-4"
                    style={{ backgroundColor: "#e4d1aee0" }}
                  />
                </div>
                {errConfirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{errConfirmPassword}</p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="terms-checkbox"
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                  className="mr-2"
                />
                <label htmlFor="terms-checkbox" className="text-sm">
                  I agree to the{" "}
                  <span className="text-[#437e9c]">Terms of Service</span> and{" "}
                  <span className="text-[#437e9c]">Privacy Policy</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-10 rounded-md text-white font-medium bg-gradient-to-r from-[#A79277] to-[#E6C78A] hover:bg-black duration-300"
              >
                Create Account
              </button>

              <p className="text-sm text-center mt-4">
                Already have an Account?{" "}
                <Link to="/signin">
                  <span className="text-[#46A29F] hover:underline">
                    Sign in
                  </span>
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
