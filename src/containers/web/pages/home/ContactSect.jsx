import React from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { contactUsService } from "../../../../redux/services/UserService";

export default function Blog() {
  const navigate = PageIndex.useNavigate();
  const [value, setValue] = React.useState(2);
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await contactUsService(values);

      if (response?.status == 200) {
        setSubmitting(false);
        resetForm();
      }
    } catch (error) {}
  };

  const formik = PageIndex.useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: PageIndex.contactUsSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <Index.Box className="about-cust-sect-new contact-new">
        <Index.Box className="blog-section popular-sect" sx={{ margin:"0" }}>
          <Index.Box className="container">
            <Index.Grid container spacing={2} alignItems={'center'}>
              <Index.Grid item md={5} xs={12} sm={12}>
                <Index.Box className="section-title-flex">
                  <Index.Box className="section-content-main">
                    <Index.Typography
                      className="section-title"
                      style={{ textAlign: "start" }}
                    >
                      Contact Us
                    </Index.Typography>
                    <Index.Typography className="section-para">
                      Have questions or need support? We're here to help! Reach
                      out to us for inquiries, assistance, or feedback, and our
                      dedicated team will get back to you as soon as possible.
                      Your success is our priority!
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Grid>
              <Index.Grid item md={7} xs={12} sm={12}>
                <form onSubmit={formik.handleSubmit}>
                  <Index.Box className="contact-cust-box contact-us-main">
                    <Index.Box className="contact-cust-cont">
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
                          <Index.FormHelperText
                            error
                            className="admin-form-lable"
                          >
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
                          <Index.FormHelperText
                            error
                            className="admin-form-lable"
                          >
                            {formik?.touched?.email && formik?.errors?.email}
                          </Index.FormHelperText>
                        </Index.Box>
                      </Index.Box>
                      <Index.Box className="message-box">
                        <Index.TextField
                          fullWidth
                          type="text"
                          name="message"
                          placeholder="Enter Your Query"
                          autoComplete="off"
                          value={formik.values.message}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <Index.FormHelperText
                          error
                          className="admin-form-lable"
                        >
                          {formik?.touched?.message && formik?.errors?.message}
                        </Index.FormHelperText>
                      </Index.Box>
                    </Index.Box>
                    <Index.Box className="user-header-right-main sendmsg-btn-box">
                      <Index.Button
                        type="submit"
                        className="header-login-btn sendmsg-btn fade-up"
                        loading={formik.isSubmitting}
                      >
                        Send Message
                      </Index.Button>
                    </Index.Box>
                  </Index.Box>
                </form>
              </Index.Grid>
            </Index.Grid>
          </Index.Box>
        </Index.Box>
      </Index.Box>
      <PageIndex.GoToTop />
    </>
  );
}
