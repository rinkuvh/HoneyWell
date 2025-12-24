import { useEffect, useState } from "react";
import Index from "../../../Index";
import * as Yup from "yup";
import PageIndex from "../../../PageIndex";
import { useParams } from "react-router-dom";
import { addAssignmentService } from "../../../../redux/services/UserService";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CloseIcon from "@mui/icons-material/Close";
const zipFileTypes = [
  "application/zip",
  "application/x-zip-compressed",
  "multipart/x-zip"
]
const AssignmentAploadModal = ({
  open,
  handleClose,
  internshipWeekDetails,
}) => {
  const [loading, setLoading] = useState(true);
  const [fileError, setFileError] = useState("");
  const params = useParams();
  const internshipId = params?.id;
  const handleUpload = async (values, { setSubmitting, resetForm }) => {
    if (fileError) {
      return;
    }
    try {
      const payload = {
        internship_id: internshipId,
        // documents: values?.assignment,
        week_id: internshipWeekDetails?.id,
        userDescription: values?.description,
        documents: values?.documents,
      };
      const formData = new FormData();
      formData.append("internship_id", internshipId);
      formData.append("week_id", internshipWeekDetails?.id);
      formData.append("userDescription", values?.description);
      if (values.documents?.length) {
        values.documents.forEach((file) => {
          formData.append("documents", file);
        });
      }
      const response = await addAssignmentService(formData);
      if (response?.status === 201) {
        handleClose(true);
        resetForm();
      } else {
        setSubmitting(false);
      }
    } catch (error) {
      setSubmitting(false);
    }
  };
  
  const internshipSchema = Yup.object().shape({
    description: Yup.string()
      .required("Please enter what did you learn in this course?")
      .test(
        "max-plain-text-length",
        "Description must be at most 500 characters",
        function (value) {
          if (!value) return true;
  
          // Convert HTML to plain text
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = value;
          const plainText = tempDiv.innerText || "";
          return plainText.length <= 500;
        }
      ),
    documents: Yup.array()
      .test(
        'required-if-assignment-required',
        'Please upload assignment',
        function (value) {
          const { assignment_required } = this.parent || {};
          if (assignment_required === 1) {
            return Array.isArray(value) && value.length > 0;
          }
          return true;
        }
      )
      .test(
        'max-documents',
        'You can upload a maximum of 3 assignments',
        function (value) {
          return !value || value.length <= 3;
        }
      )
      .of(Yup.mixed().required("Assignment is required")),
  });
  
  const initialValues = {
    description: "",
    documents: [],
    assignment_required: internshipWeekDetails?.assignment_required ?? 1,
  };
  const formik = Index.useFormik({
    initialValues: initialValues,
    onSubmit: handleUpload,
    validationSchema: internshipSchema,
    enableReinitialize: true,
  });
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).filter((file) => {
      const ext = file.name.split(".").pop().toLowerCase();
      return ["pdf", "doc", "docx", "zip", "xls", "xlsx", "csv"].includes(ext);
    });

    if (formik.values.documents.length + files.length > 3) {
      Index.toast.error("You can only upload up to 3 assignments.");
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
  useEffect(() => {
    if (!open) {
      formik.handleReset();
    }
  }, [open]);
  return (
    <Index.Modal
      aria-labelledby="modal-modal-title new-modal-class"
      open={open}
      //   onClose={handleClose}
      aria-describedby="modal-modal-description"
      className="admin-modal internship-modal"
    >
      <Index.Box
        sx={PageIndex.style}
        className="admin-modal-inner admin-delete-modal-inner-main internship-modal-inner-main internship-assignement-modal"
      >
        <form onSubmit={formik?.handleSubmit}>
          <Index.Box className="admin-modal-body">
            <Index.Typography
              className="admin-delete-modal-title"
              variant="body1"
            >
              Upload Deliverables
            </Index.Typography>
            {internshipWeekDetails?.assignment_required !== 0 && (
              <Index.Box className="admin-input-box">
                <Index.FormHelperText className="admin-form-lable">
                  Assignments
                  <span className="sign-required">* </span>
                </Index.FormHelperText>
                <Index.Box className="multi-file-upload-main">
                  <Index.Box
                    className="admin-form-group add-user-input"
                    sx={{ textAlign: "center" }}
                  >
                    <Index.Button
                      variant="contained"
                      component="label"
                      className="file-upload-btn"
                    >
                      Upload Assignments
                      <input
                        hidden
                        accept=".pdf,.doc,.docx,.zip,.xls,.xlsx,.csv"
                        name="documents"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                      />
                    </Index.Button>

                    <Index.Box className="uploaded-docs-preview" gap={2}>
                      {formik.values.documents?.map((file, index) => (
                        <Index.Box
                          key={index}
                          className="uploaded-file-preview"
                          display="flex"
                          alignItems="center"
                        >
                          <span
                            onClick={() =>
                              window.open(URL.createObjectURL(file), "_blank")
                            }
                          >{zipFileTypes?.includes(file?.type) ? `Zip_file_${index + 1}` : `Document_${index + 1}`}</span>

                          <Index.IconButton
                            onClick={() => handleRemoveFile(index)}
                          >
                            <CloseIcon fontSize="small" />
                          </Index.IconButton>
                        </Index.Box>
                      ))}
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
                <Index.FormHelperText error className="admin-form-lable">
                  {formik.touched.documents && formik.errors.documents}
                </Index.FormHelperText>
              </Index.Box>
            )}
            <Index.Box className="admin-form-group course-ckeditor-box">
              <Index.FormHelperText className="admin-form-lable">
                What did you learn in this course?
              </Index.FormHelperText>
              <CKEditor
                config={{
                  licenseKey: "GPL",
                  placeholder: "What did you learn in this course?",
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
                name="description"
                contenteditable="true"
                className=""
                data={formik?.values?.feedback}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  formik?.setFieldValue("description", data);
                }}
                onBlur={formik.handleBlur}
              />
              <Index.FormHelperText error className="admin-form-lable">
                {formik?.touched?.description && formik?.errors?.description}
              </Index.FormHelperText>
            </Index.Box>

            <Index.Box className="admin-delete-modal-btn-flex border-btn-main btn-main">
              <PageIndex.BorderButton
                className="admin-modal-cancel-btn border-btn"
                btnLabel="Cancel"
                onClick={handleClose}
                disabled={formik?.isSubmitting}
              />
              <PageIndex.PrimaryButton
                className="primary-btn"
                btnLabel="Submit"
                type="submit"
                loading={formik?.isSubmitting}
              />
            </Index.Box>
          </Index.Box>
        </form>
      </Index.Box>
    </Index.Modal>
  );
};

export default AssignmentAploadModal;
