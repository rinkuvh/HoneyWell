import Index from "../../../containers/Index";
import PageIndex from "../../../containers/PageIndex";
import { addCourseRatingService } from "../../../redux/services/UserService";
import StarIcon from "@mui/icons-material/Star";

const CourseRatingModal = ({ open, handleClose, courseDetail }) => {
  const handleSubmitRating = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        courseId: courseDetail?.course_id,
        rating: values?.rating,
        review: values?.review,
      };
      const response = await addCourseRatingService(payload);
      if (response?.status === 201) {
        handleClose();
        resetForm();
      } else {
        setSubmitting(false);
      }
    } catch (error) {
      setSubmitting(false);
    }
  };

  const formik = Index.useFormik({
    initialValues: { rating: 5, review: "" },
    onSubmit: handleSubmitRating,
  });
  return (
    <Index.Modal
      aria-labelledby="modal-modal-title"
      open={open}
      onClose={handleClose}
      aria-describedby="modal-modal-description"
      className="admin-modal rating-modal"
    >
      <Index.Box
        sx={PageIndex.style}
        className="admin-modal-inner admin-delete-modal-inner-main rating-modal-inner-main"
      >
        <form onSubmit={formik?.handleSubmit}>
          <Index.Box className="admin-modal-body">
            <Index.Typography
              className="admin-delete-modal-title"
              variant="body1"
              sx={{ marginBottom: 2, textAlign: "center" }}
            >
              Thank you for completing the{" "}
              <span className="course-name course-name-cus">
                {courseDetail?.course_title || ""}
              </span>{" "}
              course! Please take a moment to rate it.
            </Index.Typography>
            <Index.Box className="rate-star-flex">
              {[1, 2, 3, 4, 5].map((value) => (
                <StarIcon
                  key={value}
                  onClick={() => {
                    formik?.setFieldValue("rating", value);
                  }}
                  className={`star-icon ${
                    value <= formik?.values?.rating ? "active" : ""
                  }`}
                />
              ))}
            </Index.Box>
            <Index.Box className="review-box">
              <Index.Typography className="review-label" variant="h5">
                Leave a review :
              </Index.Typography>
              <Index.TextareaAutosize
                value={formik?.values?.review}
                name="review"
                onChange={formik?.handleChange}
                minRows={4}
                maxRows={4}
                placeholder="Write your review here..."
                className="rating-textarea"
                onBlur={formik?.handleBlur}
              />
            </Index.Box>

            <Index.Box className="admin-delete-modal-btn-flex border-btn-main btn-main">
              <PageIndex.BorderButton
                className="admin-modal-cancel-btn border-btn"
                btnLabel="Ask me later"
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

export default CourseRatingModal;
