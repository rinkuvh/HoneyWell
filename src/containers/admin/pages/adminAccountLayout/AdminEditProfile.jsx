import React, { useState } from "react";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";
import { updateProfile } from "../../../../redux/services/AdminService";

const AdminEditProfile = () => {
  const { adminProfile } = PageIndex.useSelector((state) => state.admin);
  const dispatch = PageIndex.useDispatch();
  const navigate = PageIndex.useNavigate();
  const [loader, setLoader] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const initialValues = {
    firstName: adminProfile?.first_name ? adminProfile?.first_name : "",
    lastName: adminProfile?.last_name ? adminProfile?.last_name : "",
    email: adminProfile?.email ? adminProfile?.email : "",
  };


  const handleEditProfile = (values) => {
    let formData = {
      first_name: values?.firstName,
      last_name: values?.lastName,
      email: values?.email
    }

    setLoader(true);
    dispatch(updateProfile(formData)).then((data) => {
      if (data?.payload?.status == 200) {
        setLoader(false);
        setProfileImage("");
      } else {
        setTimeout(() => {
          setLoader(false);
          setProfileImage("");
        }, 2000);
      }
    });
  };

  const formik = PageIndex.useFormik({
    initialValues: initialValues,
    validationSchema: PageIndex.editProfileSchema,
    onSubmit: handleEditProfile,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Index.Box className="admin-edit-profile-main common-card">
        <Index.Box className="admin-edit-profile-flex">
        </Index.Box>
        <Index.Box sx={{ width: 1 }} className="grid-main">
          <Index.Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={{ xs: 2, sm: 2, md: 2, lg: 2 }}
          >
            <Index.Box
              gridColumn={{
                xs: "span 12",
                sm: "span 4",
                md: "span 4",
                lg: "span 4",
              }}
              className="grid-column"
            >
              <Index.Box className="grid-column">
                <Index.Box className="admin-input-box admin-add-user-input">
                  <Index.FormHelperText className="admin-form-lable">
                    First Name
                    <span className="sign-required">* </span>

                  </Index.FormHelperText>
                  <Index.Box className="admin-form-group">
                    <Index.TextField
                      fullWidth
                      id="fullWidth"
                      className="admin-form-control"
                      placeholder="Enter First Name"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={(e) => {
                        let value= e.target.value.replace(/[^a-zA-z]/g,"")
                        const newValue = PageIndex.processString(
                         value,
                          50
                        );
                        formik.setFieldValue("firstName", newValue);
                      }}
                      onBlur={formik.handleBlur}
                    />
                    <Index.FormHelperText error className="admin-form-lable">
                      {formik?.touched?.firstName && formik?.errors?.firstName}
                    </Index.FormHelperText>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
            <Index.Box
              gridColumn={{
                xs: "span 12",
                sm: "span 4",
                md: "span 4",
                lg: "span 4",
              }}
              className="grid-column"
            >
              <Index.Box className="grid-column">
                <Index.Box className="admin-input-box admin-add-user-input">
                  <Index.FormHelperText className="admin-form-lable">
                    Last Name
                    <span className="sign-required">* </span>
                  </Index.FormHelperText>
                  <Index.Box className="admin-form-group">
                    <Index.TextField
                      fullWidth
                      id="fullWidth"
                      className="admin-form-control"
                      placeholder="Enter Last Name"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={(e) => {
                        let value= e.target.value.replace(/[^a-zA-z]/g,"")
                        const newValue = PageIndex.processString(
                        value,
                          50
                        );
                        formik.setFieldValue("lastName", newValue);
                      }}
                      onBlur={formik.handleBlur}
                    />
                    <Index.FormHelperText error className="admin-form-lable">
                      {formik?.touched?.lastName && formik?.errors?.lastName}
                    </Index.FormHelperText>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
            <Index.Box
              gridColumn={{
                xs: "span 12",
                sm: "span 4",
                md: "span 4",
                lg: "span 4",
              }}
              className="grid-column"
            >
              <Index.Box className="grid-column">
         
              </Index.Box>
            </Index.Box>
            <Index.Box
              gridColumn={{
                xs: "span 12",
                sm: "span 4",
                md: "span 4",
                lg: "span 4",
              }}
              className="grid-column"
            >
              <Index.Box className="grid-column">
                <Index.Box className="admin-input-box admin-add-user-input">
                  <Index.FormHelperText className="admin-form-lable">
                    Email
                    <span className="sign-required">* </span>

                  </Index.FormHelperText>
                  <Index.Box className="admin-form-group">
                    <Index.TextField
                      fullWidth
                      id="fullWidth"
                      className="admin-form-control"
                      name="email"
                      value={formik.values.email}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/\s/g, "");
                        formik.setFieldValue("email", newValue);
                      }}
                      onBlur={formik.handleBlur}
                      placeholder="Enter Email"
                      disabled
                    />
                    <Index.FormHelperText error className="admin-form-lable">
                      {formik?.touched?.email && formik?.errors?.email}
                    </Index.FormHelperText>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>

            <Index.Box
              gridColumn={{
                xs: "span 12",
                sm: "span 8",
                md: "span 8",
                lg: "span 8",
              }}
              className="grid-column"
            >
            </Index.Box>
          </Index.Box>
        </Index.Box>
        <Index.Box className="admin-page-btn-end-flex primary-btn-main border-btn-main">
          <Index.Button
            className="border-btn"
            onClick={() => navigate("/admin/dashboard")}
          >
            Discard
          </Index.Button>
          <Index.Button className="primary-btn" type="submit" loading={loader}>
            Submit
          </Index.Button>
        </Index.Box>
      </Index.Box>
    </form>
  );
};

export default AdminEditProfile;
