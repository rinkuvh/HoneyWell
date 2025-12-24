import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Index from "../../../Index";
import ViewRegistration from "./ViewRegistration";
import { useLocation, useParams } from "react-router-dom";
import StudentTabs from "./studentTabs/StudentTabs";
// for tabs design
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Index.Box>
          <Index.Typography>{children}</Index.Typography>
        </Index.Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function ViewRegisterLayout() {
  const location = useLocation();
  const params = useParams();
  const [value, setValue] = React.useState(0);


  return (
    <>
      <ViewRegistration userId={params?.id}/>
      <StudentTabs/>
    </>
  );
}
