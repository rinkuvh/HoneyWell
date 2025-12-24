import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { getCourses } from "../../../../redux/services/AdminService";
import { imageUrl } from "../../../../config/DataService";
import { useParams } from "react-router-dom";
import SubLayout from "./SubLayout";
import { convertMinutesToHours } from "../../../../components/common/common";

export default function ViewCourse() {
  const navigate = PageIndex.useNavigate();
  const location = PageIndex.useLocation();
  // ;

  const params = useParams();

  const courseId = params.id;

  const isQuiz = location?.state?.isQuiz || false;
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    sectionLoading: false,
  });
  const [imgURL, setImageUrl] = useState(null);
  const [courseData, setCourseData] = useState(null);

  const initialValues = {
    courseTitle: "",
    description: "",
    image: null,
    duration: "",
  };

  const formik = Index.useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: PageIndex.CourseSchema,
  });

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      setLoading((prev) => ({ ...prev, pageLoading: true }));
      const response = await getCourses({ CourseID: courseId });

      if (response?.data) {
        const course = response.data;
        setCourseData(course);
        setImageUrl(`${imageUrl}${course.Thumbnail}`);
        formik.setValues({
          courseTitle: course.Title,
          description: course.Description,
          image: course.Thumbnail,
          duration: course.Duration,
        });
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  };

  return (
    <>
      {loading.pageLoading ? (
        <PageIndex.PageLoader />
      ) : (
        <Index.Box className="admin-dashboard-content">
          <Index.Box className="admin-page-title-flex admin-page-title-main admin-title-flex-box">
            <Index.Typography
              className="admin-page-title"
              component="h2"
              variant="h2"
            >
              {`View Course | ${courseData?.Title}`}
            </Index.Typography>
            <Index.Box className="admin-userlist-inner-btn-flex">
              <Index.Box className="primary-btn-main">
                <Index.Button
                  className="primary-btn"
                  onClick={() => navigate("/admin/courses-list")}
                >
                  Back
                </Index.Button>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          <Index.Box className="common-card">
            <form>
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
                    <Index.Box className="admin-input-box add-user-input">
                      <Index.FormHelperText className="admin-form-lable">
                        Course Image
                      </Index.FormHelperText>
                      <Index.Box className="admin-form-group">
                        <Index.Box className="file-upload-btn-main">
                          <img
                            className="file-upload-profile-img"
                            src={imgURL || PageIndex.Svg.addIcon}
                            // crossOrigin="anonymous"
                            alt="Course Image"
                            key={imgURL}
                          />
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
                      <Index.Box className="admin-input-box">
                        <Index.FormHelperText className="admin-form-lable">
                          Course Title
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value break-text-word">
                          {formik?.values?.courseTitle || ""}
                        </Index.Typography>
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
                      <Index.Box className="admin-input-box">
                        <Index.FormHelperText className="admin-form-lable">
                          Duration (hh:mm)
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                          {/* {formik?.values?.duration || ""} */}
                          {formik?.values?.duration
                            ? convertMinutesToHours(formik?.values?.duration)
                            : ""}
                        </Index.Typography>
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
                      <Index.Box className="admin-input-box">
                        <Index.FormHelperText className="admin-form-lable">
                          Description
                        </Index.FormHelperText>
                        <Index.Typography
                          className="view-card-data-value course-description"
                          dangerouslySetInnerHTML={{
                            __html: formik?.values?.description || "",
                          }}
                        />
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
                      <Index.Box className="admin-input-box">
                        <Index.FormHelperText className="admin-form-lable">
                          PWD
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                          {courseData?.is_for_pwd == 0 ? "No" : "Yes"}
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </form>
          </Index.Box>
        </Index.Box>
      )}
      <Index.Box className="admin-dashboard-content">
        <SubLayout
          courseId={courseId}
          courseData={courseData}
          loading={loading.pageLoading}
          isQuiz={isQuiz}
        />
      </Index.Box>
    </>
  );
}
