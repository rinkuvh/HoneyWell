import React from "react";
import Index from "../../../containers/Index";

export default function PageLoader() {
  return (
    <Index.Box className="loader-main">
      <Index.Box className="loader">
        <span></span>
        <span></span>
      </Index.Box>
    </Index.Box>
  );
}
