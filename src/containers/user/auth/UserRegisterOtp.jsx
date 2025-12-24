import React, { useEffect, useState } from "react";
import Index from "../../Index";
import PageIndex from "../../PageIndex";
import {
  resendOtp,
  verifyRegisterOtp,
} from "../../../redux/services/UserService";

export default function UserRegisterOtp() {
  const location = PageIndex.useLocation();
  const navigate = PageIndex.useNavigate();
  const [loading, setLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState({ minute: 2, seconds: 0 });
  const [isError, setIsError] = useState("");
  const [loadingResendOtp, setLoadingResentOtp] = useState(false);

  const initialValues = {
    otp: "",
  };

  const handleVerifyOtp = (values, { resetForm }) => {
    setLoading(true);
    const payload = {
      ...values,
      email: location?.state,
    };
    verifyRegisterOtp(payload)
      .then((res) => {
        if (res?.status == 200) {
          const id = res?.data?.userUniqueId;
          navigate("/user", { state: { id: id } });
          setLoading(false);
          resetForm();
        } else {
          setIsError(res?.response?.data?.message);
        }
        setTimeout(() => {
          setLoading(false);
          resetForm();
        }, 3000);
      })
      .catch((error) => {
        setIsError(error?.data?.message);
      });
  };

  const formik = PageIndex.useFormik({
    initialValues: initialValues,
    validationSchema: PageIndex.otpSchema,
    onSubmit: handleVerifyOtp,
  });

  useEffect(() => {
    let timer;
    if (otpTimer.minute > 0 || otpTimer.seconds > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev.minute === 0 && prev.seconds === 0) {
            clearInterval(timer);
            return prev;
          }
          return prev.seconds === 0
            ? { minute: prev.minute - 1, seconds: 59 }
            : { minute: prev.minute, seconds: prev.seconds - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpTimer]);

  const handleResendOtp = () => {
    setLoadingResentOtp(true)
    const payload = {
      email: location?.state,
    };
    resendOtp(payload).then((res) => {
      if (res?.status == 200) {
        setOtpTimer({ minute: 2, seconds: 0 });
        formik.resetForm();
      }
    }).finally(()=>{
      setLoadingResentOtp(false)
    });
  };

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
                  OTP !
                </Index.Typography>
                <Index.Typography
                  className="user-auth-subtitle">
                  We have sent an email with a verification code to <b>{location?.state}</b>. To continue, confirm your identity using the code below.
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
                          <Index.Box className="user-input-box user-otp-auth-input">
                            <Index.FormHelperText className="user-form-lable">
                              OTP
                              <span className="sign-required">*</span>
                            </Index.FormHelperText>
                            <Index.Box className="user-form-group">
                              <Index.MuiOtpInput
                                name="otp"
                                value={formik.values.otp}
                                onChange={(e) => {
                                  formik.setFieldValue("otp", e);
                                }}
                                onBlur={formik.handleBlur}
                                className="user-form-control"
                                length={6}
                                validateChar={(text, index) => {
                                  const trimmedText = text.trim();
                                  return /^[0-9]$/.test(trimmedText);
                                }}
                              />
                              <Index.FormHelperText
                                error
                                className="admin-error-text"
                              >
                                {formik.touched.otp && formik.errors?.otp}
                              </Index.FormHelperText>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                  <Index.Box className="timer-box">
                    {otpTimer.minute === 0 && otpTimer.seconds === 0 ? (
                      <>
                        <Index.Typography variant="span" component="span">
                          Didn't receive OTP?
                        </Index.Typography>
                        <span
                          className={`resend-otp-action ${loadingResendOtp ? "disable-action" : ""}`}
                          onClick={handleResendOtp}
                        >
                          Resend
                        </span>
                      </>
                    ) : (
                      <Index.Typography
                        className="resend-otp-box"
                        variant="span"
                        component="span"
                      >
                        Expires in{" "}
                        {otpTimer.minute < 10
                          ? `0${otpTimer.minute}`
                          : otpTimer.minute}
                        :
                        {otpTimer.seconds < 10
                          ? `0${otpTimer.seconds}`
                          : otpTimer.seconds}{" "}
                        sec
                      </Index.Typography>
                    )}
                  </Index.Box>
                  {isError && (
                    <Index.FormHelperText error className="admin-form-lable">
                      {isError}
                    </Index.FormHelperText>
                  )}
                  <Index.Box className="admin-forgot-row">
                    <Index.Link
                      className="admin-forgot-para"
                      to="/user/sign-up"
                    >
                      Sign Up?
                    </Index.Link>
                  </Index.Box>
                  <Index.Box className="user-btn-main user-uth-btn-main">
                    <Index.Button
                      className="user-auth-btn"
                      type="submit"
                      loading={loading}
                      disabled={loading}
                    >
                      Verify
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
