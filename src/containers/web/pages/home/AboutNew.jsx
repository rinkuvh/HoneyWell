import React from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";

function AboutNew() {
  return (
    <>
      <Index.Box className="about-coustomer-section about-box about-new">
        <Index.Box className="container">
          <Index.Box className="section-content-main home-about-section new-about-sect">
            <Index.Typography className="section-title">
              About Us
            </Index.Typography>
            <Index.Typography
              className="section-para"
              sx={{ textAlign: "center" }}
            >
              Lenovo Leap: NextGen Scholar Program is an initiative designed to
              empower India's youth with essential tech skills, preparing them
              for the digital economy. With a strong commitment to{" "}
              <strong>innovation, education, and social responsibility</strong>,
              Lenovo is dedicated to bridging the <strong>skills gap</strong> by
              providing high-quality training in emerging technologies. Our
              program offers <strong>zero-cost training</strong>, hands-on
              project experience, AI Lab access, mentorship, and
              industry-recognized certifications. By fostering a learning
              ecosystem that promotes{" "}
              <strong>
                sustainable practices, gender equality, and inclusivity
              </strong>
              , we aim to build a future-ready workforce equipped with the
              expertise needed to thrive in the rapidly evolving tech landscape.
              Join us to <strong>learn, build, and innovate</strong> with{" "}
              <strong>cutting-edge technologies</strong> that redefine the
              future.
            </Index.Typography>
          </Index.Box>
        </Index.Box>
      </Index.Box>
      <Index.Box className="about-cust-sect-new">
        <Index.Box className="about-card-box">
          <Index.Box className="about-card-box-cont">
            <Index.Box className="about-card-box-detail">
              <Index.Box className="about-card-icon">
                <img
                  src={PageIndex.Png.TechIcon}
                  className="about-card-img-icon"
                  alt="WinningIcon"
                />
              </Index.Box>
              <Index.Typography className="about-new-cont-descript">
                <strong>Build future-ready tech skills</strong> with hands-on training in AI, Data Analytics, and Web Development using leading tools like ChatGPT and JavaScript.
              </Index.Typography>
            </Index.Box>
          </Index.Box>
          <Index.Box className="about-card-box-cont">
            <Index.Box className="about-card-box-detail">
              <Index.Box className="about-card-icon">
                <img
                  src={PageIndex.Png.WorldIcon}
                  className="about-card-img-icon"
                  alt="WorldIcon"
                />
              </Index.Box>
              <Index.Typography className="about-new-cont-descript">
                <strong>Create real-world solutions</strong> with project-based learning that lets you tackle community and global issues using emerging tech.
              </Index.Typography>
            </Index.Box>
          </Index.Box>
          <Index.Box className="about-card-box-cont">
            <Index.Box className="about-card-box-detail">
              <Index.Box className="about-card-icon">
                <img
                  src={PageIndex.Png.WinningIcon}
                  className="about-card-img-icon"
                  alt="WinningIcon"
                />
              </Index.Box>
              <Index.Typography className="about-new-cont-descript">
                <strong>Get state-level recognition</strong> with a final showcase featuring top innovations and felicitation by the Hon’ble Chief Minister of Goa.
              </Index.Typography>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}

export default AboutNew;
