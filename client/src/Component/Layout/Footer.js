import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer-container">
      <div className="links">
        <Link className="link1" to="/about">
          About Us
        </Link>
        <Link className="link2" to="/privacy-polices">
          Privacy Polices
        </Link>
        <Link className="link3" to="link4">
          Some
        </Link>
        <Link className="link4" to="/tmc">
          Terms And Conditions
        </Link>
      </div>
      <div className="social">
        <div className="media1"></div>
        <div className="media2"></div>
        <div className="media3"></div>
        <div className="media4"></div>
      </div>
    </div>
  );
};
