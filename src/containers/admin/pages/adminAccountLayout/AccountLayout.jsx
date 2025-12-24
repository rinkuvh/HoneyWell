import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";

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
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function AccountLayout() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Index.Box className="admin-edit-profile-containt">
      <Index.Box className="admin-page-title-flex admin-page-title-main">
        <Index.Typography
          className="admin-page-title"
          component="h2"
          variant="h2"
        >
          Account Settings
        </Index.Typography>
      </Index.Box>
      <Index.Box className="common-tabs-outer-main">
        <Index.Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Index.Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className="common-tab"
          >
            <Index.Tab
              label="Edit Profile"
              {...a11yProps(0)}
              className="common-tab"
            />
            <Index.Tab
              label="Change Password"
              {...a11yProps(1)}
              className="common-tab"
            />
          </Index.Tabs>
        </Index.Box>
        <TabPanel value={value} index={0} className="common-tab-panel">
          <Index.Box className="common-tabs-panel-main">
            <PageIndex.AdminEditProfile />
          </Index.Box>
        </TabPanel>
        <TabPanel value={value} index={1} className="common-tab-panel">
          <Index.Box className="common-tabs-panel-main">
            <PageIndex.ChangePassword />
          </Index.Box>
        </TabPanel>
      </Index.Box>
    </Index.Box>
  );
}
