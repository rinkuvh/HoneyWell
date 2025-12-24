import React, { useEffect, useState } from "react";
import Index from "../../../../Index";
import PageIndex from "../../../../PageIndex";
import { useParams } from "react-router-dom";
import { getSingleInternshipWeekManagement } from "../../../../../redux/services/AdminService";

const assignmentReqObj = {
  0: "No",
  1: "Yes"
}
export default function ViewWeekWiseCourse() {
  const navigate = PageIndex.useNavigate();
  const location = PageIndex.useLocation();

  const params = useParams();

  const internshipCourseId = params.id;

  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    sectionLoading: false,
  });
  const [courseData, setCourseData] = useState(null);

  const initialValues = {
    title: "",
    description: "",
    course: "",
  };

  const formik = Index.useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: PageIndex.CourseSchema,
  });

  const fetchData = async () => {
    try {
      setLoading((prev) => ({ ...prev, pageLoading: true }));
      const response = await getSingleInternshipWeekManagement(
        internshipCourseId
      );
      setCourseData(response?.data || null);
    } catch (error) {
      console.error("Error fetching course details:", error);
      setCourseData(null);
    } finally {
      setLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  };

  useEffect(() => {
    if (internshipCourseId) {
      fetchData();
    }
  }, [internshipCourseId]);

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
              {`View Week-wise Management | ${courseData?.title}`}
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
                          Title
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value break-text-word">
                          {courseData?.title || ""}
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
                          Course
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                          {courseData?.courses?.length ? courseData?.courses?.map((course)=>course?.course_title).join(", ") : "-"}
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
                          Assignment Required
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                        {assignmentReqObj[courseData?.assignment_required] || "-"}
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
                          Created At
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                        {Index.moment(courseData?.created_at).format("MMM D, YYYY h:mm A")}
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
