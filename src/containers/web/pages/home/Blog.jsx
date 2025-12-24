import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { getAllLatestCourse } from "../../../../redux/services/UserService";
import moment from "moment";
import { imageUrl } from "../../../../config/DataService";
import StarIcon from "@mui/icons-material/Star";
import { useSelector } from "react-redux";

export default function Blog() {
  const backgrounds = ["#B496C5", "#a46ba4", "#B496C5"];
  const { token } = useSelector((state) => state.user);

  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 0);
  const [courseList, setCourseList] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const navigate = Index.useNavigate();
  const getCourseList = async () => {
    try {
      const response = await getAllLatestCourse({ isHomescreen: true });
      if (response?.status === 200) {
        setCourseList(response?.data);
        setLoadingCourses(false);
      } else {
        setCourseList([]);
        setLoadingCourses(false);
      }
    } catch (error) {
      setCourseList([]);
      setLoadingCourses(false);
    }
  };

  const handleCourseDetail = (id) => {
    if (!token) {
      navigate("/user");
    }
    navigate(`/user/course/${id}`);
  };
  const stripHtml = (html) => {
    if (!html) return "";
    return html
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // useEffect(() => {
  //   getCourseList();
  // }, []);
  return (
    <>
      <Index.Box className="blog-section popular-sect sect-n-m lr-bg-img">
        <Index.Box className="left-blog-img">
          <img src={PageIndex.Png.LeftCircleBg} alt="Left Bg" />
        </Index.Box>
        <Index.Box className="right-blog-img">
          <img src={PageIndex.Png.RightCircleBg} alt="Right Bg" />
        </Index.Box>
        <Index.Box className="container">
          <Index.Box className="section-title-flex">
            <Index.Box className="section-content-main">
              <Index.Typography className="section-title course-title">
                Courses
              </Index.Typography>
              <Index.Typography className="section-para">
                Unlock your potential with expert-led online courses in
                programming. Learn at your own pace, gain real-world skills, and
                earn certifications —all from the comfort of your home.
              </Index.Typography>
            </Index.Box>
          </Index.Box>
          {/* {loadingCourses ? (
            <PageIndex.PageLoader />
          ) : ( */}
          <Index.Box className="blog-row">
            {/* {courseList?.length > 0 ? (
                courseList?.map((course, i) => {
                  return ( */}
            <Index.Tooltip
              // key={i}
              title={
                <>
                  <Index.Box
                  // className="blog-card-content-box tootip-cont-detail course-hove-desc-box"
                  >
                    <Index.Typography className="blog-card-title blog-title-cont course-hove-desc">
                      {/* {course?.Title} */}
                      Web Development
                    </Index.Typography>
                    <hr />
                    <Index.Box className="course-hove-desc-box tooltip-content">
                      {/* <Index.Typography
                        className="course-hove-desc"
                        component="div"
                        dangerouslySetInnerHTML={{
                          __html: course?.Description,
                        }}
                      > */}
                      <Index.Typography className="blog-card-para">
                        Understand how to work with structured and unstructured
                        data using practical tools like Excel. This course
                        introduces analytical thinking through hands-on
                        exercises, case studies, and business scenarios.
                      </Index.Typography>
                      {/* {stripHtml(course?.Description)} */}
                      {/* </Index.Typography> */}
                    </Index.Box>

                    {/* <Index.Box className="course-hrs">
                            <ul className="course-hrs-list">
                              <li className="course-hrs-list-item">34 Hours</li>
                              <li className="course-hrs-list-item">
                                All Levels
                              </li>
                              <li className="course-hrs-list-item">
                                Sub Titles
                              </li>
                            </ul>
                          </Index.Box> */}

                    {/* <Index.Box className="course-list-detail">
                            <ul className="course-cont-list">
                              <li className="course-list-item">
                                Generative AI: Create content, synthesize
                                information, and learn faster than ever with
                                effective prompt engineering!
                              </li>
                              <li className="course-list-item">
                                ChatGPT: Turn your creativity into paid work,
                                generate fresh ideas, reach new audiences, and
                                scale your projects!
                              </li>
                              <li className="course-list-item">
                                Productivity: Achieve goals faster with
                                artificial intelligence, manage time, prioritize
                                tasks, and create an optimized daily schedule!
                              </li>
                            </ul>
                          </Index.Box> */}
                  </Index.Box>
                </>
              }
              arrow
              placement={isMobile ? "bottom" : "right"}
              disableHoverListener={!isMobile}
              disableTouchListener={false}
              enterTouchDelay={0}
              leaveTouchDelay={3000}
              componentsProps={{
                tooltip: {
                  style: {
                    // backgroundColor: "#fff",
                    // border: "1px solid #d9d9d9",
                    // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    // color: "#000",
                    // fontSize: "14px",
                    // fontFamily: "Inter-Regular",
                    // padding: "6px",
                    // borderRadius: "5px",
                    // marginTop: isMobile ? "6px" : "0",
                    // minHeight: "480px",
                    // display: "flex",
                    // alignItems: "start",
                    boxShadow:
                      "0 5px 20px rgba(173, 181, 217, 0.03) !important",
                    borderRadius: "5px !important",
                    whiteSpace: "normal !important",
                    wordBreak: "break-word !important",
                    height: "auto !important",
                    minHeight: "0 !important",
                    maxHeight: "none !important",
                    overflow: "visible !important",
                    display: "inline-block !important",
                    boxSizing: "border-box !important",
                    background: "#fff",
                    color: "#000",
                    width: "480px !important",
                    minWidth: "250px !important",
                  },
                },
                arrow: {
                  sx: {
                    color: "#000",
                    "&::before": {
                      backgroundColor: "#d9d9d9 !important",
                      border: "none !important",
                    },
                  },
                },
              }}
            >
              <Index.Box
                // id={course?.Title}
                id={"Web Development"}
                className="blog-card blog-card-hover-box rmv-radius"
                sx={{ cursor: "pointer", position: "relative" }}
                onClick={() => handleCourseDetail(course?.CourseID)}
              >
                <Index.Box
                  //  className="course-image-box"
                  style={
                    {
                      // background: backgrounds[i % backgrounds.length],
                    }
                  }
                >
                  {/* <img
                    src={`${imageUrl}${course?.Thumbnail}` || ""}
                    className="blog-img"
                    alt="Course image"
                  /> */}
                  <img
                    src={PageIndex.Jpg.webDevelopment}
                    alt="course image"
                    className="blog-img"
                    style={{ background: "#EAB79F" }}
                  />
                </Index.Box>

                <Index.Box
                  className="blog-card-content-box bg-blog"
                  style={
                    {
                      // background: backgrounds[i % backgrounds.length],
                    }
                  }
                >
                  <Index.Typography className="blog-card-title blog-title-cont">
                    {/* {course?.Title} */}
                    Web Development
                  </Index.Typography>
                  <Index.Typography
                    className="blog-card-para blog-subtitle-cont"
                    // dangerouslySetInnerHTML={{
                    //   __html: course?.Description,
                    // }}
                  >
                    Understand how to work with structured and unstructured data
                    using practical tools like Excel. This course introduces
                    analytical thinking through hands-on exercises, case
                    studies, and business scenarios.
                    {/* {stripHtml(course?.Description)} */}
                  </Index.Typography>
                  {/* <Index.Box className="tag-box">
                          <Index.Box className="premium-box">DA</Index.Box>
                          <Index.Box className="besseller-box">
                            <span>Best Course</span>
                          </Index.Box>
                        </Index.Box> */}
                  <Index.Box className="rating-box">
                    {/* {[1, 2, 3, 4, 5].map((value) => (
                                <StarIcon
                                  key={value}
                                  className={`star-icon ${
                                    value <= ratingValue ? "active" : ""
                                  } `}
                                />
                              ))} */}
                    <Index.Stack spacing={1}>
                      {/* <Index.Rating
                        size="small"
                        name="full-rating"
                        defaultValue={parseFloat(course?.average_rating)}
                        precision={0.5}
                        readOnly
                      /> */}
                      <Index.Rating
                        size="small"
                        name="full-rating"
                        defaultValue={parseFloat(5)}
                        precision={0.5}
                        readOnly
                      />
                    </Index.Stack>

                    {/* {course?.total_reviews} */}
                  </Index.Box>
                  <Index.Box className="besseller-text">
                    {/* <span>
                      Updated {moment(course?.UpdatedAt).format("MMMM, YYYY")}
                    </span> */}
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Tooltip>

            <Index.Tooltip
              // key={i}
              title={
                <>
                  <Index.Box
                  // className="blog-card-content-box tootip-cont-detail course-hove-desc-box"
                  >
                    <Index.Typography className="blog-card-title blog-title-cont course-hove-desc">
                      {/* {course?.Title} */}
                      Data Analytics
                    </Index.Typography>
                    <hr />
                    <Index.Box className="course-hove-desc-box tooltip-content">
                      {/* <Index.Typography
                        className="course-hove-desc"
                        component="div"
                        dangerouslySetInnerHTML={{
                          __html: course?.Description,
                        }}
                      > */}
                      <Index.Typography className="blog-card-para">
                        Learn the basics of data transformation using Kaggle and
                        Google Sheets. This course covers finding and
                        downloading datasets, importing data, and applying
                        essential cleaning, transformation, and formatting
                        techniques to prepare data for analysis.
                      </Index.Typography>
                      {/* {stripHtml(course?.Description)} */}
                      {/* </Index.Typography> */}
                    </Index.Box>

                    {/* <Index.Box className="course-hrs">
                            <ul className="course-hrs-list">
                              <li className="course-hrs-list-item">34 Hours</li>
                              <li className="course-hrs-list-item">
                                All Levels
                              </li>
                              <li className="course-hrs-list-item">
                                Sub Titles
                              </li>
                            </ul>
                          </Index.Box> */}

                    {/* <Index.Box className="course-list-detail">
                            <ul className="course-cont-list">
                              <li className="course-list-item">
                                Generative AI: Create content, synthesize
                                information, and learn faster than ever with
                                effective prompt engineering!
                              </li>
                              <li className="course-list-item">
                                ChatGPT: Turn your creativity into paid work,
                                generate fresh ideas, reach new audiences, and
                                scale your projects!
                              </li>
                              <li className="course-list-item">
                                Productivity: Achieve goals faster with
                                artificial intelligence, manage time, prioritize
                                tasks, and create an optimized daily schedule!
                              </li>
                            </ul>
                          </Index.Box> */}
                  </Index.Box>
                </>
              }
              arrow
              placement={isMobile ? "bottom" : "right"}
              disableHoverListener={!isMobile}
              disableTouchListener={false}
              enterTouchDelay={0}
              leaveTouchDelay={3000}
              componentsProps={{
                tooltip: {
                  style: {
                    // backgroundColor: "#fff",
                    // border: "1px solid #d9d9d9",
                    // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    // color: "#000",
                    // fontSize: "14px",
                    // fontFamily: "Inter-Regular",
                    // padding: "6px",
                    // borderRadius: "5px",
                    // marginTop: isMobile ? "6px" : "0",
                    // minHeight: "480px",
                    // display: "flex",
                    // alignItems: "start",
                    boxShadow:
                      "0 5px 20px rgba(173, 181, 217, 0.03) !important",
                    borderRadius: "5px !important",
                    whiteSpace: "normal !important",
                    wordBreak: "break-word !important",
                    height: "auto !important",
                    minHeight: "0 !important",
                    maxHeight: "none !important",
                    overflow: "visible !important",
                    display: "inline-block !important",
                    boxSizing: "border-box !important",
                    background: "#fff",
                    color: "#000",
                    width: "480px !important",
                    minWidth: "250px !important",
                  },
                },
                arrow: {
                  sx: {
                    color: "#000",
                    "&::before": {
                      backgroundColor: "#d9d9d9 !important",
                      border: "none !important",
                    },
                  },
                },
              }}
            >
              <Index.Box
                // id={course?.Title}
                id={"Data Analytics"}
                className="blog-card blog-card-hover-box rmv-radius"
                sx={{ cursor: "pointer", position: "relative" }}
                onClick={() => handleCourseDetail(course?.CourseID)}
              >
                <Index.Box
                  //  className="course-image-box"
                  style={
                    {
                      // background: backgrounds[i % backgrounds.length],
                    }
                  }
                >
                  {/* <img
                    src={`${imageUrl}${course?.Thumbnail}` || ""}
                    className="blog-img"
                    alt="Course image"
                  /> */}
                  {/* <img
                    src={PageIndex.Png.CardImg2}
                    alt="course image"
                    className="blog-img"
                    style={{ background: "#EAB79F" }}
                  /> */}
                  <img
                    src={PageIndex.Png.dataExploration}
                    alt="course image"
                    className="blog-img"
                    style={{ background: "#D2C1D6" }}
                  />
                </Index.Box>

                <Index.Box
                  className="blog-card-content-box bg-blog"
                  style={
                    {
                      // background: backgrounds[i % backgrounds.length],
                    }
                  }
                >
                  <Index.Typography className="blog-card-title blog-title-cont">
                    {/* {course?.Title} */}
                    Data Analytics
                  </Index.Typography>
                  <Index.Typography
                    className="blog-card-para blog-subtitle-cont"
                    // dangerouslySetInnerHTML={{
                    //   __html: course?.Description,
                    // }}
                  >
                    {/* {stripHtml(course?.Description)} */}
                    Learn the basics of data transformation using Kaggle and
                    Google Sheets. This course covers finding and downloading
                    datasets, importing data, and applying essential cleaning,
                    transformation, and formatting techniques to prepare data
                    for analysis.
                  </Index.Typography>
                  {/* <Index.Box className="tag-box">
                          <Index.Box className="premium-box">DA</Index.Box>
                          <Index.Box className="besseller-box">
                            <span>Best Course</span>
                          </Index.Box>
                        </Index.Box> */}
                  <Index.Box className="rating-box">
                    {/* {[1, 2, 3, 4, 5].map((value) => (
                                <StarIcon
                                  key={value}
                                  className={`star-icon ${
                                    value <= ratingValue ? "active" : ""
                                  } `}
                                />
                              ))} */}
                    <Index.Stack spacing={1}>
                      {/* <Index.Rating
                        size="small"
                        name="full-rating"
                        defaultValue={parseFloat(course?.average_rating)}
                        precision={0.5}
                        readOnly
                      /> */}
                      <Index.Rating
                        size="small"
                        name="full-rating"
                        defaultValue={parseFloat(5)}
                        precision={0.5}
                        readOnly
                      />
                    </Index.Stack>

                    {/* {course?.total_reviews} */}
                  </Index.Box>
                  <Index.Box className="besseller-text">
                    {/* <span>
                      Updated {moment(course?.UpdatedAt).format("MMMM, YYYY")}
                    </span> */}
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Tooltip>

            <Index.Tooltip
              // key={i}
              title={
                <>
                  <Index.Box
                  // className="blog-card-content-box tootip-cont-detail course-hove-desc-box"
                  >
                    <Index.Typography className="blog-card-title blog-title-cont course-hove-desc">
                      {/* {course?.Title} */}
                      Artificial Intelligence
                    </Index.Typography>
                    <hr />
                    <Index.Box className="course-hove-desc-box tooltip-content">
                      {/* <Index.Typography
                        className="course-hove-desc"
                        component="div"
                        dangerouslySetInnerHTML={{
                          __html: course?.Description,
                        }}
                      > */}
                      <Index.Typography className="blog-card-para">
                        Explore AI fundamentals, logic-based systems, and
                        real-world applications to understand how smart
                        technologies are built.
                      </Index.Typography>
                      {/* {stripHtml(course?.Description)} */}
                      {/* </Index.Typography> */}
                    </Index.Box>

                    {/* <Index.Box className="course-hrs">
                            <ul className="course-hrs-list">
                              <li className="course-hrs-list-item">34 Hours</li>
                              <li className="course-hrs-list-item">
                                All Levels
                              </li>
                              <li className="course-hrs-list-item">
                                Sub Titles
                              </li>
                            </ul>
                          </Index.Box> */}

                    {/* <Index.Box className="course-list-detail">
                            <ul className="course-cont-list">
                              <li className="course-list-item">
                                Generative AI: Create content, synthesize
                                information, and learn faster than ever with
                                effective prompt engineering!
                              </li>
                              <li className="course-list-item">
                                ChatGPT: Turn your creativity into paid work,
                                generate fresh ideas, reach new audiences, and
                                scale your projects!
                              </li>
                              <li className="course-list-item">
                                Productivity: Achieve goals faster with
                                artificial intelligence, manage time, prioritize
                                tasks, and create an optimized daily schedule!
                              </li>
                            </ul>
                          </Index.Box> */}
                  </Index.Box>
                </>
              }
              arrow
              placement={isMobile ? "bottom" : "right"}
              disableHoverListener={!isMobile}
              disableTouchListener={false}
              enterTouchDelay={0}
              leaveTouchDelay={3000}
              componentsProps={{
                tooltip: {
                  style: {
                    // backgroundColor: "#fff",
                    // border: "1px solid #d9d9d9",
                    // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    // color: "#000",
                    // fontSize: "14px",
                    // fontFamily: "Inter-Regular",
                    // padding: "6px",
                    // borderRadius: "5px",
                    // marginTop: isMobile ? "6px" : "0",
                    // minHeight: "480px",
                    // display: "flex",
                    // alignItems: "start",
                    boxShadow:
                      "0 5px 20px rgba(173, 181, 217, 0.03) !important",
                    borderRadius: "5px !important",
                    whiteSpace: "normal !important",
                    wordBreak: "break-word !important",
                    height: "auto !important",
                    minHeight: "0 !important",
                    maxHeight: "none !important",
                    overflow: "visible !important",
                    display: "inline-block !important",
                    boxSizing: "border-box !important",
                    background: "#fff",
                    color: "#000",
                    width: "480px !important",
                    minWidth: "250px !important",
                  },
                },
                arrow: {
                  sx: {
                    color: "#000",
                    "&::before": {
                      backgroundColor: "#d9d9d9 !important",
                      border: "none !important",
                    },
                  },
                },
              }}
            >
              <Index.Box
                // id={course?.Title}
                id={"Artificial Intelligence"}
                className="blog-card blog-card-hover-box rmv-radius"
                sx={{ cursor: "pointer", position: "relative" }}
                onClick={() => handleCourseDetail(course?.CourseID)}
              >
                <Index.Box
                  //  className="course-image-box"
                  style={
                    {
                      // background: backgrounds[i % backgrounds.length],
                    }
                  }
                >
                  {/* <img
                    src={`${imageUrl}${course?.Thumbnail}` || ""}
                    className="blog-img"
                    alt="Course image"
                  /> */}
                  {/* <img
                    src={PageIndex.Png.CardImg2}
                    alt="course image"
                    className="blog-img"
                    style={{ background: "#EAB79F" }}
                  /> */}
                  <img
                    src={PageIndex.Jpg.artificialIntelligence}
                    alt="course image"
                    className="blog-img"
                    style={{ background: "#D2C1D6" }}
                  />
                </Index.Box>

                <Index.Box
                  className="blog-card-content-box bg-blog"
                  style={
                    {
                      // background: backgrounds[i % backgrounds.length],
                    }
                  }
                >
                  <Index.Typography className="blog-card-title blog-title-cont">
                    {/* {course?.Title} */}
                    Artificial Intelligence
                  </Index.Typography>
                  <Index.Typography
                    className="blog-card-para blog-subtitle-cont"
                    // dangerouslySetInnerHTML={{
                    //   __html: course?.Description,
                    // }}
                  >
                    {/* {stripHtml(course?.Description)} */}
                    Explore AI fundamentals, logic-based systems, and real-world
                    applications to understand how smart technologies are built.
                  </Index.Typography>
                  {/* <Index.Box className="tag-box">
                          <Index.Box className="premium-box">DA</Index.Box>
                          <Index.Box className="besseller-box">
                            <span>Best Course</span>
                          </Index.Box>
                        </Index.Box> */}
                  <Index.Box className="rating-box">
                    {/* {[1, 2, 3, 4, 5].map((value) => (
                                <StarIcon
                                  key={value}
                                  className={`star-icon ${
                                    value <= ratingValue ? "active" : ""
                                  } `}
                                />
                              ))} */}
                    <Index.Stack spacing={1}>
                      {/* <Index.Rating
                        size="small"
                        name="full-rating"
                        defaultValue={parseFloat(course?.average_rating)}
                        precision={0.5}
                        readOnly
                      /> */}
                      <Index.Rating
                        size="small"
                        name="full-rating"
                        defaultValue={parseFloat(5)}
                        precision={0.5}
                        readOnly
                      />
                    </Index.Stack>

                    {/* {course?.total_reviews} */}
                  </Index.Box>
                  <Index.Box className="besseller-text">
                    {/* <span>
                      Updated {moment(course?.UpdatedAt).format("MMMM, YYYY")}
                    </span> */}
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Tooltip>
            {/* );
                })
              ) : (
                <Index.Typography>No Courses Found</Index.Typography>
              )} */}

            {/* <Index.Box className="blog-card" sx={{ cursor: "unset" }}>
              <img
                src={PageIndex.Png.CardImg3}
                alt="course image"
                className="blog-img"
                style={{ background: "#CBCFF0" }}
              />
              <Index.Box className="blog-card-content-box">
                <Index.Typography className="blog-card-title">
                  Data Analytics Course
                </Index.Typography>
                <Index.Typography className="blog-card-para">
                  Develop essential skills in Data Acquisition, Transformation,
                  and Visualization to work with real-world datasets. Learn how
                  to collect, clean, and process data efficiently using
                  industry-standard tools. Gain hands-on experience in creating
                  insightful visualizations to support data-driven
                  decision-making. This course equips you with the foundational
                  knowledge needed to analyze and interpret complex data
                  effectively.
                </Index.Typography>
              </Index.Box>
            </Index.Box>
            <Index.Box className="blog-card" sx={{ cursor: "unset" }} id="frontend-development">
              <img
                src={PageIndex.Png.CardImg2}
                alt="course image"
                className="blog-img"
                style={{ background: "#EAB79F" }}
              />
              <Index.Box className="blog-card-content-box">
                <Index.Typography className="blog-card-title">
                  Frontend Development Course
                </Index.Typography>
                <Index.Typography className="blog-card-para">
                  Learn to build interactive, AI-powered web interfaces using
                  modern technologies. Master HTML, CSS, JavaScript, and
                  AI-driven tools like Wiz to create responsive and dynamic
                  websites. Explore frameworks that enhance functionality and
                  user experience. Gain hands-on experience in designing,
                  developing, and optimizing web applications for various
                  devices and platforms.
                </Index.Typography>
              </Index.Box>
            </Index.Box>
            <Index.Box className="blog-card" sx={{ cursor: "unset" }} id="ai-chatbot">
              <img
                src={PageIndex.Png.CardImg1}
                alt="course image"
                className="blog-img"
                style={{ background: "#D2C1D6" }}
              />
              <Index.Box className="blog-card-content-box">
                <Index.Typography className="blog-card-title">
                  AI Chatbot Development Course
                </Index.Typography>
                <Index.Typography className="blog-card-para">
                  Learn to build intelligent, AI-powered chatbots using
                  Botpress. Master natural language processing (NLP),
                  conversational flow design, and chatbot integration with
                  various platforms. Gain hands-on experience in automating
                  responses, handling user queries, and improving interactions
                  through AI. Develop scalable and efficient chatbots to enhance
                  customer engagement and streamline workflows.
                </Index.Typography>
              </Index.Box>
            </Index.Box> */}
          </Index.Box>
          {/* )} */}
        </Index.Box>
      </Index.Box>
      <PageIndex.GoToTop />
    </>
  );
}

{
  /* <Index.Tooltip
key={i}
title={
  <>
    <Index.Box className="blog-card-content-box tootip-cont-detail">
      <Index.Typography className="blog-card-title blog-title-cont">
        Data Analytics Course
      </Index.Typography>

      <hr />

      <Index.Box className="course-hrs">
        <ul className="course-hrs-list">
          <li className="course-hrs-list-item">
            34 Hours
          </li>

          <li className="course-hrs-list-item">
            All Levels
          </li>

          <li className="course-hrs-list-item">
            Sub Titles
          </li>
        </ul>
      </Index.Box>

      <Index.Typography
        sx={{
          fontSize: "14px",

          fontFamily: "Inter-Regular",

          textAlign: "start",
        }}
      >
        50+ Generative AI Tools to 10x Business,
        Productivity, Creativity | ChatGPT, Artificial
        Intelligence, Prompt Engineering
      </Index.Typography>

      <Index.Box className="course-list-detail">
        <ul className="course-cont-list">
          <li className="course-list-item">
            Generative AI: Create content, synthesize
            information, and learn faster than ever with
            effective prompt engineering!
          </li>

          <li className="course-list-item">
            ChatGPT: Turn your creativity into paid work,
            generate fresh ideas, reach new audiences, and
            scale your projects!
          </li>

          <li className="course-list-item">
            Productivity: Achieve goals faster with
            artificial intelligence, manage time,
            prioritize tasks, and create an optimized
            daily schedule!
          </li>
        </ul>
      </Index.Box>
    </Index.Box>
  </>
}
arrow
placement={isMobile ? "bottom" : "right"}
disableHoverListener={isMobile}
disableTouchListener={false}
enterTouchDelay={0}
leaveTouchDelay={3000}
componentsProps={{
  tooltip: {
    style: {
      backgroundColor: "#fff",

      border: "1px solid #d9d9d9",

      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",

      color: "#000",

      fontSize: "14px",

      fontFamily: "Inter-Regular",

      padding: "6px",

      borderRadius: "5px",

      marginTop: isMobile ? "6px" : "0",

      minHeight: "480px",

      display: "flex",

      alignItems: "start",
    },
  },

  arrow: {
    sx: {
      color: "#fff", // Changes the outer arrow color

      "&::before": {
        backgroundColor: "#fff !important", // Force apply the arrow color

        border: "none !important", // Remove any unwanted borders
      },
    },
  },
}}
>
<Index.Box
  className="blog-card blog-card-hover-box"
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
        <span>Best Course</span>
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
</Index.Tooltip> */
}
