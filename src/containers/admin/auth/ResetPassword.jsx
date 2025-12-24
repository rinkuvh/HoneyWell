import React, { useState } from "react";
import Index from "../../Index";
import PageIndex from "../../PageIndex";
import { resetPassword } from "../../../redux/services/AdminService";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = PageIndex.useNavigate();
  const location = PageIndex.useLocation();
  const [isError, setIsError] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  let initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const handleResetPassword = (values, { resetForm }) => {
    setLoading(true);

    const payload = {
      password: values.newPassword,
      confirm_password: values.confirmPassword,
      id: location?.state?.id,
    };
    resetPassword(payload)
      .then((res) => {
        if (res?.status == 200) {
          navigate("/admin");
          setLoading(false);
          resetForm();
        } else {
          setLoading(false);
          setIsError(res?.response?.data?.message);
        }
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      })
      .catch((error) => {
        setIsError(error?.data?.message);
      });
  };

  const formik = PageIndex.useFormik({
    initialValues: initialValues,
    validationSchema: PageIndex.resetPasswordSchema,
    onSubmit: handleResetPassword,
  });

  return (
    <Index.Box className="admin-auth-main-flex">
      <Index.Box className="admin-auth-left-main">
        <PageIndex.AuthBackground />
      </Index.Box>
      <Index.Box className="admin-auth-right-main">
        <Index.Box className="admin-auth-box">
          <Index.Box className="admin-auth-main">
            <img
              src={PageIndex.Png.TextLogo}
              alt="logo"
              className="admin-auth-logo"
            />
            <Index.Box className="admin-auth-inner-main admin-login-inner-main">
              <Index.Typography
                component="h2"
                variant="h2"
                className="admin-auth-title"
              >
                Reset your password
              </Index.Typography>

              <form onSubmit={formik.handleSubmit}>
                <Index.Box className="grid-row">
                  <Index.Box sx={{ width: 1 }} className="grid-main">
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
                          lg: "span 12",
                        }}
                        className="grid-column"
                      >
                        <Index.Box className="admin-input-box password-input-box auth-input">
                          <Index.FormHelperText className="admin-form-lable">
                            New Password
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.OutlinedInput
                              className="admin-form-control-eye admin-form-control"
                              autocomplete="off"
                              placeholder="New Password"
                              id="outlined-adornment-password"
                              type={showPassword ? "text" : "password"}
                              name="newPassword"
                              autoComplete="off"
                              value={formik.values.newPassword}
                              onBlur={formik.handleBlur}
                              onChange={(e) => {
                                const newValue = e.target.value.replace(
                                  /\s/g,
                                  ""
                                );
                                formik.setFieldValue("newPassword", newValue);
                              }}
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
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.newPassword &&
                                formik?.errors?.newPassword}
                            </Index.FormHelperText>
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
                        <Index.Box className="admin-input-box password-input-box auth-input">
                          <Index.FormHelperText className="admin-form-lable">
                            Confirm Password
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.OutlinedInput
                              className="admin-form-control-eye admin-form-control"
                              autocomplete="off"
                              placeholder="Confirm Password"
                              id="outlined-adornment-password"
                              type={showConfirmPassword ? "text" : "password"}
                              name="confirmPassword"
                              autoComplete="off"
                              value={formik.values.confirmPassword}
                              onBlur={formik.handleBlur}
                              onChange={(e) => {
                                const newValue = e.target.value.replace(
                                  /\s/g,
                                  ""
                                );
                                formik.setFieldValue(
                                  "confirmPassword",
                                  newValue
                                );
                              }}
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
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.confirmPassword &&
                                formik?.errors?.confirmPassword}
                            </Index.FormHelperText>
                          </Index.Box>
                          {isError && (
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {isError}
                            </Index.FormHelperText>
                          )}
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>

                <Index.Box className="primary-btn-main admin-login-btn-main auth-btn-flex">
                  <Index.Button
                    className="primary-btn admin-sign-btn"
                    type="submit"
                    loading={loading}
                  >
                    Save
                  </Index.Button>
                </Index.Box>
              </form>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
}
