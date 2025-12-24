import React from "react";
import Index from "../../../Index";

const PrivacyPolicy = () => {
  return (
    <Index.Box className="cms-section">
      <Index.Box className="container">
        <Index.Box className="section-content-main">
          <Index.Typography className="section-title">
            Privacy Policy
          </Index.Typography>

          <Index.Typography className="section-subtitle">
            At Lenovo Leap, we respect your privacy and are committed to
            protecting your personal data.
          </Index.Typography>

          <Index.Box className="content-box">
            <Index.Typography className="content-title">
              1.{"  "}Data Collection
            </Index.Typography>
            <Index.Typography className="content-para">
              We collect personal information such as name, email, contact
              details, and educational background during{" "}
              <strong>registration</strong>.
            </Index.Typography>
            <Index.Typography className="content-para">
              Usage data, including course progress and interaction with the
              platform, may also be recorded to improve the learning experience.
            </Index.Typography>
          </Index.Box>

          <Index.Box className="content-box">
            <Index.Typography className="content-title">
              2.{"  "}Use of Information
            </Index.Typography>
            <Index.Typography className="content-para">
              To provide <strong>personalized training and mentorship</strong>
            </Index.Typography>
            <Index.Typography className="content-para">
              To issue <strong>certifications and credentials</strong>
            </Index.Typography>
            <Index.Typography className="content-para">
              To send program-related updates and announcements
            </Index.Typography>
            <Index.Typography className="content-para">
              To analyze and enhance platform performance
            </Index.Typography>
          </Index.Box>

          <Index.Box className="content-box">
            <Index.Typography className="content-title">
              3.{"  "}Data Sharing
            </Index.Typography>
            <Index.Typography className="content-para">
              Lenovo does <strong>not</strong> share personal data with third
              parties for commercial purposes.
            </Index.Typography>
            <Index.Typography className="content-para">
              Information may be shared with{" "}
              <strong>mentors and instructors</strong> to facilitate learning.
            </Index.Typography>
          </Index.Box>

          <Index.Box className="content-box">
            <Index.Typography className="content-title">
              4.{"  "}Security Measures
            </Index.Typography>
            <Index.Typography className="content-para">
              We implement industry-standard <strong>encryption</strong> and{" "}
              <strong>data protection protocols</strong> to ensure the security
              of user information.
            </Index.Typography>
          </Index.Box>

          <Index.Box className="content-box">
            <Index.Typography className="content-title">
              5.{"  "}User Rights
            </Index.Typography>
            <Index.Typography className="content-para">
              Participants can request{" "}
              <strong>data access, correction, or deletion</strong> by
              contacting support.
            </Index.Typography>
            <Index.Typography className="content-para">
              Opt-out options are available for marketing communications.
            </Index.Typography>
          </Index.Box>

          <Index.Typography className="section-subtitle">
            For any privacy concerns, please contact us at{" "}
            <a href="mailto:lenovoleap@bharatcares.org" target="_blank">
              lenovoleap@bharatcares.org
            </a>
          </Index.Typography>
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
};

export default PrivacyPolicy;
