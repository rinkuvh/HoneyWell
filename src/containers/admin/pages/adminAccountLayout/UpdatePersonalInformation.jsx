import React from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";

export default function UpdatePersonalInformation(props) {
  const {
    openUpdatePersonalInformation,
    handleOpenUpdatePersonalInformation,
    handleCloseUpdatePersonalInformation
  } = props;

  // for open handleChangedropdown

  const [age, setAge] = React.useState("");

  const handleChangedropdown = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <Index.Modal
        aria-labelledby="modal-modal-title"
        open={openUpdatePersonalInformation}
        onClose={handleCloseUpdatePersonalInformation}
        aria-describedby="modal-modal-description"
        className="admin-modal"
      >
        <Index.Box
          sx={PageIndex.style}
          className="personal-info-modal-inner-main admin-modal-inner"
        >
          <Index.Box className="admin-modal-header">
            <Index.Typography
              id="modal-modal-title"
              className="admin-modal-title"
              variant="h6"
              component="h2"
            >
              Update Personal Information
            </Index.Typography>
            <Index.Button
              className="modal-close-btn"
              onClick={handleCloseUpdatePersonalInformation}
            >
              <img
                src={PageIndex.Svg.closeblack}
                className="admin-modal-close-icon"
                alt="Close"
              />
            </Index.Button>
          </Index.Box>

          <Index.Box className="admin-modal-hgt-scroll cus-scrollbar">
            <Index.Box className="admin-modal-body">
              <Index.Box
                sx={{ width: 1 }}
                className="grid-main border-card register-row"
              >
                <Index.Box className="admin-sub-title-main">
                  <Index.Typography className="admin-sub-title">
                    Personal Information
                  </Index.Typography>
                </Index.Box>
                <Index.Box
                  display="grid"
                  gridTemplateColumns="repeat(12, 1fr)"
                  gap={{ xs: 2, sm: 2, md: 2, lg: 2 }}
                >
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 12",
                      md: "span 12",
                      lg: "span 12"
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box add-user-input">
                      <Index.FormHelperText className="admin-form-lable">
                        Profile Image
                      </Index.FormHelperText>
                      <Index.Box className="admin-form-group profile-change-cus">
                        <Index.Box className="view-profile-img-flex">
                          <img
                            src={PageIndex.Png.userAvtarIcon}
                            alt="User"
                            className="view-profile-img"
                          />
                          <Index.Box className="edit-profile-btn-main">
                            <Index.Button
                              className="edit-profile-btn"
                              component="label"
                            >
                              <img
                                src={PageIndex.Svg.pencilIcon}
                                alt="Edit"
                                className="view-edit-icon"
                              />
                              <input
                                hidden
                                accept="image/*"
                                name="image"
                                type="file"
                              />
                            </Index.Button>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 4"
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box add-user-input">
                      <Index.FormHelperText className="admin-form-lable">
                        First Name
                      </Index.FormHelperText>
                      <Index.Box className="admin-form-group">
                        <Index.TextField
                          fullWidth
                          id="fullWidth"
                          className="admin-form-control"
                          placeholder="Enter First Name"
                          name="firstName"
                        />
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>

                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 4"
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box add-user-input">
                      <Index.FormHelperText className="admin-form-lable">
                        Middle Name
                      </Index.FormHelperText>
                      <Index.Box className="admin-form-group">
                        <Index.TextField
                          fullWidth
                          id="fullWidth"
                          className="admin-form-control"
                          placeholder="Enter Middle Name"
                          name="middleName"
                        />
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>

                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 4"
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box add-user-input">
                      <Index.FormHelperText className="admin-form-lable">
                        Last Name
                      </Index.FormHelperText>
                      <Index.Box className="admin-form-group">
                        <Index.TextField
                          fullWidth
                          id="fullWidth"
                          className="admin-form-control"
                          placeholder="Enter Last Name"
                          name="lastName"
                        />
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>

                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 4"
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box add-user-input date-input-box">
                      <Index.FormHelperText className="admin-form-lable">
                        Date Of Birth <span className="sign-required">* </span>
                      </Index.FormHelperText>
                      <Index.Box className="admin-form-group">
                        <Index.LocalizationProvider
                          dateAdapter={Index.AdapterDayjs}
                        >
                          <Index.DemoContainer
                            components={["DatePicker", "DatePicker"]}
                          >
                            <Index.DatePicker
                              className="admin-form-control"
                              name="dateOfBirth"
                              // label="Basic date picker"
                              disableFuture
                              format="DD/MM/YYYY"
                            />
                          </Index.DemoContainer>
                        </Index.LocalizationProvider>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>

                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 4"
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box add-user-input">
                      <Index.FormHelperText className="admin-form-lable">
                        Age
                      </Index.FormHelperText>
                      <Index.Box className="admin-form-group">
                        <Index.TextField
                          fullWidth
                          id="fullWidth"
                          className="admin-form-control"
                          placeholder="Enter Age"
                          name="age"
                        />
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>

                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 4"
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box add-user-input">
                      <Index.FormHelperText className="admin-form-lable">
                        Email
                      </Index.FormHelperText>
                      <Index.Box className="admin-form-group">
                        <Index.TextField
                          fullWidth
                          id="fullWidth"
                          className="admin-form-control"
                          placeholder="Enter Email"
                          name="email"
                        />
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>

                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 4"
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box add-user-input">
                      <Index.FormHelperText className="admin-form-lable">
                        Contact Number
                      </Index.FormHelperText>
                      <Index.Box className="admin-form-group">
                        <Index.TextField
                          fullWidth
                          id="fullWidth"
                          className="admin-form-control"
                          placeholder="Enter Contact Number"
                          name="contactNumber"
                        />
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>

                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 4"
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box add-user-input">
                      <Index.FormHelperText className="admin-form-lable">
                        Aadhaar No.
                      </Index.FormHelperText>
                      <Index.Box className="admin-form-group">
                        <Index.TextField
                          fullWidth
                          id="fullWidth"
                          className="admin-form-control"
                          placeholder="Enter Aadhaar Number"
                          name="aadharNumber"
                        />
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 4"
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box add-user-input">
                      <Index.FormHelperText className="admin-form-lable">
                        Gender <span className="sign-required">* </span>
                      </Index.FormHelperText>
                      <Index.Box className="admin-form-group">
                        <Index.Box className="admin-dropdown-box">
                          <Index.FormControl className="admin-form-control">
                            <Index.Select
                              className="admin-dropdown-select"
                              value={age}
                              onChange={handleChangedropdown}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              <Index.MenuItem
                                value=""
                                className="admin-menuitem select-def-item"
                              >
                                Male
                              </Index.MenuItem>
                              <Index.MenuItem
                                value={10}
                                className="admin-menuitem select-def-item"
                              >
                                Female
                              </Index.MenuItem>
                            </Index.Select>
                          </Index.FormControl>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>

          <Index.Box className="admin-modal-footer">
            <Index.Box className="admin-modal-user-btn-flex">
              <Index.Box className="admin-save-btn-main primary-btn-main">
                <Index.Button
                  className="admin-save-user-btn primary-btn"
                  type="submit"
                >
                  Submit
                </Index.Button>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Modal>
    </>
  );
}
