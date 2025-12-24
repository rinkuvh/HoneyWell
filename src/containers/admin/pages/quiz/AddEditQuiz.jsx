import React, { useEffect, useState } from "react";
import {
  addEditQuizService,
  getSingleQuizById,
} from "../../../../redux/services/AdminService";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Form } from "formik";

export default function AddEditQuiz() {
  const navigate = PageIndex?.useNavigate();
  const location = PageIndex.useLocation();
  const [options, setOptions] = useState([
    { id: 1, text: "", isCorrect: false },
  ]);
  const [initialValues, setInitialValues] = useState({
    question: "",
    options: options,
  });
  const isView = location?.state?.isView;
  const courseId = location?.state?.course_details?.CourseID;
  const topicId = location?.state?.row?.id;
  const [loading, setLoading] = useState({
    pageLoading: true,
    btnLoading: false,
  });

  const addOption = (setFieldValue) => {
    const newOptions = [
      ...options,
      { id: options.length + 1, text: "", isCorrect: false },
    ];
  
    setOptions(newOptions); 
    setFieldValue("options", newOptions); 
  };
  
  const removeOption = (index, value, setFieldValue) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    setFieldValue("options", newOptions);
  };

  const handleOptionChange = (index, value, setFieldValue) => {
    let inputValue = value;
    inputValue = inputValue.replace(/^\s+/, "").slice(0, 150);

    const newOptions = [...options];
    newOptions[index].text = inputValue;
    setOptions(newOptions);
    setFieldValue("options", newOptions);
  };

  const handleCorrectAnswer = (index, setFieldValue) => {
    const updatedOptions = options.map((option, i) => ({
      ...option,
      isCorrect: i === index, // Mark only the selected option
    }));
    setOptions(updatedOptions);
    setFieldValue("options", updatedOptions);
  };

  const handleSubmitQuiz = async (values) => {
    setLoading((prev) => ({
      ...prev,
      btnLoading: true,
    }));

    try {
      const formData = new URLSearchParams();
      if (topicId) {
        formData.append("id", topicId);
      }
      formData.append("course_id", courseId);
      formData.append("question", values.question);
      formData.append("options", JSON.stringify(values.options));

      let response = await addEditQuizService(formData);
      if (response?.status === 201 || response?.status === 200) {
        navigate(`/admin/view-course/${courseId}`, {
          state: {
            course_details: location?.state?.course_details,
            section_details: location?.state?.section_details,
            isQuiz: true,
          },
        });
      }
    } catch (error) {
      console.error("Error submitting course:", error);
    } finally {
      setLoading((prev) => ({
        ...prev,
        btnLoading: false,
      }));
    }
  };

  const fetchQuizDetails = async () => {
    try {
      setLoading((prev) => ({ ...prev, pageLoading: true }));
      const response = await getSingleQuizById({
        question_id: location?.state?.row?.id,
      });

      if (response?.data) {
        const topic = response.data;
        // sett(course)
        const optionArray = topic?.options.map((item) => ({
          id: item.option_id, // assuming each option has an ID
          text: item.option_text,
          isCorrect: item.is_correct, // assuming each option has an 'isCorrect' property
        }));
        setInitialValues({
          question: topic?.question || "",
          options: optionArray || "",
        });
        setOptions(optionArray);
      }
    } catch (error) {
      console.error("Error fetching quizz details:", error);
    } finally {
      setLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  };
  useEffect(() => {
    if (location?.state?.row) {
      fetchQuizDetails();
    } else {
      setLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  }, [location?.state?.row]);
  return (
    <>
      {loading.pageLoading ? (
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
                {isView ? "View" : !location?.state?.row ? "Add" : "Edit"} Quiz
                {/* {isView ? "View" : !courseId ? "Add" : "Edit"} Quiz */}
              </Index.Typography>
            </Index.Box>
            <Index.Box className="common-card">
              <Index.Formik
                initialValues={initialValues}
                validationSchema={PageIndex.addEditQuizSchema}
                onSubmit={handleSubmitQuiz}
              >
                {({ values, setFieldValue, errors, touched, handleBlur }) => (
                  <Form>
                    <Index.Box sx={{ width: 1 }} className="grid-main">
                      <Index.Box
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gap={{ xs: 2, sm: 2, md: 2, lg: 2 }}
                      >
                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 6",
                            md: "span 6",
                            lg: "span 6",
                          }}
                          className="grid-column"
                        >
                          <Index.Box className="add-page-form-main">
                            <Index.Box className="admin-input-box">
                              <Index.FormHelperText className="admin-form-lable">
                                Course
                                {/* <span className="sign-required">* </span> */}
                              </Index.FormHelperText>
                              <Index.Box className="admin-form-group">
                                <Index.TextField
                                  fullWidth
                                  id="fullWidth"
                                  className="admin-form-control"
                                  placeholder="Course"
                                  disabled
                                  value={location?.state?.course_details?.Title}
                                  autoComplete="off"
                                  name="topicName"
                                />
                                <Index.FormHelperText
                                  error
                                  className="admin-form-lable"
                                ></Index.FormHelperText>
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>

                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 12",
                            md: "span 12",
                            lg: "span 12",
                          }}
                          className="grid-column"
                        >
                          <Index.Box className="admin-input-box add-user-input">
                            <Index.FormHelperText className="admin-form-lable">
                              Question
                              <span className="sign-required">* </span>
                            </Index.FormHelperText>
                            {/* {isView ? ( */}
                            <Index.Box className="admin-form-group">
                              <Index.TextareaAutosize
                                disabled={isView}
                                minRows={3}
                                maxRows={6}
                                aria-label="minimum height"
                                className="admin-form-control-textarea"
                                placeholder="Enter question"
                                onBlur={handleBlur}
                                value={values.question}
                                onChange={(e) => {
                                  let inputValue = e.target.value;
                                  inputValue = inputValue.replace(/^\s+/, "");
                                  setFieldValue(
                                    "question",
                                    inputValue.slice(0, 500)
                                  );
                                }}
                                autoComplete="off"
                                name="question"
                                type="text"
                              />
                              <Index.FormHelperText
                                error
                                className="admin-form-lable"
                              >
                                {touched?.question && errors?.question}
                              </Index.FormHelperText>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 6",
                            md: "span 6",
                            lg: "span 6",
                          }}
                          className="grid-column"
                        >
                          <Index.Box className="admin-input-box add-user-input">
                            <Index.FormHelperText className="admin-form-lable">
                              Options
                              <span className="sign-required">* </span>
                            </Index.FormHelperText>
                            <Index.Box className="admin-form-group">
                              {options.map((option, index) => (
                                <>
                                  <Index.Box
                                    key={index}
                                    display="flex"
                                    alignItems="center"
                                    mt={2}
                                  >
                                    <Index.Radio
                                      className="custom-radio-button"
                                      aria-labelledby="demo-row-radio-buttons-group-label"
                                      checked={option.isCorrect}
                                      onChange={() =>
                                        handleCorrectAnswer(
                                          index,
                                          setFieldValue
                                        )
                                      }
                                      disabled={isView}
                                      name="correctOption"
                                    />
                                    <Index.TextField
                                      fullWidth
                                      className="admin-form-control"
                                      placeholder={`Enter option ${index + 1}`}
                                      value={option.text}
                                      disabled={isView}
                                      onChange={(e) =>
                                        handleOptionChange(
                                          index,
                                          e.target.value,
                                          setFieldValue
                                        )
                                      }
                                    />

                                    {!isView && (
                                      <IconButton
                                        onClick={() =>
                                          removeOption(
                                            index,
                                            values.correctOption,
                                            setFieldValue
                                          )
                                        }
                                        disabled={options.length <= 2}
                                      >
                                        <Close />
                                      </IconButton>
                                    )}
                                  </Index.Box>
                                  <Index.FormHelperText
                                    error
                                    className="admin-form-lable"
                                  >
                                    {Array.isArray(errors?.options) &&
                                      touched.options &&
                                      errors.options &&
                                      errors.options[index]?.text}
                                  </Index.FormHelperText>
                                </>
                              ))}
                              <Index.FormHelperText
                                error
                                className="admin-form-lable"
                              >
                                {!Array.isArray(errors?.options) &&
                                  touched?.options &&
                                  errors?.options}
                              </Index.FormHelperText>
                              {options.length <= 4 ? (
                                !isView ? (
                                  <Index.Box className=" add-option-btn">
                                    <PageIndex.PrimaryButton
                                      className="primary-btn"
                                      btnLabel="Add Option"
                                      //   type="submit"
                                      type="button"
                                      onClick={() =>
                                        addOption(setFieldValue, values)
                                      }
                                      disabled={loading.btnLoading}
                                    />
                                  </Index.Box>
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>

                    <Index.Box className="admin-page-btn-end-flex primary-btn-main border-btn-main">
                      <PageIndex.BorderButton
                        className="admin-modal-cancel-btn border-btn"
                        onClick={() =>  navigate(`/admin/view-course/${courseId}`, {
                          state: {
                            course_details: location?.state?.course_details,
                            section_details: location?.state?.section_details,
                            isQuiz: true,
                          },
                        })}
                        btnLabel="Back"
                      />

                      {!isView && (
                        <PageIndex.PrimaryButton
                          className="primary-btn"
                          btnLabel="Submit"
                          type="submit"
                          loading={loading.btnLoading}
                        />
                      )}
                    </Index.Box>
                  </Form>
                )}
              </Index.Formik>
            </Index.Box>
          </Index.Box>
        </>
      )}
    </>
  );
}
