import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  getUnreadNotificationService,
} from "../../../../redux/services/UserService";
import {
  logoutUser,
  setNotificationCountAction,
} from "../../../../redux/slices/UserSlice";
import DarkLight from "../../../web/pages/webLayout/DarkLight";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge } from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";

export default function UserHeader(props) {
  // for page redirect
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const systemInfo = PageIndex.useSystemInfo();
  const { userProfile, token, notificationCount } = useSelector(
    (state) => state.user
  );

  // for open in header profile menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    navigate("/user");
    try {
      const res = await dispatch(
        logoutUser()
        // userLogout({ userId: userProfile._id, ...systemInfo })
      ).unwrap();
      // localStorage.clear();
    } catch (error) {
      console.error(error);
    }
  };

  const getNotificationCountData = async () => {
    try {
      const response = await getUnreadNotificationService();
      if (response?.status === 200) {
        dispatch(setNotificationCountAction(response?.data?.unreadCount));
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getNotificationCountData();
  }, []);

  const getClassName = () => {
    if (
      [
        "/feedback",
        "/privacy-policy",
        "/terms-and-condition",
        "/testimonials",
      ]?.includes(location?.pathname) || location?.pathname?.includes("/certificate")
    ) {
      return "user-main-header";
    }

    return "";
  };

  return (
    <>
      {/* <Index.Box className="accesibility-box">
        <DarkLight />
      </Index.Box> */}
      <Index.Box
        className={`admin-header-main ${getClassName()} ${
          props.open ? "active" : "admin-header-deactive"
        }`}
      >
        <Index.Box className="admin-header-row cust-admin-header-row">
          <Index.Box className="admin-header-left">
            <Index.Box className="admin-header-logo-main">
              <Index.Box className="user-header-cust-col">
                <Index.List className="user-header-logo-list">
                  <Index.ListItem className="user-header-logo-listitem footer-line">
                    <Index.Link className="user-header-logo-box" to={"/"}>
                      <img
                        src={PageIndex.Png.FooterLenovoLogo}
                        className="user-header-logo"
                        alt="logo"
                      />
                    </Index.Link>
                  </Index.ListItem>
                  <Index.ListItem className="user-header-logo-listitem footer-line">
                    <Index.Link className="user-header-logo-box" to={"/"}>
                      <img
                        src={PageIndex.Png.FooterMotorolaLogo}
                        className="user-header-logo"
                        alt="logo"
                      />
                    </Index.Link>
                  </Index.ListItem>
                  <Index.ListItem className="user-header-logo-listitem footer-line">
                    <Index.Link className="user-header-logo-box" to={"/"}>
                      <img
                        src={PageIndex.Png.FooterBharatLogo}
                        className="user-header-logo"
                        alt="logo"
                      />
                    </Index.Link>
                  </Index.ListItem>
                </Index.List>
              </Index.Box>
            </Index.Box>
          </Index.Box>

          <Index.Box className="admin-header-right">
            <Index.Box className="admin-search-box admin-header-search"></Index.Box>

            <Index.Box className="header-right-content-main user-right-content-main">
              {/* <DarkLight /> */}
              <Index.Box>
                <DarkLight />
              </Index.Box>

              {token && (
                <>
                  {location?.pathname !== "/user/dashboard" && (
                    <Index.Box
                      className="dashboard-icon-box"
                      onClick={() => navigate("/user/dashboard")}
                    >
                      <DashboardRoundedIcon className="dashboard-icon" />
                    </Index.Box>
                  )}
                  <Index.Box
                    className="notificaiton-icon-box"
                    onClick={() => navigate("/user/notifications")}
                  >
                    <Badge
                      badgeContent={notificationCount}
                      color="secondary"
                      className="notificaiton-badge"
                    >
                      <NotificationsIcon className="notificaiton-icon" />
                    </Badge>
                  </Index.Box>
                </>
              )}
              {token ? (
                <Index.Box className="admin-header-drop-main">
                  <Index.Button
                    className="admin-drop-header-btn"
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <Index.Box className="admin-flex-drop-main">
                      <img
                        src={
                          userProfile?.image
                            ? `${PageIndex.imageUrl}${userProfile?.image}`
                            : PageIndex?.Png?.userAvtarIcon
                        }
                        className="admin-header-profile-icon"
                        alt="dashboard bell icon"
                        onError={(e)=>{
                          e.target.src = PageIndex?.Png?.userAvtarIcon;
                        }}
                      />
                      <Index.Box className="admin-drop-content-box">
                        <Index.Typography
                          variant="h5"
                          component="h5"
                          className="admin-header-drop-name"
                        >
                          {userProfile?.name ? `${userProfile?.name}` : ""}
                        </Index.Typography>
                        <Index.Typography
                          variant="h5"
                          component="h5"
                          className="admin-header-drop-position"
                        >
                          User
                        </Index.Typography>
                      </Index.Box>
                      <Index.Box className="header-drop-arrow-box">
                        <img
                          src={PageIndex.Svg.downblackAarrow}
                          alt="Arrow"
                          className="header-drop-arrow"
                        />
                      </Index.Box>
                    </Index.Box>
                  </Index.Button>
                </Index.Box>
              ) : (
                <Index.Box></Index.Box>
              )}
              <Index.Menu
                className="admin-drop-header-menu"
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Index.MenuItem
                  className="admin-drop-header-menuitem"
                  onClick={() => {
                    navigate("/user/account");
                    handleClose();
                  }}
                >
                  <img
                    src={PageIndex.Svg.settingIcon}
                    className="admin-drop-header-icon admin-icon"
                    alt="Setting"
                  />
                  My Profile
                </Index.MenuItem>
                <Index.MenuItem
                  className="admin-drop-header-menuitem"
                  onClick={() => {
                    navigate("/user/my-internships-and-courses");
                    handleClose();
                  }}
                >
                  <img
                    src={PageIndex.Png.MyCourse}
                    className="admin-drop-header-icon admin-icon"
                    alt="Setting"
                  />
                  My Courses
                </Index.MenuItem>
                <Index.MenuItem
                  className="admin-drop-header-menuitem"
                  onClick={() => {
                    navigate("/user/my-team");
                    handleClose();
                  }}
                >
                  <img
                    src={PageIndex.Png.myTeam}
                    className="admin-drop-header-icon admin-icon"
                    alt="Setting"
                  />
                  My Team
                </Index.MenuItem>

                <Index.MenuItem
                  className="admin-drop-header-menuitem"
                  onClick={() => {
                    handleLogout();
                    handleClose();
                  }}
                >
                  <img
                    src={PageIndex.Svg.logOutIcon}
                    className="admin-drop-header-icon admin-icon"
                    alt="Logout"
                  />{" "}
                  Sign Out
                </Index.MenuItem>
              </Index.Menu>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}
