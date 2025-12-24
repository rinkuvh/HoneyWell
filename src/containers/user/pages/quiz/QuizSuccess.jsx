import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { useParams } from "react-router-dom";
import { getInternshipTopicQuizResult, getUserQuizResult } from "../../../../redux/services/UserService";
import { pieArcLabelClasses } from "@mui/x-charts";
import { certificateImageUrl } from "../../../../config/DataService";

const QuizSuccess = () => {
  const { id, courseId, internshipId } = useParams();

  const [loading, setLoading] = useState(true);
  const [quizResult, setQuizResult] = useState(null);
  const fetchQuizResult = async () => {
    try {
      const query = {
        quiz_id: id,
        course_id: courseId,
      };
      // let response;
      // if(internshipId){
      //   response = await getInternshipTopicQuizResult(query);
      // }else{
      //   response = await getUserQuizResult(query);
      // }
      const response = await getUserQuizResult(query);

      if (response?.status === 200) {
        setQuizResult(response?.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchQuizResult();
  }, []);

  return (
    <Index.Box className="course-detail-main course-detail-box">
      {loading ? (
        <PageIndex.PageLoader />
      ) : (
        <Index.Grid container spacing={1} className="quiz-success-container ">
          {/* Left: Quiz Result Card */}
          <Index.Grid item xs={12} md={4} className="quiz-result">
            <Index.Box
              className="left-sub-box"
            >
              <Index.PieChart
                series={[
                  {
                    arcLabel: (item) => `${item.value}`,
                    data: [
                      {
                        id: 0,
                        value: quizResult?.total_correct_answer || 0,
                        label: "Correct",
                        color: "#81C784",
                      },
                      {
                        id: 1,
                        value:
                          (quizResult?.total_questions || 0) -
                          (quizResult?.total_correct_answer || 0),
                        label: "Incorrect",
                        color: "#F44336",
                      },
                    ],
                    innerRadius: 100,
                    paddingAngle: 1,
                    cornerRadius: 2,
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fontWeight: "bold",
                    fill: "white",
                  },
                }}
                width={500}
                height={310}
              />
            </Index.Box>
          </Index.Grid>

          <Index.Grid item xs={12} md={7}>
            <Index.Box className="right-sub-box">
              {quizResult?.is_pass == 1 ? (
                <QuizPassed quizResult={quizResult} />
              ) : (
                <QuizFailure quizResult={quizResult} />
              )}
            </Index.Box>
          </Index.Grid>

          <Index.Grid item xs={12} md={12}>
            <Index.Box className="common-card view-card quiz-result-card">
              <Index.Box className="view-card-title-flex">
                <Index.Typography className="view-card-title">
                  <img
                    src={PageIndex.Svg.companyIcon}
                    alt="Send"
                    className="view-card-icons"
                  />{" "}
                  Questions And Answers
                </Index.Typography>
              </Index.Box>
              <Index.Box className="view-quiz-details-main">
                <Index.Grid container className="view-quiz-main-grid">
                  {quizResult?.quiz_data?.map((question, questIndex) => {
                    const correctAnswer = question?.options?.find(
                      (item) => item?.is_correct === 1
                    );
                    const correctAnswerIndex = question?.options?.findIndex(
                      (item) => item?.is_correct === 1
                    );
                    return (
                      <Index.Grid
                        item
                        sm={12}
                        key={question?.question_id}
                        className="view-quiz-main-grid-item"
                      >
                        <Index.Box className="view-card-data-flex view-quiz-result-question-box">
                          <Index.Typography className="view-card-data-lable">
                            {`${questIndex + 1}. ${question?.question}`}
                          </Index.Typography>
                          <Index.Box className="view-quiz-result-option-box">
                            <Index.Grid container className="option-grid-main">
                              {question?.options?.map((option, optionIndex) => {
                                return (
                                  <Index.Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    lg={6}
                                    className="option-grid-item"
                                    key={option?.id}
                                  >
                                    <Index.Box className="view-option-flex">
                                      <Index.Checkbox
                                        className="view-option-check"
                                        checked={
                                          question?.answer_id === option?.id
                                        }
                                        disabled
                                      />
                                      <Index.Typography className="view-card-data-lable">
                                        {`${optionIndex + 1}. ${
                                          option?.option_text
                                        }`}
                                      </Index.Typography>
                                    </Index.Box>
                                  </Index.Grid>
                                );
                              })}
                            </Index.Grid>
                          </Index.Box>
                          <Index.Box className="correct-answer-box">
                            <Index.Typography className="view-card-data-lable">
                              Correct Answer:
                            </Index.Typography>
                            <Index.Typography className="view-card-data-lable answer-label">
                              {`${correctAnswerIndex + 1}. ${
                                correctAnswer?.option_text
                              }` || ""}
                            </Index.Typography>
                          </Index.Box>
                        </Index.Box>
                      </Index.Grid>
                    );
                  })}
                </Index.Grid>
              </Index.Box>
            </Index.Box>
          </Index.Grid>
        </Index.Grid>
      )}
    </Index.Box>
  );
};

const QuizPassed = ({ quizResult }) => {
  const navigate = PageIndex.useNavigate();
  const { internshipId, weekId } = useParams();
  const [downloading, setDownloading] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  // const shareUrl = `${import.meta.env.VITE_BASE_URL}/certificate/${
  //   quizResult?.certificate_image
  // }`;
  const shareUrl = `${certificateImageUrl}/${
    quizResult?.certificate_image
  }`;
  const handleShareOpen = () => {
    setShareModal(true);
  };

  const handleShareClose = () => {
    setShareModal(false);
  };

  const downloadCertificate = async (data) => {
    setDownloading(true);
    try {
      const response = await fetch(shareUrl);
      if (!response.ok) throw new Error("Failed to fetch PDF");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = `${quizResult?.user_unique_id}-${quizResult?.course_title}.pdf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
      setDownloading(false);
    } catch (error) {
      setDownloading(false);
      console.error("Error downloading certificate:", error);
    }
  };
  // const downloadCertificate = async () => {
  //   setDownloading(true);
  //   try {
  //     const pdfUrl = shareUrl;
  
  //     if (pdfUrl) {
  //       const anchor = document.createElement("a");
  //       anchor.href = pdfUrl;
  
  //       anchor.setAttribute("target", `_blank`);
  //       anchor.setAttribute("download", `${quizResult?.user_unique_id}-${quizResult?.course_title}.pdf`);
  //       document.body.appendChild(anchor);
  //       anchor.click();
  //       document.body.removeChild(anchor);
  //     }
  //   } catch (error) {
  //     console.error("Error downloading certificate:", error);
  //   } finally {
  //     setDownloading(false);
  //   }
  // };
  return (
    <Index.Box className="quiz-success-main">
      <Index.Typography
        component="h1"
        variant="h1"
        className="quiz-success-title"
      >
        🎉 Congratulations! You Passed the Quiz! 🎉
      </Index.Typography>
      <Index.Typography
        component="p"
        variant="body1"
        className="quiz-success-message"
      >
        Dear {quizResult?.user_name || ""},
      </Index.Typography>
      <Index.Typography
        component="p"
        variant="body1"
        className="quiz-success-message"
      >
        Congratulations on successfully passing the{" "}
        {quizResult?.course_title || ""} Quiz! Your dedication and knowledge
        have truly paid off, and we are thrilled to recognize your achievement.
      </Index.Typography>
      <Index.Box className="quiz-btn-box">
        <Index.Box className="admin-page-btn-end-flex">
            <>
              <PageIndex.PrimaryButton
                className="primary-btn"
                btnLabel="Download certificate"
                onClick={downloadCertificate}
                loading={downloading}
              />
              <PageIndex.PrimaryButton
                className="primary-btn"
                btnLabel="Share"
                disabled={downloading}
                onClick={handleShareOpen}
              />
            </>
          <Index.Box className="primary-btn-main">
            <Index.Button
              className="primary-btn"
              onClick={() => {
                let path = weekId
                  ? `/user/internship/${internshipId}/week/${weekId}/course/${quizResult?.course_id}`
                  : `/user/course/${quizResult?.course_id}`
                navigate(path);
                // navigate(`/user/course/${quizResult?.course_id}`)
              }}
              disabled={downloading}
            >
              Go To Course
            </Index.Button>
          </Index.Box>
        </Index.Box>
      </Index.Box>
      {shareModal && (
        <PageIndex.ShareModal
          open={shareModal}
          url={shareUrl}
          handleClose={handleShareClose}
        />
      )}
    </Index.Box>
  );
};

const QuizFailure = ({ quizResult }) => {
  const navigate = PageIndex.useNavigate();
  const params = useParams();
  return (
    <Index.Box className="quiz-success-main">
      <Index.Typography
        component="h1"
        variant="h1"
        className="quiz-success-title quiz-failure-title"
      >
        🔹 Thank You for Your Effort! 🔹
      </Index.Typography>
      <Index.Typography
        component="p"
        variant="body1"
        className="quiz-success-message"
      >
        Dear {quizResult?.user_name || ""},
      </Index.Typography>
      <Index.Typography
        component="p"
        variant="body1"
        className="quiz-success-message"
      >
        Thank you for participating in the {quizResult?.course_title || ""}{" "}
        Quiz. While you may not have passed this time, remember that every
        attempt is a step toward improvement and learning.
      </Index.Typography>
      <Index.Box className="quiz-btn-box">
        <Index.Box className="admin-page-btn-end-flex">
          <Index.Box className="primary-btn-main">
            <Index.Button
              className="primary-btn"
              onClick={() =>{
                const path = params?.weekId 
                ? `/user/internship/${params?.internshipId}/week/${params?.weekId}/course/${quizResult?.course_id}/quiz` 
                : `/user/course/${quizResult?.course_id}/quiz`;

                navigate(path);
                // navigate(`/user/course/${quizResult?.course_id}/quiz`)
              }}
            >
              Take the Quiz Again
            </Index.Button>
          </Index.Box>
          <Index.Box className="primary-btn-main">
            <Index.Button
              className="primary-btn"
              onClick={() => { 
                let path = params?.weekId
                  ? `/user/internship/${params?.internshipId}/week/${params?.weekId}/course/${quizResult?.course_id}`
                  : `/user/course/${quizResult?.course_id}`
                navigate(path);
              }}
            >
              Go To Course
            </Index.Button>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
};

export default QuizSuccess;
