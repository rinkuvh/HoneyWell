import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Index from "../../../Index";
import UserEditProfile from "./UserEditProfile";
import UserChangePassword from "./ChangePassword";
import UpdatePersonalInformation from "./UpdatePersonalInformation";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function UserAccountLayout() {
  const [value, setValue] = React.useState(0);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editData, setEditData] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Index.Box className="admin-edit-profile-containt">
      <Index.Box className="container">
        <Index.Box className="admin-page-title-flex admin-page-title-main">
          <Index.Typography
            className="admin-page-title"
            component="h2"
            variant="h2"
          >
            My Profile
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
            <Index.Box className="common-tabs-panel-main pt-0">
              {isEdit ? (
                <UpdatePersonalInformation setIsEdit={setIsEdit} editData={editData} setEditData={setEditData} />
              ) : (
                <UserEditProfile setIsEdit={setIsEdit} setEditData={setEditData}/>
              )}
            </Index.Box>
          </TabPanel>
          <TabPanel value={value} index={1} className="common-tab-panel">
            <Index.Box className="common-tabs-panel-main pt-0">
              <UserChangePassword />
            </Index.Box>
          </TabPanel>
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
}
