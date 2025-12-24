import React, { useEffect, useState } from "react";
import Index from "../../Index";
import PageIndex from "../../PageIndex";
import { useFormik } from "formik";
import {
  loginUser,
} from "../../../redux/services/UserService";
import { userLoginData } from "../../../redux/slices/UserSlice";
import DarkLight from "../../web/pages/webLayout/DarkLight";
import { getToken } from "firebase/messaging";
import { messaging } from "../../../config/Firebase";

export default function UserLogin() {
  // for password eye hide and show
  const dispatch = PageIndex.useDispatch();
  const navigate = PageIndex.useNavigate();
  const location = PageIndex.useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState({
    login: false,
    loginWithOtp: false,
    googleLogin: false,
  });
  const [isError, setIsError] = useState("");
  const systemInfo = PageIndex.useSystemInfo();
  const [userId, setUserId] = useState("");
  const [modalShow, setModalShow] = React.useState(false);

  const [fcmToken, setFcmToken] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = () => {
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
    await loginUser({ ...values, ...systemInfo, fcmToken })
      .then((res) => {
        // if (res?.payload?.status == 200) {
        if (res?.status == 200) {
          dispatch(userLoginData(res));
          navigate("/user/dashboard");
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
        setLoading((prev) => ({
          ...prev,
          login: false,
        }));
        setIsError(error?.data?.message);
      });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: PageIndex.userLoginSchema,
    onSubmit: handleLogin,
  });

  useEffect(() => {
    if (location?.state?.id) {
      setUserId(location?.state.id);
      setModalShow(true);
    }
  }, [location]);

  const handleModalClose = () => {
    setModalShow(false);
    navigate("/user", { replace: true, state: null });
    setUserId(null);
  };

  async function requestPermission() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey:
            "BEyHsBpCogBhstQUmQeTfQ5-J-zijTiR0ngFtb2DzKtuzP6xBtnXejiBP5uNJhesICn1TGdiukmr4X76Na-sz5E",
          // "BDkx8ho5og2kZOA6wsKQCt3MtxlKgdQClOF5R9d1hCEpW0fxFokJXNV1CLAFyhzWRfHTODSUp2mw0gnfRXdDU0w",
        });
        if (token) {
          setFcmToken(token);
        }
      } else if (permission === "denied") {
        alert("You denied the notification permission.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <>
      <Index.Box className="user-auth-main-flex">
        <Index.Box class="absol-accesibility-box">
          <DarkLight />
        </Index.Box>
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
            <Index.Box className="user-auth-main">
              <Index.Box className="user-auth-inner-main user-login-inner-main">
                <Index.Typography className="user-auth-title">
                  Sign In
                </Index.Typography>
                <Index.Typography className="user-auth-subtitle">
                  Enter your email address and password to sign in to your
                  account.
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
                          <Index.Box className="user-input-box user-auth-input">
                            <Index.Box className="user-form-group">
                              <Index.TextField
                                fullWidth
                                id="fullWidth"
                                className="user-form-control"
                                autoComplete="off"
                                name="email"
                                placeholder="Enter Email Address"
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                onChange={(e) => {
                                  const newValue = e.target.value.replace(
                                    /\s/g,
                                    ""
                                  );
                                  setIsError("");
                                  formik.setFieldValue("email", newValue);
                                }}
                              />
                            </Index.Box>
                            <Index.FormHelperText error>
                              {formik.touched.email && formik.errors.email}
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
                            <Index.Box className="user-form-group outlined-input-form-group">
                              <Index.OutlinedInput
                                className="user-form-control-eye user-form-control"
                                autoComplete="off"
                                placeholder="Enter Password"
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                onChange={(e) => {
                                  const newValue = e.target.value.replace(
                                    /\s/g,
                                    ""
                                  );
                                  setIsError("");
                                  // if (newValue?.toString().length <= 20)
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
                          </Index.Box>{" "}
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
                  <Index.Box className="admin-forgot-row">
                    <Index.Link
                      className="admin-forgot-para"
                      to="/user/user-forgot-password"
                    >
                      Forgot Password?
                    </Index.Link>
                  </Index.Box>
                  <Index.Box className="user-btn-main user-uth-btn-main">
                    <Index.Button
                      className="user-auth-btn"
                      type="submit"
                      loading={loading.login}
                      disabled={loading.loginWithOtp}
                    >
                      Sign in
                    </Index.Button>
                  </Index.Box>
                  <Index.Typography className="user-auth-condition-text">
                    Would you like to sign up?
                    <span>
                      <Index.Link
                        to="/user/sign-up"
                        className="user-auth-link-text"
                      >
                        Sign Up
                      </Index.Link>
                    </span>
                  </Index.Typography>
                </form>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
      <PageIndex.WelcomeModal
        open={modalShow}
        handleClose={handleModalClose}
        userId={userId}
      />
    </>
  );
}
