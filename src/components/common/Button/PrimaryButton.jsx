import React from "react";
import Index from "../../../containers/Index";

export default function PrimaryButton(props) {
  return (
    <>
      <Index.Box className="primary-btn-main">
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
      {/* <Index.PrimaryButton btnLabel="View Button" className='primary-btn'/> */}
    </>
  );
}
