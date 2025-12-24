import React from "react";
import Index from "../../../containers/Index";

export default function BorderButton(props) {
  return (
    <>
      <Index.Box className="border-btn-main">
        <Index.Button
          className={props.className}
          onClick={props.onClick}
          loading={props.loading}
          {...props}
        >
          {props.btnLabel}
        </Index.Button>
      </Index.Box>

      {/* use this button like below demo */}
      {/* <Index.BorderButton btnLabel="View Button" className='border-btn'/> */}
    </>
  );
}
