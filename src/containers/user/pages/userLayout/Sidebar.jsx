import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";

export default function UserSidebar(props) {
  // for page redirect
  const location = useLocation();

  // for submenu dropdown
  const [openSubMenu, setOpenSubmenu] = React.useState(true);
  const [screen, setScreen] = useState("");
  const handleClickAccount = () => {
    setOpenSubmenu(!openSubMenu);
  };

  // for mobile menu sidebar
  useEffect(() => {
    if (window.innerWidth < 786) {
      props.setOpen(false);
    } else {
      props.setOpen(true);
    }
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 786) {
        props.setOpen(false);
      } else {
        props.setOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 786) {
      document.body.classList[props.open ? "add" : "remove"](
        "admin-body-overflow"
      );
    }
  }, [props.open]);
  return (
    <Index.Box className={`admin-sidebar-main`}>
      <Index.Box className="admin-sidebar-inner-main">
        <Index.Box className="mobile-sidebar-close-box">
          <Index.Button
            className="mobile-sidebar-close-btn"
            onClick={() => props.setOpen(!props.open)}
          >
            <img
              src={PageIndex.Svg.roundCloseIcon}
              alt="closeIcon"
              className="mobile-sidebar-close-icon"
            />
          </Index.Button>
        </Index.Box>
        <Index.Box className="admin-sidebar-list-main scrollbar">
          <Index.List className="admin-sidebar-list">
            <Index.ListItem
              className={
                location?.pathname.includes("/user/dashboard")
                  ? "admin-sidebar-listitem active"
                  : "admin-sidebar-listitem "
              }
            >
              <Index.Tooltip
                title="Dashboard"
                arrow
                placement="right"
                className="admin-tooltip"
              >
                <Index.Link
                  to="/user/dashboard"
                  onClick={() => {
                    if (window.innerWidth < 786) {
                      props.setOpen(!props.open);
                    }
                  }}
                  className="admin-sidebar-link"
                >
                  <img
                    src={PageIndex.Svg.DashboardIcon}
                    className="admin-sidebar-icons"
                  />
                  <span className="admin-sidebar-link-text">Dashboard</span>
                </Index.Link>
              </Index.Tooltip>
            </Index.ListItem>
          </Index.List>
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
}
