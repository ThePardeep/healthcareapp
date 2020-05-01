import React from "react";
import logo from "../../Public/Images/logo.png";
import MetaData from "../../MetaData/MetaData.js";
import Search from "./Search";
const Header = () => {
  return (
    <header className=" header">
      <div className="header_left">
        <div className="header_items">
          <div className="logo">
            <img src={logo} alt={MetaData.Title} />
          </div>
          <div className="heading">
            {MetaData.Title}
            <div className="tagline">{MetaData.Tagline}</div>
          </div>
        </div>
      </div>
      <div className="header-right">
        <div className="header-right-items">
          <div className="search-form">
            <Search />
          </div>
          <div className="search-icon">
            <button type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
          <div className="icon">
            <div className="menuIcon"></div>
            <div className="menuIcon"></div>
            <div className="menuIcon"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
