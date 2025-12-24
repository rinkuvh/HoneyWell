import React, { useEffect, useState } from "react";
import momentTimezone from "moment-timezone";
import {
  addCourse,
  getCourses,
  getSections,
  addSection,
  deleteSection,
} from "../../../../redux/services/AdminService";
import { Navigate } from "react-router-dom";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";
import { imageUrl } from "../../../../config/DataService";
import * as Yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function AddEditCourse() {
  const navigate = PageIndex?.useNavigate();
  const params = PageIndex.useParams();
  const courseId = params.id;
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    sectionLoading: false,
  });
  const [imgURL, setImageUrl] = useState(null);
  const [sectionModal, setSectionModal] = useState(false);
  const [sections, setSections] = useState({
    data: [],
    meta: { page: 1, limit: 10 },
  });
  const [editSectionData, setEditSection] = useState(null);
  const [courseData, setCourseData] = useState("");

  const initialValues = {
    courseTitle: "",
    description: "",
    image: null,
    duration: "",
    is_for_pwd:""
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
      fetchSections();
    }
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      setLoading((prev) => ({ ...prev, pageLoading: true }));
      const response = await getCourses({ CourseID: courseId });

      if (response?.data) {
        const course = response.data;
        setCourseData(course);
        setImageUrl(`${imageUrl}${course.Thumbnail}`);
        formik.setValues({
          courseTitle: course.Title,
          description: course.Description,
          image: course.Thumbnail,
          duration: course.Duration,
          is_for_pwd:course.is_for_pwd == "0" ? "no" : "yes",
        });
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  };

  const fetchSections = async () => {
    try {
      const response = await getSections({ course_id: courseId });
      if (response) {
        setSections(response);
      }
    } catch (error) {
      console.error("Error fetching sections:", error);
    } finally {
      setLoading((prev) => ({ ...prev, sectionLoading: false }));
    }
  };

  const handleAddSection = async (values) => {
    try {
      setLoading((prev) => ({ ...prev, btnLoading: true }));

      const requestData = {
        sectionName: values.section_name,
        courseId,
        ...(editSectionData?.id && { id: editSectionData.id }), // Conditionally add `id` if editing
      };

      const response = await addSection(requestData);

      if (response?.status == 200 || response?.status == 201) {
        setEditSection(null); // Fix: Use `setEditSectionData` instead of `editSectionData(null)`
        setSectionModal(false);
        fetchSections();
      }
    } catch (error) {
      console.error("Error adding section:", error);
    } finally {
      setLoading((prev) => ({ ...prev, btnLoading: false }));
    }
  };

  const handleEditSection = async (values, sectionId) => {
    try {
      setLoading((prev) => ({ ...prev, btnLoading: true }));
      const response = await fetch(
        `/api/courses/${courseId}/sections/${sectionId}`,
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setSectionModal(false);
        fetchSections();
      }
    } catch (error) {
      console.error("Error editing section:", error);
    } finally {
      setLoading((prev) => ({ ...prev, btnLoading: false }));
    }
  };
 
  const handleOpenDelete = async (row) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      handleDeleteSection(row?.id);
    }
  };

  const handleDeleteSection = async (data) => {
    try {
      await deleteSection({ sectionId: data });
      fetchSections();
    } catch (err) {
      console.error("Error deleting section:", err);
    }
  };

  const handleSubmitCourse = async (values) => {
    setLoading((prev) => ({
      ...prev,
      btnLoading: true,
    }));

    try {
      const formData = new FormData();
      formData.append("Title", values.courseTitle);
      formData.append("Description", values.description);
      if (typeof values.image === "object") {
        formData.append("Thumbnail", values.image);
      }
      formData.append("Duration", values.duration);
      formData.append("is_for_pwd",values.is_for_pwd == "yes" ? 1 : 0)

      let response;

      if (courseId) {
        // Update existing course
        formData.append("id", courseId);

        response = await addCourse(formData);

        // response = await updateCourse(formData);
      } else {
        // Add new course
        response = await addCourse(formData);
      }

      if (response?.status === 201 || response?.status === 200) {
        navigate("/admin/courses-list");
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
    validationSchema: PageIndex.addEditCourseSchema,
});

const handleRemoveImage = () => {
    formik.setFieldValue("image", null);
    setImageUrl(null);
}

  const fields = [
    {
      name: "section_name",
      label: "Section name",
      type: "text",
      placeholder: "Section Name",
      validation: Yup.string().required("Please enter Section name"),
      handleChange: (e, formik) => {
        formik.setFieldValue("section_name", e.target.value);
      },
    },
  ];

  const sectionColumns = [
    {
      key: "#",
      label: "S.No.",
      width: "1%",
    },
    {
      key: "section_name",
      label: "Section Name",
      width: "4%",
    },
  ];

  const sectionAction = [
    {
      width: "5%",
      label: "Add Topic",
      image: PageIndex.Svg.addIcon,
      requiredPermission: "user_view",
      onClick: (row) =>
        navigate("/admin/add-edit-topics", {
          state: { course_details: courseData, section_details: row },
        }),
    },
    {
      width: "5%",
      label: "View",
      image: PageIndex.Svg.yelloweye,
      requiredPermission: "user_view",
      onClick: (row) =>
        navigate(`/admin/view-topics/${row.id}`, {
          state: { course_details: courseData, section_details: row },
        }),
    },
    {
      label: "Edit",
      image: PageIndex.Svg.editIcon,
      requiredPermission: "user_edit",
      onClick: (row) => {
        navigate("/admin/add-edit-sections", { state: { data: row } });
        // setSectionModal(true);
        // setEditSection(row);
      },
    },
    {
      label: "Delete",
      image: PageIndex.Svg.trash,
      requiredPermission: "user_delete",
      onClick: handleOpenDelete,
    },
  ];

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
                {!courseId ? "Add" : "Edit"} Course
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
                      <Index.Box className="admin-input-box upload-course-image add-user-input">
                        <Index.FormHelperText className="admin-form-lable">
                          Course Image (315x200)px
                          <span className="sign-required">* </span>
                        </Index.FormHelperText>
                        <Index.Box className="admin-form-group">
                          <Index.Box className="file-upload-btn-main">
                            <Index.Button
                              variant="contained"
                              component="label"
                              className="file-upload-btn"
                            >
                              <img
                                className={`${
                                  formik.values?.image
                                    ? typeof formik.values?.image === "string"
                                      ? "file-upload-profile-img"
                                      : [
                                          "image/png",
                                          "image/jpg",
                                          "image/jpeg",
                                          "image/svg+xml",
                                        ].includes(formik.values?.image.type)
                                      ? "file-upload-profile-img"
                                      : "file-upload-icon-img"
                                    : "file-upload-icon-img"
                                }`}
                                src={
                                  formik.values?.image
                                    ? typeof formik.values?.image === "string"
                                      ? imgURL
                                      : // ? formik.values?.image
                                      [
                                          "image/png",
                                          "image/jpg",
                                          "image/jpeg",
                                          "image/svg+xml",
                                        ].includes(formik.values?.image.type)
                                      ? imgURL
                                      : PageIndex.Svg.addIcon
                                    : PageIndex.Svg.addIcon
                                }
                                key={imgURL}
                              />
                              <input
                                hidden
                                accept="image/*"
                                name="image"
                                type="file"
                                onChange={(e) => {
                                  try {
                                    formik.setTouched({ image: true });
                                    if (e.target.files && e.target.files[0]) {
                                      formik.setFieldValue(
                                        "image",
                                        e.target.files[0]
                                      );
                                      setImageUrl(
                                        URL.createObjectURL(e.target.files[0])
                                      );
                                    }
                                  } catch (error) {
                                    e.target.value = null;
                                  }
                                }}
                              />
                            </Index.Button>
                            {formik?.values?.image && (
                              <Index.Button
                                className="remove-image-box"
                                disableRipple
                                onClick={handleRemoveImage}
                              >
                                <img
                                  src={PageIndex.Svg.closeblack}
                                  className="cross-icon"
                                />
                              </Index.Button>
                            )}
                          </Index.Box>
                        </Index.Box>
                        <Index.FormHelperText
                          error
                          className="admin-form-lable"
                        >
                          {formik?.touched?.image && formik?.errors?.image}
                        </Index.FormHelperText>
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
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box">
                          <Index.FormHelperText className="admin-form-lable">
                            Course Title
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              className="admin-form-control"
                              placeholder="Enter course title"
                              onBlur={formik.handleBlur}
                              value={formik.values.courseTitle}
                              onChange={(e) => {
                                let inputValue = e.target.value;
                                inputValue = inputValue
                                  .replace(/^\s+/, "")
                                  .replace(/\s+/g, " ");
                                formik.setFieldValue(
                                  "courseTitle",
                                  inputValue.slice(0, 100)
                                );
                              }}
                              autoComplete="off"
                              name="courseTitle"
                            />
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.courseTitle &&
                                formik?.errors?.courseTitle}
                            </Index.FormHelperText>
                          </Index.Box>
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
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box">
                          <Index.FormHelperText className="admin-form-lable">
                            PWD
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.Box className="admin-form-group">
                              <div className="radio-group">
                                <label className="radio-button">
                                  <input
                                    type="radio"
                                    name="is_for_pwd"
                                    value="yes"
                                    checked={formik.values.is_for_pwd === "yes"}
                                    onChange={() =>
                                      formik.setFieldValue("is_for_pwd", "yes")
                                    }
                                  />
                                  Yes
                                </label>
                                <label className="radio-button">
                                  <input
                                    type="radio"
                                    name="is_for_pwd"
                                    value="no"
                                    checked={formik.values.is_for_pwd === "no"}
                                    onChange={() =>
                                      formik.setFieldValue("is_for_pwd", "no")
                                    }
                                  />
                                  No
                                </label>
                              </div>
                            </Index.Box>
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.is_for_pwd &&
                                formik?.errors?.is_for_pwd}
                            </Index.FormHelperText>
                          </Index.Box>

                          {/* Add Radio Button Group for Yes/No */}
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
                            Description
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group course-ckeditor-box">
                            <CKEditor
                              config={{
                                licenseKey: "GPL",
                                placeholder: "Please enter description",
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
                                  "insertTable"
                                ],
                              }}
                              editor={ClassicEditor}
                              name="description"
                              contenteditable="true"
                              className=""
                              data={formik?.values?.description}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                formik?.setFieldValue("description", data);
                              }}
                              onBlur={formik.handleBlur}
                            />
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.description &&
                                formik?.errors?.description}
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

      <PageIndex.CommonFormModal
        isOpen={sectionModal}
        onClose={() => {
          setSectionModal(false);
          setEditSection(null);
        }}
        fields={fields}
        onSubmit={handleAddSection}
        formName="Section"
        initialData={editSectionData}
        loading={loading.btnLoading}
      />
    </>
  );
}
