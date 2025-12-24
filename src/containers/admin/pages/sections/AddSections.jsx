import React, { useEffect, useState } from "react";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";
import { addSection, getSectionById } from "../../../../redux/services/AdminService";
import { imageUrl } from "../../../../config/DataService";

const imgMimeType = ["image/png", "image/jpg", "image/jpeg", "image/svg+xml"]
const AddSections = () => {
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
  });
  const [editSectionData, setEditSection] = useState(null);
  const location = PageIndex.useLocation();
  const navigate = PageIndex.useNavigate();
  const courseId = location?.state?.data?.course_id;
  const [imgURL, setImageUrl] = useState(null);
  const initialValues = {
    section_name: editSectionData?.section_name || "", 
    image: editSectionData?.image || null
  }
  const handleAddSection = async (values) => {
    try {
      setLoading((prev) => ({ ...prev, btnLoading: true }));
      const formData = new FormData();
      formData.append("sectionName", values.section_name);
      formData.append("courseId", courseId);
      if (values.image instanceof File || values.image instanceof Blob) {
        formData.append("image", values.image);
      }
      if(location?.state?.data?.id){
        formData.append("id", location?.state?.data?.id);
      }

      const response = await addSection(formData);

      if (response?.status == 200 || response?.status == 201) {
        navigate(-1);
      }
    } catch (error) {
      console.error("Error adding section:", error);
    } finally {
      setLoading((prev) => ({ ...prev, btnLoading: false }));
    }
  };

  const fetchSectionDetails = async () => {
    try {
      setLoading((prev) => ({ ...prev, pageLoading: true }));
      const response = await getSectionById(location?.state?.data?.id);

      if (response?.data) {
        const section = response.data;
        setEditSection(section);
      }
    } catch (error) {
      console.error("Error fetching section details:", error);
    } finally {
      setLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  };

  const formik = PageIndex.useFormik({
    initialValues: initialValues,
    validationSchema: PageIndex.addEditSectionSchema,
    onSubmit: handleAddSection,
    enableReinitialize: true,
  });
  
  const handleRemoveImage = () => {
    formik.setFieldValue("image", null);
    setImageUrl(null);
  }
  useEffect(()=>{
    if(location?.state?.data?.id){
      fetchSectionDetails();
    }
  }, [location?.state])
  return (
    <>
      {loading.pageLoading ? (
        <PageIndex.PageLoader />
      ) : (
        <>
          <Index.Box className="admin-dashboard-content">
            <Index.Box className="admin-page-title-flex admin-page-title-main">
              <Index.Typography
                className="admin-page-title"
                component="h2"
                variant="h2"
              >
                {location?.state?.data?.id ? "Edit" : "Add"} Section
              </Index.Typography>
            </Index.Box>
            <Index.Box className="common-card">
              <form onSubmit={formik.handleSubmit}>
                <Index.Box sx={{ width: 1 }} className="grid-main">
                <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="admin-input-box upload-course-image add-user-input section-img-input-box">
                        <Index.FormHelperText className="admin-form-lable">
                          Section Thumbnail (315x200)px
                          <span className="sign-required">* </span>
                        </Index.FormHelperText>
                        <Index.Box className="admin-form-group">
                          <Index.Box className="file-upload-btn-main">
                            <Index.Button
                              variant="contained"
                              component="label"
                              className="file-upload-btn"
                            >
                              <img
                                className={`${
                                  formik.values?.image
                                    ? typeof formik.values?.image === "string"
                                      ? "file-upload-profile-img"
                                      : imgMimeType.includes(formik.values?.image.type)
                                      ? "file-upload-profile-img"
                                      : "file-upload-icon-img"
                                    : "file-upload-icon-img"
                                }`}
                                src={
                                  formik.values?.image
                                    ? typeof formik.values?.image === "string"
                                      ? `${imageUrl}${formik.values?.image}`
                                      : 
                                      imgMimeType.includes(formik.values?.image.type)
                                      ? imgURL
                                      : PageIndex.Svg.addIcon
                                    : PageIndex.Svg.addIcon
                                }
                                key={imgURL}
                              />
                              <input
                                hidden
                                accept="image/*"
                                name="image"
                                type="file"
                                onChange={(e) => {
                                  try {
                                    formik.setTouched({ image: true });
                                    if (e.target.files && e.target.files[0]) {
                                      formik.setFieldValue(
                                        "image",
                                        e.target.files[0]
                                      );
                                      setImageUrl(
                                        URL.createObjectURL(e.target.files[0])
                                      );
                                    }
                                  } catch (error) {
                                    e.target.value = null;
                                  }
                                }}
                              />
                            </Index.Button>
                            {formik?.values?.image && (
                              <Index.Button
                                className="remove-image-box"
                                disableRipple
                                onClick={handleRemoveImage}
                              >
                                <img
                                  src={PageIndex.Svg.closeblack}
                                  className="cross-icon"
                                />
                              </Index.Button>
                            )}
                          </Index.Box>
                        </Index.Box>
                        <Index.FormHelperText
                          error
                          className="admin-form-lable"
                        >
                          {formik?.touched?.image && formik?.errors?.image}
                        </Index.FormHelperText>
                      </Index.Box>
                    </Index.Box>
                  <Index.Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap={{ xs: 2, sm: 2, md: 2, lg: 2 }}
                  >
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 6",
                        md: "span 6",
                        lg: "span 6",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box">
                          <Index.FormHelperText className="admin-form-lable">
                            Section name
                            {/* <span className="sign-required">* </span> */}
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              className="admin-form-control"
                              placeholder="Enter section name"
                              onBlur={formik.handleBlur}
                              value={formik.values.section_name}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "section_name",
                                  e.target.value
                                );
                              }}
                              autoComplete="off"
                              name="section_name"
                            />
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.section_name &&
                                formik?.errors?.section_name}
                            </Index.FormHelperText>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>

                <Index.Box className="admin-page-btn-end-flex primary-btn-main border-btn-main">
                  <PageIndex.BorderButton
                    className="admin-modal-cancel-btn border-btn"
                    onClick={() => navigate(-1)}
                    btnLabel="Back"
                  />

                  <PageIndex.PrimaryButton
                    className="primary-btn"
                    btnLabel="Submit"
                    type="submit"
                    loading={loading.btnLoading}
                  />
                </Index.Box>
              </form>
            </Index.Box>
          </Index.Box>
        </>
      )}
    </>
  );
};

export default AddSections;
