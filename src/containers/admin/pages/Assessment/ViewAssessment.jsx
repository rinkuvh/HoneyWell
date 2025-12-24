import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  getHackathon,
  getAssessmentView,
} from "../../../../redux/services/AdminService";
import { imageUrl } from "../../../../config/DataService";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function ViewAssessment() {
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
    return moment(date)?.format("MMM D, YYYY h:mm A");
  };

  const fetchCourseDetails = async () => {
    try {
      setLoading((prev) => ({ ...prev, pageLoading: true }));
      const response = await getAssessmentView({ id: courseId });

      if (response?.data) {
        const course = response.data;
        setCourseData(course);
        setImageUrl(`${imageUrl}${course.banner}`);
        formik.setValues({
          courseTitle: course.Title,
          description: course.userDescription,
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
  console.log({ courseData });

  const handleViewDocument = (url) => {
    window.open(url, "_blank");
  };

  const downloadFile = async (filePath, fileLabel) => {
    const fileExtension = filePath.slice(filePath.lastIndexOf("."));
    const fileName = `${fileLabel}${fileExtension}`;

    try {
      const response = await fetch(`${imageUrl}${filePath}`);

      if (!response.ok) {
        throw new Error("Failed to download file.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
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
              View Assessment
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
                      {/* <Index.FormHelperText className="admin-form-lable">
                        Banner Image
                      </Index.FormHelperText>
                      <Index.Box className="admin-form-group">
                        <Index.Box className="file-upload-btn-main">
                          <img
                            className="file-upload-profile-img"
                            src={imgURL || PageIndex.Svg.addIcon}
                            crossOrigin="anonymous"
                            alt="Course Image"
                            key={imgURL}
                          />
                        </Index.Box>
                      </Index.Box> */}
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
                          Internship Title
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                          {courseData?.internship_title || ""}
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
                          Week Title
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                          {courseData?.week_title || ""}
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
                          Status
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                          {courseData?.Status
                            ? courseData?.Status?.charAt(0).toUpperCase() +
                              courseData?.Status?.slice(1)
                            : "-"}
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
                          Student Name
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                          {courseData?.user_name || "-"}
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
                          Student Id
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                          {courseData?.user_unique_id || "-"}
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
                  {courseData?.file?.length > 0 && (
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
                            Documents
                          </Index.FormHelperText>
                          <Index.Typography className="view-card-data-value document-text">
                            {courseData?.file && courseData?.file?.length > 0
                              ? courseData?.file.map((document, index) => {
                                  const isZip = document?.includes(".zip");
                                  const fileLabel = isZip
                                    ? `Zip_file_${index + 1}`
                                    : `${courseData?.user_unique_id || ""}_${
                                        courseData?.user_name || ""
                                      }_Document_${index + 1}`;

                                  return (
                                    <div key={index}>
                                      <Index.Typography
                                        className="view-card-data-value"
                                        style={{
                                          cursor: "pointer",
                                          color: "blue",
                                        }}
                                        onClick={() =>
                                          downloadFile(document, fileLabel.replace(/\s+/g,"_"))
                                        }
                                      >
                                        {fileLabel.replace(/\s+/g,"_")}
                                      </Index.Typography>
                                    </div>
                                  );
                                })
                              : "-"}
                          </Index.Typography>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  )}

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
                          className="view-card-data-value"
                          dangerouslySetInnerHTML={{
                            __html: courseData?.userDescription || "-",
                          }}
                        />

                        {}
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
