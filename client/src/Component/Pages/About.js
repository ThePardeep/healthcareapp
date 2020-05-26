import React from "react";

export const About = () => {
  return (
    <div className="all-state">
      <div className="heading">
        <h4>About Us</h4>
      </div>
      <hr className="hr-style" />
      <div className="body" style={{ textAlign: "left", margin: "10px 20px" }}>
        <div className="about-data">
          <ul className="about-list">
            <li>
              <b>Created By :</b> Pardeep Saini
            </li>
            <li>
              <b>Version :</b> 1.0.0
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
