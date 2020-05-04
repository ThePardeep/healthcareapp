import React from "react";
import logo from "../../Public/Images/logo.png";
import MetaData from "../../MetaData/MetaData.js";
import Search from "./Search";
import { Link } from "react-router-dom";

const Header = () => {
  const sidebarItem = [
    { title: "Home", icon: "fa fa-home", link: "/" },
    { title: "About", icon: "fa fa-info-circle", link: "/about" },
    { title: "All State", icon: "fa fa-list-alt", link: "/state/all" },
    { title: "Facebook", icon: "fa fa-facebook", link: "" },
    { title: "Twitter", icon: "fa fa-twitter", link: "" },
    { title: "Whats App", icon: "fa fa-whatsapp", link: "" },
  ];
  const sideBarFun = (e) => {
    const sidebar = document.querySelector(".sidebar");
    let sidebarDisplay = sidebar.style.display;
    if (sidebarDisplay === "none") {
      sidebar.style.setProperty("animation", "moveLeftSidebar 1.5s");
      sidebar.style.display = "block";
    } else {
      sidebar.style.setProperty("animation", "moveRightSidebar 1.1s");
      setTimeout(() => {
        sidebar.style.display = "none";
      }, 1000);
    }
  };
  return (
    <header className=" header">
      <div className="sidebar" style={{ display: "none" }}>
        <div className="sidebar-items">
          {sidebarItem.map((item, index) => {
            return (
              <div className="sidebar-item" key={index}>
                <Link title={item.title} to={item.link}>
                  <i className={item.icon}></i>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="header_left">
        <div className="header_items">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt={MetaData.Title} />
            </Link>
          </div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="heading">
              {MetaData.Title}
              <div className="tagline">{MetaData.Tagline}</div>
            </div>
          </Link>
        </div>
      </div>
      <div className="header-right">
        <div className="header-right-items">
          <div className="search-form">
            <Search />
          </div>
          <div className="search-icon">
            <button
              type="submit"
              onClick={() => {
                const searchForm = document.querySelector(".mob-search-form");
                if (searchForm) {
                  window.scrollTo(0, searchForm.offsetTop);
                }
              }}
            >
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
          <div className="icon" onClick={sideBarFun}>
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
