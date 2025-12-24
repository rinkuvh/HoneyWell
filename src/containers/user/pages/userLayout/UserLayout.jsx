import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";

export default function UserLayout() {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const isHome = location.pathname === "/";
    const html = document.documentElement;
    const body = document.body;

    if (!isHome) {
      html.style.overflow = "auto";
      body.style.overflow = "auto";
      document.body?.classList?.remove("body-overflow");
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
    }

    // Cleanup on unmount or route change
    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [location.pathname]);
  return (
    <>
      <Index.Box
        className="admin-dashboard-main admin-dashboard-deactive"
      >
        <Index.Box className="admin-dashboard-right-main">
          <PageIndex.UserHeader setOpen={setOpen} open={open} />
          <Index.Box className="user-dashboard-containt-main card-height-fix">
            <Outlet />
          </Index.Box>
        </Index.Box>
      </Index.Box>
      {/* <Index.Box
        className={`admin-dashboard-main ${
          open ? "active" : "admin-dashboard-deactive"
        }`}
      >
        <Index.Box
          className={`admin-dashboard-left-main ${
            open ? "active" : "admin-sidebar-deactive"
          }`}
        >
          <PageIndex.UserSidebar open={open} setOpen={setOpen} />
        </Index.Box>
        <Index.Box className="admin-dashboard-right-main">
          <PageIndex.UserHeader setOpen={setOpen} open={open} />
          <Index.Box className="admin-dashboard-containt-main">
            <Outlet />
          </Index.Box>
        </Index.Box>
      </Index.Box> */}
    </>
  );
}
