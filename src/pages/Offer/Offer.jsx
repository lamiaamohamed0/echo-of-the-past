import React, { useState } from "react";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [prevLocation] = useState("");
  const { category } = useParams();

  // Inline styles
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    backgroundColor: '#f8f9fa', 
    minHeight: '100vh',
  };

  const headerStyle = {
    marginBottom: '2rem',
  };

  const flexContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    paddingBottom: '3rem',
  };

  const specialOffersStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    backgroundColor: '#fff', 
    padding: '1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <Breadcrumbs title={category} prevLocation={prevLocation} />
      </div>
      {/* ================= Products Start here =================== */}
      <div style={flexContainerStyle}>
        {/* Main content area */}
        <div style={specialOffersStyle}>
          <SpecialOffers />
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Offer;
