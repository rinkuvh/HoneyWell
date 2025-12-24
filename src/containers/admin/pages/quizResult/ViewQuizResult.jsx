import React, { useEffect, useState } from "react";

import {
  getQuizResultById,
} from "../../../../redux/services/AdminService";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";
import { imageUrl } from "../../../../config/DataService";

export default function ViewQuizResult({}) {
  const navigate = PageIndex.useNavigate();
  const params = PageIndex.useParams();

  const [viewData, setViewData] = useState(null);

  const [loading, setLoading] = useState(true);

  const getSingleData = async () => {
    try {
      const response = await getQuizResultById(params?.id);
      if (response?.status === 200) {
        setViewData(response?.data);
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
    getSingleData();
  }, []);

  return (
    <>
      {loading ? (
        <PageIndex.PageLoader />
      ) : (
        <>
          <Index.Box className="admin-dashboard-content">
            <Index.Box className="admin-page-title-flex admin-page-title-main">
              <Index.Typography
                className="admin-page-title"
                component="h2"
                variant="h2"
              >
                <Index.Box className="view-profile-flex view-card ">
                  <img
                    className="view-profile-img"
                    src={`${imageUrl}${viewData?.image}`}
                    // crossorigin="anonymous"
                    onError={(e)=>{
                      e.target.src = PageIndex?.Png?.userAvtarIcon;
                    }}
                  />
                  <Index.Box>
                    <Index.Typography className="view-profile-name">
                      {viewData?.user_name} Details
                    </Index.Typography>
                    <Index.Typography className="view-card-data-value">
                      #{viewData?.user_unique_id}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Typography>

              <Index.Box className="admin-userlist-inner-btn-flex">
                <Index.Box className="primary-btn-main">
                  <Index.Button
                    className="primary-btn"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </Index.Button>
                </Index.Box>
              </Index.Box>
            </Index.Box>
            <Index.Box
              sx={{ width: 1 }}
              className="grid-main card-bottom-space"
            >
              <Index.Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap={{ xs: 2, sm: 2, md: 2, lg: 2 }}
              >
                <Index.Box
                  gridColumn={{
                    xs: "span 12",
                    sm: "span 12",
                    md: "span 12",
                    lg: "span 12",
                  }}
                  className="grid-column"
                >
                  <Index.Box className="common-card view-card card-bottom-space">
                    <Index.Box className="view-card-title-flex">
                      <Index.Typography className="view-card-title">
                        <img
                          src={PageIndex.Svg.companyIcon}
                          alt="Send"
                          className="view-card-icons"
                        />{" "}
                        Quiz Information
                      </Index.Typography>
                    </Index.Box>
                    <Index.Box className="view-details-wrapper">
                      <Index.Box className="view-details-main">
                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            ID:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.id}
                          </Index.Typography>
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Course Name:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.course_title}
                          </Index.Typography>
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Total Questions:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.total_questions}
                          </Index.Typography>
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Score:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.score}
                          </Index.Typography>
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Result:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.result}
                          </Index.Typography>
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Quiz Date & Time:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {Index.moment(viewData?.quiz_date).format(
                              "MMM D, YYYY h:mm A"
                            )}
                          </Index.Typography>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>

            {/* Documnet Information */}
            <Index.Box className="common-card view-card">
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
                <Index.Grid container className="view-quiz-main-grid" >
                  {viewData?.quiz_data?.map((question, questIndex) => {
                    const correctAnswer = question?.options?.find((item)=> item?.is_correct === 1)
                    const correctAnswerIndex = question?.options?.findIndex((item)=> item?.is_correct === 1)
                    return (
                      <Index.Grid item sm={12} key={question?.question_id} className="view-quiz-main-grid-item" >
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
                                      <Index.Checkbox className="view-option-check" checked={question?.answer_id === option?.id} disabled />
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
                              {`${correctAnswerIndex + 1}. ${correctAnswer?.option_text}` || ''}
                            </Index.Typography>
                          </Index.Box>
                        </Index.Box>
                      </Index.Grid>
                    );
                  })}
                </Index.Grid>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </>
      )}
    </>
  );
}
