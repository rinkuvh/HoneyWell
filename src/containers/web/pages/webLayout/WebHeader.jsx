import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { useSelector } from "react-redux";
import DarkLight from "./DarkLight";

export default function WebHeader({
  currentTab,
  setCurrentTab,
  homeSectionRef,
}) {
  const navigate = PageIndex.useNavigate();
  const [isActive, setIsActive] = useState(false);
  const { token } = useSelector((state) => state.user);
  const handleClick = () => {
    setIsActive((current) => !current);
    document.body.classList[isActive ? "remove" : "add"]("body-overflow");
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY === 0) {
        document
          .getElementById("header-main")
          .classList.remove("sticky-header");
        document
          .getElementById("top-scroll-box");
          // .classList.remove("top-scroll-box-show");
      } else {
        document.getElementById("header-main")?.classList?.add("sticky-header");
        document
          .getElementById("top-scroll-box");
          // .classList.add("top-scroll-box-show");
      }
    });
  }, []);
  const handleClickMenuItem = (id, e) => {
    e.preventDefault();
    var element = window.document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    handleClick();
    setCurrentTab(id);
  };

  return (
    <>
      {/* <Index.Box className="accesibility-box">
        <DarkLight />
      </Index.Box> */}
      <Index.Box className="user-header-wrapper">
        <Index.Box className="user-header-main blur-container" id="header-main">
          <Index.Box className="user-header-container">
            <Index.Box
              className={`user-header-row ${token ? "row-layout" : ""}`}
            >
              <Index.Box className="user-header-cust-col">
                <Index.List className="user-header-logo-list">
                  <Index.ListItem className="user-header-logo-listitem">
                    <Index.Link
                      className="user-header-logo-box"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      <img
                        src={PageIndex.Png.TextLogo}
                        className={`user-header-logo ${token ? "logo-64" : ""}`}
                        alt="logo"
                      />
                    </Index.Link>
                  </Index.ListItem>
                  <Index.ListItem className="user-header-logo-listitem">
                    <Index.Link
                      className="user-header-logo-box"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      <img
                        src={PageIndex.Png.MotorolaLogo}
                        className={`user-header-logo cont-header-logo ${token ? "logo-64" : ""}`}
                        alt="logo"
                      />
                    </Index.Link>
                  </Index.ListItem>
                  <Index.ListItem className="user-header-logo-listitem">
                    <Index.Link
                      className="user-header-logo-box"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      <img
                        src={PageIndex.Png.BharatCaresLogo}
                        className={`user-header-logo ${token ? "logo-64" : ""}`}
                        alt="logo"
                      />
                    </Index.Link>
                  </Index.ListItem>
                </Index.List>
              </Index.Box>
              <Index.Box className="user-header-cust-col">
                <Index.Box className="user-header-nav-wrapper">
                  <Index.Box
                    className={`user-header-nav-main ${
                      isActive ? "user-mobilemenu-active" : ""
                    }`}
                  >
                    <Index.Box className="user-mobile-navbar-show">
                      <Index.Box className="user-mobile-navbar-head">
                        <Index.Box className="user-mobile-navbar-logo-flex">
                          <Index.Link to={"/"}>
                            <img
                              src={PageIndex.Png.CombineLogo}
                              className="user-header-nav-logo"
                              alt="logo"
                            />
                          </Index.Link>
                        </Index.Box>

                        <Index.Button
                          className="user-mobile-navbar-close-btn"
                          onClick={handleClick}
                        >
                          <img
                            src={PageIndex.Svg.closeblack}
                            className="user-mobile-navbar-close"
                            alt="close"
                          />
                        </Index.Button>
                      </Index.Box>
                    </Index.Box>
                    <Index.List className="user-header-nav-ul">
                      <Index.ListItem
                        className={`user-header-nav-li${
                          currentTab === "home-hero-main" ? " active" : ""
                        }`}
                      >
                        <Index.Link
                          className="user-header-nav-link"
                          // to="/#home-hero-main"
                          onClick={(e) => {
                            handleClickMenuItem("home-hero-main", e);
                          }}
                        >
                          Home
                        </Index.Link>
                      </Index.ListItem>
                      <Index.ListItem
                        className={`user-header-nav-li${
                          currentTab === "courses" ? "active" : ""
                        }`}
                      >
                        <Index.Link
                          className="user-header-nav-link"
                          // to="/#home-hero-main"
                          onClick={(e) => {
                            handleClickMenuItem("courses", e);
                          }}
                        >
                          Courses
                        </Index.Link>
                      </Index.ListItem>
                      <Index.ListItem
                        className={`user-header-nav-li${
                          currentTab === "about-coustomer-main" ? " active" : ""
                        }`}
                      >
                        <Index.Link
                          className="user-header-nav-link"
                          // to="/#about-coustomer-main"
                          onClick={(e) => {
                            handleClickMenuItem("about-coustomer-main", e);
                          }}
                        >
                          About us
                        </Index.Link>
                      </Index.ListItem>
                      {/* <Index.ListItem className="user-header-nav-li">
                        <Index.Link
                          // to={"/"}
                          className="user-header-nav-link"
                          onClick={(e) => {
                            handleClickMenuItem("faq-main", e);
                          }}
                        >
                         FAQ
                        </Index.Link>
                      </Index.ListItem> */}
                      <Index.ListItem 
                      className={`user-header-nav-li${
                        currentTab === "contact-us" ? " active" : ""
                      }`}
                      >
                        <Index.Link
                          // to={"/"}
                          className="user-header-nav-link"
                          onClick={(e) => {
                            handleClickMenuItem("contact-us", e);
                          }}
                        >
                          Contact us
                        </Index.Link>
                      </Index.ListItem>
                      {token && (
                        <Index.ListItem className="user-header-nav-li">
                          <Index.Link
                            to={"/user/dashboard"}
                            className="user-header-nav-link"
                            onClick={() => {
                              // handleClickMenuItem("dashboard", e);
                              // navigate("/user/dashboard");
                            }}
                          >
                            Dashboard
                          </Index.Link>
                        </Index.ListItem>
                      )}
                    </Index.List>
                  </Index.Box>
                  <Index.Box
                    className={`user-header-right-main primary-btn-main border-btn-main ${
                      token ? "menu-end" : ""
                    }`}
                  >
                    {!token && (
                      <Index.Box className="head-auth-btn-box">
                        <Index.Button
                          className="header-login-btn"
                          onClick={() => {
                            navigate("/user/sign-up");
                          }}
                        >
                          Sign Up
                        </Index.Button>
                        <Index.Button
                          className="header-login-btn"
                          onClick={() => {
                            navigate("/user");
                          }}
                        >
                          Login
                        </Index.Button>
                      </Index.Box>
                    )}
                    <Index.Box>
                      <DarkLight />
                    </Index.Box>
                    <Index.Button
                      className="user-mobile-menu-btn"
                      onClick={handleClick}
                    >
                      <img
                        src={PageIndex.Svg.menuIcon}
                        className="user-mobile-menu-icon"
                      />
                    </Index.Button>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}
