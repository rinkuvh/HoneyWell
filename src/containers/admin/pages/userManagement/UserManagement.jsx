import React from "react";
import PropTypes from "prop-types";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import UserRegistratonList from "./UserRegistratonList";
import { Navigate } from "react-router-dom";

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


export default function UserManagement() {
  const [value, setValue] = React.useState(0);


  const canAddEditTable = PageIndex.usePermission(["user_add", "user_edit"]);

  if (!canAddEditTable) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <Index.Box className="admin-edit-profile-containt">
       <UserRegistratonList />
    </Index.Box>
  );
}
