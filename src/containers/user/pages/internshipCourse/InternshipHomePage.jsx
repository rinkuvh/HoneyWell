import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import { imageUrl } from "../../../../config/DataService";
import PageIndex from "../../../PageIndex";
import { useNavigate, useParams } from "react-router-dom";
import {
  getInternshipWeekTrackingService,
  getSingleInternshipCourse,
} from "../../../../redux/services/UserService";
import AssignmentAploadModal from "./AssignmentAploadModal";
import { getSingleInternshipWeekManagement } from "../../../../redux/services/UserService";
const events = [
  { time: "09:00 AM", title: "Wake Up", isAssignmentUploaded: true },
  { time: "10:00 AM", title: "Breakfast", isAssignmentUploaded: false },
  { time: "12:00 PM", title: "Meeting with Team", isAssignmentUploaded: false },
  { time: "03:00 PM", title: "Project Work", isAssignmentUploaded: false },
  { time: "06:00 PM", title: "Workout", isAssignmentUploaded: false },
];
const InternshipHomePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const internshipId = params?.id;
  const [internshipDetails, setInternshipDetails] = useState(null);
  const [internshipWeekDetails, setInternshipWeekDetails] = useState(null);
  const [loading, setLoading] = useState({
    pageLoading: false,
  });
  const [openAssignmentSubmission, setOpenAssignementSubmission] = useState({
    model: false,
  });
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [internshipWeekTracking, setInternshipWeekTracking] = useState([]);
  const handleOpenAssignmentSubmission = () => {
    setOpenAssignementSubmission({ model: true });
  };
  const handleCloseAssignmentSubmission = (assignmentUploaded) => {
    setOpenAssignementSubmission({ model: false });
    if (assignmentUploaded) {
      fetchWeekDetails();
      fetchInternshipWeekTracking(true);
    }
  };
  const fetchInternshipCourseDetails = async () => {
    try {
      setLoading((prev) => ({ ...prev, pageLoading: true }));
      const response = await getSingleInternshipCourse(internshipId);

      if (response?.data) {
        const course = response.data;
        setInternshipDetails(course);
      }
    } catch (error) {
      setInternshipDetails(null);
    } finally {
      setLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  };
  const fetchWeekDetails = async () => {
    try {
      setLoading((prev) => ({ ...prev, pageLoading: true }));
      const response = await getSingleInternshipWeekManagement(
        selectedWeek?.id
      );
      setInternshipWeekDetails(response?.data || null);
    } catch (error) {
      console.error("Error fetching course details:", error);
      setInternshipWeekDetails(null);
    } finally {
      setLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  };
  const fetchInternshipWeekTracking = async (proceedNext) => {
    try {
      setLoading((prev) => ({ ...prev, pageLoading: true }));
      const response = await getInternshipWeekTrackingService(internshipId);
      setInternshipWeekTracking(response?.data || []);
      if (response?.data?.length && !proceedNext) {
        const currentProcessIndex = response?.data?.findIndex((week) => !week?.isAdded);
        let currentProcess = response?.data?.find((week) => !week?.isAdded);
        currentProcess.weekNumber = currentProcessIndex ? (currentProcessIndex + 1) : 1; 
        setSelectedWeek(currentProcess || response?.data[0]);
      }
    } catch (error) {
      setInternshipWeekTracking([]);
    } finally {
      setLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  };
  const handleCourseDetail = (id) => {
    // week/:weekId/course/:id
    navigate(`/user/internship/week/${selectedWeek?.id}/course/${id}`);
  };
  let lastCompletedWeek = -1;
  internshipWeekTracking?.forEach((week, index) => {
    if (week.isAdded) lastCompletedWeek = index;
  });
  useEffect(() => {
    fetchInternshipCourseDetails();
    fetchInternshipWeekTracking();
  }, [internshipId]);
  useEffect(() => {
    if (selectedWeek) {
      fetchWeekDetails();
    }
  }, [selectedWeek]);
  return (
    <>
      <Index.Box className="container">
        <Index.Box className="my-certificate-list-main">
          <Index.Box className="my-certificate-box">
            <Index.Box className="my-certificate-inner-left course-internship-section">
              <img
                src={`${imageUrl}${internshipDetails?.Thumbnail}`}
                className="course-image certificate-course-img"
                onError={(e) => {
                  e.target.src = PageIndex.Png.CoursePlacholder;
                  e.target.style.objectFit = "contain";
                }}
              />
              <Index.Box className="my-certificate-box-content">
                <Index.Box className="my-certificate-text-flex">
                  <Index.Typography
                    className="certificate-title"
                    component="h2"
                    variant="h2"
                  >
                    {internshipDetails?.Title}
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
        <Index.Box sx={{ mt: 4 }}>
          <Index.List>
            {internshipWeekTracking?.map((event, index) => (
              <Index.Box
                key={index}
                sx={{ position: "relative", pl: 4, mb: 3 }}
              >
                {/* Dot */}
                <Index.Box
                  sx={{
                    position: "absolute",
                    top: "0.5em",
                    left: 0,
                    width: 12,
                    height: 12,
                    bgcolor: "primary.main",
                    borderRadius: "50%",
                  }}
                />
                {/* Line */}
                {index < events.length - 1 && (
                  <Index.Box
                    sx={{
                      position: "absolute",
                      top: "1.5em",
                      left: 5,
                      width: internshipWeekTracking?.length == index + 1 ? 0 : "2px",
                      height: "100%",
                      bgcolor: "grey.400",
                    }}
                  />
                )}
                <Index.ListItem disableGutters>
                  <Index.ListItemButton
                    sx={{
                      backgroundColor:
                        selectedWeek.id == event.id ? "#000" : "#fff",
                      color: selectedWeek.id == event.id ? "#fff" : "#000",
                      borderRadius: "8px",
                      border: "1px solid #000",
                      "&:hover": {
                        backgroundColor: selectedWeek.id == event.id ? "#000" : "#fff", // keep same as normal
                      }
                    }}
                    disabled={index > lastCompletedWeek + 1}
                    onClick={() => {
                      setSelectedWeek({...event, weekNumber: index + 1});
                    }}
                  >
                    <Index.ListItemText
                      primary={
                        <>
                          <Index.Typography>Week {index + 1}</Index.Typography>
                          <Index.Typography variant="h6">
                            {event.title}
                          </Index.Typography>
                        </>
                      }
                      secondary={
                        <Index.Typography variant="caption">
                          {event.time}
                        </Index.Typography>
                      }
                    />
                  </Index.ListItemButton>
                </Index.ListItem>
              </Index.Box>
            ))}
          </Index.List>
        </Index.Box>
        <Index.Box>
          <Index.Box className="my-certificate-text-flex" sx={{flexDirection: "column", alignItems: "start", rowGap: "10px"}}>
            <Index.Typography
              className="certificate-label"
              component="h2"
              variant="h2"
            >
              Description
            </Index.Typography>
            <Index.Typography
              className="certificate-title"
              component="h2"
              variant="h2"
              dangerouslySetInnerHTML={{
                __html: internshipDetails?.Description || "",
              }}
            />
          </Index.Box>
        </Index.Box>
        {selectedWeek && (
          <Index.Box className="my-certificate-list-main">
            <Index.Box className="my-certificate-box">
              <Index.Box className="my-certificate-inner-left course-internship-section">
                <Index.Box className="my-certificate-box-content">
                  <Index.Box className="my-certificate-text-flex">
                    <Index.Typography
                      className="certificate-title"
                      component="h2"
                      variant="h2"
                    >
                      Week {selectedWeek?.weekNumber} | {internshipWeekDetails?.title}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
                <Index.Box className="my-certificate-inner-right">
                  {["approved", "pending"].includes(
                    internshipWeekDetails?.Status
                  ) ? (
                    <PageIndex.BorderButton
                      className="admin-modal-cancel-btn border-btn"
                      btnLabel="Assignment Uploaded"
                      disabled
                    />
                  ) : (
                    <PageIndex.PrimaryButton
                      className="primary-btn download-certificate-btn"
                      btnLabel="Upload Assignment"
                      onClick={() => {
                        handleOpenAssignmentSubmission();
                      }}
                    />
                  )}
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        )}
        <Index.Grid container>
          <Index.Grid
            item
            xs={12}
            sm={6}
            md={3}
            onClick={() =>
              handleCourseDetail(internshipWeekDetails?.courseData?.CourseID)
            }
          >
            <div className="animated-box">
              <div className="animated-card">
                <Index.Box className="course-image-box">
                  <img
                    src={`${imageUrl}${internshipWeekDetails?.courseData?.Thumbnail}`}
                    className="blog-img"
                    alt="Course image"
                    onError={(e) => {
                      e.target.src = PageIndex.Png.CoursePlacholder;
                    }}
                  />
                </Index.Box>
                <Index.Box className="animate-content-box">
                  <Index.Box className="blog-card-content-box">
                    <Index.Typography
                      className="blog-card-title blog-title-cont"
                      variant="p"
                      component="p"
                    >
                      {internshipWeekDetails?.courseData?.Title}
                    </Index.Typography>
                  </Index.Box>
                  <Index.Box className="rating-box">
                    {internshipWeekDetails?.total_reviews}
                  </Index.Box>
                </Index.Box>
              </div>
            </div>
          </Index.Grid>
        </Index.Grid>
      </Index.Box>
      <AssignmentAploadModal
        open={openAssignmentSubmission?.model}
        handleClose={handleCloseAssignmentSubmission}
        internshipWeekDetails={internshipWeekDetails}
      />
    </>
  );
};

export default InternshipHomePage;
