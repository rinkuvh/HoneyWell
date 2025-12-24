import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { getAllLatestCourse } from "../../../../redux/services/UserService";

export default function WebFooter() {
  const navigate = PageIndex.useNavigate();
  const [courseList, setCourseList] = useState([]);
  // const handleClickMenuItem = (id, e) => {
  //   e.preventDefault();
  //   var element = window.document.getElementById(id);
  //   console.log(element);
  //   element.scrollIntoView({ behavior: "smooth", block: "start" });
  //   setCurrentTab(id);
  //   handleClick();
  // };

  const handleClickMenuItem = (id, e) => {
    e.preventDefault();
    const element = document.getElementById(id);

    if (element) {
      const headerOffset = 86;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setCurrentTab(id);
      handleClick();
    }
  };

  const handlePolicyOpen = (endpoint) => {
    window.open(endpoint, "_blank");
  };

  const getCourseList = async () => {
    try {
      const response = await getAllLatestCourse({ isHomescreen: true });
      if (response?.status === 200) {
        setCourseList(response?.data);
      } else {
        setCourseList([]);
      }
    } catch (error) {
      setCourseList([]);
    }
  };
/* 
  useEffect(() => {
    getCourseList();
  }, []);
*/
  return (
    <>
      <Index.Box className="user-footer-main">
        <Index.Box className="container">
          <Index.Box className="user-footer-row">
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
                    md: "span 6",
                    lg: "span 6",
                  }}
                  className="grid-column"
                >
                  <Index.Box className="user-footer-col">
                    <Index.Box className="user-footer-content-main">
                      <Index.Box className="user-header-cust-col">
                        <Index.List className="user-header-logo-list">
                          <Index.ListItem className="user-header-logo-listitem footer-line">
                            <Index.Link
                              className="user-header-logo-box"
                              onClick={() => {
                                navigate("/");
                              }}
                            >
                              <img
                                src={PageIndex.Png.FooterLenovoLogo}
                                className="user-header-logo"
                                alt="logo"
                              />
                            </Index.Link>
                          </Index.ListItem>
                          <Index.ListItem className="user-header-logo-listitem footer-line">
                            <Index.Link
                              className="user-header-logo-box"
                              onClick={() => {
                                navigate("/");
                              }}
                            >
                              <img
                                src={PageIndex.Png.FooterMotorolaLogo}
                                className="user-header-logo footer-logo-cont"
                                alt="logo"
                              />
                            </Index.Link>
                          </Index.ListItem>
                          <Index.ListItem className="user-header-logo-listitem footer-line">
                            <Index.Link
                              className="user-header-logo-box"
                              onClick={() => {
                                navigate("/");
                              }}
                            >
                              <img
                                src={PageIndex.Png.FooterBharatLogo}
                                className="user-header-logo"
                                alt="logo"
                              />
                            </Index.Link>
                          </Index.ListItem>
                        </Index.List>
                      </Index.Box>
                      <Index.Typography className="user-footer-para">
                        Emerging Technologies for Emerging Generation
                      </Index.Typography>
                      <Index.List className="user-footer-social-list">
                        <Index.ListItem className="user-footer-social-item">
                          <a
                            className="user-footer-social-link"
                            href="https://www.instagram.com/bharatcaresorg?igsh=MXRuOGcydWk2eGFucw=="
                            target="_blank"
                          >
                            <img
                              src={PageIndex.Png.instagram}
                              className="user-footer-social-icon"
                              alt="facebook"
                            />
                          </a>
                        </Index.ListItem>
                        <Index.ListItem className="user-footer-social-item">
                          <a
                            className="user-footer-social-link"
                            href="https://www.linkedin.com/company/bharatcaresorg/"
                            target="_blank"
                          >
                            <img
                              src={PageIndex.Png.Linkedin}
                              className="user-footer-social-icon"
                              alt="twitter"
                            />
                          </a>
                        </Index.ListItem>
                        <Index.ListItem className="user-footer-social-item">
                          <a
                            className="user-footer-social-link"
                            href="https://x.com/bharatcaresorg?lang=en"
                            target="_blank"
                          >
                            <img
                              src={PageIndex.Png.Twitter}
                              className="user-footer-social-icon"
                              alt="twitter"
                            />
                          </a>
                        </Index.ListItem>
                      </Index.List>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
                <Index.Box
                  gridColumn={{
                    xs: "span 12",
                    sm: "span 4",
                    md: "span 2",
                    lg: "span 2",
                  }}
                  className="grid-column"
                >
                  <Index.Box className="user-footer-col">
                    <Index.Box className="user-footer-content-main">
                      <Index.Typography className="user-footer-title">
                        Learning
                      </Index.Typography>
                      <Index.Box className="user-footer-nav-main">
                        <Index.List className="user-footer-nav-list">
                          {/* {courseList?.length ?
                            courseList?.map((course, i) => (
                              <Index.ListItem
                                className="user-footer-nav-item"
                                key={i}
                              >
                                <Index.Link
                                  className="user-footer-nav-link"
                                  onClick={(e) => {
                                    handleClickMenuItem(course?.Title,e)
                                  }}
                                >
                                  {course?.Title}
                                </Index.Link>
                              </Index.ListItem>
                            )):"-"} */}
                          <Index.ListItem className="user-footer-nav-item">
                            <Index.Link
                              className="user-footer-nav-link"
                              onClick={(e) => {
                                handleClickMenuItem("Web Development", e);
                              }}
                            >
                              Web Development
                            </Index.Link>
                          </Index.ListItem>

                          <Index.ListItem className="user-footer-nav-item">
                            <Index.Link
                              className="user-footer-nav-link"
                              onClick={(e) => {
                                handleClickMenuItem("Data Analytics", e);
                              }}
                            >
                              Data Analytics
                            </Index.Link>
                          </Index.ListItem>

                          <Index.ListItem className="user-footer-nav-item">
                            <Index.Link
                              className="user-footer-nav-link"
                              onClick={(e) => {
                                handleClickMenuItem(
                                  "Artificial Intelligence",
                                  e
                                );
                              }}
                            >
                              Artificial Intelligence
                            </Index.Link>
                          </Index.ListItem>
                        </Index.List>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
                <Index.Box
                  gridColumn={{
                    xs: "span 12",
                    sm: "span 3",
                    md: "span 2",
                    lg: "span 2",
                  }}
                  className="grid-column"
                >
                  <Index.Box className="user-footer-col">
                    <Index.Box className="user-footer-content-main">
                      <Index.Typography className="user-footer-title">
                        Quick Link
                      </Index.Typography>
                      <Index.Box className="user-footer-nav-main">
                        <Index.List className="user-footer-nav-list">
                          {/* <Index.ListItem className="user-footer-nav-item">
                            <Index.Link
                              className="user-footer-nav-link"
                              to={"/"}
                            >
                              About Us
                            </Index.Link>
                          </Index.ListItem> */}
                          <Index.ListItem className="user-footer-nav-item">
                            <Index.Link
                              className="user-footer-nav-link"
                              onClick={(e) => {
                                handleClickMenuItem("contact-us", e);
                              }}
                            >
                              Contact Us
                            </Index.Link>
                          </Index.ListItem>
                          <Index.ListItem className="user-footer-nav-item">
                            <Index.Link
                              className="user-footer-nav-link"
                              onClick={() =>
                                handlePolicyOpen("/privacy-policy")
                              }
                            >
                              Privacy Policy
                            </Index.Link>
                          </Index.ListItem>
                          <Index.ListItem className="user-footer-nav-item">
                            <Index.Link
                              className="user-footer-nav-link"
                              onClick={() =>
                                handlePolicyOpen("/terms-and-condition")
                              }
                            >
                              Terms and Condition
                            </Index.Link>
                          </Index.ListItem>
                        </Index.List>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
                <Index.Box
                  gridColumn={{
                    xs: "span 12",
                    sm: "span 3",
                    md: "span 2",
                    lg: "span 2",
                  }}
                  className="grid-column"
                >
                  <Index.Box className="user-footer-col">
                    <Index.Box className="user-footer-content-main">
                      <Index.Typography className="user-footer-title">
                        Others
                      </Index.Typography>
                      <Index.Box className="user-footer-nav-main">
                        <Index.List className="user-footer-nav-list">
                          <Index.ListItem className="user-footer-nav-item">
                            <Index.Link
                              className="user-footer-nav-link"
                              onClick={(e) => {
                                handleClickMenuItem("about-coustomer-main", e);
                              }}
                            >
                              About us
                            </Index.Link>
                          </Index.ListItem>
                          <Index.ListItem className="user-footer-nav-item">
                            <Index.Link
                              className="user-footer-nav-link"
                              onClick={(e) => {
                                handleClickMenuItem("faq-main", e);
                              }}
                            >
                              {" "}
                              FAQs
                            </Index.Link>
                          </Index.ListItem>

                          <Index.ListItem className="user-footer-nav-item">
                            <Index.Link
                              className="user-footer-nav-link"
                              to="/testimonials"
                            >
                              Testimonials
                            </Index.Link>
                          </Index.ListItem>
                        </Index.List>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          <Index.Box className="user-footer-copyright-row">
            <Index.Typography className="footer-copyright-text">
              © Lenovo Leap 2025
            </Index.Typography>
            {/* <Index.Box className="user-footer-copyright-nav">
              <Index.List className="user-footer-copyright-nav-list">
                <Index.ListItem
                  className="user-footer-copyright-nav-item"
                  to={"/"}
                >
                  <Index.Link className="user-footer-copyright-nav-link">
                    Terms & Conditions
                  </Index.Link>
                </Index.ListItem>
                <Index.ListItem className="user-footer-copyright-nav-item">
                  <Index.Link
                    className="user-footer-copyright-nav-link"
                    to={"/"}
                  >
                    Privacy Policy
                  </Index.Link>
                </Index.ListItem>
              </Index.List>
            </Index.Box> */}
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}
