import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { addEditFaq, getFaq } from "../../../../redux/services/AdminService";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function AddEditFaq() {
  const navigate = PageIndex?.useNavigate();
  const params = PageIndex.useParams();
  const courseId = params.id;
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    sectionLoading: false,
  });

  const initialValues = {
    question: "",
    answer: "",
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      setLoading((prev) => ({ ...prev, pageLoading: true }));
      const response = await getFaq({ id: courseId });

      if (response?.data) {
        const course = response.data;
        formik.setValues({
          question: course?.question || "",
          answer: course?.answer || "",
        });
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  };

  const handleSubmitCourse = async (values) => {
    setLoading((prev) => ({
      ...prev,
      btnLoading: true,
    }));
    console.log({ values });

    try {
      const formData = {
        question: values.question,
        answer: values.answer,
      };

      if (courseId) {
        formData.id = courseId;
      }

      let response;
      response = await addEditFaq(formData);

      if (response?.status === 201 || response?.status === 200) {
        navigate("/admin/faq-list");
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

  const formik = Index.useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmitCourse,
    enableReinitialize: true,
    validationSchema: PageIndex.addEditFAQSchema,
  });

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
                {!courseId ? "Add" : "Edit"} FAQ
              </Index.Typography>
            </Index.Box>
            <Index.Box className="common-card">
              <form onSubmit={formik.handleSubmit}>
                <Index.Box sx={{ width: 1 }} className="grid-main">
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
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box cus-admin-hackathon-dropdown">
                          <Index.FormHelperText className="admin-form-lable">
                            Question
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              className="admin-form-control"
                              placeholder="Enter question"
                              onBlur={formik.handleBlur}
                              value={formik.values.question}
                              onChange={(e) => {
                                let inputValue = e.target.value;
                                inputValue = inputValue
                                  .replace(/^\s+/, "")
                                  .replace(/\s+/g, " ");
                                formik.setFieldValue(
                                  "question",
                                  inputValue.slice(0, 100)
                                );
                              }}
                              autoComplete="off"
                              name="question"
                            />
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.question &&
                                formik?.errors?.question}
                            </Index.FormHelperText>
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
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box">
                          <Index.FormHelperText className="admin-form-lable">
                            Answer
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group faq-ckeditor-box">

                        <CKEditor
                          config={{
                            licenseKey: "GPL",
                            placeholder: "Enter answer",
                            toolbar: [
                              "undo",
                              "redo",
                              "|",
                              "heading",
                              "|",
                              "bold",
                              "italic",
                              "link",
                              "|",
                              "bulletedList",
                              "numberedList",
                              "|",
                            ],
                          }}
                          editor={ClassicEditor}
                          name="answer"
                          contenteditable="true"
                          className=""
                          data={formik?.values?.answer}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            formik?.setFieldValue("answer", data)
                          }}
                        />
                    

                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.answer &&
                                formik?.errors?.answer}
                            </Index.FormHelperText>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>

                <Index.Box className="admin-page-btn-end-flex primary-btn-main border-btn-main">
                  <PageIndex.BorderButton
                    className="admin-modal-cancel-btn border-btn"
                    onClick={() => navigate(-1)}
                    btnLabel="Back"
                  />

                  <PageIndex.PrimaryButton
                    className="primary-btn"
                    btnLabel="Submit"
                    type="submit"
                    loading={loading.btnLoading}
                  />
                </Index.Box>
              </form>
            </Index.Box>
          </Index.Box>
        </>
      )}
    </>
  );
}
