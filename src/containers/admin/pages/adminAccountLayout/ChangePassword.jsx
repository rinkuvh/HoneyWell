import React, { useState } from "react";

import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { changePasswordProfile } from "../../../../redux/services/AdminService";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = PageIndex.useNavigate();
  const dispatch = PageIndex.useDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  let initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handlePasswordChange = (values, { resetForm }) => {
    setLoading(true);
    changePasswordProfile(values).then((res) => {
      if (res == 200) {
        setLoading(false);
        resetForm();
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    });
  };

  const formik = PageIndex.useFormik({
    initialValues: initialValues,
    validationSchema: PageIndex.passwordValidationSchema,
    onSubmit: handlePasswordChange,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Index.Box className="admin-change-pass-main common-card">
          <Index.Box sx={{ width: 1 }} className="grid-main">
            <Index.Box
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)"
              gap={{ xs: 2, sm: 2, md: 2, lg: 2 }}
            >
              {/* Old password field */}
              <Index.Box
                gridColumn={{
                  xs: "span 12",
                  sm: "span 12",
                  md: "span 12",
                  lg: "span 12",
                }}
                className="grid-column"
              >
                <Index.Box className="admin-input-box password-input-box">
                  <Index.FormHelperText className="admin-form-lable">
                    Old Password
                    <span className="sign-required">* </span>
                  </Index.FormHelperText>
                  <Index.Box className="admin-form-group">
                    <Index.OutlinedInput
                      className="admin-form-control-eye"
                      autocomplete="off"
                      id="outlined-adornment-password"
                      type={showOldPassword ? "text" : "password"}
                      name="oldPassword"
                      value={formik.values.oldPassword}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/\s/g, "");
                        formik.setFieldValue("oldPassword", newValue);
                      }}
                      onBlur={formik.handleBlur}
                      placeholder="Enter Old Password"
                      endAdornment={
                        <Index.InputAdornment position="end">
                          <Index.IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowOldPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                          >
                            {showOldPassword ? (
                              <Index.Visibility />
                            ) : (
                              <Index.VisibilityOff />
                            )}
                          </Index.IconButton>
                        </Index.InputAdornment>
                      }
                    />
                    {Boolean(
                      formik.errors?.oldPassword && formik.touched?.oldPassword
                    ) && ( // Conditionally render the helper text for error message
                      <Index.FormHelperText error className="admin-form-lable">
                        {formik.errors?.oldPassword}
                      </Index.FormHelperText>
                    )}
                  </Index.Box>
                </Index.Box>
              </Index.Box>

              {/* New password field */}
              <Index.Box
                gridColumn={{
                  xs: "span 12",
                  sm: "span 12",
                  md: "span 12",
                  lg: "span 12",
                }}
                className="grid-column"
              >
                <Index.Box className="admin-input-box password-input-box">
                  <Index.FormHelperText className="admin-form-lable">
                    New Password
                    <span className="sign-required">* </span>
                  </Index.FormHelperText>
                  <Index.Box className="admin-form-group">
                    <Index.OutlinedInput
                      className="admin-form-control-eye"
                      autocomplete="off"
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      placeholder="Enter New Password"
                      value={formik.values.newPassword}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/\s/g, "");
                        formik.setFieldValue("newPassword", newValue);
                      }}
                      onBlur={formik.handleBlur}
                      endAdornment={
                        <Index.InputAdornment position="end">
                          <Index.IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <Index.Visibility />
                            ) : (
                              <Index.VisibilityOff />
                            )}
                          </Index.IconButton>
                        </Index.InputAdornment>
                      }
                    />
                    {Boolean(
                      formik.errors?.newPassword && formik.touched?.newPassword
                    ) && (
                      <Index.FormHelperText error className="admin-form-lable">
                        {formik.errors?.newPassword}
                      </Index.FormHelperText>
                    )}
                  </Index.Box>
                </Index.Box>
              </Index.Box>

              <Index.Box
                gridColumn={{
                  xs: "span 12",
                  sm: "span 12",
                  md: "span 12",
                  lg: "span 12",
                }}
                className="grid-column"
              >
                <Index.Box className="admin-input-box password-input-box">
                  <Index.FormHelperText className="admin-form-lable">
                    Confirm Password
                    <span className="sign-required">* </span>
                  </Index.FormHelperText>
                  <Index.Box className="admin-form-group">
                    <Index.OutlinedInput
                      className="admin-form-control-eye"
                      autocomplete="off"
                      id="outlined-adornment-password"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Enter Confirm Password"
                      autoComplete="off"
                      value={formik.values.confirmPassword}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/\s/g, "");
                        formik.setFieldValue("confirmPassword", newValue);
                      }}
                      onBlur={formik.handleBlur}
                      endAdornment={
                        <Index.InputAdornment position="end">
                          <Index.IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <Index.Visibility />
                            ) : (
                              <Index.VisibilityOff />
                            )}
                          </Index.IconButton>
                        </Index.InputAdornment>
                      }
                    />
                    {Boolean(
                      formik.errors?.confirmPassword &&
                        formik.touched?.confirmPassword
                    ) && (
                      <Index.FormHelperText error className="admin-form-lable">
                        {formik.errors?.confirmPassword}
                      </Index.FormHelperText>
                    )}
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>

          <Index.Box className="admin-page-btn-end-flex primary-btn-main border-btn-main">
            <Index.Button
              className="border-btn"
              onClick={() => {
                formik.resetForm();
              }}
            >
              Discard
            </Index.Button>
            <Index.Button
              className="primary-btn"
              type="submit"
              loading={loading}
            >
              Submit
            </Index.Button>
          </Index.Box>
        </Index.Box>
      </form>
    </>
  );
}
