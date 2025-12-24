import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import PageIndex from "../../../PageIndex";

export default function WebLayout() {
  const [currentTab, setCurrentTab] = useState("home-hero-main");
  return (
    <>
      <PageIndex.WebHeader
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <Outlet context={[currentTab, setCurrentTab]} />
      <PageIndex.WebFooter />
    </>
  );
}
