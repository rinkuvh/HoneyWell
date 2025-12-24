import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  getPwdFeedback,
} from "../../../../redux/services/AdminService";
import { imageUrl } from "../../../../config/DataService";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function ViewPwdFeedback() {
  const navigate = PageIndex.useNavigate();
  const params = useParams();
  const courseId = params.id;

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

  const formatDateTime = (date) => {
    if (!date) return "";
    return moment(date).add(8, "hours").format("MMM D, YYYY h:mm A");
  };

  const fetchCourseDetails = async () => {
    try {
      setLoading((prev) => ({ ...prev, pageLoading: true }));
      const response = await getPwdFeedback({ id: courseId });

      if (response?.data) {
        const course = response.data;
        setCourseData(course);
        setImageUrl(`${imageUrl}${course.banner}`);
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
              View PWD Feedback
            </Index.Typography>
            <Index.Box className="admin-userlist-inner-btn-flex">
              <Index.Box className="primary-btn-main">
                <Index.Button
                  className="primary-btn"
                  onClick={() => navigate(-1)}
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
                      sm: "span 6",
                      md: "span 6",
                      lg: "span 6",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="add-page-form-main">
                      <Index.Box className="admin-input-box">
                        <Index.FormHelperText className="admin-form-lable">
                          Name
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                          {courseData?.name || "-"}
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
                          Email
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                          {courseData?.email || "-"}
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
                          Mobile Number
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                          {courseData?.mobile || "-"}
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
                          Created Date & Time
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                          {formatDateTime(courseData?.created_at) || "-"}
                        </Index.Typography>
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
                          Feedback
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                          {courseData?.feedback || "-"}
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
    </>
  );
}
