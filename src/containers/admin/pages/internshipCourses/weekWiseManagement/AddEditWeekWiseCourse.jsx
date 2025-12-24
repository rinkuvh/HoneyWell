import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  addEditInternshipWeekManagement,
  getAllCourses,
  getSingleInternshipWeekManagement,
} from "../../../../../redux/services/AdminService";
import PageIndex from "../../../../PageIndex";
import Index from "../../../../Index";
import { weekWiseManagementSchema } from "../../../../../validations/Schema";
import { useLocation } from "react-router-dom";

export default function AddEditWeekWiseCourse() {
  const navigate = PageIndex?.useNavigate();
  const params = PageIndex.useParams();
  const weekWiseManagementId = params.id;
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    sectionLoading: false,
  });
  const location = useLocation();
  const [allCourse, setAllCourse] = useState([]);

  const initialValues = {
    title: "",
    course: [],
    description: "",
    assignmentRequired: ""
  };
  const getAllCourseOptions = async () => {
    try {
      setLoading((prev) => ({ ...prev, pageLoading: true }));
      const response = await getAllCourses();
      setAllCourse(response?.data || []);
    } catch (error) {
      setAllCourse([]);
    } finally {
      setLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  };
  const fetchData = async () => {
    try {
      setLoading((prev) => ({ ...prev, pageLoading: true }));
      const response = await getSingleInternshipWeekManagement(
        weekWiseManagementId
      );

      if (response?.data) {
        const course = response.data;
        formik.setValues({
          title: course?.title || "",
          description: course?.description || "",
          course: course?.courses?.length ? course?.courses?.map((data)=>data?.course_id) : [],
          assignmentRequired: course?.assignment_required ?? "",
        });
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  };

  useEffect(() => {
    if (weekWiseManagementId) {
      fetchData();
    }
  }, [weekWiseManagementId]);
  useEffect(() => {
    getAllCourseOptions();
  }, []);

  const handleSubmitCourse = async (values) => {
    setLoading((prev) => ({
      ...prev,
      btnLoading: true,
    }));
    console.log({ values });

    try {
      const formData = {
        title: values.title,
        course_id: values.course,
        internship_id: location.state.internshipCourse,
        assignment_required: values.assignmentRequired
      };

      if (weekWiseManagementId) {
        formData.id = weekWiseManagementId;
      }

      let response = await addEditInternshipWeekManagement(formData);

      if (response?.status === 201 || response?.status === 200) {
        navigate(-1);
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
    validationSchema: weekWiseManagementSchema,
  });

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
                {!weekWiseManagementId ? "Add" : "Edit"} Week-wise Management
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
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box cus-admin-hackathon-dropdown">
                          <Index.FormHelperText className="admin-form-lable">
                            Title
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              className="admin-form-control"
                              placeholder="Enter title"
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
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box">
                          <Index.FormHelperText className="admin-form-lable">
                            Select Courses
                            {/* <span className="sign-required">* </span> */}
                          </Index.FormHelperText>
                          <Index.Autocomplete
                            multiple
                            options={allCourse}
                            getOptionLabel={(option) => option.Title}
                            value={allCourse.filter((course) =>
                              formik.values.course.includes(course.CourseID)
                            )} // Set selected options from formik array
                            onChange={(event, newValue) => {
                              const selectedIds = newValue.map(
                                (course) => course.CourseID
                              );
                              formik.setFieldValue("course", selectedIds); // Save array of IDs
                            }}
                            renderInput={(params) => (
                              <Index.TextField
                                {...params}
                                fullWidth
                                id="course-select"
                                className="admin-form-control"
                                placeholder="Select Courses"
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

                    {/* assignmentRequired Option */}
                    <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 12",
                            md: "span 12",
                            lg: "span 12",
                          }}
                          className="grid-column"
                        >
                          <Index.Box className="admin-input-box filter-input user-input-box ">
                            <Index.FormHelperText className="admin-form-lable">
                              Assignment Required
                              <span className="sign-required" >*</span>
                            </Index.FormHelperText>
                            <Index.Box className="admin-form-group">
                              <Index.Box className="admin-dropdown-box">
                                <Index.FormControl className="admin-form-control">
                                  <Index.RadioGroup
                                    name="assignmentRequired"
                                    row
                                    value={formik.values.assignmentRequired}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  >
                                    <Index.FormControlLabel
                                      value="1"
                                      control={<Index.Radio size="small" />}
                                      label="Yes"
                                    />
                                    <Index.FormControlLabel
                                      value="0"
                                      control={<Index.Radio size="small" />}
                                      label="No"
                                    />
                                  </Index.RadioGroup>
                                </Index.FormControl>
                              </Index.Box>
                              <Index.FormHelperText error>
                                {formik.touched.assignmentRequired &&
                                  formik.errors.assignmentRequired}
                              </Index.FormHelperText>
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
