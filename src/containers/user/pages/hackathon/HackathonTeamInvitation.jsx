import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  getHackathonInvitationAction,
  hackathonInvitationStatus,
} from "../../../../redux/services/UserService";

const HackathonTeamInvitation = () => {
  const params = PageIndex.useParams();
  const navigate = PageIndex.useNavigate();
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    status: "",
  });
  const [invitationDetail, setInvitationDetail] = useState(null);

  const handleAcceptRejectInvitation = async (status) => {
    setLoading((prev) => ({ ...prev, btnLoading: true, status: status }));
    try {
      const payload = {
        invitationId: params?.id,
        status: status,
      };
      const response = await hackathonInvitationStatus(payload);

      if (response?.status === 200) {
        setTimeout(() => {
          navigate(`/user/hackathon/${response?.data?.hackathonId}`);
          setLoading((prev) => ({ ...prev, btnLoading: false, status: "" }));
        }, 1000);
      } else {
        setLoading((prev) => ({ ...prev, btnLoading: false, status: "" }));
      }
    } catch (error) {
      setLoading((prev) => ({ ...prev, btnLoading: false, status: "" }));
    }
  };

  const getInvitation = async () => {
    setLoading((prev) => ({ ...prev, pageLoading: true }));
    try {
      const response = await getHackathonInvitationAction(params?.id);
      if (response?.status === 200) {
        setInvitationDetail(response?.data);
        setTimeout(() => {
          setLoading((prev) => ({ ...prev, pageLoading: false }));
        }, 1000);
      } else {
        setLoading((prev) => ({ ...prev, pageLoading: false }));
      }
    } catch (error) {
      setLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  };

  useEffect(() => {
    getInvitation();
  }, []);
  return (
    <>
      {loading.pageLoading ? (
        <PageIndex.PageLoader />
      ) : (
        <Index.Box className="course-detail-main course-detail-box">
          <Index.Box className="quiz-success-container">
            {invitationDetail ? (
              <Index.Box className="quiz-success-main team-invitation-main">
                <Index.Typography
                  component="h1"
                  variant="h1"
                  className="quiz-success-title"
                >
                  🎉 You Have a Internship Team Invitation! 🎉
                </Index.Typography>
                <Index.Typography
                  component="p"
                  variant="body1"
                  className="quiz-success-message"
                >
                  {/* Dear {quizResult?.user_name || ""}, */}
                  Dear {invitationDetail?.user_name || ""},
                </Index.Typography>
                <Index.Typography
                  component="p"
                  variant="body1"
                  className="quiz-success-message"
                >
                  You have been invited to join the{" "}
                  <span className="highlight-text">
                    {invitationDetail?.team_name || ""}
                  </span>{" "}
                  team for the{" "}
                  <span className="highlight-text">
                    {invitationDetail?.hackathon_title || ""}
                  </span>{" "}
                  Internship! We are excited to have you on board and look
                  forward to your participation.
                </Index.Typography>
                <Index.Box className="quiz-btn-box">
                  <Index.Box className="admin-page-btn-end-flex">
                    <PageIndex.PrimaryButton
                      className="primary-btn"
                      btnLabel="Accept "
                      onClick={() => handleAcceptRejectInvitation("accepted")}
                      loading={
                        loading.btnLoading && loading.status === "accepted"
                      }
                      disabled={loading.btnLoading}
                    />
                    <PageIndex.PrimaryButton
                      className="primary-btn"
                      btnLabel="Reject"
                      onClick={() => handleAcceptRejectInvitation("rejected")}
                      loading={
                        loading.btnLoading && loading.status === "rejected"
                      }
                      disabled={loading.btnLoading}
                    />
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            ) : (
              <Index.Box className="quiz-success-main team-invitation-main">
                <Index.Typography
                  component="h1"
                  variant="h1"
                  className="quiz-success-title quiz-failure-title"
                >
                  ⚠️ Internship Invitation Expired ⚠️
                </Index.Typography>
                <Index.Typography
                  component="p"
                  variant="body1"
                  className="quiz-success-message"
                >
                  This invitation is no longer valid. Explore other courses to
                  continue learning!
                </Index.Typography>
                <Index.Box className="quiz-btn-box">
                  <Index.Box className="admin-page-btn-end-flex">
                    <PageIndex.PrimaryButton
                      className="primary-btn"
                      btnLabel="Go To Dashboard"
                      onClick={() => navigate("/user/dashboard")}
                    />
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            )}
          </Index.Box>
        </Index.Box>
      )}
    </>
  );
};

export default HackathonTeamInvitation;
