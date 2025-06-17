import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import AOS from "aos"; 
import "aos/dist/aos.css";  
import '@fortawesome/fontawesome-free/css/all.min.css'; 
const Contact = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    }
    AOS.init({ duration: 1000 });
  }, [location]);

  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");

  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMessages, setErrMessages] = useState("");

  const [successMsg, setSuccessMsg] = useState("");

  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
    setSuccessMsg("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
    setSuccessMsg("");
  };

  const handleMessages = (e) => {
    setMessages(e.target.value);
    setErrMessages("");
    setSuccessMsg("");
  };

  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handlePost = (e) => {
    e.preventDefault();
    let valid = true;

    if (!clientName) {
      setErrClientName("Enter your Name");
      valid = false;
    }
    if (!email) {
      setErrEmail("Enter your Email");
      valid = false;
    } else if (!EmailValidation(email)) {
      setErrEmail("Enter a Valid Email");
      valid = false;
    }
    if (!messages) {
      setErrMessages("Enter your Message");
      valid = false;
    }
    if (valid) {
      setSuccessMsg(
        `Thank you dear ${clientName}, Your message has been received successfully. Further details will be sent to you by email at ${email}.`
      );
    }
  };

  return (
    <div className="max-w-container mx-auto px-4 scroll-smooth">
      <Breadcrumbs
        title={
          <span className="font-titleFont font-semibold text-4xl sm:text-5xl text-[#46A29F] text-center relative ">
            <i className="fas fa-pyramid text-3xl absolute left-[-30px] top-[-10px] text-[#E6C78A]" />
            <span className="block text-sm sm:text-md text-[#E6C78A] mt-2">We'd love to hear from you</span>
          </span>
        }
      />
      {successMsg ? (
        <p className="pb-20 w-96 font-medium text-green-500" data-aos="fade-in">
          <i className="fas fa-check-circle text-green-500 mr-2" />
          {successMsg}
        </p>
      ) : (
        <form
          className="pb-20 space-y-6 fadeIn"
          onSubmit={handlePost}
          data-aos="fade-up"
        >
          <h1
            className="font-titleFont font-semibold text-3xl text-center text-[#46A29F]"
            data-aos="fade-up"
          >
            <i className="fas fa-crown text-2xl mr-2" />
            Fill up the Form
          </h1>
          <div className="w-[500px] mx-auto py-6 flex flex-col gap-6" data-aos="fade-up">
            {/* Name Field */}
            <div className="transition-transform transform hover:scale-105">
              <label htmlFor="name" className="text-base font-titleFont font-semibold px-2">
                Name
              </label>
              <input
                id="name"
                onChange={handleName}
                value={clientName}
                className="w-full py-2 border-b-2 border-[#E6C78A] px-4 text-lg font-medium placeholder:text-sm focus:ring-2 focus:ring-[#46A29F] transition-all duration-300 ease-in-out"
                type="text"
                placeholder="Enter your name here"
              />
              {errClientName && (
                <p className="text-red-500 text-sm mt-1 px-2 flex items-center gap-1">
                  <i className="fas fa-exclamation-circle text-sm" />
                  {errClientName}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="transition-transform transform hover:scale-105">
              <label htmlFor="email" className="text-base font-titleFont font-semibold px-2">
                Email
              </label>
              <input
                id="email"
                onChange={handleEmail}
                value={email}
                className="w-full py-2 border-b-2 border-[#E6C78A] px-4 text-lg font-medium placeholder:text-sm focus:ring-2 focus:ring-[#46A29F] transition-all duration-300 ease-in-out"
                type="email"
                placeholder="Enter your email here"
              />
              {errEmail && (
                <p className="text-red-500 text-sm mt-1 px-2 flex items-center gap-1">
                  <i className="fas fa-exclamation-circle text-sm" />
                  {errEmail}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="transition-transform transform hover:scale-105">
              <label htmlFor="message" className="text-base font-titleFont font-semibold px-2">
                Message
              </label>
              <textarea
                id="message"
                onChange={handleMessages}
                value={messages}
                cols="30"
                rows="3"
                className="w-full py-2 border-b-2 border-[#E6C78A] px-4 text-lg font-medium placeholder:text-sm focus:ring-2 focus:ring-[#46A29F] resize-none transition-all duration-300 ease-in-out"
                placeholder="Enter your message here"
              ></textarea>
              {errMessages && (
                <p className="text-red-500 text-sm mt-1 px-2 flex items-center gap-1">
                  <i className="fas fa-exclamation-circle text-sm" />
                  {errMessages}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-44 mx-auto bg-[#46A29F] text-white h-12 font-semibold text-lg tracking-wide border border-transparent hover:bg-[#E6C78A] hover:text-[#46A29F] transition-all duration-300 transform hover:scale-105"
            >
              <i className="fas fa-paper-plane mr-2" /> Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Contact;
