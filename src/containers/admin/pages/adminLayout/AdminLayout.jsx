import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";

export default function AdminLayout() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Index.Box
        className={`admin-dashboard-main ${
          open ? "active" : "admin-dashboard-deactive"
        }`}
      >
        <Index.Box
          className={`admin-dashboard-left-main ${
            open ? "active" : "admin-sidebar-deactive"
          }`}
        >
          <PageIndex.Sidebar open={open} setOpen={setOpen} />
        </Index.Box>
        <Index.Box className="admin-dashboard-right-main">
          <PageIndex.Header setOpen={setOpen} open={open} />
          <Index.Box className="admin-dashboard-containt-main">
            <Outlet />
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}
