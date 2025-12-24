import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import { FieldArray, FormikProvider } from "formik";
import PageIndex from "../../../PageIndex";
import { useParams } from "react-router-dom";
import {
  getQuizByCourseId,
  submitInternshipQuiz,
  submitQuiz,
} from "../../../../redux/services/UserService";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

const Quiz = () => {
  const navigate = PageIndex.useNavigate();
  const { courseId, ...params } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [quizDetail, setQuizDetail] = useState(null);

  const initialValues = {
    questions: quizDetail?.questions?.map((item) => ({
      ...item,
      answer: "",
    })),
  };

  const handleNextQuestion = () => {
    if (currentPage < quizDetail?.questions?.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleQuizSubmit = async (values, { setSubmitting }) => {
    try {
      const urlencoded = new URLSearchParams();
      urlencoded.append("course_id", courseId);
      values?.questions?.forEach((item, index) => {
        urlencoded.append(`quiz_data[${index}][question_id]`, item?.id);
        urlencoded.append(`quiz_data[${index}][question]`, item?.question);
        urlencoded.append(`quiz_data[${index}][answer_id]`, item?.answer_id);
        urlencoded.append(`quiz_data[${index}][answer]`, item?.answer);
      });
      // let response;
      // if(params?.internshipId){
      //   urlencoded.append("internship_id", params?.internshipId);
      //   urlencoded.append("week_id", params?.weekId);
      //   response = await submitInternshipQuiz(urlencoded)
      // }else{
      //   response = await submitQuiz(urlencoded);
      // }
      const response = await submitQuiz(urlencoded);
      if (response?.status === 200) {
        setTimeout(() => {
          if(params?.internshipId){
            navigate(`/user/internship/${params?.internshipId}/week/${params?.weekId}/course/${courseId}/quiz/result/${response?.data?.quiz_id}`);
          }else{
            navigate(`/user/course/${courseId}/quiz/result/${response?.data?.quiz_id}`);
          }
        }, 500);
      } else {
        setTimeout(() => {
          setSubmitting(false);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        setSubmitting(false);
      }, 500);
    }
  };

  const formik = PageIndex.useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: handleQuizSubmit,
  });

  const getQuizQuestion = async () => {
    try {
      const response = await getQuizByCourseId(courseId);

      if (response?.status === 200) {
        setQuizDetail(response?.data);

        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getQuizQuestion();
  }, []);
  return (
    <Index.Box className="container">
      <Index.Box className="topic-detail-main topic-detail-box">
        {loading ? (
          <PageIndex.PageLoader />
        ) : (
          <>
            <Index.Box className="container">
              <form onSubmit={formik?.handleSubmit}>
                <Index.Box className="quiz-section-main">
                  <Index.Box className="topic-detail-title-box topic-detail-title-box-flex">
                    <Index.Typography
                      component="h1"
                      variant="h1"
                      className="topic-detail-title"
                    >
                      Quiz : {quizDetail?.courseDetail?.Title || ""}
                    </Index.Typography>
                    <PageIndex.PrimaryButton
                      className="primary-btn"
                      btnLabel="Back"
                      onClick={() => navigate(-1)}
                    />
                  </Index.Box>
                  <Index.Box className="quiz-header">
                    <Index.Typography
                      component="h1"
                      variant="h1"
                      className="quiz-title"
                    >
                      {`Question ( ${currentPage} of ${formik?.values?.questions?.length} )`}
                    </Index.Typography>
                  </Index.Box>
                  <Index.Box className="quiz-body">
                    <FormikProvider value={formik}>
                      <FieldArray
                        name="questions"
                        render={(arrayHelpers) => (
                          <div>
                            {formik?.values?.questions &&
                              formik?.values?.questions.length > 0 &&
                              formik?.values?.questions
                                ?.slice(currentPage - 1, currentPage)
                                ?.map((item) => {
                                  const findIndex =
                                    formik?.values?.questions?.findIndex(
                                      (ele) => ele?.id == item?.id
                                    );
                                  return (
                                    <Index.Box
                                      className="quiz-question-main"
                                      key={item?.id}
                                    >
                                      <Index.Typography
                                        component="h1"
                                        variant="h1"
                                        className="quiz-question"
                                      >
                                        {`${currentPage}. ${item?.question}`}
                                      </Index.Typography>
                                      <Index.Grid container spacing={2}>
                                        <RadioGroup
                                        className="quiz-option-radio"
                                          name={`questions[${currentPage - 1}].answer`}
                                          value={
                                            formik.values.questions[
                                              currentPage - 1
                                            ]?.answer_id || ""
                                          }
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            const optionData =
                                              item.options.find(
                                                (ele) => ele?.id == value
                                              );
                                            formik.setFieldValue(
                                              `questions[${currentPage - 1}].answer_id`,
                                              optionData?.id
                                            );
                                            formik.setFieldValue(
                                              `questions[${currentPage - 1}].answer`,
                                              optionData?.option_text
                                            );
                                          }}
                                        >
                                          {item?.options?.map(
                                            (option, optionIndex,optionArray) => (
                                              <Index.Grid
                                                item
                                                md={12}
                                                xs={12}
                                                sm={12}
                                                key={option?.id}
                                              >
                                                <Index.Box className="quiz-question-option-main">
                                                  <Index.Box className="quiz-option-box">
                                                    <FormControlLabel
                                                     className="quiz-option-check"
                                                      value={option?.id}
                                                      control={<Radio />}
                                                      label={
                                                        <Index.Typography
                                                          component="h1"
                                                          variant="h1"
                                                          className="quiz-option-text"
                                                        >
                                                          {`${optionIndex + 1}. ${
                                                            option?.option_text
                                                          }`}
                                                        </Index.Typography>
                                                      }
                                                    />
                                                  </Index.Box>
                                                </Index.Box>
                                              </Index.Grid>
                                            )
                                          )}
                                        </RadioGroup>
                                      </Index.Grid>
                                    </Index.Box>
                                  );
                                })}
                          </div>
                        )}
                      />
                    </FormikProvider>
                  </Index.Box>

                  <Index.Box className="quiz-section-footer">
                    <Index.Box className="admin-userlist-inner-btn-flex">
                      {currentPage > 1 ? (
                        <Index.Box className="primary-btn-main">
                          <Index.Button
                            className="primary-btn"
                            onClick={handlePreviousQuestion}
                            disabled={currentPage < 1}
                          >
                            Previous
                          </Index.Button>
                        </Index.Box>
                      ) : (
                        <div></div>
                      )}
                    </Index.Box>
                    {formik?.values?.questions?.length === currentPage && (
                      <PageIndex.PrimaryButton
                        className="primary-btn"
                        btnLabel="Submit"
                        type="submit"
                        disabled={
                          !formik?.values?.questions?.[currentPage - 1]
                            ?.answer_id
                        }
                        loading={formik?.isSubmitting}
                      />
                    )}

                    {formik?.values?.questions?.length !== currentPage && (
                      <Index.Box className="admin-userlist-inner-btn-flex">
                        <Index.Box className="primary-btn-main">
                          <Index.Button
                            className="primary-btn"
                            onClick={handleNextQuestion}
                            disabled={
                              !formik?.values?.questions?.[currentPage - 1]
                                ?.answer_id
                            }
                          >
                            Next
                          </Index.Button>
                        </Index.Box>
                      </Index.Box>
                    )}
                  </Index.Box>
                </Index.Box>
              </form>
            </Index.Box>
          </>
        )}
      </Index.Box>
    </Index.Box>
  );
};

export default Quiz;
