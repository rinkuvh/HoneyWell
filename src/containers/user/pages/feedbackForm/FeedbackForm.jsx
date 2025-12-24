import React from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { feedbackService } from "../../../../redux/services/UserService";

export default function FeedbackForm() {
  const [loading, setLoading] = React.useState(false);

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    feedback: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const response = await feedbackService(values);
      if (response?.status == 201) {
        resetForm();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formik = PageIndex.useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: PageIndex.feedBackFormSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <Index.Box className="blog-section feedback-form popular-sect">
        <Index.Box className="container">
          <Index.Box className="section-title-flex">
            <Index.Box className="section-content-main">
              <Index.Typography className="section-title">
                Share Your Feedback
              </Index.Typography>
              <Index.Typography className="section-para">
                Your feedback is important to us. Please share your thoughts,
                suggestions, or concerns to help us improve our services. We
                appreciate your time and will carefully review your input to
                enhance your experience.
              </Index.Typography>
            </Index.Box>
          </Index.Box>
          <form onSubmit={formik.handleSubmit}>
            <Index.Box className="contact-cust-box feedback-cus">
              <Index.Box className="fb-form">
                <Index.Box className="input-row">
                  <Index.Box className="w-50">
                    <Index.TextField
                      className="w-50"
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formik.values.name}
                      autoComplete="off"
                      onChange={(e) => {
                        const value = e.target.value;
                        const testRegex = /^(?!\s)[A-Za-z\s]+$/;
                        if (testRegex.test(value) || value == "") {
                          formik.setFieldValue(
                            "name",
                            value.replace(/\s+/g, " ")
                          );
                        }
                      }}
                      onBlur={formik.handleBlur}
                    />
                    <Index.FormHelperText error className="admin-form-lable">
                      {formik?.touched?.name && formik?.errors?.name}
                    </Index.FormHelperText>
                  </Index.Box>
                  <Index.Box className="w-50">
                    <Index.TextField
                      className="w-50"
                      type="text"
                      name="email"
                      value={formik.values.email}
                      placeholder="Email"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <Index.FormHelperText error className="admin-form-lable">
                      {formik?.touched?.email && formik?.errors?.email}
                    </Index.FormHelperText>
                  </Index.Box>
                  <Index.Box className="w-50">
                    <Index.TextField
                      className="w-50"
                      type="text"
                      name="mobile"
                      value={formik.values.mobile}
                      placeholder="Mobile number"
                      autoComplete="off"
                      onChange={(e) => {
                        const value = e.target.value;
                        const phoneNumberDigits = value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        formik.setFieldValue("mobile", phoneNumberDigits);
                      }}
                      onBlur={formik.handleBlur}
                    />
                    <Index.FormHelperText error className="admin-form-lable">
                      {formik?.touched?.mobile && formik?.errors?.mobile}
                    </Index.FormHelperText>
                  </Index.Box>
                </Index.Box>
                <Index.Box className="message-box feedback-box">
                  <Index.TextareaAutosize
                    fullWidth
                    minRows={4}
                    type="text"
                    name="feedback"
                    placeholder="Enter Your Feedback"
                    autoComplete="off"
                    value={formik.values.feedback}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <Index.FormHelperText error className="admin-form-lable">
                    {formik?.touched?.feedback && formik?.errors?.feedback}
                  </Index.FormHelperText>
                </Index.Box>
              </Index.Box>
              <Index.Box className="user-header-right-main sendmsg-btn-box">
                <PageIndex.PrimaryButton
                  type="submit"
                  className="header-login-btn sendmsg-btn fade-up"
                  btnLabel="Submit Feedback"
                  loading={loading}
                />
              </Index.Box>
            </Index.Box>
          </form>
        </Index.Box>
      </Index.Box>
      <PageIndex.GoToTop />
    </>
  );
}
