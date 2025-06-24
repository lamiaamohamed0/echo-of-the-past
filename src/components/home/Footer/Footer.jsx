import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const [feedback, setFeedback] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const location = useLocation();
  const hiddenPaths = ["/dashboard", "/dashboard/user", "/dashboard/Hotels", "/dashboard/Trips"];

  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  const handleFeedback = async () => {
    if (feedback.trim() === "") {
      setErrMsg("Please provide your feedback!");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      const token = user?.token;

      const formData = new FormData();
      formData.append("Content", feedback);

      const response = await fetch("http://echoesofthepast.runasp.net/api/User/FeedBack/AddFeeback", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setSuccessMsg("Thank you for your feedback!");
        setErrMsg("");
        setFeedback("");
      } else {
        const errorText = await response.text();
        console.error("Error sending feedback:", errorText);
        setErrMsg("Failed to send feedback. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
      setErrMsg("Failed to send feedback. Please try again later.");
    }
  };

  return (
    <footer style={{ backgroundColor: "#e6c78a6b", padding: "20px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "30px", textAlign: "center" }}>
          
          {/* Explore Egypt */}
          <div style={{ flex: 1, minWidth: "200px" }}>
            <h3 style={{ color: "black", fontSize: "1.25rem", fontWeight: "bold" }}>Explore Egypt</h3>
            <p style={{ color: "black", fontSize: "0.875rem", marginTop: "15px" }}>
              Discover Egypt's hidden gems, from ancient pyramids to modern wonders. Join us on exciting tours today!
            </p>
            <ul style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                <motion.div whileHover={{ scale: 1.1 }} style={iconStyle}><FaFacebook size={24} style={{ color: "white" }} /></motion.div>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                <motion.div whileHover={{ scale: 1.1 }} style={iconStyle}><FaInstagram size={24} style={{ color: "white" }} /></motion.div>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <motion.div whileHover={{ scale: 1.1 }} style={iconStyle}><FaTwitter size={24} style={{ color: "white" }} /></motion.div>
              </a>
              <a href="https://www.tiktok.com" target="_blank" rel="noreferrer">
                <motion.div whileHover={{ scale: 1.1 }} style={iconStyle}><FaTiktok size={24} style={{ color: "white" }} /></motion.div>
              </a>
            </ul>
          </div>

          {/* Feedback Section */}
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <h3 style={{ color: "black", fontSize: "1.25rem", fontWeight: "bold" }}>We value your feedback!</h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback here..."
              style={textareaStyle}
            />
            <br />
            <button onClick={handleFeedback} style={buttonStyle}>
              Send
            </button>
            {errMsg && <p style={{ color: "red", marginTop: "10px" }}>{errMsg}</p>}
            {successMsg && <p style={{ color: "green", marginTop: "10px" }}>{successMsg}</p>}
          </div>

          {/* Quick Links */}
          <div style={{ flex: 1, minWidth: "250px" }}>
            <h3 style={{ color: "black", fontSize: "1.25rem", fontWeight: "bold" }}>Top Destinations</h3>
            <ul style={{ marginTop: "20px" }}>
              {["Pyramids", "Nile Cruises", "Luxor", "Cairo Tour"].map((item, idx) => (
                <li key={idx} style={linkStyle}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={{ textAlign: "center", paddingTop: "20px", marginTop: "30px", borderTop: "1px solid #ddd" }}>
          <p style={{ fontSize: "0.875rem", color: "black" }}>&copy; 2025 Echoes Of The Past | All Rights Reserved.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", fontSize: "0.875rem", color: "black", marginTop: "10px" }}>
            {["Contact", "Terms of Use", "Privacy Policy"].map((item, idx) => (
              <a key={idx} href="#" style={{ color: "inherit", textDecoration: "none" }}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const iconStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#46A29F",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  cursor: "pointer",
  transition: "0.3s",
};

const textareaStyle = {
  width: "80%",
  maxWidth: "500px",
  height: "80px",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  resize: "none",
};

const buttonStyle = {
  backgroundColor: "#46A29F",
  color: "white",
  padding: "10px 20px",
  marginTop: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
};

const linkStyle = {
  marginBottom: "10px",
  fontSize: "1rem",
  color: "black",
};

export default Footer;
