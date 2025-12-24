import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/slices/AdminSlice";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";

export default function Header(props) {
  // for page redirect
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const systemInfo = PageIndex.useSystemInfo();
  const { adminProfile } = useSelector((state) => state.admin);

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
    try {
      const res = dispatch(logout());
      // localStorage.clear();
      navigate("/admin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Index.Box
        className={`admin-header-main ${
          props.open ? "active" : "admin-header-deactive"
        }`}
      >
        <Index.Box className="admin-header-row">
          <Index.Box className="admin-header-left mob-header-left">
            <Index.Box className="admin-header-logo-main mob-logo-head">
              <Index.Button
                className="mobile-admin-bergur-button"
                onClick={() => {
                  props.setOpen(!props.open);
                  document.body.classList[props.open ? "remove" : "add"](
                    "admin-body-overflow"
                  );
                }}
              >
                <img
                  src={PageIndex.Svg.bergerFillIcon}
                  className="bergurmenu-icon"
                  alt="dashboard logo"
                />
              </Index.Button>
              <Index.Box>
                <Index.Link to={"/"}>
                  <img
                    src={PageIndex.Png.CombineLogo}
                    className="admin-header-logo side-logo-admin"
                    alt="logo"
                  />
                </Index.Link>
              </Index.Box>
            </Index.Box>
            <Index.Box className="header-bergur-main">
              <Index.Button
                className="admin-bergur-button"
                onClick={() => {
                  props.setOpen(!props.open);
                  document.body.classList[props.open ? "remove" : "add"](
                    "admin-body-overflow"
                  );
                }}
              >
                <img
                  src={PageIndex.Svg.bergerIcon}
                  className="bergurmenu-icon"
                  alt="dashboard logo"
                />
              </Index.Button>
            </Index.Box>
          </Index.Box>

          <Index.Box className="admin-header-right mob-right-header">
            <Index.Box className="admin-search-box admin-header-search"></Index.Box>

            <Index.Box className="header-right-content-main">
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
                    <Index.Avatar
                      className="admin-header-profile-icon"
                      alt={adminProfile?.firstName?.toUpperCase() || "Demo"}
                      src={
                        adminProfile?.image
                          ? `${PageIndex.imageUrl}${adminProfile?.image}`
                          : PageIndex?.Png?.userAvtarIcon
                      }
                    />
                    <Index.Box className="admin-drop-content-box">
                      <Index.Typography
                        variant="h5"
                        component="h5"
                        className="admin-header-drop-name"
                      >
                        {adminProfile?.token
                          ? `${adminProfile?.first_name} ${adminProfile?.last_name}`
                          : ""}
                      </Index.Typography>
                      <Index.Typography
                        variant="h5"
                        component="h5"
                        className="admin-header-drop-position"
                      >
                        Admin
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
                    navigate("/admin/account");
                    handleClose();
                  }}
                >
                  <img
                    src={PageIndex.Svg.settingIcon}
                    className="admin-drop-header-icon admin-icon"
                    alt="Setting"
                  />
                  Account Settings
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
