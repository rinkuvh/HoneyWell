import React, { useEffect, useState } from "react";

import PageIndex from "../../PageIndex";
import Index from "../../Index";
import {
  adminLoginWithOtp,
  resendOTP,
} from "../../../redux/services/AdminService";
import { loginData } from "../../../redux/slices/AdminSlice";

export default function AdminLoginWithOtp() {
  const location = PageIndex.useLocation();
  const navigate = PageIndex.useNavigate();
  const dispatch = PageIndex.useDispatch();
  const systemInfo = PageIndex.useSystemInfo();
  const [loading, setLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState({ minute: 2, seconds: 0 });
  const [isError, setIsError] = useState("");
  const initialValues = {
    otp: "",
  };

  const handleVerifyOtp = (values, { resetForm }) => {
    setLoading(true);
    const payload = {
      ...values,
      ...systemInfo,
      id: location?.state?.id,
    };
    // dispatch(adminLoginWithOtp(payload))
    adminLoginWithOtp(payload)
      .then((res) => {
        // if (res?.payload?.status == 200) {
        if (res?.status == 200) {
          dispatch(loginData(res));
          navigate("/admin/dashboard");
          setLoading(false);
          resetForm();
        } else {
          setLoading(false);
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
    const payload = {
      id: location?.state?.id,
    };
    resendOTP(payload).then((res) => {
      if (res?.status == 200) {
        setOtpTimer({ minute: 2, seconds: 0 });
        formik.resetForm();
      }
    });
  };
  return (
    <>
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
              <form onSubmit={formik.handleSubmit}>
                <Index.Box className="admin-auth-inner-main admin-otp-inner-main">
                  <Index.Typography
                    component="h2"
                    variant="h2"
                    className="admin-auth-title"
                  >
                    OTP !
                  </Index.Typography>
                  <Index.Typography
                    component="p"
                    variant="p"
                    className="admin-sign-para"
                  >
                    Please provide the OTP to continue.
                  </Index.Typography>
                  <Index.Box className="admin-otp-flex-main">
                    <Index.Box className="admin-otp-input-box">
                      <Index.Box className="admin-form-group">
                        <Index.MuiOtpInput
                          name="otp"
                          value={formik.values.otp}
                          onChange={(e) => {
                            formik.setFieldValue("otp", e);
                          }}
                          onBlur={formik.handleBlur}
                          className="admin-form-control"
                          length={6}
                          validateChar={(text, index) => {
                            const trimmedText = text.trim();
                            return /^[0-9]$/.test(trimmedText);
                          }}
                        />
                        <Index.FormHelperText
                          error
                          className="admin-form-lable"
                        >
                          {formik.touched.otp && formik.errors?.otp}
                        </Index.FormHelperText>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                  {isError && !(formik.touched.otp && formik.errors?.otp) && (
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
                        <Index.Button
                          className="resend-otp-btn"
                          onClick={handleResendOtp}
                          type="button"
                        >
                          Resend
                        </Index.Button>
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
                      Back?
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
    </>
  );
}
