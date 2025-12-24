import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  getAllLatestCourse,
  getAllLatestHackathon,
  getContinueWatchingService,
  getMyInternshipsService,
} from "../../../../redux/services/UserService";
import { imageUrl } from "../../../../config/DataService";
import { getSingleUserDetailsServices } from "../../../../redux/services/AdminService";
import HackathonInvitation from "../hackathon/HackathonInvitation";
import InternshipBanner from "./InternshipBanner";
import Intership from "./Intership";
import { convertMinutesToHours } from "../../../../components/common/common";

const UserDashboard = () => {
  const navigate = PageIndex.useNavigate();
  const backgrounds = ["#CBCFF0", "#EAB79F", "#D2C1D6"];
  const [latestCourse, setLatestCourse] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingHackathon, setLoadingHackathon] = useState(true);
  const [loadingTracking, setLoadingTracking] = useState(true);
  const [latestHackathon, setLatestHackathon] = useState([]);
  const [videoTracking, setVideoTracking] = useState([]);
  const [activeCardId, setActiveCardId] = useState(null);
  const [internshipList, setInternshipList] = useState([]);

  // for open handleChangedropdown

  const [age, setAge] = React.useState("");
  const handleChangedropdown = () => {
    setAge(event.target.value);
  };

  const handleCourseDetail = (id) => {
    navigate(`/user/course/${id}`);
  };

  const handleHackathonDetail = (id) => {
    navigate(`/user/hackathon/${id}`);
  };

  const getCourseList = async () => {
    try {
      const response = await getAllLatestCourse();
      if (response?.status === 200) {
        setLatestCourse(response?.data);
        setLoadingCourses(false);
      } else {
        setLatestCourse([]);
        setLoadingCourses(false);
      }
    } catch (error) {
      setLatestCourse([]);
      setLoadingCourses(false);
    }
  };

  const getHackathonList = async () => {
    try {
      const response = await getAllLatestHackathon();
      if (response?.status === 200) {
        setLatestHackathon(response?.data);
        setLoadingHackathon(false);
      } else {
        setLatestHackathon([]);
        setLoadingHackathon(false);
      }
    } catch (error) {
      setLoadingHackathon(false);
      setLatestHackathon([]);
    }
  };

  const getTrackingList = async () => {
    try {
      const response = await getContinueWatchingService();
      if (response?.status === 200) {
        setVideoTracking(response?.data);
        setLoadingTracking(false);
      } else {
        setVideoTracking([]);
        setLoadingTracking(false);
      }
    } catch (error) {
      setLoadingTracking(false);
      setVideoTracking([]);
    }
  };
  const fetchMyInternshipData = async () => {
    try {
      const res = await getMyInternshipsService();
      setInternshipList(res?.data || []);
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  };

  useEffect(() => {
    getCourseList();
    getHackathonList();
    getTrackingList();
  }, []);

  const fetchSingleUserData = async () => {
    try {
      const res = await getSingleUserDetailsServices();
      setUserDetails(res?.data);
      if (res.status == 200) {
        // setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setLoading((prev) => ({
      //   ...prev,
      //   pageLoading: false,
      // }));
    }
  };

  const topicProgress =
    (videoTracking?.completedTopics * 100) / videoTracking?.totalTopics;

  useEffect(() => {
    fetchSingleUserData();
  }, []);

  const formatDateTime = (date) => {
    if (!date) return "";
    return Index.moment(date)?.format("MMM D, YYYY h:mm A");
  };

  return (
    <>
      <Index.Box className="admin-dashboard-content blog-list-box">
        {/* Internship banner */}
        <InternshipBanner fetchMyInternships={fetchMyInternshipData} />

        {/* Intership */}
        <Intership internshipList={internshipList} />
        <br />

        {/* Latest Hackathon  */}
        {console.log("latestHackathon", latestHackathon)}
        {latestHackathon?.length > 0 && (
          <>
            <Index.Box className="container">
              <Index.Box className="admin-page-title-flex admin-page-title-main user-dashboard-title-flex">
                <Index.Typography
                  className="admin-page-title"
                  component="h2"
                  variant="h2"
                >
                  Team Details
                </Index.Typography>
              </Index.Box>
            </Index.Box>
            {loadingHackathon ? (
              <PageIndex.PageLoader />
            ) : (
              <Index.Box className="container container-modified internship-cards">
                <Index.Box className="admin-dashboad-row">
                  <Index.Grid container spacing={3}>
                    {latestHackathon?.map((course, index) => (
                      <Index.Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={index}
                        onClick={() => handleHackathonDetail(course?.id)}
                      >
                        <Index.Box className="blog-section popular-sect dash-sect custom-blog-section">
                          <Index.Box className="container">
                            <Index.Box className="blog-card cus-blog-card">
                              <Index.Box
                                className="course-image-box"
                                style={{
                                  background:
                                    backgrounds[index % backgrounds.length],
                                }}
                              >
                                <img
                                  src={`${imageUrl}${course?.banner}` || ""}
                                  className="blog-img"
                                  alt="hackathon image"
                                />
                              </Index.Box>
                              <Index.Box className="blog-card-content-box">
                                <Index.Typography
                                  className="blog-card-title"
                                  variant="p"
                                  component="p"
                                >
                                  {course?.title}
                                </Index.Typography>

                                <Index.Box className="dash-hackathon-card">
                                  <Index.Typography className="grid-col-two">
                                    Start From :{" "}
                                    <span>
                                      {formatDateTime(course?.start_datetime)}
                                    </span>{" "}
                                  </Index.Typography>
                                  <Index.Typography className="grid-col-two">
                                    End At :{" "}
                                    <span>
                                      {formatDateTime(course?.end_datetime)}
                                    </span>{" "}
                                  </Index.Typography>
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Grid>
                    ))}
                  </Index.Grid>
                </Index.Box>
              </Index.Box>
            )}
            <br />
            <br />
          </>
        )}
        {/* Hackathon Invitation  */}
        <HackathonInvitation />

        {/* Continue watching  */}
        {!loadingTracking && videoTracking?.length > 0 && (
          <>
            <Index.Box className="continue-bg-box">
              <Index.Box className="container">
                <Index.Box className="admin-page-title-flex admin-page-title-main border-none user-dashboard-title-flex">
                  <Index.Typography
                    className="admin-page-title"
                    component="h2"
                    variant="h2"
                  >
                    Continue Watching
                  </Index.Typography>
                </Index.Box>
                {loadingHackathon ? (
                  <PageIndex.PageLoader />
                ) : (
                  <Index.Box sx={{ marginBottom: "26px" }}>
                    <Index.Box className="admin-dashboad-row continue-box">
                      <Index.Grid container spacing={3}>
                        {videoTracking?.map((tracking, index) => {
                          const topicProgress =
                            (tracking?.completedTopics * 100) /
                            tracking?.totalTopics;
                          return (
                            <Index.Grid
                              item
                              xs={12}
                              sm={6}
                              md={4}
                              key={tracking?.id}
                              onClick={() =>
                                navigate(
                                  `/user/course/${tracking?.course_id}/${tracking?.topic_id}`
                                )
                              }
                            >
                              <Index.Box className="blog-section popular-sect dash-sect">
                                <Index.Box className="container container-modified">
                                  <Index.Box
                                    className="blog-card cus-blog-card"
                                    sx={{ position: "relative" }}
                                  >
                                    <Index.Box
                                      className="course-image-box"
                                      style={{
                                        background:
                                          backgrounds[
                                            index % backgrounds.length
                                          ],
                                      }}
                                    >
                                      <img
                                        src={
                                          `${imageUrl}${tracking?.topic_image}` ||
                                          ""
                                        }
                                        className="blog-img"
                                        alt="course image"
                                      />
                                    </Index.Box>
                                    <Index.Box className="blog-card-content-box">
                                      <Index.Box className="blog-card-title-h-box">
                                        <Index.Typography
                                          className="blog-card-title after-none"
                                          variant="p"
                                          component="p"
                                        >
                                          {tracking?.course_title}
                                        </Index.Typography>
                                      </Index.Box>
                                      <Index.Box
                                        className="dash-hackathon-card continue-watching continoue-abso"
                                        sx={{ marginBottom: "20px" }}
                                      >
                                        <Index.Typography className="">
                                          {/* Duration:{" "} */}
                                          <span>
                                            <Index.Box className="time-icon-box">
                                              <img
                                                src={PageIndex.Png.TimeIcon}
                                                alt="TimeIcon"
                                              />
                                              {tracking?.totalDuration
                                                ? convertMinutesToHours(
                                                    tracking?.totalDuration
                                                  )
                                                : ""}
                                            </Index.Box>
                                            {tracking?.totalDuration > 0 && (
                                              <Index.Box
                                                sx={{ width: "100%", mt: 1 }}
                                              >
                                                <Index.Box
                                                  sx={{ width: "100%", mt: 1 }}
                                                >
                                                  <Index.Box
                                                    sx={{
                                                      position: "relative",
                                                      width: "100%",
                                                    }}
                                                  >
                                                    <Index.LinearProgress
                                                      variant="determinate"
                                                      value={parseFloat(
                                                        topicProgress
                                                      )}
                                                      sx={{
                                                        height: 10,
                                                        borderRadius: 4,
                                                        backgroundColor:
                                                          "#e0e0e0",
                                                        "& .MuiLinearProgress-bar":
                                                          {
                                                            background:
                                                              "linear-gradient(to right, #76205D, #76205D)",
                                                          },
                                                      }}
                                                    />

                                                    <Index.Box
                                                      sx={{
                                                        position: "absolute",
                                                        top: "50%",
                                                        left: "50%",
                                                        transform:
                                                          "translate(-50%, -50%)",
                                                        fontWeight: "bold",
                                                        color: "#fff",
                                                      }}
                                                    >
                                                      <Index.Typography
                                                        variant="caption"
                                                        sx={{ color: "#000" }}
                                                      >
                                                        {Math.floor(
                                                          topicProgress
                                                        ) !== 100 && (
                                                          <Index.Box className="progress-label">
                                                            <Index.Typography>
                                                              {Math.floor(
                                                                topicProgress
                                                              )}
                                                              %
                                                            </Index.Typography>
                                                          </Index.Box>
                                                        )}
                                                      </Index.Typography>
                                                    </Index.Box>
                                                  </Index.Box>
                                                </Index.Box>
                                              </Index.Box>
                                            )}
                                          </span>
                                        </Index.Typography>
                                      </Index.Box>
                                    </Index.Box>
                                  </Index.Box>
                                </Index.Box>
                              </Index.Box>
                            </Index.Grid>
                          );
                        })}
                      </Index.Grid>
                    </Index.Box>
                  </Index.Box>
                )}
              </Index.Box>
            </Index.Box>
          </>
        )}

        <Index.Box className="course-catelog-box">
          {/* Available courses  */}
          <Index.Box className="container">
            <Index.Box className="admin-page-title-flex admin-page-title-main user-dashboard-title-flex">
              <Index.Typography
                className="admin-page-title"
                component="h2"
                variant="h2"
                style={{ color: "#930000" }}
              >
                Course Catalogue 
              </Index.Typography>
            </Index.Box>
          </Index.Box>
          {loadingCourses ? (
            <PageIndex.PageLoader />
          ) : (
            <Index.Box className="container">
              <Index.Box className="admin-dashboad-row">
                {/* New Card Design */}
                <Index.Grid container spacing={3}>
                  {latestCourse
                    ?.filter(
                      (course) => course.is_for_pwd == userDetails?.pwdOption
                    )
                    .map((course, index) => {
                      return (
                        <Index.Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          key={index}
                          onClick={() => handleCourseDetail(course?.CourseID)}
                        >
                          <div
                            className="animated-box"
                            key={course.id || index}
                          >
                            <div className="animated-card">
                              <Index.Box
                                className="course-image-box"
                                style={{
                                  background:
                                    backgrounds[index % backgrounds.length],
                                }}
                              >
                                <img
                                  src={`${imageUrl}${course?.Thumbnail}` || ""}
                                  className="blog-img"
                                  alt="Course image"
                                />
                              </Index.Box>
                              <Index.Box className="animate-content-box">
                                <Index.Box className="blog-card-content-box">
                                  <Index.Typography
                                    className="blog-card-title blog-title-cont"
                                    variant="p"
                                    component="p"
                                  >
                                    {course?.Title}
                                  </Index.Typography>
                                </Index.Box>
                                <Index.Box
                                  className="see-more-box"
                                  onMouseEnter={() =>
                                    setActiveCardId(course.id || index)
                                  }
                                >
                                  <Index.Typography className="see-more-text">
                                    See More
                                  </Index.Typography>
                                </Index.Box>
                              </Index.Box>
                              <div
                                className={`content ${
                                  activeCardId === (course.id || index)
                                    ? "active"
                                    : ""
                                }`}
                                onMouseEnter={() =>
                                  setActiveCardId(course.id || index)
                                }
                                onMouseLeave={() => setActiveCardId(null)}
                              >
                                <Index.Box className="blog-card-content-box">
                                  <Index.Typography
                                    className="blog-card-para new-card-box"
                                    variant="p"
                                    component="p"
                                    dangerouslySetInnerHTML={{
                                      __html: course?.Description,
                                    }}
                                  />
                                </Index.Box>
                              </div>
                            </div>
                          </div>
                        </Index.Grid>
                      );
                    })}
                </Index.Grid>
                {/* End New Card Design */}
              </Index.Box>
            </Index.Box>
          )}
        </Index.Box>
      </Index.Box>
    </>
  );
};

export default UserDashboard;
