import React, { useState, useRef, useEffect } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import AIRoadmap from "./AIRoadmap";
import { useNavigate, useParams } from "react-router-dom";
import { imageUrl } from "../../../../config/DataService";
import {
  downloadInternshipCertificate,
  getInternshipWeekTrackingService,
  getSingleInternshipCourse,
} from "../../../../redux/services/UserService";
import AssignmentAploadModal from "./AssignmentAploadModal";
import { getSingleInternshipWeekManagement } from "../../../../redux/services/UserService";
import FeedbackModal from "./FeedbackModal";
function InternshipHome() {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const scheduleRef = useRef(null);

  const navigate = useNavigate();
  const params = useParams();
  const internshipId = params?.id;
  const [internshipDetails, setInternshipDetails] = useState(null);
  const [internshipWeekDetails, setInternshipWeekDetails] = useState(null);
  const [loading, setLoading] = useState({
    pageLoading: false,
    weekDetails: false,
    weekTracking: false,
  });
  const [openAssignmentSubmission, setOpenAssignementSubmission] = useState({
    model: false,
  });
  const [openFeedBackView, setOpenFeedBackView] = useState({
    model: false,
  });
  const [internshipWeekTracking, setInternshipWeekTracking] = useState([]);
  const [downloading, setDownloading] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState("");
  let shareUrl = `${
    import.meta.env.VITE_FRONTEND_URL
  }/user/internship/${internshipId}`;
  const handleOpenAssignmentSubmission = () => {
    setOpenAssignementSubmission({ model: true });
  };
  const handleOpenAssessmentView = () => {
    setOpenFeedBackView({ model: true });
  };
  const handleCloseAssessmentView = (assignmentUploaded) => {
    setOpenFeedBackView({ model: false });
    // if (assignmentUploaded) {
    //   fetchWeekDetails();
    //   fetchInternshipWeekTracking(true);
    // }
  };
  const handleCloseAssignmentSubmission = (assignmentUploaded) => {
    setOpenAssignementSubmission({ model: false });
    if (assignmentUploaded == true) {
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
      setLoading((prev) => ({ ...prev, weekDetails: true }));
      const response = await getSingleInternshipWeekManagement(
        selectedWeek?.id
      );
      setInternshipWeekDetails(response?.data || null);
    } catch (error) {
      console.error("Error fetching course details:", error);
      setInternshipWeekDetails(null);
    } finally {
      setLoading((prev) => ({ ...prev, weekDetails: false }));
    }
  };
  const fetchInternshipWeekTracking = async (proceedNext) => {
    try {
      setLoading((prev) => ({ ...prev, weekTracking: true }));
      const response = await getInternshipWeekTrackingService(internshipId);
      setInternshipWeekTracking(response?.data || []);
      if (response?.data?.length && !proceedNext) {
        let lastCompletedWeek = -1;
        let totalWeeks = response?.data?.length;
        response?.data?.forEach((week, index) => {
          let quizSubmitted = true;
          week?.courses?.forEach((course) => {
            if(course?.is_quiz_exist && !course?.is_quiz_completed){
              quizSubmitted = false;
            }
          })
          if (week.isAdded && quizSubmitted) lastCompletedWeek = index;
        });
        if(lastCompletedWeek >= 0 && lastCompletedWeek < (totalWeeks - 1)){
          setSelectedWeek({ ...response?.data[lastCompletedWeek + 1], weekNumber: lastCompletedWeek + 2 });
        }else{
          setSelectedWeek({ ...response?.data[0], weekNumber: 1 });
        }
      }
    } catch (error) {
      setInternshipWeekTracking([]);
    } finally {
      setLoading((prev) => ({ ...prev, weekTracking: false }));
    }
  };
  const handleCourseDetail = (id) => {
    navigate(
      `/user/internship/${internshipId}/week/${selectedWeek?.id}/course/${id}`
    );
  };
  let lastCompletedWeek = -1;
  internshipWeekTracking?.forEach((week, index) => {
    let quizSubmitted = true;
    week?.courses?.forEach((course) => {
      if(course?.is_quiz_exist && !course?.is_quiz_completed){
        quizSubmitted = false;
      }
    })
    if (week.isAdded && quizSubmitted) lastCompletedWeek = index;
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
  const handleWeekSelect = (week, isCurrent) => {
    if (!isCurrent) {
      setSelectedWeek(week);
    }
    // Scroll to the schedule section
    scheduleRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const downloadCertificate = async (data) => {
    setDownloading(true);
    try {
      const certificateData = await downloadInternshipCertificate({
        internship_id: internshipId,
      });
      if (certificateData?.data?.url) {
        const pdfUrl = certificateData?.data?.url;
        const response = await fetch(pdfUrl);
        if (!response.ok) throw new Error("Failed to fetch PDF");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = `certificate-${internshipDetails?.Title}.pdf`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error downloading certificate:", error);
    } finally {
      setDownloading(false);
    }
  };
  // const downloadCertificate = async () => {
  //   setDownloading(true);
  //   try {
  //     const certificateData = await downloadInternshipCertificate({ internship_id: internshipId });
  //     const pdfUrl = certificateData?.data?.url;
  
  //     if (pdfUrl) {
  //       const anchor = document.createElement("a");
  //       anchor.href = pdfUrl;
  
  //       anchor.setAttribute("target", `_blank`);
  //       anchor.setAttribute("download", `certificate-${internshipDetails?.Title}.pdf`);
  //       document.body.appendChild(anchor);
  //       anchor.click();
  //       document.body.removeChild(anchor);
  //     }
  //   } catch (error) {
  //     console.error("Error downloading certificate:", error);
  //   } finally {
  //     setDownloading(false);
  //   }
  // };
  const handleOpenShare = async (data) => {
    setShareModal(true);
  };
  const handleShareClose = () => {
    setShareModal(false);
    setCertificateUrl("");
  };

  if (loading?.pageLoading) {
    return <PageIndex.PageLoader />;
  }

  return (
    <>
      <Index.Box className="intership-banner-main">
        <Index.Box className="container">
          <Index.Box className="intership-banner-box">
            <Index.Box className="intership-banner-cont-left">
              <Index.Box className="intership-sub-cont-box">
                <Index.Box className="intership-sub-img">
                  <img
                    className="intership-sub-icon-img"
                    src={`${imageUrl}${internshipDetails?.Thumbnail}`}
                    // src={PageIndex.Png.IntershipBannerIcon}
                    alt=""
                    onError={(e) => {
                      e.target.src = PageIndex.Png.CoursePlacholder;
                      e.target.style.objectFit = "contain";
                      e.target.style.backgroundColor = "#fff";
                    }}
                  />
                </Index.Box>
                <Index.Box className="intership-sub-detail">
                  {/* <Index.Typography className="learning-subtitle">
                    Learning Plan
                  </Index.Typography> */}
                  <Index.Typography className="learn-title">
                    {internshipDetails?.Title}
                  </Index.Typography>
                  <Index.Box className="week-box">
                    <Index.Typography className="learn-time">
                      <span className="clock-icon">
                        <img src={PageIndex.Png.Clock} alt="Clock" />
                      </span>
                      {/* {
                        internshipWeekTracking?.filter((item) => !item.isAdded)
                          ?.length
                      }{" "} */}
                      {internshipWeekTracking?.length || 0} Week{internshipWeekTracking?.length != 1 ? "s" : ""}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
            <Index.Box className="intership-banner-cont-right">
              <Index.Box className="share-box-cont">
                {/* {!internshipWeekTracking?.length &&
                  lastCompletedWeek + 1 == internshipWeekTracking?.length && ( */}
                    <Index.Button
                      className="share-icon-link"
                      // disabled={
                      //   lastCompletedWeek + 1 < internshipWeekTracking?.length ||
                      //   !internshipWeekTracking?.length ||
                      //   downloading
                      // }
                      disableTouchRipple
                      disableRipple
                      onClick={() => {
                        handleOpenShare();
                      }}
                    >
                      <Index.Typography className="share-icon-title">
                        <span className="share-icon">
                          <img src={PageIndex.Png.ShareIcon} alt="Share Icon" />
                        </span>
                        Share
                      </Index.Typography>
                    </Index.Button>
                {/* )} */}
              </Index.Box>
              {/* {!!internshipWeekTracking?.length &&
                lastCompletedWeek + 1 == internshipWeekTracking?.length && ( */}
                {
                  !!internshipWeekTracking?.length && internshipWeekTracking[lastCompletedWeek]?.Status == "approved" && (
                      <Index.Button
                        className="claim-btn"
                        loading={downloading}
                        disabled={
                          lastCompletedWeek + 1 < internshipWeekTracking?.length ||
                          !internshipWeekTracking?.length ||
                          downloading
                        }
                        onClick={() => {
                          downloadCertificate();
                        }}
                      >
                        Claim Certificate
                      </Index.Button>
                    )
                }
                  
                {/* )} */}
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
      <Index.Box className="timeline-cont-box">
        <Index.Box className="container">
          {loading?.weekTracking ? (
            <PageIndex.PageLoader />
          ) : (
            <AIRoadmap
              selectedWeek={selectedWeek}
              onWeekSelect={handleWeekSelect}
              internshipWeekTracking={internshipWeekTracking}
            />
          )}
        </Index.Box>
      </Index.Box>
      <Index.Box className="intership-about-cont-box section-margin">
        <Index.Box className="container">
          <Index.Box className="intership-about-cont">
            <Index.Typography className="intership-about-title">
              About this Learning Plan
            </Index.Typography>
            <Index.Typography
              className="intership-description ck-content"
              dangerouslySetInnerHTML={{
                __html: internshipDetails?.Description || "",
              }}
            />
          </Index.Box>
        </Index.Box>
      </Index.Box>
      <Index.Box className="intership-about-cont-box section-margin">
        <Index.Box className="container">
          <Index.Box className="intership-about-cont">
            <Index.Typography className="intership-about-title">
              Note
            </Index.Typography>
            <Index.Typography
              className="intership-description"
            >
              To move to the next week, you must pass the quiz for the current week, if available in the section.
            </Index.Typography>
          </Index.Box>
        </Index.Box>
      </Index.Box>
      <div ref={scheduleRef}>
        {selectedWeek &&
          (loading?.weekDetails ? (
            <PageIndex.PageLoader />
          ) : (
            <Index.Box className="intership-schedule-box">
              <Index.Box className="container">
                <Index.Box className="intership-schedule-cont week-title-header">
                  <Index.Typography className="intership-sched-title">
                    Week {selectedWeek.weekNumber} :{" "}
                    {internshipWeekDetails?.title}
                  </Index.Typography>
                  <Index.Box className="intership-action">
                    <Index.Button
                      className="upload-btn"
                      onClick={() => {
                        handleOpenAssignmentSubmission();
                      }}
                      disabled={["approved", "pending"].includes(
                        internshipWeekDetails?.Status
                      )}
                    >
                      <span>
                        <img
                          src={PageIndex.Png.UploadDoc}
                          alt="Upload Document"
                          className="disable-image"
                        />
                      </span>{" "}
                      {["approved", "pending"].includes(
                        internshipWeekDetails?.Status
                      )
                        ? "Deliverables Uploaded"
                        : "Upload Deliverables"}
                    </Index.Button>

                    {["approved", "rejected"].includes(
                      internshipWeekDetails?.Status
                    ) && (
                      <Index.Box className="intership-banner-cont-right">
                        <Index.Box
                          className="share-box-cont"
                          sx={{ marginBottom: "0px" }}
                        >
                          <Index.Link
                            className="share-icon-link"
                            onClick={handleOpenAssessmentView}
                          >
                            <Index.Typography className="share-icon-title feedback-link">
                              <span className="share-icon">
                                <img
                                  src={PageIndex.Png.Comment}
                                  alt="Comment"
                                />
                              </span>
                              View Feedbacks
                            </Index.Typography>
                          </Index.Link>
                        </Index.Box>
                      </Index.Box>
                    )}
                  </Index.Box>
                </Index.Box>
                {internshipWeekDetails?.courses?.length > 0 && (
                  <Index.Box className="internship-cards">
                    <Index.Grid container spacing={3}>
                      {internshipWeekDetails?.courses?.map((courseData) => (
                        <Index.Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          onClick={() =>
                            handleCourseDetail(courseData?.course_id)
                          }
                          sx={{ cursor: "pointer" }}
                        >
                          <Index.Box className="intership-card-box">
                            <Index.Box className="intership-card-img">
                              <img
                                className="intership-card-img-icon"
                                src={`${imageUrl}${courseData?.course_thumbnail}`}
                                alt="Intership Card"
                                onError={(e) => {
                                  e.target.src = PageIndex.Png.CoursePlacholder;
                                }}
                              />
                            </Index.Box>
                            <Index.Typography className="intership-card-title">
                              {courseData?.course_title}
                            </Index.Typography>
                            <Index.Typography
                              className="intership-card-description"
                              dangerouslySetInnerHTML={{
                                __html: courseData?.course_description || "",
                              }}
                            />
                          </Index.Box>
                        </Index.Grid>
                      ))}
                    </Index.Grid>
                  </Index.Box>
                )}
              </Index.Box>
            </Index.Box>
          ))}
      </div>
      <AssignmentAploadModal
        open={openAssignmentSubmission?.model}
        handleClose={handleCloseAssignmentSubmission}
        internshipWeekDetails={internshipWeekDetails}
      />
      <FeedbackModal
        open={openFeedBackView?.model}
        handleClose={handleCloseAssessmentView}
        internshipWeekDetails={internshipWeekDetails}
      />
      {shareModal && (
        <PageIndex.ShareModal
          open={shareModal}
          url={shareUrl}
          handleClose={handleShareClose}
        />
      )}
    </>
  );
}

export default InternshipHome;
