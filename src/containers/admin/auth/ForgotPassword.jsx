import React, { useState } from "react";
import Index from "../../Index";
import PageIndex from "../../PageIndex";
import { forgotPassword } from "../../../redux/services/AdminService";

export default function ForgotPassWord() {
  const navigate = PageIndex.useNavigate();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const handleForgetPassword = (values, { resetForm }) => {
    setLoading(true);

    forgotPassword(values)
      .then((res) => {
        if (res?.status == 200) {
          navigate("/admin/verify-otp", { state: { email: values?.email } });
          resetForm();
          setLoading(false);
        } else {
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
    initialValues: { email: "" },
    validationSchema: PageIndex.forgotPasswordSchema,
    onSubmit: handleForgetPassword,
  });

  return (
    <>
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
              <form onSubmit={formik.handleSubmit}>
                <Index.Box className="admin-auth-inner-main admin-login-inner-main user-auth-inner-main">
                  <Index.Typography
                    component="h2"
                    variant="h2"
                    className="admin-auth-title"
                  >
                    Forgot Password
                  </Index.Typography>
                  <Index.Typography className="user-auth-subtitle">
                    Enter your email. You will receive an OTP to reset your
                    password.
                  </Index.Typography>

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
                                autocomplete="off"
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
                              <Index.FormHelperText
                                error
                                className="admin-form-lable"
                              >
                                {formik?.touched?.email &&
                                  formik?.errors?.email}
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
                  </Index.Box>

                  <Index.Box className="admin-forgot-row">
                    <Index.Link className="admin-forgot-para" to="/admin">
                      Login?
                    </Index.Link>
                  </Index.Box>
                  <Index.Box className="primary-btn-main admin-login-btn-main auth-btn-flex">
                    <Index.Button
                      className="primary-btn admin-login-btn"
                      type="submit"
                      loading={loading}
                    >
                      Send
                    </Index.Button>
                  </Index.Box>
                </Index.Box>
              </form>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}
