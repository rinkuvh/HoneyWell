import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";

export default function AboutCoustomer() {
  return (
    <>
      <Index.Box className="about-coustomer-section about-box">
        <Index.Box className="container">
          <Index.Box className="section-content-main home-about-section">
            <Index.Typography className="section-title">
              About Us
            </Index.Typography>
            <Index.Typography className="section-para">
              Lenovo Leap: NextGen Scholar Program is an initiative designed to
              empower India's youth with essential tech skills, preparing them
              for the digital economy. With a strong commitment to{" "}
              <strong>innovation, education, and social responsibility</strong>,
              Lenovo is dedicated to bridging the <strong>skills gap</strong> by
              providing high-quality training in emerging technologies. Our program offers <strong>zero-cost training</strong>, hands-on
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
      <PageIndex.GoToTop />
    </>
  );
}
