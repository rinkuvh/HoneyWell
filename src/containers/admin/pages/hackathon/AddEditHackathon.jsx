import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  addSection,
  deleteSection,
  addHackathon,
  getAllCourses,
  getHackathon,
} from "../../../../redux/services/AdminService";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";
import { imageUrl } from "../../../../config/DataService";
import moment from "moment";

export default function AddEditHackthon() {
  const navigate = PageIndex?.useNavigate();
  const params = PageIndex.useParams();
  const courseId = params.id;
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    sectionLoading: false,
  });
  const [imgURL, setImageUrl] = useState(null);
  const [sectionModal, setSectionModal] = useState(false);
  const [editSectionData, setEditSection] = useState(null);
  const [courseData, setCourseData] = useState("");
  const [allCourse, setAllCourse] = useState([]);
  console.log({ imgURL });

  const initialValues = {
    course: "",
    courseTitle: "",
    description: "",
    image: null,
    startdatetime: "",
    enddatetime: "",
    maxTeamSize: "",
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  useEffect(() => {
    getAllCourse();
  }, []);

  const formatDateTime = (date) => {
    if (!date) return "";
    return moment(date).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
  };

  const getAllCourse = async () => {
    try {
      setLoading((prev) => ({ ...prev, pageLoading: true }));
      const response = await getAllCourses();
      if (response?.data) {
        setAllCourse(response?.data);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  };

  const fetchCourseDetails = async () => {
    try {
      setLoading((prev) => ({ ...prev, pageLoading: true }));
      const response = await getHackathon({ id: courseId });

      if (response?.data) {
        const course = response.data;
        setCourseData(course);
        setImageUrl(`${imageUrl}${course.banner}`);
        formik.setValues({
          course: course?.course_id || "",
          courseTitle: course?.title || "",
          description: course?.description || "",
          image: course?.banner || null,
          startdatetime: course?.start_datetime || "",
          enddatetime: course?.end_datetime || "",
          maxTeamSize: course?.max_team_size || "",
        });
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  };

  const handleAddSection = async (values) => {
    try {
      setLoading((prev) => ({ ...prev, btnLoading: true }));

      const requestData = {
        sectionName: values.section_name,
        courseId,
        ...(editSectionData?.id && { id: editSectionData.id }),
      };

      const response = await addSection(requestData);

      if (response?.status == 200 || response?.status == 201) {
        setEditSection(null);
        setSectionModal(false);
      }
    } catch (error) {
      console.error("Error adding section:", error);
    } finally {
      setLoading((prev) => ({ ...prev, btnLoading: false }));
    }
  };

  const handleOpenDelete = async (row) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      handleDeleteSection(row?.id);
    }
  };

  const handleDeleteSection = async (data) => {
    try {
      await deleteSection({ sectionId: data });
    } catch (err) {
      console.error("Error deleting section:", err);
    }
  };

  const handleSubmitCourse = async (values) => {
    setLoading((prev) => ({
      ...prev,
      btnLoading: true,
    }));
    console.log({ values });

    try {
      const formData = new FormData();
      formData.append("title", values.courseTitle);
      formData.append("description", values.description);
      formData.append("course_id", values.course);
      formData.append("start_datetime", formatDateTime(values.startdatetime));
      formData.append("end_datetime", formatDateTime(values.enddatetime));
      formData.append("max_team_size", values.maxTeamSize);
      if (typeof values.image === "object") {
        formData.append("hackathonBanner", values?.image);
      }

      let response;

      if (courseId) {
        formData.append("id", courseId);

        response = await addHackathon(formData);
      } else {
        // Add new course
        response = await addHackathon(formData);
      }

      if (response?.status === 201 || response?.status === 200) {
        navigate("/admin/hackathon-list");
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
    validationSchema: PageIndex.addEditHackathonSchema,
  });

  const handleRemoveImage = () => {
    formik.setFieldValue("image", null);
    setImageUrl(null);
  };

  const fields = [
    {
      name: "section_name",
      label: "Section name",
      type: "text",
      placeholder: "Section Name",
      validation: Yup.string().required("Please enter Section name"),
      handleChange: (e, formik) => {
        formik.setFieldValue("section_name", e.target.value);
      },
    },
  ];

  return (
    <>
      {loading.pageLoading ? (
        <PageIndex.PageLoader />
      ) : (
        <>
          <Index.Box className="admin-dashboard-content add-edit-hackathon">
            <Index.Box className="admin-page-title-flex admin-page-title-main">
              <Index.Typography
                className="admin-page-title"
                component="h2"
                variant="h2"
              >
                {!courseId ? "Add" : "Edit"} Internship
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
                          Banner Image (315x200)px
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
                                  formik.setTouched({ image: true });
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
                        <Index.Box className="admin-input-box">
                          <Index.FormHelperText className="admin-form-lable">
                            Select Course
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Autocomplete
                            options={allCourse}
                            getOptionLabel={(option) => option.Title}
                            value={
                              allCourse.find(
                                (course) =>
                                  course.CourseID === formik.values.course
                              ) || null
                            } // Select default value
                            onChange={(event, newValue) => {
                              formik.setFieldValue(
                                "course",
                                newValue ? newValue.CourseID : ""
                              );
                            }}
                            renderInput={(params) => (
                              <Index.TextField
                                {...params}
                                fullWidth
                                id="course-select"
                                className="admin-form-control"
                                placeholder="Select Course"
                                autoComplete="off"
                                name="course"
                                onBlur={formik.handleBlur}
                                error={
                                  formik.touched.course &&
                                  Boolean(formik.errors.course)
                                }
                              />
                            )}
                            classes={{
                              option: "custom-hackathon-dropdown",
                            }}
                          />
                          <Index.FormHelperText
                            error
                            className="admin-form-lable"
                          >
                            {formik.touched.course && formik.errors.course}
                          </Index.FormHelperText>
                          {/* </Index.Box> */}
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
                            Internship Title
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              className="admin-form-control"
                              placeholder="Enter internship title"
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
                        sm: "span 6",
                        md: "span 6",
                        lg: "span 6",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="admin-input-box add-user-input date-input-box">
                        <Index.FormHelperText className="admin-form-lable">
                          Start Date & Time
                          <span className="sign-required">* </span>
                        </Index.FormHelperText>
                        <Index.Box className="admin-form-group outline-input-date-picker outline-input-placeholder">
                          <Index.LocalizationProvider
                            dateAdapter={Index.AdapterDayjs}
                          >
                            <Index.DemoContainer
                              components={["DateTimePicker", "DateTimePicker"]}
                            >
                              <Index.DateTimePicker
                                className="admin-form-control date-cust-placeholder"
                                name="startdatetime"
                                // disablePast
                                format="DD/MM/YYYY hh:mm A"
                                value={
                                  formik?.values?.startdatetime
                                    ? Index.dayjs(formik?.values?.startdatetime)
                                    : null
                                }
                                onBlur={formik.handleBlur}
                                onChange={(dateSelected) => {
                                  const date = dateSelected?.$d;
                                  formik.setFieldValue("startdatetime", date);
                                  formik.setFieldValue("enddatetime", "");
                                }}
                                timeSteps={{ minutes: 1 }}
                                slotProps={{
                                  textField: {
                                    readOnly: true,
                                    error: false,
                                    label: "Select start date & time", // Placeholder-like effect
                                    InputLabelProps: {
                                      shrink: !!formik.values?.startdatetime, // Shrink label when date is selected
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
                          {formik?.touched?.startdatetime &&
                            formik?.errors?.startdatetime}
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
                      <Index.Box className="admin-input-box add-user-input date-input-box">
                        <Index.FormHelperText className="admin-form-lable">
                          End Date & Time
                          <span className="sign-required">* </span>
                        </Index.FormHelperText>
                        <Index.Box className="admin-form-group outline-input-date-picker outline-input-placeholder">
                          <Index.LocalizationProvider
                            dateAdapter={Index.AdapterDayjs}
                          >
                            <Index.DemoContainer
                              components={["DateTimePicker", "DateTimePicker"]}
                            >
                              <Index.DateTimePicker
                                className="admin-form-control date-cust-placeholder"
                                name="enddatetime"
                                format="DD/MM/YYYY hh:mm A"
                                value={
                                  formik?.values?.enddatetime
                                    ? Index.dayjs(formik?.values?.enddatetime)
                                    : null
                                }
                                onBlur={formik.handleBlur}
                                onChange={(dateSelected) => {
                                  const date = dateSelected?.$d;
                                  formik.setFieldValue("enddatetime", date);
                                }}
                                disabled={!formik?.values?.startdatetime}
                                timeSteps={{ minutes: 1 }}
                                minDateTime={
                                  formik?.values?.startdatetime
                                    ? Index.dayjs(
                                        formik?.values?.startdatetime
                                      ).add(1, "minute")
                                    : null
                                }
                                slotProps={{
                                  textField: {
                                    readOnly: true,
                                    error: false,
                                    label: "Select end date & time", // Placeholder-like effect
                                    InputLabelProps: {
                                      shrink: !!formik.values?.enddatetime, // Shrink label when date is selected
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
                          {formik?.touched?.enddatetime &&
                            formik?.errors?.enddatetime}
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
                            Maximum Team Size
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              className="admin-form-control"
                              placeholder="Enter maximum team size"
                              onBlur={formik.handleBlur}
                              value={formik.values.maxTeamSize}
                              onChange={(e) => {
                                let inputValue = e.target.value.replace(
                                  /\D/g,
                                  ""
                                );
                                formik.setFieldValue(
                                  "maxTeamSize",
                                  inputValue.slice(0, 10)
                                );
                              }}
                              autoComplete="off"
                              name="maxTeamSize"
                            />
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.maxTeamSize &&
                                formik?.errors?.maxTeamSize}
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
                            Description (Optional)
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.TextareaAutosize
                              fullWidth
                              multiline
                              minRows={3}
                              maxRows={5}
                              id="fullWidth"
                              className="admin-form-control-textarea"
                              placeholder="Enter description"
                              onBlur={formik.handleBlur}
                              value={formik.values.description}
                              onChange={(e) => {
                                let inputValue = e.target.value;
                                inputValue = inputValue.replace(/^\s+/, "");
                                formik.setFieldValue(
                                  "description",
                                  inputValue.slice(0, 500)
                                );
                              }}
                              autoComplete="off"
                              name="description"
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

      <PageIndex.CommonFormModal
        isOpen={sectionModal}
        onClose={() => {
          setSectionModal(false);
          setEditSection(null);
        }}
        fields={fields}
        onSubmit={handleAddSection}
        formName="Section"
        initialData={editSectionData}
        loading={loading.btnLoading}
      />
    </>
  );
}
