import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { useParams } from "react-router-dom";
import {
  getSingleCourseService,
  getSingleInternshipCourseService,
} from "../../../../redux/services/UserService";
import { imageUrl } from "../../../../config/DataService";
import { useSelector } from "react-redux";
import { truncateString } from "../../../../components/common/common";

const CourseDetail = () => {
  const navigate = PageIndex.useNavigate();
  const params = useParams();
  const [courseDetail, setCourseDetail] = useState(null);

  const [selectedSection, setSelectedSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ratingModal, setRatingModal] = useState(false);
  const [quizId, setQuizId] = useState(null);
  const [quizInstructionModal, setQuizInstructionModal] = useState(false);
  const userId = useSelector((state) => state?.user?.userProfile?.id);

  const handleRatingModalOpen = () => {
    setRatingModal(true);
  };

  const handleRatingModalClose = () => {
    setRatingModal(false);
  };

  const handleQuizInstructionModalOpen = (id) => {
    setQuizId(id);
    setQuizInstructionModal(true);
  };

  const handleQuizInstructionModalClose = () => {
    setQuizId("");
    setQuizInstructionModal(false);
  };
  const handleTopicDetail = (topicId, isDisabled) => {
    if (!isDisabled) {
      const path = params?.weekId
        ? `/user/internship/${params?.internshipId}/week/${params?.weekId}/course/${params?.id}/${topicId}`
        : `/user/course/${params?.id}/${topicId}`;
      navigate(path);
    }
  };

  const getSingleCourse = async () => {
    try {
      // const response = params?.internshipId
      //   ? await getSingleInternshipCourseService(
      //       params?.id,
      //       userId,
      //       params.internshipId,
      //       params.weekId
      //     )
      //   : await getSingleCourseService(params?.id, userId);
      const response = await getSingleCourseService(params?.id, userId);
      if (response?.status === 200) {
        setCourseDetail(response?.data);
        if (response?.data?.isCourseCompleted && !response?.data?.isRated) {
          setTimeout(() => {
            handleRatingModalOpen();
          }, 1000);
        }
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } else {
        setCourseDetail(null);
      }
    } catch (error) {
      setCourseDetail(null);
    }
  };

  useEffect(() => {
    getSingleCourse();
  }, []);
  function formatDuration(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);

    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
  }

  const totalMinutes = 20; // Total video duration
  const [progress, setProgress] = useState(0);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
/* 
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedMinutes((prev) => {
        if (prev < totalMinutes) {
          setProgress(((prev + 1) / totalMinutes) * 100);
          return prev + 1;
        } else {
          clearInterval(interval);
          return totalMinutes;
        }
      });
    }, 1000); // Simulating time passing every second

    return () => clearInterval(interval);
  }, []);
 */
  return (
    <Index.Box className="course-detail-main course-detail-box custom-course-details">
      {loading ? (
        <PageIndex.PageLoader />
      ) : (
        <Index.Box className="container">
          <Index.Grid container spacing={2}>
            <Index.Grid
              item
              md={12}
              xs={12}
              sm={12}
              style={{ textAlign: "end" }}
            >
              <PageIndex.PrimaryButton
                className="primary-btn"
                btnLabel="Back"
                // onClick={() => navigate(-1)}
                onClick={() =>
                  navigate(
                    params?.internshipId
                      ? `/user/internship/${params?.internshipId}`
                      : "/user/dashboard"
                  )
                }
              />
            </Index.Grid>
            <Index.Grid item md={4} xs={12} sm={12}>
              <Index.Box>
                <img
                  src={`${imageUrl}${courseDetail?.course?.Thumbnail}` || ""}
                  className="blog-img"
                  alt="Course image"
                />
              </Index.Box>
            </Index.Grid>
            <Index.Grid item md={8} xs={12} sm={12}>
              <Index.Box className="course-detail-header">
                <Index.Box className="topic-detail-title-box topic-detail-title-box-flex">
                  <Index.Typography
                    component="h1"
                    variant="h1"
                    className="course-detail-title course-heading-title-cus"
                  >
                    {courseDetail?.course?.Title || ""}
                  </Index.Typography>
                </Index.Box>
                <div
                  className="course-detail-description"
                  dangerouslySetInnerHTML={{
                    __html: courseDetail?.course?.Description,
                  }}
                />
              </Index.Box>
            </Index.Grid>
            <Index.Grid item md={12} xs={12} sm={12}>
              <Index.Box className="course-content-section">
                <Index.Box className="course-content-heading-flex">
                  <Index.Typography
                    component="h3"
                    variant="h3"
                    className="course-content-heading"
                  >
                    Course Content
                  </Index.Typography>
                  {courseDetail?.isQuiz &&
                    (courseDetail?.isQuizCompleted ? (
                      <PageIndex.BorderButton
                        className="admin-modal-cancel-btn border-btn"
                        btnLabel="Quiz completed"
                        disabled
                      />
                    ) : (
                      <Index.Tooltip
                        title={
                          courseDetail?.totalTopics !=
                          courseDetail?.totalCompletedTopics
                            ? "Please complete the course to take quiz"
                            : ""
                        }
                        arrow
                        leaveDelay={1000}
                      >
                        <Index.Box className="admin-userlist-inner-btn-flex">
                          <Index.Box className="primary-btn-main">
                            <Index.Button
                              className="primary-btn"
                              onClick={() =>
                                handleQuizInstructionModalOpen(params?.id)
                              }
                              disabled={
                                courseDetail?.totalTopics !=
                                courseDetail?.totalCompletedTopics
                              }
                            >
                              Take a quiz
                            </Index.Button>
                          </Index.Box>
                        </Index.Box>
                      </Index.Tooltip>
                    ))}
                </Index.Box>
                <Index.Box className="course-module-box">
                  <ul className="course-module-list">
                    <li className="course-module-listitem">
                      <h5>Total Modules</h5>
                      <h5 style={{ color: "#4CAF50", fontSize: "16px" }}>
                        {courseDetail?.sections?.length || 0} Modules
                      </h5>
                    </li>
                    <li className="course-module-listitem">
                      <h5>Reviews</h5>
                      <Index.Box className="rating-box">
                        {/* <Index.Box className="rate-star-flex home-star"> */}
                        <Index.Stack spacing={1}>
                          <Index.Rating
                            name="full-rating"
                            defaultValue={parseFloat(
                              courseDetail?.averageRating
                            )}
                            precision={0.5}
                            readOnly
                            size="small"
                          />
                        </Index.Stack>
                      </Index.Box>
                    </li>
                  </ul>
                </Index.Box>
                <Index.Box className="course-content-top">
                  <Index.Box className="course-content-top-left">
                  </Index.Box>
                </Index.Box>
                <Index.Box className="course-content-list course-content-flex">
                  {courseDetail?.sections?.map((section, sectionIndex) => {
                    const totalTopics = section?.topics?.length;
                    const completedTopics =
                      section?.topics?.filter(
                        (topic) => topic?.is_completed === 1
                      )?.length || 0;
                    const previousSection =
                      courseDetail?.sections?.[sectionIndex - 1];
                    const previousSectionCompleted =
                      !previousSection ||
                      previousSection?.topics?.every(
                        (topic) => topic?.is_completed
                      );

                    let isPreviousTopicCompleted = previousSectionCompleted; // Start with previous section check
                    // Find current topic to watch in the section to use for navigation
                    const currentUserTopic = section?.topics?.find(
                      (topic) => topic?.is_completed == 0
                    )
                    // Find first topic in the section to use for navigation
                    const firstTopic = section?.topics?.[0];
                    const isDisabled = !isPreviousTopicCompleted;

                    return (
                      <Index.Box
                        className="thumb-video-box"
                        key={section?.id}
                        onClick={() =>
                          (currentUserTopic?.id || firstTopic) &&
                          handleTopicDetail(currentUserTopic?.id || firstTopic?.id, isDisabled)
                        }
                        style={{
                          cursor:
                            isDisabled || !firstTopic
                              ? "not-allowed"
                              : "pointer",
                          opacity: isDisabled ? 0.5 : 1,
                        }}
                      >
                        <Index.Box className="thumb-video-img">
                          <img
                            src={`${imageUrl}${section?.image}`}
                            className="video-thumb-icon"
                            alt={section?.section_name}
                            onError={(e) => {
                              e.target.src = PageIndex.Png.CoursePlacholder;
                              e.target.style.objectFit = "contain";
                            }}
                          />
                          <Index.Box className="video-ply-btn">
                            <img
                              src={PageIndex.Png.PlayButton}
                              className="video-ply-icon"
                              alt="Play Button"
                            />
                          </Index.Box>
                        </Index.Box>
                        <Index.Box className="thumb-video-cont">
                          <Index.Typography className="lecture-title lecture-title-height">
                            {section?.section_name
                              ? truncateString(section?.section_name, 45)
                              : ""}
                          </Index.Typography>
                          <Index.Typography className="lecture-time">
                            {`${totalTopics} ${
                              totalTopics !== 1 ? "topics" : "topic"
                            } • ${formatDuration(
                              section?.topics?.reduce((acc, curr) => {
                                const duration = parseFloat(curr?.duration);
                                return acc + (isNaN(duration) ? 0 : duration);
                              }, 0)
                            )}`}
                          </Index.Typography>
                          {/* Progress Bar */}
                          <Index.Box sx={{ width: "100%", mt: 1 }}>
                            <Index.LinearProgress
                              variant="determinate"
                              value={
                                (completedTopics * 100) / (totalTopics || 1)
                              }
                              sx={{
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: "#ddd",
                                "& .MuiLinearProgress-bar": {
                                  background:
                                    "linear-gradient(90deg, #ff8a00, #e52e71)", // Gradient applied directly
                                },
                              }}
                            />
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    );
                  })}
                </Index.Box>
              </Index.Box>
            </Index.Grid>
          </Index.Grid>
        </Index.Box>
      )}
      {ratingModal && (
        <PageIndex.CourseRatingModal
          open={ratingModal}
          handleClose={handleRatingModalClose}
          courseDetail={{
            course_id: courseDetail?.course?.CourseID,
            course_title: courseDetail?.course?.Title,
          }}
        />
      )}

      {quizInstructionModal && (
        <PageIndex.QuizInstructionModal
          open={quizInstructionModal}
          handleClose={handleQuizInstructionModalClose}
          quizId={quizId}
        />
      )}
    </Index.Box>
  );
};
export default CourseDetail;
