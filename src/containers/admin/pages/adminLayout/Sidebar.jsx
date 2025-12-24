import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";

export default function Sidebar(props) {
  // for page redirect
  const location = useLocation();

  // for submenu dropdown
  const [openSubMenu, setOpenSubmenu] = React.useState(false);
  const [screen, setScreen] = useState("");
  const handleClickAccount = () => {
    setOpenSubmenu(!openSubMenu);
  };

  // for mobile menu sidebar
  useEffect(() => {
    if (window.innerWidth < 786) {
      props.setOpen(false);
    } else {
      props.setOpen(true);
    }
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 786) {
        props.setOpen(false);
      } else {
        props.setOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 786) {
      document.body.classList[props.open ? "add" : "remove"](
        "admin-body-overflow"
      );
    }
  }, [props.open]);
  return (
    <Index.Box className={`admin-sidebar-main`}>
      <Index.Box className="admin-sidebar-inner-main">
        <Index.Box className="mobile-sidebar-close-box">
          <Index.Button
            className="mobile-sidebar-close-btn"
            onClick={() => props.setOpen(!props.open)}
          >
            <img
              src={PageIndex.Svg.roundCloseIcon}
              alt="closeIcon"
              className="mobile-sidebar-close-icon"
            />
          </Index.Button>
        </Index.Box>
        <Index.Box className="admin-sidebar-list-main scrollbar">
          <Index.List className="admin-sidebar-list">
            <Index.ListItem
              className={
                location?.pathname.includes("/admin/dashboard")
                  ? "admin-sidebar-listitem active"
                  : "admin-sidebar-listitem "
              }
            >
              <Index.Tooltip
                title="Dashboard"
                arrow
                placement="right"
                className="admin-tooltip"
              >
                <Index.Link
                  to="/admin/dashboard"
                  onClick={() => {
                    if (window.innerWidth < 786) {
                      props.setOpen(!props.open);
                    }
                  }}
                  className="admin-sidebar-link"
                >
                  <img
                    src={PageIndex.Svg.DashboardIcon}
                    className="admin-sidebar-icons"
                  />
                  <span className="admin-sidebar-link-text">Dashboard</span>
                </Index.Link>
              </Index.Tooltip>
            </Index.ListItem>

            <Index.ListItem
              className={
                location?.pathname.includes("/admin/student-management") ||
                location?.pathname.includes("/admin/registraton") ||
                location?.pathname.includes("/admin/student-management/add") ||
                location?.pathname.includes("/admin/view-user-applicant") ||
                location?.pathname.includes(
                  "/admin/view-user-applicant-scholarship"
                ) ||
                location?.pathname.includes("/admin/user-activity-logs") ||
                location?.pathname.includes(
                  "/admin/view-user-saved-scholarship"
                )
                  ? "admin-sidebar-listitem active"
                  : "admin-sidebar-listitem "
              }
            >
              <Index.Tooltip
                title="Students"
                arrow
                placement="right"
                className="admin-tooltip"
              >
                <Index.Link
                  to="/admin/student-management"
                  onClick={() => {
                    if (window.innerWidth < 786) {
                      props.setOpen(!props.open);
                    }
                  }}
                  className="admin-sidebar-link"
                >
                  <img
                    src={PageIndex.Png.Student_icon}
                    className="admin-sidebar-icons"
                  />
                  <span className="admin-sidebar-link-text">Students</span>
                </Index.Link>
              </Index.Tooltip>
            </Index.ListItem>

            <Index.ListItem
              className={
                location?.pathname.includes("/admin/internships")
                  ? "admin-sidebar-listitem active"
                  : "admin-sidebar-listitem "
              }
            >
              <Index.Tooltip
                title="Internships"
                arrow
                placement="right"
                className="admin-tooltip"
              >
                <Index.Link
                  to="/admin/internships"
                  onClick={() => {
                    if (window.innerWidth < 786) {
                      props.setOpen(!props.open);
                    }
                  }}
                  className="admin-sidebar-link"
                >
                  <img
                    src={PageIndex.Png.Internship_icon}
                    className="admin-sidebar-icons"
                  />
                  <span className="admin-sidebar-link-text">Internships</span>
                </Index.Link>
              </Index.Tooltip>
            </Index.ListItem>

            <Index.ListItem
              className={
                location?.pathname.includes("/admin/courses-list") ||
                location?.pathname.startsWith("/admin/add-edit-course") ||
                location?.pathname.startsWith("/admin/view-course") ||
                location?.pathname.startsWith("/admin/add-edit-topics") ||
                location?.pathname.startsWith("/admin/add-edit-sections") ||
                location?.pathname.startsWith("/admin/view-topics") ||
                location?.pathname.startsWith("/admin/topic-detail") ||
                location?.pathname.startsWith("/admin/view-quiz") ||
                location?.pathname.startsWith("/admin/add-edit-quiz")
                  ? "admin-sidebar-listitem active"
                  : "admin-sidebar-listitem "
              }
            >
              <Index.Tooltip
                title="Courses"
                arrow
                placement="right"
                className="admin-tooltip"
              >
                <Index.Link
                  to="/admin/courses-list"
                  onClick={() => {
                    if (window.innerWidth < 786) {
                      props.setOpen(!props.open);
                    }
                  }}
                  className="admin-sidebar-link"
                >
                  <img
                    src={PageIndex.Png.Course}
                    className="admin-sidebar-icons"
                  />
                  <span className="admin-sidebar-link-text">Courses</span>
                </Index.Link>
              </Index.Tooltip>
            </Index.ListItem>

            <Index.ListItem
              className={
                location?.pathname.includes("/admin/internship-course") ||
                location?.pathname.startsWith("/admin/internship-course/add") ||
                location?.pathname.startsWith("/admin/internship-course/edit")
                  ? "admin-sidebar-listitem active"
                  : "admin-sidebar-listitem "
              }
            >
              <Index.Tooltip
                title="Internship Courses"
                arrow
                placement="right"
                className="admin-tooltip"
              >
                <Index.Link
                  to="/admin/internship-course"
                  onClick={() => {
                    if (window.innerWidth < 786) {
                      props.setOpen(!props.open);
                    }
                  }}
                  className="admin-sidebar-link"
                >
                  <img
                    src={PageIndex.Png.InternshipCourseIcon}
                    className="admin-sidebar-icons"
                  />
                  <span className="admin-sidebar-link-text">
                    Internship Courses
                  </span>
                </Index.Link>
              </Index.Tooltip>
            </Index.ListItem>

            <Index.ListItem
              className={
                location?.pathname.includes("/admin/quiz-result")
                  ? "admin-sidebar-listitem active"
                  : "admin-sidebar-listitem "
              }
            >
              <Index.Tooltip
                title="Quiz Result"
                arrow
                placement="right"
                className="admin-tooltip"
              >
                <Index.Link
                  to="/admin/quiz-result"
                  onClick={() => {
                    if (window.innerWidth < 786) {
                      props.setOpen(!props.open);
                    }
                  }}
                  className="admin-sidebar-link"
                >
                  <img
                    src={PageIndex.Png.Result_icon}
                    className="admin-sidebar-icons"
                  />
                  <span className="admin-sidebar-link-text">Quiz Result</span>
                </Index.Link>
              </Index.Tooltip>
            </Index.ListItem>

            <Index.ListItem
              className={
                location?.pathname.includes("/admin/hackathon-list") ||
                location?.pathname.startsWith("/admin/view-hackathon") ||
                location?.pathname.startsWith("/admin/add-edit-hackathon")
                  ? "admin-sidebar-listitem active"
                  : "admin-sidebar-listitem "
              }
            >
              <Index.Tooltip
                title="Internship"
                arrow
                placement="right"
                className="admin-tooltip"
              >
                <Index.Link
                  to="/admin/hackathon-list"
                  onClick={() => {
                    if (window.innerWidth < 786) {
                      props.setOpen(!props.open);
                    }
                  }}
                  className="admin-sidebar-link"
                >
                  <img
                    src={PageIndex.Png.hackathon}
                    className="admin-sidebar-icons"
                  />
                  <span className="admin-sidebar-link-text">Internship</span>
                </Index.Link>
              </Index.Tooltip>
            </Index.ListItem>

            <Index.ListItem
              className={
                location?.pathname.includes("/admin/team-list") ||
                location?.pathname.startsWith("/admin/view-team") ||
                location?.pathname.startsWith("/admin/add-edit-team")
                  ? "admin-sidebar-listitem active"
                  : "admin-sidebar-listitem "
              }
            >
              <Index.Tooltip
                title="Internship Team"
                arrow
                placement="right"
                className="admin-tooltip"
              >
                <Index.Link
                  to="/admin/team-list"
                  onClick={() => {
                    if (window.innerWidth < 786) {
                      props.setOpen(!props.open);
                    }
                  }}
                  className="admin-sidebar-link"
                >
                  <img
                    src={PageIndex.Png.Team_icon}
                    className="admin-sidebar-icons"
                  />
                  <span className="admin-sidebar-link-text">
                    {" "}
                    Internship Team
                  </span>
                </Index.Link>
              </Index.Tooltip>
            </Index.ListItem>

            <Index.ListItem
              className={
                location?.pathname.includes("/admin/assessment") ||
                location?.pathname.startsWith("/admin/view-assessment") ||
                location?.pathname.startsWith("/admin/add-edit-team")
                  ? "admin-sidebar-listitem active"
                  : "admin-sidebar-listitem "
              }
            >
              <Index.Tooltip
                title="Internship Assesment"
                arrow
                placement="right"
                className="admin-tooltip"
              >
                <Index.Link
                  to="/admin/assessment"
                  onClick={() => {
                    if (window.innerWidth < 786) {
                      props.setOpen(!props.open);
                    }
                  }}
                  className="admin-sidebar-link"
                >
                  <img
                    src={PageIndex.Png.AssignmentsIcons}
                    className="admin-sidebar-icons"
                  />
                  <span className="admin-sidebar-link-text">
                    {" "}
                    Internship Assesment
                  </span>
                </Index.Link>
              </Index.Tooltip>
            </Index.ListItem>
{/*             
            <Index.ListItem
              className={
                location?.pathname.includes("/admin/quiz-internships-result")
                  ? "admin-sidebar-listitem active"
                  : "admin-sidebar-listitem "
              }
            >
              <Index.Tooltip
                title="Internship Quiz Result"
                arrow
                placement="right"
                className="admin-tooltip"
              >
                <Index.Link
                  to="/admin/quiz-internships-result"
                  onClick={() => {
                    if (window.innerWidth < 786) {
                      props.setOpen(!props.open);
                    }
                  }}
                  className="admin-sidebar-link"
                >
                  <img
                    src={PageIndex.Png.InternshipQuiz}
                    className="admin-sidebar-icons"
                  />
                  <span className="admin-sidebar-link-text">
                    Internship Quiz Result
                  </span>
                </Index.Link>
              </Index.Tooltip>
            </Index.ListItem> 
*/}

            <Index.ListItem
              className={
                location?.pathname.includes("/admin/internship-week-tracking")
                  ? "admin-sidebar-listitem active"
                  : "admin-sidebar-listitem "
              }
            >
              <Index.Tooltip
                title="Week Tracking"
                arrow
                placement="right"
                className="admin-tooltip"
              >
                <Index.Link
                  to="/admin/internship-week-tracking"
                  onClick={() => {
                    if (window.innerWidth < 786) {
                      props.setOpen(!props.open);
                    }
                  }}
                  className="admin-sidebar-link"
                >
                  <img
                    src={PageIndex.Png.WeekTrackIcon}
                    className="admin-sidebar-icons"
                  />
                  <span className="admin-sidebar-link-text">Week Tracking</span>
                </Index.Link>
              </Index.Tooltip>
            </Index.ListItem>

            <Index.ListItem
              className={
                location?.pathname.includes("/admin/course-tracking")
                  ? "admin-sidebar-listitem active"
                  : "admin-sidebar-listitem "
              }
            >
              <Index.Tooltip
                title="Course Tracking"
                arrow
                placement="right"
                className="admin-tooltip"
              >
                <Index.Link
                  to="/admin/course-tracking"
                  onClick={() => {
                    if (window.innerWidth < 786) {
                      props.setOpen(!props.open);
                    }
                  }}
                  className="admin-sidebar-link"
                >
                  <img
                    src={PageIndex.Png.courseTracking}
                    className="admin-sidebar-icons"
                  />
                  <span className="admin-sidebar-link-text">
                    Course Tracking
                  </span>
                </Index.Link>
              </Index.Tooltip>
            </Index.ListItem>

            <Index.ListItem
              className={
                location?.pathname.includes("/admin/course-rating")
                  ? "admin-sidebar-listitem active"
                  : "admin-sidebar-listitem "
              }
            >
              <Index.Tooltip
                title="Course Rating"
                arrow
                placement="right"
                className="admin-tooltip"
              >
                <Index.Link
                  to="/admin/course-rating"
                  onClick={() => {
                    if (window.innerWidth < 786) {
                      props.setOpen(!props.open);
                    }
                  }}
                  className="admin-sidebar-link"
                >
                  <img
                    src={PageIndex.Png.courseRating}
                    className="admin-sidebar-icons"
                  />
                  <span className="admin-sidebar-link-text">Course Rating</span>
                </Index.Link>
              </Index.Tooltip>
            </Index.ListItem>

            <Index.ListItem
              className={
                location?.pathname.includes("/admin/faq-list") ||
                location?.pathname.startsWith("/admin/view-faq") ||
                location?.pathname.startsWith("/admin/add-edit-faq")
                  ? "admin-sidebar-listitem active"
                  : "admin-sidebar-listitem "
              }
            >
              <Index.Tooltip
                title="FAQ"
                arrow
                placement="right"
                className="admin-tooltip"
              >
                <Index.Link
                  to="/admin/faq-list"
                  onClick={() => {
                    if (window.innerWidth < 786) {
                      props.setOpen(!props.open);
                    }
                  }}
                  className="admin-sidebar-link"
                >
                  <img
                    src={PageIndex.Png.faqList}
                    className="admin-sidebar-icons"
                  />
                  <span className="admin-sidebar-link-text">FAQ</span>
                </Index.Link>
              </Index.Tooltip>
            </Index.ListItem>

            <Index.ListItem
              className={
                location?.pathname.includes("/admin/testimonial-list") ||
                location?.pathname.startsWith("/admin/view-testimonial") ||
                location?.pathname.startsWith("/admin/add-edit-testimonial")
                  ? "admin-sidebar-listitem active"
                  : "admin-sidebar-listitem "
              }
            >
              <Index.Tooltip
                title="Testimonials"
                arrow
                placement="right"
                className="admin-tooltip"
              >
                <Index.Link
                  to="/admin/testimonial-list"
                  onClick={() => {
                    if (window.innerWidth < 786) {
                      props.setOpen(!props.open);
                    }
                  }}
                  className="admin-sidebar-link"
                >
                  <img
                    src={PageIndex.Png.testimonialIcon}
                    className="admin-sidebar-icons"
                  />
                  <span className="admin-sidebar-link-text">Testimonials</span>
                </Index.Link>
              </Index.Tooltip>
            </Index.ListItem>

            <Index.ListItem
              className={
                location?.pathname.includes("/admin/query")
                  ? "admin-sidebar-listitem active"
                  : "admin-sidebar-listitem "
              }
            >
              <Index.Tooltip
                title="Contact Us"
                arrow
                placement="right"
                className="admin-tooltip"
              >
                <Index.Link
                  to="/admin/query"
                  onClick={() => {
                    if (window.innerWidth < 786) {
                      props.setOpen(!props.open);
                    }
                  }}
                  className="admin-sidebar-link"
                >
                  <img
                    src={PageIndex.Svg.bookMarkIcon}
                    className="admin-sidebar-icons"
                  />
                  <span className="admin-sidebar-link-text">Contact Us</span>
                </Index.Link>
              </Index.Tooltip>
            </Index.ListItem>

            <Index.ListItem
              className={
                location?.pathname.includes("/admin/pwd-feedbacks") ||
                location?.pathname.startsWith("/admin/view-pwd-feedback")
                  ? "admin-sidebar-listitem active"
                  : "admin-sidebar-listitem "
              }
            >
              <Index.Tooltip
                title="PWD Feedbacks"
                arrow
                placement="right"
                className="admin-tooltip"
              >
                <Index.Link
                  to="/admin/pwd-feedbacks"
                  onClick={() => {
                    if (window.innerWidth < 786) {
                      props.setOpen(!props.open);
                    }
                  }}
                  className="admin-sidebar-link"
                >
                  <img
                    src={PageIndex.Png.Feedback_icon}
                    className="admin-sidebar-icons"
                  />
                  <span className="admin-sidebar-link-text">PWD Feedbacks</span>
                </Index.Link>
              </Index.Tooltip>
            </Index.ListItem>
          </Index.List>
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
}
