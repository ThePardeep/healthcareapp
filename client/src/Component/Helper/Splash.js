import React from "react";
import splashscreen from "../../Public/Images/splash screen.jpg";
export const Splash = () => {
  const closeSplashScreen = () => {
    localStorage.setItem("sp-screen", false);
    window.location = "/";
  };
  return (
    <div className="sp-screen">
      <div onClick={closeSplashScreen} className="close-btn">
        <i className="fa fa-close"></i>
      </div>
      <img src={splashscreen} alt="splash screen" />
    </div>
  );
};
