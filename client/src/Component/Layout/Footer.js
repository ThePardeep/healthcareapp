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

        <Link className="link3" to="/tmc">
          Terms And Conditions
        </Link>
        <a className="link4" target="blank" href="https://www.mohfw.gov.in/">
          Mohfw
        </a>
      </div>
      <div className="social">
        <div className="media1">
          <i className="fa fa-facebook"></i>
        </div>
        <div className="media2">
          <i className="fa fa-twitter"></i>
        </div>
        <div className="media3">
          <i className="fa fa-whatsapp"></i>
        </div>
      </div>
    </div>
  );
};
