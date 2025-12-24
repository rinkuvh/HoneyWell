import React, { useEffect, useState } from "react";
import {
  getSections,
  addEditInternshipCourseService,
  getSingleInternshipCourses,
} from "../../../../redux/services/AdminService";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";
import { imageUrl } from "../../../../config/DataService";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { addEditInternshipCourseSchema } from "../../../../validations/Schema";

export default function AddEditInternshipCourse() {
  const navigate = PageIndex?.useNavigate();
  const params = PageIndex.useParams();
  const courseId = params.id;
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    sectionLoading: false,
  });
  const [imgURL, setImageUrl] = useState(null);
  const [sections, setSections] = useState({
    data: [],
    meta: { page: 1, limit: 10 },
  });
  const [courseData, setCourseData] = useState("");

  const initialValues = {
    courseTitle: "",
    description: "",
    image: null,
    duration: "",
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
      fetchSections();
    }
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      setLoading((prev) => ({ ...prev, pageLoading: true }));
      const response = await getSingleInternshipCourses(courseId);

      if (response?.data) {
        const course = response.data;
        setCourseData(course);
        setImageUrl(`${imageUrl}${course.Thumbnail}`);
        formik.setValues({
          courseTitle: course.Title,
          description: course.Description,
          image: course.Thumbnail,
          duration: course.Duration,
          is_for_pwd: course.is_for_pwd == "0" ? "no" : "yes",
        });
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  };

  const fetchSections = async () => {
    try {
      const response = await getSections({ course_id: courseId });
      if (response) {
        setSections(response);
      }
    } catch (error) {
      console.error("Error fetching sections:", error);
    } finally {
      setLoading((prev) => ({ ...prev, sectionLoading: false }));
    }
  };


  const handleSubmitCourse = async (values) => {
    setLoading((prev) => ({
      ...prev,
      btnLoading: true,
    }));

    try {
      const formData = new FormData();
      formData.append("Title", values.courseTitle);
      formData.append("Description", values.description);
      if (typeof values.image === "object") {
        formData.append("Thumbnail", values.image);
      }
      formData.append("Duration", values.duration);
      formData.append("is_for_pwd", values.is_for_pwd == "yes" ? 1 : 0);

      let response;

      if (courseId) {
        // Update existing course
        formData.append("id", courseId);
      }
      response = await addEditInternshipCourseService(formData);

      if (response?.status === 201 || response?.status === 200) {
        navigate("/admin/internship-course");
      }
    } catch (error) {
      console.error("Error submitting course:", error);
    } finally {
      setLoading((prev) => ({
        ...prev,
        btnLoading: false,
      }));
    }
  };

  const formik = Index.useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmitCourse,
    enableReinitialize: true,
    validationSchema: addEditInternshipCourseSchema,
  });

  const handleRemoveImage = () => {
    formik.setFieldValue("image", null);
    setImageUrl(null);
  };

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
                {!courseId ? "Add" : "Edit"} Internship Course
              </Index.Typography>
            </Index.Box>
            <Index.Box className="common-card">
              <form onSubmit={formik.handleSubmit}>
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
                      <Index.Box className="admin-input-box upload-course-image add-user-input">
                        <Index.FormHelperText className="admin-form-lable">
                          Course Image (315x200)px
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
                                      : [
                                          "image/png",
                                          "image/jpg",
                                          "image/jpeg",
                                          "image/svg+xml",
                                        ].includes(formik.values?.image.type)
                                      ? "file-upload-profile-img"
                                      : "file-upload-icon-img"
                                    : "file-upload-icon-img"
                                }`}
                                src={
                                  formik.values?.image
                                    ? typeof formik.values?.image === "string"
                                      ? imgURL
                                      : // ? formik.values?.image
                                      [
                                          "image/png",
                                          "image/jpg",
                                          "image/jpeg",
                                          "image/svg+xml",
                                        ].includes(formik.values?.image.type)
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
                            Course Title
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              className="admin-form-control"
                              placeholder="Enter course title"
                              onBlur={formik.handleBlur}
                              value={formik.values.courseTitle}
                              onChange={(e) => {
                                let inputValue = e.target.value;
                                inputValue = inputValue
                                  .replace(/^\s+/, "")
                                  .replace(/\s+/g, " ");
                                formik.setFieldValue(
                                  "courseTitle",
                                  inputValue.slice(0, 100)
                                );
                              }}
                              autoComplete="off"
                              name="courseTitle"
                            />
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.courseTitle &&
                                formik?.errors?.courseTitle}
                            </Index.FormHelperText>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box">
                          <Index.FormHelperText className="admin-form-lable">
                            Description
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group course-ckeditor-box">
                            <CKEditor
                              config={{
                                licenseKey: "GPL",
                                placeholder: "Please enter description",
                                toolbar: [
                                  "undo",
                                  "redo",
                                  "|",
                                  "heading",
                                  "|",
                                  "bold",
                                  "italic",
                                  "link",
                                  "|",
                                  "bulletedList",
                                  "numberedList",
                                  "|",
                                  "insertTable",
                                ],
                              }}
                              editor={ClassicEditor}
                              name="description"
                              contenteditable="true"
                              className=""
                              data={formik?.values?.description}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                formik?.setFieldValue("description", data);
                              }}
                              onBlur={formik.handleBlur}
                            />
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.description &&
                                formik?.errors?.description}
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
}
