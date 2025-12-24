import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Index from "../../../Index";
import { useLocation } from "react-router-dom";
import WeekWiseManagementList from "./weekWiseManagement/WeekWiseManagementList";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SubLayout({ internshipCourseId ,courseData,loading,isQuiz}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(()=>{
    if(isQuiz){
      setValue(1)
    }
  },[isQuiz])

  return (
    <>
      <Index.Box className="common-tabs-outer-main course-tab">
        <Index.Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Index.Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className="common-tab"
          >
            <Index.Tab
              label="Week-wise Management"
              {...a11yProps(0)}
              className="common-tab"
            />
           
          </Index.Tabs>
        </Index.Box>
        <TabPanel value={value} index={0} className="common-tab-panel">
          <Index.Box className="common-tabs-panel-main">
            <WeekWiseManagementList internshipCourseId={internshipCourseId} courseData={courseData} isDisabled={loading}/>
          </Index.Box>
        </TabPanel>
       
      </Index.Box>
    </>
  );
}
