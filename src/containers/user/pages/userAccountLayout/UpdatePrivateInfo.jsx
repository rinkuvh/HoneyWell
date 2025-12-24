import React, { useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  changePrivateUserInfo,
} from "../../../../redux/services/UserService";
import { Formik } from "formik";
export default function UpdatePrivateInfo(props) {
  const {
    openUpdate,
    handleOpenUpdate,
    handleCloseUpdate,
    viewData: userProfile,
    handleOpenUpdateVerifyModal,
  } = props;

  const dispatch = PageIndex.useDispatch();
  const [loader, setLoader] = useState(false);
  const initialValues = {
    email: userProfile?.email || "",
    phoneNumber: userProfile?.phoneNumber || "",
    countryCode: userProfile?.countryCode || "+91",
  };
  const handleSubmit = async (values) => {
    setLoader(true);
    setLoader(true);
    changePrivateUserInfo(values).then((res) => {
      if (res?.status == 200) {
        if (!res?.data?.isMyData) {
          handleOpenUpdateVerifyModal();
        }
        // resetForm();
        setLoader(false);
        handleCloseUpdate();
      }
      setTimeout(() => {
        setLoader(false);
      }, 3000);
    });
  };

  return (
    <>
      <Index.Modal
        open={openUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="admin-modal"
      >
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={PageIndex.editUserPrivateInformationSchema}
          // validationSchema={PageIndex.editEducationInformationSchema}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
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
                    Update Private Information
                  </Index.Typography>
                  <Index.Button
                    className="modal-close-btn"
                    onClick={handleCloseUpdate}
                  >
                    <span>
                      <img
                        src={PageIndex.Svg.closeblack}
                        className="admin-modal-close-icon"
                        alt="Close"
                      />
                    </span>
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
                          Private Information
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
                            sm: "span 6",
                            md: "span 4",
                            lg: "span 4",
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
                                value={formik.values.email}
                                onChange={(e) => {
                                  const newValue = e.target.value.replace(
                                    /\s/g,
                                    ""
                                  );
                                  formik.setFieldValue("email", newValue);
                                }}
                                onBlur={formik.handleBlur}
                              />
                            </Index.Box>
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.email && formik?.errors?.email}
                            </Index.FormHelperText>
                          </Index.Box>
                        </Index.Box>

                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 6",
                            md: "span 4",
                            lg: "span 4",
                          }}
                          className="grid-column"
                        >
                          <Index.Box className="admin-input-box add-user-input country-dropdown-input-box">
                            <Index.FormHelperText className="admin-form-lable">
                              Phone Number
                            </Index.FormHelperText>
                            {/* <Index.MuiPhoneNumber
                              className="admin-form-control"
                              placeholder="Phone Number"
                              defaultCountry={"in"}
                              name="phoneNumber"
                              onBlur={formik.handleBlur}
                              value={`${formik.values.countryCode || +91}${
                                formik.values.phoneNumber
                              }`}
                              onChange={(value, countryData) => {
                                if (value.length > 0 && value.length !== 0) {
                                  const phoneNumberDigits = value.replace(
                                    /\D/g,
                                    ""
                                  ); // Remove non-numeric characters
                                  let countryCode = countryData?.dialCode || "";

                                  // Construct the full number with country code
                                  const fullPhoneNumber = `+${countryCode}${phoneNumberDigits.slice(
                                    countryCode.length
                                  )}`;

                                  let maxLength = 10;
                                  try {
                                    const parsedNumber =
                                      parsePhoneNumberFromString(
                                        fullPhoneNumber
                                      );

                                    const exampleNumber = getExampleNumber(
                                      parsedNumber?.country,
                                      examples
                                    );

                                    if (exampleNumber) {
                                      maxLength =
                                        exampleNumber.nationalNumber.length;
                                    }
                                  } catch (error) {
                                    console.warn(
                                      "Phone number parsing failed, using default max length:",
                                      error
                                    );
                                  }

                                  const phoneValue = phoneNumberDigits.slice(
                                    countryCode.length
                                  );

                                  formik.setFieldValue(
                                    "countryCode",
                                    `+${countryCode}`
                                  );

                                  // Stop updating if length exceeds allowed limit
                                  if (phoneValue.length > maxLength) {
                                    return;
                                  }
                                  formik.setFieldValue(
                                    "phoneNumber",
                                    phoneValue === "0" ? "" : phoneValue
                                  );
                                }
                              }}
                            /> */}
                            {/* <Index.Box className="admin-form-group">
                              <Index.TextField
                                fullWidth
                                id="fullWidth"
                                className="admin-form-control"
                                placeholder="Enter Phone Number"
                                name="phoneNumber"
                                value={formik.values.phoneNumber}
                                onChange={(e) => {
                                  const newValue = PageIndex.allowOnlyNumbers(
                                    e.target.value
                                  );
                                  if (newValue.length <= 10) {
                                    formik.setFieldValue(
                                      "phoneNumber",
                                      newValue
                                    );
                                  }
                                }}
                                onBlur={formik.handleBlur}
                              />
                            </Index.Box> */}
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.phoneNumber &&
                                formik?.errors?.phoneNumber}
                            </Index.FormHelperText>
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
                        loading={loader}
                        className="admin-save-user-btn primary-btn"
                        type="submit"
                      >
                        Submit
                      </Index.Button>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </form>
          )}
        </Formik>
      </Index.Modal>
    </>
  );
}
