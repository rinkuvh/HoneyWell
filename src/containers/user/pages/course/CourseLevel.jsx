import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { useParams } from "react-router-dom";
import { getSingleCourseService } from "../../../../redux/services/UserService";
import { useSelector } from "react-redux";

const CourseLevel = () => {
  const params = useParams();

  const [courseDetail, setCourseDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const userId = useSelector((state) => state?.user?.userProfile?.id);

  const getSingleCourse = async () => {
    try {
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

  const totalMinutes = 20;
  const [progress, setProgress] = useState(0);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);

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
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const levels = [
    { id: "all", name: "All" },
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" },
  ];

  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId);
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Index.Box className="course-detail-main course-detail-box custom-course-details">
      {loading ? (
        <PageIndex.PageLoader />
      ) : (
        <div className="container">
          <Index.Grid container spacing={2}>
            <Index.Grid item md={12} xs={12} sm={12}>
              <div
                className="course-content-section"
                style={{ marginBottom: "0px" }}
              >
                <div
                  className="course-content-heading-flex"
                  style={{ marginBottom: "0px" }}
                >
                  <Index.Typography
                    component="h3"
                    variant="h3"
                    className="course-content-heading"
                  >
                    Filter by Level
                  </Index.Typography>
                </div>
              </div>
            </Index.Grid>

            {levels.map((level) => (
              <Index.Grid item md={2} xs={12} sm={6} key={level.id}>
                <div
                  className={`level-card ${level.id} ${
                    selectedLevel === level.id ? "selected" : ""
                  }`}
                  onClick={() => handleLevelSelect(level.id)}
                >
                  <h4 className={`level-heading ${level.id}`}>{level.name}</h4>
                </div>
              </Index.Grid>
            ))}

            {/* ➤ Content based on selected level */}
            <Index.Grid item xs={12}>
              {selectedLevel && (
                <Index.Box className={`level-content-wrapper ${selectedLevel}`}>
                  {selectedLevel === "all" && (
                    <Index.Box
                      className="level-content"
                      style={{ marginTop: "26px" }}
                    >
                      <Index.Box className="blog-row">
                        {/* Card Changes */}
                        {/* Data Analytics Course */}
                        <Index.Box
                          className="blog-card blog-card-hover-box blog-hover-filter"
                          sx={{ cursor: "pointer", position: "relative" }}
                        >
                          <img
                            src={PageIndex.Png.CardImg3}
                            alt="course image"
                            className="blog-img"
                            style={{ background: "#CBCFF0" }}
                          />
                          <Index.Box className="blog-card-content-box">
                            <Index.Typography className="blog-card-title blog-title-cont">
                              Data Analytics Course
                            </Index.Typography>
                            <Index.Typography className="blog-card-para blog-subtitle-cont">
                              Develop essential skills in Data Acquisition,
                            </Index.Typography>
                            <Index.Box className="tag-box">
                              <Index.Box className="premium-box">DA</Index.Box>
                              <Index.Box className="besseller-box">
                                <span>Beginner</span>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="rating-box">
                              <img
                                src={PageIndex.Png.rating}
                                className="rating-icon"
                                alt="rating"
                              />{" "}
                              1797
                            </Index.Box>
                            <Index.Box className="besseller-text">
                              <span>Updated April 2025</span>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>

                        {/* Frontend Development Course */}
                        <Index.Box
                          className="blog-card blog-card-hover-box blog-hover-filter"
                          sx={{ cursor: "pointer", position: "relative" }}
                        >
                          <img
                            src={PageIndex.Png.CardImg2}
                            alt="course image"
                            className="blog-img"
                            style={{ background: "#EAB79F" }}
                          />
                          <Index.Box className="blog-card-content-box">
                            <Index.Typography className="blog-card-title blog-title-cont">
                              Frontend Development Course
                            </Index.Typography>
                            <Index.Typography className="blog-card-para blog-subtitle-cont">
                              Learn to build interactive, AI-powered web
                              interfaces
                            </Index.Typography>
                            <Index.Box className="tag-box">
                              <Index.Box className="premium-box">
                                Frontend
                              </Index.Box>
                              <Index.Box className="besseller-box">
                                <span>Intermediate</span>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="rating-box">
                              <img
                                src={PageIndex.Png.rating}
                                className="rating-icon"
                                alt="rating"
                              />{" "}
                              1797
                            </Index.Box>
                            <Index.Box className="besseller-text">
                              <span>Updated April 2025</span>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>

                        {/* AI Chatbot Development Course */}
                        <Index.Box
                          className="blog-card blog-card-hover-box blog-hover-filter"
                          sx={{ cursor: "pointer", position: "relative" }}
                        >
                          <img
                            src={PageIndex.Png.CardImg1}
                            alt="course image"
                            className="blog-img"
                            style={{ background: "#D2C1D6" }}
                          />
                          <Index.Box className="blog-card-content-box">
                            <Index.Typography className="blog-card-title blog-title-cont">
                              AI Chatbot Development Course
                            </Index.Typography>
                            <Index.Typography className="blog-card-para blog-subtitle-cont">
                              Learn to build intelligent, AI-powered chatbots
                              using Botpress.
                            </Index.Typography>
                            <Index.Box className="tag-box">
                              <Index.Box className="premium-box">AI</Index.Box>
                              <Index.Box className="besseller-box">
                                <span>Advanced</span>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="rating-box">
                              <img
                                src={PageIndex.Png.rating}
                                className="rating-icon"
                                alt="rating"
                              />{" "}
                              1797
                            </Index.Box>
                            <Index.Box className="besseller-text">
                              <span>Updated April 2025</span>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>

                        {/* Frontend Development Course */}
                        <Index.Box
                          className="blog-card blog-card-hover-box blog-hover-filter"
                          sx={{ cursor: "pointer", position: "relative" }}
                        >
                          <img
                            src={PageIndex.Png.CardImg2}
                            alt="course image"
                            className="blog-img"
                            style={{ background: "#EAB79F" }}
                          />
                          <Index.Box className="blog-card-content-box">
                            <Index.Typography className="blog-card-title blog-title-cont">
                              Frontend Development Course
                            </Index.Typography>
                            <Index.Typography className="blog-card-para blog-subtitle-cont">
                              Learn to build interactive, AI-powered web
                              interfaces
                            </Index.Typography>
                            <Index.Box className="tag-box">
                              <Index.Box className="premium-box">
                                Frontend
                              </Index.Box>
                              <Index.Box className="besseller-box">
                                <span>Beginner</span>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="rating-box">
                              <img
                                src={PageIndex.Png.rating}
                                className="rating-icon"
                                alt="rating"
                              />{" "}
                              1797
                            </Index.Box>
                            <Index.Box className="besseller-text">
                              <span>Updated April 2025</span>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>

                        {/* AI Chatbot Development Course */}
                        <Index.Box
                          className="blog-card blog-card-hover-box blog-hover-filter"
                          sx={{ cursor: "pointer", position: "relative" }}
                        >
                          <img
                            src={PageIndex.Png.CardImg1}
                            alt="course image"
                            className="blog-img"
                            style={{ background: "#D2C1D6" }}
                          />
                          <Index.Box className="blog-card-content-box">
                            <Index.Typography className="blog-card-title blog-title-cont">
                              AI Chatbot Development Course
                            </Index.Typography>
                            <Index.Typography className="blog-card-para blog-subtitle-cont">
                              Learn to build intelligent, AI-powered chatbots
                              using Botpress.
                            </Index.Typography>
                            <Index.Box className="tag-box">
                              <Index.Box className="premium-box">AI</Index.Box>
                              <Index.Box className="besseller-box">
                                <span>Advanced</span>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="rating-box">
                              <img
                                src={PageIndex.Png.rating}
                                className="rating-icon"
                                alt="rating"
                              />{" "}
                              1797
                            </Index.Box>
                            <Index.Box className="besseller-text">
                              <span>Updated April 2025</span>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>

                        {/* AI Chatbot Development Course */}
                        <Index.Box
                          className="blog-card blog-card-hover-box blog-hover-filter"
                          sx={{ cursor: "pointer", position: "relative" }}
                        >
                          <img
                            src={PageIndex.Png.CardImg1}
                            alt="course image"
                            className="blog-img"
                            style={{ background: "#D2C1D6" }}
                          />
                          <Index.Box className="blog-card-content-box">
                            <Index.Typography className="blog-card-title blog-title-cont">
                              AI Chatbot Development Course
                            </Index.Typography>
                            <Index.Typography className="blog-card-para blog-subtitle-cont">
                              Learn to build intelligent, AI-powered chatbots
                              using Botpress.
                            </Index.Typography>
                            <Index.Box className="tag-box">
                              <Index.Box className="premium-box">AI</Index.Box>
                              <Index.Box className="besseller-box">
                                <span>Intermediate</span>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="rating-box">
                              <img
                                src={PageIndex.Png.rating}
                                className="rating-icon"
                                alt="rating"
                              />{" "}
                              1797
                            </Index.Box>
                            <Index.Box className="besseller-text">
                              <span>Updated April 2025</span>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  )}
                  {selectedLevel === "beginner" && (
                    <Index.Box
                      className="level-content"
                      style={{ marginTop: "26px" }}
                    >
                      <Index.Box className="blog-row">
                        {/* Card Changes */}
                        {/* Data Analytics Course */}
                        <Index.Box
                          className="blog-card blog-card-hover-box blog-hover-filter"
                          sx={{ cursor: "pointer", position: "relative" }}
                        >
                          <img
                            src={PageIndex.Png.CardImg3}
                            alt="course image"
                            className="blog-img"
                            style={{ background: "#CBCFF0" }}
                          />
                          <Index.Box className="blog-card-content-box">
                            <Index.Typography className="blog-card-title blog-title-cont">
                              Data Analytics Course
                            </Index.Typography>
                            <Index.Typography className="blog-card-para blog-subtitle-cont">
                              Develop essential skills in Data Acquisition,
                            </Index.Typography>
                            <Index.Box className="tag-box">
                              <Index.Box className="premium-box">DA</Index.Box>
                              <Index.Box className="besseller-box">
                                <span>Beginner</span>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="rating-box">
                              <img
                                src={PageIndex.Png.rating}
                                className="rating-icon"
                                alt="rating"
                              />{" "}
                              1797
                            </Index.Box>
                            <Index.Box className="besseller-text">
                              <span>Updated April 2025</span>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>

                        {/* Frontend Development Course */}
                        <Index.Box
                          className="blog-card blog-card-hover-box blog-hover-filter"
                          sx={{ cursor: "pointer", position: "relative" }}
                        >
                          <img
                            src={PageIndex.Png.CardImg2}
                            alt="course image"
                            className="blog-img"
                            style={{ background: "#EAB79F" }}
                          />
                          <Index.Box className="blog-card-content-box">
                            <Index.Typography className="blog-card-title blog-title-cont">
                              Frontend Development Course
                            </Index.Typography>
                            <Index.Typography className="blog-card-para blog-subtitle-cont">
                              Learn to build interactive, AI-powered web
                              interfaces
                            </Index.Typography>
                            <Index.Box className="tag-box">
                              <Index.Box className="premium-box">
                                Frontend
                              </Index.Box>
                              <Index.Box className="besseller-box">
                                <span>Intermediate</span>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="rating-box">
                              <img
                                src={PageIndex.Png.rating}
                                className="rating-icon"
                                alt="rating"
                              />{" "}
                              1797
                            </Index.Box>
                            <Index.Box className="besseller-text">
                              <span>Updated April 2025</span>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>

                        {/* AI Chatbot Development Course */}
                        <Index.Box
                          className="blog-card blog-card-hover-box blog-hover-filter"
                          sx={{ cursor: "pointer", position: "relative" }}
                        >
                          <img
                            src={PageIndex.Png.CardImg1}
                            alt="course image"
                            className="blog-img"
                            style={{ background: "#D2C1D6" }}
                          />
                          <Index.Box className="blog-card-content-box">
                            <Index.Typography className="blog-card-title blog-title-cont">
                              AI Chatbot Development Course
                            </Index.Typography>
                            <Index.Typography className="blog-card-para blog-subtitle-cont">
                              Learn to build intelligent, AI-powered chatbots
                              using Botpress.
                            </Index.Typography>
                            <Index.Box className="tag-box">
                              <Index.Box className="premium-box">AI</Index.Box>
                              <Index.Box className="besseller-box">
                                <span>Advanced</span>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="rating-box">
                              <img
                                src={PageIndex.Png.rating}
                                className="rating-icon"
                                alt="rating"
                              />{" "}
                              1797
                            </Index.Box>
                            <Index.Box className="besseller-text">
                              <span>Updated April 2025</span>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  )}
                  {selectedLevel === "intermediate" && (
                    <Index.Box className="level-content">
                      <Index.Box className="blog-row">
                        {/* Card Changes */}
                        {/* Frontend Development Course */}
                        <Index.Box
                          className="blog-card blog-card-hover-box blog-hover-filter"
                          sx={{ cursor: "pointer", position: "relative" }}
                        >
                          <img
                            src={PageIndex.Png.CardImg2}
                            alt="course image"
                            className="blog-img"
                            style={{ background: "#EAB79F" }}
                          />
                          <Index.Box className="blog-card-content-box">
                            <Index.Typography className="blog-card-title blog-title-cont">
                              Frontend Development Course
                            </Index.Typography>
                            <Index.Typography className="blog-card-para blog-subtitle-cont">
                              Learn to build interactive, AI-powered web
                              interfaces
                            </Index.Typography>
                            <Index.Box className="tag-box">
                              <Index.Box className="premium-box">
                                Frontend
                              </Index.Box>
                              <Index.Box className="besseller-box">
                                <span>Beginner</span>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="rating-box">
                              <img
                                src={PageIndex.Png.rating}
                                className="rating-icon"
                                alt="rating"
                              />{" "}
                              1797
                            </Index.Box>
                            <Index.Box className="besseller-text">
                              <span>Updated April 2025</span>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>

                        {/* AI Chatbot Development Course */}
                        <Index.Box
                          className="blog-card blog-card-hover-box blog-hover-filter"
                          sx={{ cursor: "pointer", position: "relative" }}
                        >
                          <img
                            src={PageIndex.Png.CardImg1}
                            alt="course image"
                            className="blog-img"
                            style={{ background: "#D2C1D6" }}
                          />
                          <Index.Box className="blog-card-content-box">
                            <Index.Typography className="blog-card-title blog-title-cont">
                              AI Chatbot Development Course
                            </Index.Typography>
                            <Index.Typography className="blog-card-para blog-subtitle-cont">
                              Learn to build intelligent, AI-powered chatbots
                              using Botpress.
                            </Index.Typography>
                            <Index.Box className="tag-box">
                              <Index.Box className="premium-box">AI</Index.Box>
                              <Index.Box className="besseller-box">
                                <span>Advanced</span>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="rating-box">
                              <img
                                src={PageIndex.Png.rating}
                                className="rating-icon"
                                alt="rating"
                              />{" "}
                              1797
                            </Index.Box>
                            <Index.Box className="besseller-text">
                              <span>Updated April 2025</span>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  )}
                  {selectedLevel === "advanced" && (
                    <Index.Box className="level-content">
                      <Index.Box className="blog-row">
                        {/* Card Changes */}
                        {/* AI Chatbot Development Course */}
                        <Index.Box
                          className="blog-card blog-card-hover-box blog-hover-filter"
                          sx={{ cursor: "pointer", position: "relative" }}
                        >
                          <img
                            src={PageIndex.Png.CardImg1}
                            alt="course image"
                            className="blog-img"
                            style={{ background: "#D2C1D6" }}
                          />
                          <Index.Box className="blog-card-content-box">
                            <Index.Typography className="blog-card-title blog-title-cont">
                              AI Chatbot Development Course
                            </Index.Typography>
                            <Index.Typography className="blog-card-para blog-subtitle-cont">
                              Learn to build intelligent, AI-powered chatbots
                              using Botpress.
                            </Index.Typography>
                            <Index.Box className="tag-box">
                              <Index.Box className="premium-box">AI</Index.Box>
                              <Index.Box className="besseller-box">
                                <span>Intermediate</span>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="rating-box">
                              <img
                                src={PageIndex.Png.rating}
                                className="rating-icon"
                                alt="rating"
                              />{" "}
                              1797
                            </Index.Box>
                            <Index.Box className="besseller-text">
                              <span>Updated April 2025</span>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  )}
                </Index.Box>
              )}
            </Index.Grid>
          </Index.Grid>
        </div>
      )}
    </Index.Box>
  );
};

export default CourseLevel;
