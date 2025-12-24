import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  addEditTestimonial,
  getTestimonial,
} from "../../../../redux/services/AdminService";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";
import { imageUrl } from "../../../../config/DataService";
import moment from "moment";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import StarIcon from "@mui/icons-material/Star";

export default function AddEditTestimonial() {
  const navigate = PageIndex?.useNavigate();
  const params = PageIndex.useParams();
  const courseId = params.id;
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    sectionLoading: false,
  });
  const [imgURL, setImageUrl] = useState(null);
  // console.log({ imgURL });

  const initialValues = {
    title: "",
    stream: "",
    placed_in: "",
    rating: "",
    description: "",
    image: null,
    testimonialDate: "",
  };

  useEffect(() => {
    if (courseId) {
      fetchTestimonialDetails();
    }
  }, [courseId]);

  const formatDateTime = (date) => {
    if (!date) return "";
    return moment(date).format("YYYY-MM-DD");
  };

  const fetchTestimonialDetails = async () => {
    try {
      setLoading((prev) => ({ ...prev, pageLoading: true }));
      const response = await getTestimonial({ id: courseId });

      if (response?.data) {
        const course = response.data;
        setImageUrl(`${imageUrl}${course.image}`);
        formik.setValues({
          title: course?.title || "",
          stream: course?.stream || "",
          placed_in: course?.placed_in || "",
          rating: course?.rating || "",
          description: course?.description || "",
          image: course?.image,
          testimonialDate: course?.testimonial_date || "",
        });
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  };

  const handleSubmitCourse = async (values) => {
    setLoading((prev) => ({
      ...prev,
      btnLoading: true,
    }));
    // console.log({ values });

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("stream", values.stream);
      formData.append("placed_in", values.placed_in);
      formData.append("rating", values.rating || 0);
      formData.append("description", values.description);
      formData.append(
        "testimonial_date",
        formatDateTime(values.testimonialDate)
      );
      if (typeof values.image === "object") {
        formData.append("image", values?.image);
      }

      let response;

      if (courseId) {
        formData.append("id", courseId);

        response = await addEditTestimonial(formData);
      } else {
        // Add new course
        response = await addEditTestimonial(formData);
      }

      if (response?.status === 201 || response?.status === 200) {
        navigate("/admin/testimonial-list");
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
    validationSchema: PageIndex.addEditTestimonialSchema,
  });

  const handleRemoveImage = () => {
    formik.setFieldValue("image", null);
    setImageUrl(null);
  };
  // console.log("values",formik.values)
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
                {!courseId ? "Add" : "Edit"} Testimonial
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
                          Testimonial Image
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
                                src={imgURL || PageIndex.Svg.addIcon}
                                alt="Uploaded Preview"
                              />
                              <input
                                hidden
                                value=""
                                accept="image/*"
                                name="image"
                                type="file"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    formik.setFieldValue("image", file);
                                    setImageUrl(
                                      window?.URL?.createObjectURL(file)
                                    );
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
                        <Index.Box className="admin-input-box cus-admin-hackathon-dropdown">
                          <Index.FormHelperText className="admin-form-lable">
                            Name
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              className="admin-form-control"
                              placeholder="Enter name"
                              onBlur={formik.handleBlur}
                              value={formik.values.title}
                              onChange={(e) => {
                                let inputValue = e.target.value;
                                inputValue = inputValue
                                  .replace(/^\s+/, "")
                                  .replace(/\s+/g, " ");
                                formik.setFieldValue(
                                  "title",
                                  inputValue.slice(0, 100)
                                );
                              }}
                              autoComplete="off"
                              name="title"
                            />
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.title && formik?.errors?.title}
                            </Index.FormHelperText>
                          </Index.Box>
                        </Index.Box>
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
                      <Index.Box className="admin-input-box add-user-input date-input-box">
                        <Index.FormHelperText className="admin-form-lable">
                          Testimonial Date
                          <span className="sign-required">* </span>
                        </Index.FormHelperText>
                        <Index.Box className="admin-form-group outline-input-date-picker outline-input-placeholder">
                          <Index.LocalizationProvider
                            dateAdapter={Index.AdapterDayjs}
                          >
                            <Index.DemoContainer
                              components={["DatePicker", "DatePicker"]}
                            >
                              <Index.DatePicker
                                className="admin-form-control date-cust-placeholder"
                                name="testimonialDate"
                                format="DD/MM/YYYY"
                                value={
                                  formik?.values?.testimonialDate
                                    ? Index.dayjs(
                                        formik?.values?.testimonialDate
                                      )
                                    : null
                                }
                                onBlur={formik.handleBlur}
                                onChange={(dateSelected) => {
                                  const date = dateSelected?.$d;
                                  formik.setFieldValue("testimonialDate", date);
                                }}
                                slotProps={{
                                  textField: {
                                    readOnly: true,
                                    error: false,
                                    label: "Select testimonial date", // Placeholder-like effect
                                    InputLabelProps: {
                                      shrink: !!formik.values?.testimonialDate, // Shrink label when date is selected
                                    },
                                  },
                                }}
                              />
                            </Index.DemoContainer>
                          </Index.LocalizationProvider>
                        </Index.Box>
                        <Index.FormHelperText
                          error
                          className="admin-form-lable"
                        >
                          {formik?.touched?.testimonialDate &&
                            formik?.errors?.testimonialDate}
                        </Index.FormHelperText>
                      </Index.Box>
                    </Index.Box>

                    {/* {console.log("formk.values", formik.values)}
                    {console.log("formk.errors", formik.errors)} */}
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
                        <Index.Box className="admin-input-box cus-admin-hackathon-dropdown">
                          <Index.FormHelperText className="admin-form-lable">
                            Stream
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              className="admin-form-control"
                              placeholder="Enter stream"
                              onBlur={formik.handleBlur}
                              value={formik.values.stream}
                              onChange={(e) => {
                                let inputValue = e.target.value;
                                inputValue = inputValue
                                  .replace(/^\s+/, "")
                                  .replace(/\s+/g, " ");
                                formik.setFieldValue(
                                  "stream",
                                  inputValue.slice(0, 100)
                                );
                              }}
                              autoComplete="off"
                              name="stream"
                            />
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.stream &&
                                formik?.errors?.stream}
                            </Index.FormHelperText>
                          </Index.Box>
                        </Index.Box>
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
                        <Index.Box className="admin-input-box cus-admin-hackathon-dropdown">
                          <Index.FormHelperText className="admin-form-lable">
                            College
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              className="admin-form-control"
                              placeholder="Enter college"
                              onBlur={formik.handleBlur}
                              value={formik.values.placed_in}
                              onChange={(e) => {
                                let inputValue = e.target.value;
                                inputValue = inputValue
                                  .replace(/^\s+/, "")
                                  .replace(/\s+/g, " ");
                                formik.setFieldValue(
                                  "placed_in",
                                  inputValue.slice(0, 100)
                                );
                              }}
                              autoComplete="off"
                              name="placed_in"
                            />
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.placed_in &&
                                formik?.errors?.placed_in}
                            </Index.FormHelperText>
                          </Index.Box>
                        </Index.Box>
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
                        <Index.Box className="admin-input-box cus-admin-hackathon-dropdown">
                          <Index.FormHelperText className="admin-form-lable">
                            Rating
                            {/* <span className="sign-required">* </span> */}
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.Box className="admin-form-control">
                               <Index.Rating
                                  className="cus-rating"
                                  name="rating"
                                  value={formik.values.rating}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                            </Index.Box>
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.rating &&
                                formik?.errors?.rating}
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
                            <span className="sign-required">*</span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group testimonial-ckeditor-box">
                            <CKEditor
                              config={{
                                licenseKey: "GPL",
                                placeholder: "Enter description",
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
