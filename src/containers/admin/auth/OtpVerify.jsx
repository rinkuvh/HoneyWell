import React, { useState, useEffect } from "react";
import {
  loginVerifyOtp,
  resendForgotPasswordOTP,
  resendOTP,
  verifyOtp,
} from "../../../redux/services/AdminService";
import PageIndex from "../../PageIndex";
import Index from "../../Index";
import { loginData } from "../../../redux/slices/AdminSlice";

export default function OtpVerify() {
  const location = PageIndex.useLocation();
  const navigate = PageIndex.useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingResendOtp, setLoadingResentOtp] = useState(false);
  const [otpTimer, setOtpTimer] = useState({ minute: 2, seconds: 0 });
  const [isError, setIsError] = useState("");
  const dispatch = PageIndex.useDispatch();

  const initialValues = { otp: "" };
  const handleVerifyOtp = (values, { resetForm }) => {
    setLoading(true);
    const payload = { ...values, email: location?.state?.email };
    if (location?.state?.type === "Login") {
      loginVerifyOtp(payload)
        .then((res) => {
          if (res?.status == 200) {
            dispatch(loginData(res));
            navigate("/admin/dashboard");
            resetForm();
          } else {
            setIsError(res?.response?.data?.message);
          }
        })
        .catch((error) => {
          setIsError(error?.data?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      verifyOtp(payload)
        .then((res) => {
          if (res?.status === 200) {
            navigate("/admin/reset-password", { state: { id: res?.data?.id } });
            resetForm();
          } else {
            setLoading(false);
            setIsError(res?.response?.data?.message);
          }
        })
        .finally(() => setLoading(false))
        .catch((error) => {
          setIsError(error?.data?.message);
        });
    }
  };

  const formik = PageIndex.useFormik({
    initialValues,
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
    setLoadingResentOtp(true);
    const payload = {
      email: location?.state?.email,
    };
    let resendOtpFunction = location?.state?.type === "Login" ?  resendOTP : resendForgotPasswordOTP;
    resendOtpFunction(payload)
      .then((res) => {
        if (res?.status == 200) {
          setOtpTimer({ minute: 2, seconds: 0 });
          formik.resetForm();
        }
      })
      .finally(() => {
        setLoadingResentOtp(false);
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
            <form onSubmit={formik.handleSubmit}>
              <Index.Box className="admin-auth-inner-main admin-otp-inner-main user-auth-inner-main">
                <Index.Typography
                  component="h2"
                  variant="h2"
                  className="admin-auth-title"
                >
                  OTP !
                </Index.Typography>
                <Index.Typography className="user-auth-subtitle">
                  We have sent an email with a verification code to your email.
                  To continue, confirm your identity using the code below.
                </Index.Typography>
                <Index.Box className="admin-otp-flex-main">
                  <Index.Box className="admin-otp-input-box">
                    <Index.Box className="admin-form-group">
                      <Index.MuiOtpInput
                        name="otp"
                        value={formik.values.otp}
                        onChange={(value) => {
                          formik.setFieldValue("otp", value);
                        }}
                        onBlur={formik.handleBlur}
                        className="admin-form-control"
                        length={6}
                        validateChar={(text, index) => {
                          const trimmedText = text.trim();
                          return /^[0-9]$/.test(trimmedText);
                        }}
                      />

                      <Index.FormHelperText error className="admin-form-lable">
                        {formik.touched.otp && formik.errors.otp}
                      </Index.FormHelperText>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
                {isError && (
                  <Index.FormHelperText error className="admin-form-lable">
                    {isError}
                  </Index.FormHelperText>
                )}
                <Index.Box className="timer-box">
                  {otpTimer.minute === 0 && otpTimer.seconds === 0 ? (
                    <>
                      <Index.Typography variant="span" component="span">
                        Didn't receive OTP?
                      </Index.Typography>
                      <span
                        className={`resend-otp-action ${
                          loadingResendOtp ? "disable-action" : ""
                        }`}
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
                    Verify
                  </Index.Button>
                </Index.Box>
              </Index.Box>
            </form>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
}
