import React, { useState } from "react";
import { useFormik } from "formik";
import Index from "../../Index";
import PageIndex from "../../PageIndex";
import { loginAdmin } from "../../../redux/services/AdminService";
import { useEffect } from "react";
import { loginData } from "../../../redux/slices/AdminSlice";

const Login = () => {
  const dispatch = PageIndex.useDispatch();
  const navigate = PageIndex.useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState({
    login: false,
    loginWithOtp: false,
  });
  const [otpSent, setOtpSent] = useState(false);
  const [isError, setIsError] = useState("");
  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (values, { resetForm }) => {
    setLoading((prev) => ({
      ...prev,
      login: true,
    }));
    await loginAdmin({ ...values })
      .then((res) => {
        if (res?.status == 200) {
          navigate("/admin/verify-otp", {
            state: { email: values?.email, type: "Login" },
          });
          setLoading((prev) => ({
            ...prev,
            login: false,
          }));
          resetForm();
        } else {
          setLoading((prev) => ({
            ...prev,
            login: false,
          }));
          setIsError(res?.response?.data?.message);
        }
      })
      .catch((error) => {
        setIsError(error?.data?.message);
      })
      .finally(() => {
        setLoading((prev) => ({
          ...prev,
          login: false,
        }));
      });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: PageIndex.loginSchema,
    onSubmit: handleLogin,
  });

  const handleOtpRequest = async () => {
    formik.setFieldTouched("email", true);
    formik.validateField("email");

    if (formik.errors.email || !formik.values.email) {
      return;
    }

    setLoading((prev) => ({
      ...prev,
      loginWithOtp: true,
    }));

    const values = { email: formik.values.email, isSendOtp: true };
    await loginAdmin(values)
      .then((res) => {
        // res
        if (res?.status === 200) {
          const id = res?.data?.id;
          navigate("/admin/login-with-otp", { state: { id: id } });
          setOtpSent(true);
        } else {
          setLoading((prev) => ({
            ...prev,
            loginWithOtp: false,
          }));
          setIsError(res?.response?.data?.message);
        }
        setLoading((prev) => ({
          ...prev,
          loginWithOtp: false,
        }));
      })
      .catch((error) => {
        setIsError(error?.data?.message);
        setOtpSent(false);
        setLoading((prev) => ({
          ...prev,
          loginWithOtp: false,
        }));
      });
  };

  return (
    <Index.Box className="admin-auth-main-flex">
      <Index.Box className="admin-auth-left-main">
        <PageIndex.AuthBackground />
      </Index.Box>

      <Index.Box className="admin-auth-right-main">
        <Index.Box className="admin-auth-box">
          <Index.Box className="admin-auth-main">
            <Index.Box className="user-header-cust-col">
              <Index.List className="user-header-logo-list grey-line">
                <Index.ListItem className="user-header-logo-listitem">
                  <Index.Link className="user-header-logo-box" to="/">
                    <img
                      src={PageIndex.Png.FooterLenovoLogo}
                      className="user-header-logo"
                      alt="logo"
                    />
                  </Index.Link>
                </Index.ListItem>
                <Index.ListItem className="user-header-logo-listitem">
                  <Index.Link className="user-header-logo-box" to="/">
                    <img
                      src={PageIndex.Png.FooterMotorolaLogo}
                      className="user-header-logo"
                      alt="logo"
                    />
                  </Index.Link>
                </Index.ListItem>
                <Index.ListItem className="user-header-logo-listitem">
                  <Index.Link className="user-header-logo-box" to="/">
                    <img
                      src={PageIndex.Png.FooterBharatLogo}
                      className="user-header-logo"
                      alt="logo"
                    />
                  </Index.Link>
                </Index.ListItem>
              </Index.List>
            </Index.Box>
            <Index.Box className="admin-auth-inner-main admin-login-inner-main user-auth-inner-main">
              <Index.Typography
                component="h2"
                variant="h2"
                className="admin-auth-title"
              >
                Sign in your account
              </Index.Typography>
              <Index.Typography className="user-auth-subtitle">
                Enter your email and password to login to your account.
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
                        <Index.Box className="admin-input-box auth-input">
                          <Index.FormHelperText className="admin-form-lable">
                            Email
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              className="admin-form-control"
                              placeholder="Enter email"
                              autoComplete="off"
                              name="email"
                              onBlur={formik.handleBlur}
                              value={formik.values.email}
                              onChange={(e) => {
                                const newValue = e.target.value.replace(
                                  /\s/g,
                                  ""
                                );
                                if (
                                  !/^\d+$/.test(newValue) ||
                                  newValue.length !== 11
                                ) {
                                  formik.setFieldValue("email", newValue);
                                }
                              }}
                            />
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.email && formik?.errors?.email}
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
                            Password
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.OutlinedInput
                              className="admin-form-control-eye admin-form-control"
                              placeholder="Enter password"
                              id="outlined-adornment-password"
                              type={showPassword ? "text" : "password"}
                              name="password"
                              autoComplete="off"
                              value={formik.values.password}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
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

                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik.touched.password &&
                                formik.errors?.password}
                            </Index.FormHelperText>
                          </Index.Box>
                          {isError &&
                            !(formik.touched.email && formik.errors.email) && (
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

                <Index.Box className="admin-forgot-row">
                  <Index.Link
                    className="admin-forgot-para"
                    to="/admin/forgot-password"
                  >
                    Forgot Password?
                  </Index.Link>
                </Index.Box>
                <Index.Box className="primary-btn-main admin-login-btn-main auth-btn-flex">
                  <Index.Button
                    className="primary-btn admin-login-btn"
                    type="submit"
                    loading={loading.login}
                    disabled={loading.loginWithOtp}
                  >
                    Login
                  </Index.Button>
                </Index.Box>
              </form>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
};

export default Login;
