import React from "react";
import Index from "../../../Index";

const TermsAndCondition = () => {
  return (
    <Index.Box className="cms-section">
      <Index.Box className="container">
        <Index.Box className="section-content-main">
          <Index.Typography className="section-title">
            Terms And Condition
          </Index.Typography>
          <Index.Typography className="section-subtitle">
            By registering for and participating in the{" "}
            <strong>Lenovo Leap: NextGen Scholar Program</strong>, you agree to
            the following terms and conditions:
          </Index.Typography>

          <Index.Box className="content-box">
            <Index.Typography className="content-title">
              1.{"  "}Eligibility & Enrollment
            </Index.Typography>
            <Index.Typography className="content-para">
              The program is open to students <strong>aged 16 and above</strong>{" "}
              who are currently enrolled in a college or university.
            </Index.Typography>
            <Index.Typography className="content-para">
              Participants must complete{" "}
              <strong>all required coursework and projects</strong> to earn a
              certificate.
            </Index.Typography>
          </Index.Box>

          <Index.Box className="content-box">
            <Index.Typography className="content-title">
              2.{"  "}Usage of Platform
            </Index.Typography>
            <Index.Typography className="content-para">
              Users must <strong>adhere to ethical guidelines</strong> and{" "}
              <strong>not engage in plagiarism or misconduct</strong>.
            </Index.Typography>
            <Index.Typography className="content-para">
              The learning materials provided are for{" "}
              <strong>personal use only</strong> and cannot be distributed or
              sold.
            </Index.Typography>
          </Index.Box>

          <Index.Box className="content-box">
            <Index.Typography className="content-title">
              3.{"  "}Code of Conduct
            </Index.Typography>
            <Index.Typography className="content-para">
              Participants must maintain{" "}
              <strong>professionalism and respect</strong> during discussions
              and mentorship sessions.
            </Index.Typography>
            <Index.Typography className="content-para">
              Any form of harassment, discrimination, or misconduct will lead to{" "}
              <strong>immediate disqualification</strong> from the program.
            </Index.Typography>
          </Index.Box>

          <Index.Box className="content-box">
            <Index.Typography className="content-title">
              4.{"  "}Certification & Completion
            </Index.Typography>
            <Index.Typography className="content-para">
              Certificates will be awarded{" "}
              <strong>
                only to those who meet the required completion criteria
              </strong>
              , including finishing course content and submitting projects.
            </Index.Typography>
          </Index.Box>

          <Index.Box className="content-box">
            <Index.Typography className="content-title">
              5.{"  "}Modifications & Updates
            </Index.Typography>
            <Index.Typography className="content-para">
              Lenovo reserves the right to{" "}
              <strong>
                modify the curriculum, schedule, or terms of the program
              </strong>{" "}
              as needed.
            </Index.Typography>
            <Index.Typography className="content-para">
              Participants will be notified of any major changes via email.
            </Index.Typography>
          </Index.Box>

          <Index.Typography className="section-subtitle">
            For any further clarifications, please refer to our{" "}
            <strong>support team at</strong>{" "}
            <a
              href="mailto:lenovoleap@bharatcares.org?subject=Privacy Concern"
              target="_blank"
            >
              lenovoleap@bharatcares.org
            </a>
          </Index.Typography>
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
};

export default TermsAndCondition;
