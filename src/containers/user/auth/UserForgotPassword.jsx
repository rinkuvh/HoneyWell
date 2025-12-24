import React, { useState } from "react";
import Index from "../../Index";
import PageIndex from "../../PageIndex";
import { forgotPassword } from "../../../redux/services/UserService";
import DarkLight from "../../web/pages/webLayout/DarkLight";

export default function UserForgotPassword() {
  const navigate = PageIndex.useNavigate();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const handleForgetPassword = (values, { resetForm }) => {
    setLoading(true);
    forgotPassword(values)
      .then((res) => {
        setLoading(false);
        if (res?.status == 200) {
          const id = res?.data?.email;
          navigate("/user/user-verify-otp", { state: id });
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
    initialValues: { email: "" },
    validationSchema: PageIndex.forgotPasswordSchema,
    onSubmit: handleForgetPassword,
  });
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
            <Index.Box className="user-auth-main w-cust">
              <Index.Box className="user-auth-inner-main user-login-inner-main">
                <Index.Typography className="user-auth-title">
                  Forgot Password
                </Index.Typography>
                <Index.Typography className="user-auth-subtitle">
                  Enter your email. You will receive an OTP to reset your
                  password.
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
                                placeholder="Enter email"
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                onChange={(e) => {
                                  const newValue = e.target.value.replace(
                                    /\s/g,
                                    ""
                                  );
                                  formik.setFieldValue("email", newValue);
                                }}
                              />
                            </Index.Box>
                            <Index.FormHelperText error>
                              {formik.touched.email && formik.errors.email}
                            </Index.FormHelperText>
                          </Index.Box>
                          {isError &&
                            !(
                              formik?.touched?.email && formik?.errors?.email
                            ) && (
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
                    <Index.Link className="admin-forgot-para" to="/user">
                      Sign In?
                    </Index.Link>
                  </Index.Box>
                  <Index.Box className="user-btn-main user-uth-btn-main">
                    <Index.Button
                      className="user-auth-btn"
                      type="submit"
                      loading={loading}
                      disabled={loading}
                    >
                      Send
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
