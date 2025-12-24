import React, { useState } from "react";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";
;

const VerifyOtpModal = ({
  openUpdate,
  handleOpenUpdate,
  handleCloseUpdate,
  viewData,
}) => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    otp: "",
  };

  const handleSubmit = async () => {
    setLoading(true);

  
  };

  const formik = PageIndex.useFormik({
    initialValues: initialValues,
    validationSchema: PageIndex.otpSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <Index.Modal
        aria-labelledby="modal-modal-title"
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-describedby="modal-modal-description"
        className="admin-modal"
      >
        <Index.Box
          sx={PageIndex.style}
          className="admin-modal-inner admin-delete-modal-inner-main"
        >
          <Index.Box className="admin-modal-body">
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
                        length={6}
                        onChange={(e) => {
                          formik.setFieldValue("otp", e);
                        }}
                        onBlur={formik.handleBlur}
                        className="admin-form-control"
                        validateChar={(text, index) => {
                          const trimmedText = text.trim();
                          return /^[0-9]$/.test(trimmedText);
                        }}
                      />
                      <Index.FormHelperText error className="admin-form-lable">
                        {formik.touched.otp && formik.errors?.otp}
                      </Index.FormHelperText>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
                <Index.Box className="admin-forgot-row">
                  <Index.Link className="admin-forgot-para" to="/user">
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
      </Index.Modal>
    </>
  );
};

export default VerifyOtpModal;
