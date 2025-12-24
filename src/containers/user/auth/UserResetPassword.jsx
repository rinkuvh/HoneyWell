import React, { useState } from "react";
import Index from "../../Index";
import PageIndex from "../../PageIndex";
import { resetPassword } from "../../../redux/services/UserService";

export default function UserResetPassword() {
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
    password: "",
    confirmPassword: "",
  };

  const handleResetPassword = (values, { resetForm }) => {
    setLoading(true);
    delete values.confirmPassword;
    const payload = {
      ...values,
      email: location?.state?.email,
    };
    resetPassword(payload)
      .then((res) => {
        setLoading(false);
        if (res?.status == 200) {
          navigate("/user");
          resetForm();
          setIsError("");
        } else {
          setIsError(res?.response?.data?.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        setIsError(error?.data?.message);
      });
  };

  const formik = PageIndex.useFormik({
    initialValues: initialValues,
    validationSchema: PageIndex.resetPasswordUserSchema,
    onSubmit: handleResetPassword,
  });
  return (
    <>
      <Index.Box className="user-auth-main-flex">
        <Index.Box className="user-auth-left-main">
          <Index.Box className="user-auth-left-bg">
            <img
              src={PageIndex.Png.userAuthBg}
              className="user-auth-left-bg-img"
              alt="Login"
            />
            <Index.Box className="auth-bg-cont">
              <Index.Typography className="auth-bg-main-title">
                Welcome to the first ever <span>digitally</span> inclusive platform.
              </Index.Typography>
              <Index.Typography className="auth-bg-main-subtitle">
                Presenting Lenovo Leap: NextGen Scholar Program - Empowering
                Every Learner with Future-Ready Emerging Skills.
              </Index.Typography>
            </Index.Box>
          </Index.Box>
        </Index.Box>
        <Index.Box className="user-auth-right-main">
          <Index.Box className="user-auth-box">
            <Index.Box className="user-header-cust-col">
              <Index.List className="user-header-logo-list grey-line">
                <Index.ListItem className="user-header-logo-listitem">
                  <Index.Link
                    className="user-header-logo-box"
                    to="/"
                  >
                    <img
                      src={PageIndex.Png.FooterLenovoLogo}
                      className="user-header-logo"
                      alt="logo"
                    />
                  </Index.Link>
                </Index.ListItem>
                <Index.ListItem className="user-header-logo-listitem">
                  <Index.Link
                    className="user-header-logo-box"
                    to="/"
                  >
                    <img
                      src={PageIndex.Png.FooterMotorolaLogo}
                      className="user-header-logo"
                      alt="logo"
                    />
                  </Index.Link>
                </Index.ListItem>
                <Index.ListItem className="user-header-logo-listitem">
                  <Index.Link
                    className="user-header-logo-box"
                    to="/"
                  >
                    <img
                      src={PageIndex.Png.FooterBharatLogo}
                      className="user-header-logo"
                      alt="logo"
                    />
                  </Index.Link>
                </Index.ListItem>
              </Index.List>
            </Index.Box>
            <Index.Box className="user-auth-main w-cust">
              <Index.Box className="user-auth-inner-main user-login-inner-main">
                <Index.Typography className="user-auth-title">
                  Reset Your Password
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
                          <Index.Box className="user-input-box user-password-input-box user-auth-input">
                            <Index.Box className="user-form-group">
                              <Index.OutlinedInput
                                className="user-form-control-eye user-form-control"
                                autoComplete="off"
                                placeholder="New Password"
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                onChange={(e) => {
                                  const newValue = e.target.value.replace(
                                    /\s/g,
                                    ""
                                  );
                                  if (newValue?.toString().length <= 20)
                                    formik.setFieldValue("password", newValue);
                                }}
                                endAdornment={
                                  <Index.InputAdornment position="end">
                                    <Index.IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
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
                              
                            </Index.Box>
                            <Index.FormHelperText error>
                              {formik.touched.password &&
                                formik.errors.password}
                            </Index.FormHelperText>
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
                          <Index.Box className="user-input-box user-password-input-box user-auth-input">
                            <Index.Box className="user-form-group">
                              <Index.OutlinedInput
                                className="user-form-control-eye user-form-control"
                                autoComplete="off"
                                placeholder="Confirm Password"
                                id="outlined-adornment-password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={formik.values.confirmPassword}
                                onBlur={formik.handleBlur}
                                onChange={(e) => {
                                  const newValue = e.target.value.replace(
                                    /\s/g,
                                    ""
                                  );
                                  if (newValue?.toString().length <= 20)
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
                                      onMouseDown={handleMouseUpPassword}
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
                              
                            </Index.Box>
                            <Index.FormHelperText error>
                              {formik.touched.confirmPassword &&
                                formik.errors.confirmPassword}
                            </Index.FormHelperText>
                          </Index.Box>
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

                  <Index.Box className="user-btn-main user-uth-btn-main register-btn-box">
                    <Index.Button
                      className="user-auth-btn"
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
    </>
  );
}
