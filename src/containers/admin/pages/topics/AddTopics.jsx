import React, { useEffect, useState } from "react";
import momentTimezone from "moment-timezone";
import {
  addCourse,
  getCourses,
  getSections,
  addSection,
  deleteSection,
  addEditTopicService,
  getSingleTopic,
} from "../../../../redux/services/AdminService";
import { Navigate } from "react-router-dom";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";
import "./AddTopics.css";
import { imageUrl } from "../../../../config/DataService";
import * as Yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function AddEditCourse() {
  const navigate = PageIndex?.useNavigate();
  const location = PageIndex.useLocation();
  const params = PageIndex.useParams();
  const isView = location?.state?.isView;
  const courseId = location?.state?.course_details?.CourseID;
  const sectionId = location?.state?.section_details?.id;
  const topicId = location?.state?.row?.id;
  const [loading, setLoading] = useState({
    pageLoading: true,
    btnLoading: false,
  });
  const [imgURL, setImageUrl] = useState(null);
  const [videoURL, setVideoUrl] = useState(null);
  console.log("videoURL", videoURL);

  const [multipleFile, setMultipleFile] = useState([]);
  const [removedFile, setRemovedFile] = useState([]);
  const [documentFieldError, setDocumentFieldError] = useState("");
  const [topicDocError, setTopicDocError] = useState("");
  const initialValues = {
    topicName: "",
    description: "",
    image: null,
    duration: "",
    documents: [],
    video: null,
    topic_document: null,
  };

  //   useEffect(() => {
  //     if (courseId) {
  //       fetchCourseDetails();
  //       fetchSections();
  //     }
  //   }, [courseId]);

  const handleRemoveImage = (index) => {
    const newMultipleFile = [...multipleFile];
    const removedFile = newMultipleFile[index];
    newMultipleFile.splice(index, 1);
    setMultipleFile(newMultipleFile);

    const newProductImage = [...formik.values.documents];
    newProductImage.splice(index, 1);

    formik.setFieldValue("documents", newProductImage);
    if (
      removedFile?.document_url &&
      typeof removedFile.document_url === "string"
    ) {
      setRemovedFile((prevRemoved) => [
        ...prevRemoved,
        removedFile.document_url,
      ]);
    }
  };

  const handleSubmitTopic = async (values) => {
    setLoading((prev) => ({
      ...prev,
      btnLoading: true,
    }));

    try {
      const formData = new FormData();
      if (topicId) {
        formData.append("id", topicId);
      }
      formData.append("name", values.topicName);
      formData.append("description", values.description);
      if (values.image instanceof File || values.image instanceof Blob) {
        formData.append("image", values.image);
      }

      // formData.append("duration", values.duration);
      const [hoursStr, minutesStr] = values.duration.split(":");
      const totalMinutes =
        parseInt(hoursStr || "0") * 60 + parseInt(minutesStr || "0");
      console.log("totalMinutes", totalMinutes);

      formData.append("duration", totalMinutes.toString());
      if (Array.isArray(values.documents)) {
        values.documents.forEach((doc) => {
          if (typeof doc.document_name !== "string") {
            // Append only new files
            formData.append("documents", doc);
          }
        });
      } else if (values.documents) {
        formData.append("documents", values.documents);
      }
/* 
      if (typeof values?.video !== "string") {
        formData.append("video", values.video);
      }
      if (typeof values?.topic_document !== "string") {
        formData.append("topic_document", values.topic_document);
      }
 */      
      formData.append("video", values.video || "");
      formData.append("topic_document", values.topic_document || "");
      if (removedFile?.length > 0) {
        formData.append("removeddocuments", removedFile);
      }
      formData.append("course_id", courseId);
      formData.append("section_id", sectionId);

      let response = await addEditTopicService(formData);
      if (response?.status === 201 || response?.status === 200) {
        navigate(`/admin/view-topics/${sectionId}`, {
          state: {
            course_details: location?.state?.course_details,
            section_details: location?.state?.section_details,
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
  const formik = Index.useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmitTopic,
    enableReinitialize: true,
    validationSchema: PageIndex.addEditTopicSchema,
  });

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
  const uploadMultipleFiles = (event) => {
    const fileArray = Array.from(event.target.files);
    const maxAllowedFiles = 5;

    // Prevent duplicate files (Check based on lastModified for uniqueness)
    const existingFiles = new Set(
      multipleFile.map((file) => file?.file?.lastModified)
    );

    const newFiles = fileArray.filter(
      (file) => !existingFiles.has(file.lastModified)
    );

    if (newFiles.length + formik.values.documents.length > maxAllowedFiles) {
      // formik.setFieldError(
      //   "documents",
      //   `Maximum ${maxAllowedFiles} files allowed.`
      // );
      // formik.setFieldTouched("documents", true);
      setDocumentFieldError(`Maximum ${maxAllowedFiles} files allowed.`);
      return;
    }
    const allowedFormats = ["application/pdf"];
    const hasInvalidFile = newFiles.some(
      (file) =>
        typeof file?.document_url !== "string" &&
        file instanceof File &&
        !allowedFormats.includes(file.type)
    );
    if (hasInvalidFile) {
      setDocumentFieldError(`Only PDF files are allowed.`);
      return;
    }

    // Generate previews for all files
    const filePreviews = newFiles.map((file) => ({
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : "", // Replace with an actual file icon if needed
    }));

    const updatedFiles = [...multipleFile, ...filePreviews];
    const updatedDocuments = [...formik.values.documents, ...newFiles];

    formik.setFieldValue("documents", updatedDocuments);
    setDocumentFieldError(``);
    // formik.setFieldTouched("documents", true);
    setMultipleFile(updatedFiles);
  };
  const formatDuration = (minutes) => {
    const formattedMinutes = parseFloat(minutes);
    if (isNaN(formattedMinutes)) return "";
    const duration = Index.moment.duration(formattedMinutes, "minutes");
    const hours = Math.floor(duration.asHours());
    const remainingMinutes = duration.minutes();

    let formattedTime = `${hours
      ?.toString()
      .padStart(2, "0")}:${remainingMinutes?.toString().padStart(2, "0")}`;
    return formattedTime;
  };
  const fetchtopicDetails = async () => {
    try {
      setLoading((prev) => ({ ...prev, pageLoading: true }));
      const response = await getSingleTopic({ id: location?.state?.row?.id });

      if (response?.data) {
        const topic = response.data;
        // sett(course)
        setImageUrl(`${imageUrl}${topic.image}`);
        setVideoUrl(`${imageUrl}${topic.video}`);
        setMultipleFile(topic?.documents);
        formik.setValues({
          topicName: topic.name || "",
          description: topic?.description || "",
          image: topic?.image,
          duration: topic?.duration ? formatDuration(topic?.duration) : "",
          documents: topic?.documents || "",
          video: topic?.video || "",
          topic_document: topic?.document || null,
        });
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  };

  useEffect(() => {
    if (location?.state?.row) {
      fetchtopicDetails();
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
                {isView ? "View" : !params?.id ? "Add" : "Edit"} Topic
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
                          Topic Thumbnail (315x200)px
                          <span className="sign-required">* </span>
                        </Index.FormHelperText>
                        {/* <Index.Box className="admin-form-group">
                          <Index.Box className="file-upload-btn-main">
                            <Index.Button
                              variant="contained"
                              component="label"
                              className="file-upload-btn"
                            >
                              <img
                                className={`${
                                  imgURL
                                    ? "file-upload-profile-img"
                                    : "file-upload-icon-img"
                                }`}
                                src={imgURL ? imgURL : PageIndex.Svg.addIcon}
                                // crossorigin="anonymous"
                                key={imgURL}
                              />
                              <input
                                disabled={isView}
                                hidden
                                accept="image/*"
                                name="image"
                                type="file"
                                onChange={(e) => {
                                  try {
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
                          </Index.Box>
                        </Index.Box> */}
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
                                // className={`${
                                //   imgURL
                                //     ? "file-upload-profile-img"
                                //     : "file-upload-icon-img"
                                // }`}
                                // src={imgURL ? imgURL : PageIndex.Svg.addIcon}
                                // crossorigin="anonymous"
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
                            Topic Name
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.TextField
                              fullWidth
                              disabled={isView}
                              id="fullWidth"
                              className="admin-form-control"
                              placeholder="Enter topic name"
                              onBlur={formik.handleBlur}
                              value={formik.values.topicName}
                              onChange={(e) => {
                                let inputValue = e.target.value;
                                inputValue = inputValue
                                  .replace(/^\s+/, "")
                                  .replace(/\s+/g, " ");
                                formik.setFieldValue(
                                  "topicName",
                                  inputValue.slice(0, 255)
                                );
                              }}
                              autoComplete="off"
                              name="topicName"
                            />
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.topicName &&
                                formik?.errors?.topicName}
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
                            Section
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              className="admin-form-control"
                              placeholder="Enter section"
                              disabled
                              value={
                                location?.state?.section_details?.section_name
                              }
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
                        sm: "span 6",
                        md: "span 6",
                        lg: "span 6",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box date-input-field">
                          <Index.FormHelperText className="admin-form-lable">
                            Duration (HH:mm)
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          {/* <Index.Box className="admin-form-group outlined-input-form-group">
                                                  <Index.LocalizationProvider
                                                    dateAdapter={Index.AdapterDayjs}
                                                  >
                                                   
                                                      <Index.MobileTimePicker
                                                        className="admin-form-control date-cust-placeholder"
                                                        name="duration"
                                                         id="fullWidth"
                                                         disabled={isView}
                                                        value={Index.dayjs(formik.values?.duration)}
                                                        // disablePast
                                                        minutesStep={1} 
                                                        format="HH:mm"
                                                        onBlur={formik.handleBlur}
                                                        onChange={(dateSelected) => {
                                                          formik.setFieldValue(
                                                            "duration",
                                                            momentTimezone
                                                              .tz(dateSelected.$d, "Asia/Kolkata")
                                                              .format()
                                                          );
                                                        }}
                                                      />
                                                  
                                                  </Index.LocalizationProvider>
                          
                                                  <Index.FormHelperText
                                                    error
                                                    className="admin-form-lable"
                                                  >
                                                    {formik.touched?.duration &&
                                                      formik.errors?.duration}
                                                  </Index.FormHelperText>
                                                </Index.Box> */}
                          <Index.Box className="admin-form-group">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              type="text"
                              disabled={isView}
                              className="admin-form-control"
                              placeholder="Enter duration"
                              onBlur={formik.handleBlur}
                              value={formik?.values?.duration}
                              // onChange={(e) => {
                              //   let value = e.target.value.replace(/\D/g, "");
                              //   value = value.replace(/^0+/, "");
                              //   // value =
                              //   //   value === ""
                              //   //     ? ""
                              //   //     : Math.max(1, Math.min(1440, parseInt(value)  || "")); // Prevent zero and negative numbers
                              //   if (value.length <= 4) {
                              //     formik.setFieldValue("duration", value);
                              //   }
                              // }}
                              onChange={(e) => {
                                let value = e.target.value;
                                if (value?.length <= 5) {
                                  if (value === "") {
                                    formik.setFieldValue("duration", "");
                                    return;
                                  }

                                  // Remove invalid characters (keep digits and colon)
                                  value = value.replace(/[^0-9:]/g, "");

                                  // Allow user to delete freely
                                  if (!value.includes(":")) {
                                    formik.setFieldValue("duration", value);
                                    return;
                                  }

                                  // Split hours and minutes
                                  const [hourStr = "", minuteStr = ""] =
                                    value.split(":");

                                  // Allow partial input (e.g., typing "12:")
                                  if (minuteStr === "") {
                                    formik.setFieldValue(
                                      "duration",
                                      `${hourStr}:`
                                    );
                                    return;
                                  }

                                  // Only allow valid minutes (0–59)
                                  let minutes = parseInt(minuteStr);
                                  if (isNaN(minutes) || minutes > 59) {
                                    minutes = 59;
                                  }

                                  // Preserve leading zero if user types it
                                  const paddedMinutes =
                                    minuteStr.length === 2 || minutes > 9
                                      ? String(minutes).padStart(2, "0")
                                      : minuteStr;

                                  formik.setFieldValue(
                                    "duration",
                                    `${hourStr}:${paddedMinutes}`
                                  );
                                }
                              }}
                              autoComplete="off"
                              name="duration"
                            />
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.duration &&
                                formik?.errors?.duration}
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
                      <Index.Box
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gap={{ xs: 2, sm: 2, md: 2, lg: 2 }}
                      >
                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 3",
                            md: "span 3",
                            lg: "span 3",
                          }}
                          className="grid-column"
                        >
                          <Index.Box className="admin-input-box upload-course-image add-user-input">
                            <Index.FormHelperText className="admin-form-lable">
                              Topic Video
                              <span className="sign-required">* </span>
                            </Index.FormHelperText>
                            <Index.Box className="admin-form-group">
                              <Index.Box className="file-upload-btn-main add-topic">
                                <Index.Button
                                  variant="contained"
                                  component="label"
                                  className="file-upload-btn video-upload-btn"
                                >
                                  {/* {videoURL &&
                                  videoURL !== "null" &&
                                  !videoURL.endsWith("/null") ? (
                                    <video
                                      className={`${
                                        videoURL
                                          ? "file-upload-profile-img"
                                          : "file-upload-icon-img"
                                      }`}
                                      src={
                                        videoURL
                                          ? videoURL
                                          : PageIndex.Svg.addIcon
                                      }
                                      // crossorigin="anonymous"
                                      controls
                                      key={videoURL}
                                    />
                                  ) : (
                                    <img
                                      className={`${
                                        videoURL
                                          ? "file-upload-profile-img"
                                          : "file-upload-icon-img"
                                      }`}
                                      src={
                                        videoURL
                                          ? videoURL
                                          : PageIndex.Svg.addIcon
                                      }
                                      // crossorigin="anonymous"
                                      key={videoURL}
                                    />
                                  )} */}
                                  {videoURL &&
                                  videoURL !== "null" &&
                                  !videoURL.endsWith("/null") ? (
                                    <video
                                      className="file-upload-profile-img multi-file-upload-video-close-btn"
                                      src={videoURL}
                                      controls
                                      key={videoURL}
                                    />
                                  ) : (
                                    <>
                                      <img
                                        className="file-upload-icon-img"
                                        src={PageIndex.Svg.addIcon}
                                        alt="Add Video"
                                        key="add-video-icon"
                                      />
                                    </>
                                  )}

                                  <input
                                    hidden
                                    accept="video/*"
                                    name="video"
                                    disabled={isView}
                                    type="file"
                                    onChange={(e) => {
                                      try {
                                        formik.setFieldTouched(
                                          "topic_document",
                                          true
                                        );
                                        formik.setFieldTouched(
                                          "description",
                                          true
                                        );
                                        formik.setFieldTouched("video", true);
                                        if (
                                          e.target.files &&
                                          e.target.files[0]
                                        ) {
                                          formik.setFieldValue(
                                            "video",
                                            e.target.files[0]
                                          );
                                          setVideoUrl(
                                            URL.createObjectURL(
                                              e.target.files[0]
                                            )
                                          );
                                        }
                                      } catch (error) {
                                        e.target.value = null;
                                      }
                                    }}
                                  />
                                </Index.Button>
                                {((videoURL &&
                                  videoURL !== "null" &&
                                  !videoURL.endsWith("/null")) ||
                                  formik.values.video) && (
                                  <Index.IconButton
                                    className="file-upload-video"
                                    onClick={() => {
                                      formik.setFieldValue("video", null);
                                      setVideoUrl(null);
                                    }}
                                  >
                                    <img
                                      src={PageIndex.Svg.closeblack}
                                      className="multi-file-upload-close-icon"
                                    />
                                  </Index.IconButton>
                                )}
                              </Index.Box>
                            </Index.Box>
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.video && formik?.errors?.video}
                            </Index.FormHelperText>
                          </Index.Box>
                        </Index.Box>
                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 3",
                            md: "span 3",
                            lg: "span 3",
                          }}
                          className="grid-column"
                        >
                          <Index.Box className="admin-input-box add-user-input topic-doc-field">
                            <Index.FormHelperText className="admin-form-lable">
                              Topic Pdf
                            </Index.FormHelperText>
                            <Index.Box className="multi-file-upload-main">
                              {formik.values?.topic_document ? (
                                <Index.Box className="multi-file-upload-box">
                                  <Index.Tooltip
                                    title={formik.values?.topic_document?.name}
                                    arrow
                                    placement="bottom"
                                    className="admin-tooltip"
                                  >
                                    <Index.Box className="file-preview doc-preview doc-preview-box">
                                      <img
                                        className="file-icon"
                                        src={PageIndex.Png.pdfIcon}
                                        alt="File"
                                      />
                                      <span className="file-name">
                                        {PageIndex.getLimitedString(
                                          formik.values?.topic_document?.name ||
                                            formik.values?.topic_document,
                                          9
                                        )}
                                      </span>
                                    </Index.Box>
                                  </Index.Tooltip>
                                  <Index.Button
                                    className="multi-file-upload-close-btn"
                                    onClick={() => {
                                      formik.setFieldValue(
                                        "topic_document",
                                        null
                                      );
                                    }}
                                  >
                                    <img
                                      src={PageIndex.Svg.closeblack}
                                      className="multi-file-upload-close-icon"
                                    />
                                  </Index.Button>
                                </Index.Box>
                              ) : (
                                <Index.Box className="multi-file-upload-btn-main doc-upload-btn">
                                  <Index.Button
                                    variant="contained"
                                    component="label"
                                    className="multi-file-upload-btn"
                                  >
                                    <Index.Box className="upload-doc">
                                      <img
                                        className="multi-file-upload-icon-img"
                                        src={PageIndex.Png.pdfUpload}
                                        crossOrigin="anonymous"
                                      />
                                      <Index.Typography>
                                        Upload
                                      </Index.Typography>
                                    </Index.Box>

                                    <input
                                      hidden
                                      accept=".pdf"
                                      name="image"
                                      type="file"
                                      multiple
                                      disabled={isView}
                                      onBlur={formik.handleBlur}
                                      onChange={(e) => {
                                        const files = e.target.files;
                                        formik.setFieldTouched(
                                          "topic_document",
                                          true
                                        );
                                        formik.setFieldTouched(
                                          "description",
                                          true
                                        );
                                        formik.setFieldTouched("video", true);
                                        try {
                                          if (files?.length) {
                                            if (
                                              files[0].type ===
                                              "application/pdf"
                                            ) {
                                              formik.setFieldValue(
                                                "topic_document",
                                                files[0]
                                              );
                                              setTopicDocError("");
                                            } else {
                                              setTopicDocError(
                                                "Only PDF files are allowed"
                                              );
                                            }
                                          }
                                        } catch (error) {
                                          e.target.value = null;
                                        }
                                      }}
                                    />
                                  </Index.Button>
                                </Index.Box>
                              )}
                            </Index.Box>
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.topic_document &&
                                (topicDocError ||
                                  formik?.errors?.topic_document)}
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
                      <Index.Box className="admin-input-box add-user-input">
                        <Index.FormHelperText className="admin-form-lable">
                          Description
                        </Index.FormHelperText>
                        <Index.Box className="admin-form-group">
                          {/* <Index.TextareaAutosize
                            disabled={isView}
                            minRows={3}
                            maxRows={6}
                            aria-label="minimum height"
                            className="admin-form-control-textarea"
                            placeholder="Enter description"
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            onChange={(e) => {
                              let inputValue = e.target.value;
                              inputValue = inputValue.replace(/^\s+/, "");
                              formik.setFieldValue(
                                "description",
                                inputValue.slice(0, 500)
                              );
                            }}
                            autoComplete="off"
                            name="description"
                            type="text"
                          /> */}
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
                                  "insertTable",
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
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                      }}
                      className="grid-column"
                    >
                      <>
                        <Index.Box className="admin-input-box add-user-input">
                          <Index.FormHelperText className="admin-form-lable">
                            Resources (Optional)
                          </Index.FormHelperText>
                          <Index.Box className="multi-file-upload-main">
                            {!isView && (
                              <Index.Box className="multi-file-upload-btn-main doc-upload-btn">
                                <Index.Button
                                  variant="contained"
                                  component="label"
                                  className="multi-file-upload-btn"
                                >
                                  <Index.Box className="upload-doc">
                                    <img
                                      className="multi-file-upload-icon-img"
                                      src={PageIndex.Png.pdfUpload}
                                      crossOrigin="anonymous"
                                    />
                                    <Index.Typography>Upload</Index.Typography>
                                  </Index.Box>

                                  <input
                                    hidden
                                    accept=".pdf"
                                    name="image"
                                    type="file"
                                    multiple
                                    disabled={isView}
                                    onBlur={formik.handleBlur}
                                    onChange={(e) => {
                                      formik.setFieldError("documentts", "");
                                      uploadMultipleFiles(e);
                                    }}
                                  />
                                </Index.Button>
                              </Index.Box>
                            )}

                            {multipleFile?.length > 0 &&
                              multipleFile?.map((fileObj, index) => {
                                const fileType = fileObj.file?.type || ""; // Handle both file objects and string URLs
                                const isExistingFile =
                                  fileObj?.document_name &&
                                  typeof fileObj?.document_name === "string"; // Check if it's an existing file URL
                                const fileName = isExistingFile
                                  ? fileObj.document_name
                                  : fileObj?.file?.name;

                                // Default preview (for unknown files)
                                let filePreview = PageIndex.Png.documentIcon; // Default document icon

                                if (
                                  fileType.startsWith("image/") ||
                                  /\.(png|jpg|jpeg|svg)$/i.test(fileName)
                                ) {
                                  filePreview = isExistingFile
                                    ? `${imageUrl}${fileObj.document_url}` //
                                    : URL.createObjectURL(fileObj.file);
                                } else if (
                                  fileType.includes("pdf") ||
                                  /\.(pdf)$/i.test(fileName)
                                ) {
                                  filePreview = PageIndex.Png.pdfIcon; // PDF icon
                                } else if (
                                  fileType.includes("msword") ||
                                  fileType.includes("document") ||
                                  /\.(doc|docx)$/i.test(fileName)
                                ) {
                                  filePreview = PageIndex.Png.documentIcon; // DOC/DOCX icon
                                }

                                return (
                                  <Index.Box
                                    key={index}
                                    className="multi-file-upload-box"
                                  >
                                    {fileType.startsWith("image/") ||
                                    /\.(png|jpg|jpeg|svg)$/i.test(fileName) ? (
                                      <img
                                        className="multi-file-upload-img"
                                        src={filePreview}
                                        alt="Preview"
                                      />
                                    ) : (
                                      <Index.Tooltip
                                        title={fileName}
                                        arrow
                                        placement="bottom"
                                        className="admin-tooltip"
                                      >
                                        <Index.Box className="file-preview doc-preview doc-preview-box">
                                          <img
                                            className="file-icon"
                                            src={filePreview}
                                            alt="File"
                                          />
                                          <span className="file-name">
                                            {PageIndex.getLimitedString(
                                              fileName,
                                              9
                                            )}
                                          </span>
                                        </Index.Box>
                                      </Index.Tooltip>
                                    )}
                                    {!isView && (
                                      <Index.Button
                                        className="multi-file-upload-close-btn"
                                        onClick={() =>
                                          handleRemoveImage(index, fileObj)
                                        }
                                      >
                                        <img
                                          src={PageIndex.Svg.closeblack}
                                          className="multi-file-upload-close-icon"
                                        />
                                      </Index.Button>
                                    )}
                                  </Index.Box>
                                );
                              })}
                          </Index.Box>
                          <Index.FormHelperText
                            error
                            className="admin-form-lable"
                          >
                            {documentFieldError ||
                              (formik?.touched?.documents &&
                                formik?.errors?.documents)}
                          </Index.FormHelperText>
                        </Index.Box>
                        {/* {formik.touched[field.name] &&
                            formik.errors[field.name] && (
                                <Index.FormHelperText
                                error
                                className="admin-error-text"
                                >
                                {formik.errors[field.name]}
                                </Index.FormHelperText>
                            )} */}
                      </>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>

                <Index.Box className="admin-page-btn-end-flex primary-btn-main border-btn-main">
                  <PageIndex.BorderButton
                    className="admin-modal-cancel-btn border-btn"
                    onClick={() => navigate(-1)}
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
              </form>
            </Index.Box>
          </Index.Box>
        </>
      )}

      {/* <PageIndex.CommonFormModal
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
      /> */}
    </>
  );
}
