import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { getTestimonial } from "../../../../redux/services/AdminService";
import { imageUrl } from "../../../../config/DataService";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function ViewTestimonial() {
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
    testimonialDate: "",
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
    return moment(date)?.format("MMM D, YYYY");
  };

  const fetchCourseDetails = async () => {
    try {
      setLoading((prev) => ({ ...prev, pageLoading: true }));
      const response = await getTestimonial({ id: courseId });

      if (response?.data) {
        const course = response.data;
        setCourseData(course);
        setImageUrl(`${imageUrl}${course.image}`);
        formik.setValues({
          courseTitle: course.Title,
          description: course.Description,
          testimonial_date: course.testimonial_date,
          image: course.image,
          duration: course.Duration,
          rating: course.rating,
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
              View Testimonial
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
                      sm: "span 12",
                      md: "span 12",
                      lg: "span 12",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box add-user-input">
                      <Index.FormHelperText className="admin-form-lable">
                        Testimonial Image
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
                          Name
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
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
                          Testimonial Date
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                          {formatDateTime(courseData?.testimonial_date) || "-"}
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
                          Stream
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                          {courseData?.stream || ""}
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
                          College
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                          {courseData?.placed_in || ""}
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
                      <Index.Box className="admin-input-box cus-admin-hackathon-dropdown">
                        <Index.FormHelperText className="admin-form-lable">
                          Rating
                        </Index.FormHelperText>
                        <Index.Box className="admin-form-group">
                          <Index.Box className="admin-form-control">
                            <Index.Rating
                              className="cus-rating"
                              name="rating"
                              value={courseData?.rating || 0}
                              readOnly
                            />
                          </Index.Box>
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
                        </Index.FormHelperText>
                        <Index.Typography
                          className="view-card-data-value"
                          dangerouslySetInnerHTML={{
                            __html: courseData?.description || "-",
                          }}
                        ></Index.Typography>
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
