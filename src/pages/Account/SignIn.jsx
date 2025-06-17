import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Signphoto from "../../assets/images/logo.png";
import GoogleLogin from "react-google-login";
import { gsap } from "gsap";
import 'font-awesome/css/font-awesome.min.css';
import "./Signin.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [emailOrUser, setEmailOrUser] = useState("");
  const [password, setPassword] = useState("");
  const [errEmailOrUser, setErrEmailOrUser] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    gsap.fromTo(
      ".left-section",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrEmailOrUser("");
    setErrPassword("");
    setServerError("");

    let formIsValid = true;
    if (!emailOrUser.trim()) {
      setErrEmailOrUser("Enter your username or email");
      formIsValid = false;
    }
    if (!password) {
      setErrPassword("Enter your password");
      formIsValid = false;
    }
    if (!formIsValid) return;

    try {
      const res = await axios.post(
        "http://echoesofthepast.runasp.net/api/User/Account/Login",
        {
          userName: emailOrUser,
          password: password,
        }
      );

      // If your API returns a JWT or user object, store it here:
      // localStorage.setItem("token", res.data.token);
      // localStorage.setItem("loggedInUser", JSON.stringify(res.data.user));

      // For now, assume success:
      navigate("/");
    } catch (err) {
      if (err.response?.data) {
        const data = err.response.data;
        // handle field‐level errors if your API returns them:
        if (data.userName) setErrEmailOrUser(data.userName);
        if (data.password) setErrPassword(data.password);
        // or generic message:
        if (typeof data === "string") setServerError(data);
      } else {
        setServerError("Network or server error. Please try again.");
      }
    }
  };

  const handleGoogleLogin = (response) => {
    if (response?.profileObj) {
      // you could send the token to your API for server‐side verification
      localStorage.setItem("loggedInUser", JSON.stringify(response.profileObj));
      navigate("/");
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{ backgroundColor: "#fdfaf4" }}
    >
      {/* Left Section */}
      <div className="w-1/3 hidden lgl:inline-flex h-full text-white relative left-section">
        <div className="w-[550px] h-full bg-[#E6C78A] px-10 flex flex-col items-center justify-center relative">
          <div className="w-[350px] h-[450px] bg-[#46A29F] flex justify-center items-center rounded-3xl mb-6 relative moving-section">
            <div className="absolute top-20 left-70 flex flex-col items-center justify-center text-center z-0">
              <h1
                className="font-titleFont text-5xl font-medium mb-2"
                style={{
                  color: "white",
                  textShadow: "2px 3px 5px rgba(0, 0, 0, 0.4)",
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
        <form
          className="w-full lgl:w-[450px] h-screen flex items-center justify-center"
          onSubmit={handleSignIn}
        >
          <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-auto scrollbar-thin scrollbar-thumb-primeColor">
            <h1
              className="font-titleFont font-semibold text-3xl mb-4 text-center"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              LOGIN
            </h1>

            {/* Server Error */}
            {serverError && (
              <p className="text-red-500 text-center mb-4">{serverError}</p>
            )}

            {/* Username or Email */}
            <div className="flex flex-col mb-4">
              <label className="font-titleFont text-base font-semibold mb-1">
                Username or Email
              </label>
              <div className="relative">
                <i
                  className="fa fa-user absolute left-3 top-2"
                  style={{ color: "#46A29F" }}
                />
                <input
                  type="text"
                  placeholder="User_Name or User@gmail.com"
                  value={emailOrUser}
                  onChange={(e) => {
                    setEmailOrUser(e.target.value);
                    setErrEmailOrUser("");
                  }}
                  className="w-full h-8 pl-10 rounded-md border outline-none px-4"
                  style={{ backgroundColor: "#e4d1aee0" }}
                />
              </div>
              {errEmailOrUser && (
                <p className="text-sm text-red-500 mt-1">{errEmailOrUser}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col mb-6">
              <label className="font-titleFont text-base font-semibold mb-1">
                Password
              </label>
              <div className="relative">
                <i
                  className="fa fa-lock absolute left-3 top-2"
                  style={{ color: "#46A29F" }}
                />
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrPassword("");
                  }}
                  className="w-full h-8 pl-10 rounded-md border outline-none px-4"
                  style={{ backgroundColor: "#e4d1aee0" }}
                />
              </div>
              {errPassword && (
                <p className="text-sm text-red-500 mt-1">{errPassword}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-10 rounded-md text-white font-medium bg-gradient-to-r from-[#A79277] to-[#E6C78A] hover:bg-black duration-300"
            >
              Login Now
            </button>

            <p className="text-sm text-center mt-4">
              Don't have an Account?{" "}
              <Link to="/signup">
                <span className="text-[#46A29F] hover:underline">Sign up</span>
              </Link>
            </p>

            <p className="text-sm text-center my-4">
              <span className="text-[#A79277]">—— OR ——</span>
            </p>

            {/* Google Login */}
            <div className="flex justify-center">
              <GoogleLogin
                clientId="YOUR_GOOGLE_CLIENT_ID"
                onSuccess={handleGoogleLogin}
                onFailure={(err) => console.error(err)}
                buttonText="Login with Google"
                className="google-login-button"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
