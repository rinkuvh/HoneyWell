import React from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { useSelector } from "react-redux";

export default function Hero() {
  const { token } = useSelector((state) => state.user);

  const navigate = PageIndex.useNavigate();
  return (
    <>
      <Index.Box className="hero-section">
        <Index.Box
          className="container"
          sx={{ height: "100%", position: "relative" }}
        >
          {/* <Index.Box className="robot-box-cont">
            <img
              src={PageIndex.Png.Robot}
              className="robot-img"
              alt="Robot image"
            />
          </Index.Box> */}
          <Index.Box className="hero-content-main">
            <Index.Grid container spacing={2} alignItems={"center"} className="hero-mob">
              <Index.Grid item xs={12} sm={7} md={7} lg={7}>
                <Index.Typography className="hero-title fade-up">
                  Welcome to the first ever{" "}
                  <span className="hero-highlight-text">digitally</span> inclusive
                  platform.{" "}
                </Index.Typography>
                <Index.Typography
                  className="hero-para fade-up"
                  sx={{ marginBottom: "36px" }}
                >
                  Presenting Lenovo Leap: NextGen Scholar Program - Empowering
                  Every Learner with Future-Ready Emerging Skills.
                </Index.Typography>
                {/* <Index.Button className="hero-btn fade-up">Apply now</Index.Button> */}
                {!token && (
                  <Index.Box className="user-header-right-main primary-btn-main border-btn-main btn-start">
                    <Index.Button
                      className="header-login-btn btn-border fade-up"
                      onClick={() => {
                        navigate("/user/sign-up");
                      }}
                    >
                      Sign Up
                    </Index.Button>
                    <Index.Button
                      className="header-login-btn fade-up"
                      onClick={() => {
                        navigate("/user");
                      }}
                    >
                      Login
                    </Index.Button>
                  </Index.Box>
                )}
              </Index.Grid>
              <Index.Grid item xs={12} sm={5} md={5} lg={5}>
                <Index.Box className="right-banner-img-box">
                  <img className="right-banner-img" src={PageIndex.Png.BannerRight} alt="Right Img" />
                </Index.Box>
              </Index.Grid>
            </Index.Grid>
            {/* <Index.Typography className="hero-sub-title fade-up">
              Welcome to Scholars Box
            </Index.Typography> */}
          </Index.Box>
        </Index.Box>
      </Index.Box>
      <PageIndex.GoToTop />
    </>
  );
}
