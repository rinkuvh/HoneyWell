import React, { useEffect, useState } from "react";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";
import {
  addTeamDocumentService,
  fetchTeamDocumentService,
  getMyTeamDetail,
} from "../../../../redux/services/UserService";
import CloseIcon from "@mui/icons-material/Close";

const UploadDocument = () => {
  const navigate = PageIndex?.useNavigate();
  const params = PageIndex.useParams();
  const teamId = params.id;

  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    sectionLoading: false,
  });
  const [teamDetail, setTeamDetail] = useState(null);

  // Updated initial values without the name field
  const initialValues = {
    documents: [], // Array to store multiple documents
    comment: "",
  };

  const handleSubmitCourse = async (values) => {
    setLoading((prev) => ({
      ...prev,
      btnLoading: true,
    }));

    try {
      const formData = new FormData();
      formData.append("teamId", teamId);
      formData.append("comment", values.comment);

      values.documents.forEach((file) => {
        formData.append("documents", file);
      });

      let response = await addTeamDocumentService(formData);

      if (response?.status === 201 || response?.status === 200) {
        navigate(-1);
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
    validationSchema: PageIndex.addEditDocumentSchema,
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).filter((file) => {
      const ext = file.name.split(".").pop().toLowerCase();
      return ["pdf", "doc", "docx"].includes(ext);
    });

    if (formik.values.documents.length + files.length > 3) {
      Index.toast.error("You can only upload up to 3 documents.");
      return;
    }
    formik.setFieldValue("documents", [...formik.values.documents, ...files]);
  };

  const handleRemoveFile = (index) => {
    const updatedDocuments = formik.values.documents.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("documents", updatedDocuments);
  };

  const fetchTeamDetail = async () => {
    setLoading((prev) => ({
      ...prev,
      pageLoading: true,
    }));
    try {
      const response = await getMyTeamDetail(teamId);
      if (response?.status === 200) {
        setTeamDetail(response?.data);

        setTimeout(() => {
          setLoading((prev) => ({
            ...prev,
            pageLoading: false,
          }));
        }, 500);
      } else {
        setTimeout(() => {
          setLoading((prev) => ({
            ...prev,
            pageLoading: false,
          }));
        }, 500);
      }
    } catch (error) {
      setLoading((prev) => ({
        ...prev,
        pageLoading: false,
      }));
    }
  };

  useEffect(() => {
    fetchTeamDetail();
  }, []);

  return (
    <Index.Box className="container">
      {loading.pageLoading ? (
        <PageIndex.PageLoader />
      ) : (
        <>
          <Index.Box className="admin-dashboard-content">
            <Index.Box className="admin-page-title-flex admin-page-title-main btm-border page-title-box">
              <Index.Typography
                className="admin-page-title"
                component="h2"
                variant="h2"
                sx={{ color: "#109cc7 !important"}}
              >
                Upload Team Documents : {teamDetail?.teamData?.team_name || ""}{" "}
                | {teamDetail?.teamData?.hackathon_name || ""}
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
            <Index.Box className="hackathon-detail-view upload-douc-box">
              <Index.Box className="common-card">
                <form onSubmit={formik.handleSubmit}>
                  <Index.Box sx={{ width: 1 }} className="grid-main">
                    <Index.Box
                      display="grid"
                      gridTemplateColumns="repeat(12, 1fr)"
                      gap={{ xs: 2, sm: 2, md: 2, lg: 2 }}
                    >
                      {/* Multiple File Upload Section */}
                      <Index.Box gridColumn="span 12" className="grid-column">
                        <Index.Box className="admin-input-box add-user-input">
                          <Index.FormHelperText
                            className="admin-form-lable"
                            sx={{
                              textAlign: "center",
                              marginBottom: "8px !important",
                            }}
                          >
                            Documents (Maximum 3 document upload)
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box
                            className="admin-form-group"
                            sx={{ textAlign: "center" }}
                          >
                            <Index.Button
                              variant="contained"
                              component="label"
                              className="file-upload-btn"
                            >
                              Upload Documents
                              <input
                                hidden
                                accept=".pdf,.doc,.docx"
                                name="documents"
                                type="file"
                                multiple
                                onChange={handleFileChange}
                              />
                            </Index.Button>

                            <Index.Box
                              className="uploaded-docs-preview"
                              gap={2}
                            >
                              {formik.values.documents?.map((file, index) => (
                                <Index.Box
                                  key={index}
                                  className="uploaded-file-preview"
                                  display="flex"
                                  alignItems="center"
                                >
                                  <span
                                    onClick={() =>
                                      window.open(
                                        URL.createObjectURL(file),
                                        "_blank"
                                      )
                                    }
                                  >{`Document_${index + 1}`}</span>

                                  <Index.IconButton
                                    onClick={() => handleRemoveFile(index)}
                                  >
                                    <CloseIcon fontSize="small" />
                                  </Index.IconButton>
                                </Index.Box>
                              ))}
                            </Index.Box>
                          </Index.Box>
                          <Index.FormHelperText
                            error
                            className="admin-form-lable"
                          >
                            {formik.touched.documents &&
                              formik.errors.documents}
                          </Index.FormHelperText>
                        </Index.Box>
                      </Index.Box>

                      {/* Comment Section */}
                      <Index.Box gridColumn="span 12" className="grid-column">
                        <Index.Box className="add-page-form-main">
                          <Index.Box className="admin-input-box">
                            <Index.FormHelperText className="admin-form-lable">
                              Comment
                            </Index.FormHelperText>
                            <Index.Box className="admin-form-group">
                              <Index.TextareaAutosize
                                fullWidth
                                multiline
                                minRows={3}
                                maxRows={5}
                                id="description"
                                className="admin-form-control-textarea"
                                placeholder="Enter comment"
                                onBlur={formik.handleBlur}
                                value={formik.values.comment}
                                onChange={(e) => {
                                  let inputValue = e.target.value;
                                  inputValue = inputValue.replace(/^\s+/, "");
                                  formik.setFieldValue(
                                    "comment",
                                    inputValue.slice(0, 500)
                                  );
                                }}
                                autoComplete="off"
                                name="comment"
                              />
                              <Index.FormHelperText
                                error
                                className="admin-form-lable"
                              >
                                {formik.touched.comment &&
                                  formik.errors.comment}
                              </Index.FormHelperText>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>

                  <Index.Box
                    className="admin-page-btn-end-flex primary-btn-main border-btn-main"
                    sx={{ justifyContent: "center" }}
                  >
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
          </Index.Box>
        </>
      )}
    </Index.Box>
  );
};

export default UploadDocument;
