import { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { useParams } from "react-router-dom";
import {
  getAssesmentFeedBackView,
} from "../../../../redux/services/UserService";

const FeedbackModal = ({ open, handleClose, internshipWeekDetails }) => {

  const [loading, setLoading] = useState(true);
  const [fileError, setFileError] = useState("");
  const [data, setData] = useState("");

  const params = useParams();
  const internshipId = params?.id;

  const fetchQuizResult = async () => {
    try {
      const query = {
        internship_id: internshipId,
        week_id: internshipWeekDetails?.id,
      };
      let response;
      if (internshipId) {
        response = await getAssesmentFeedBackView(query);
        setData(response?.data);
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (internshipWeekDetails) {
      fetchQuizResult();
    }
  }, [internshipWeekDetails]);

  return (
    <Index.Modal
      aria-labelledby="modal-modal-title"
      open={open}
      aria-describedby="modal-modal-description"
      className="admin-modal internship-modal"
    >
      <Index.Box
        sx={PageIndex.style}
        className="admin-modal-inner admin-delete-modal-inner-main internship-modal-inner-main internship-assignement-modal"
      >
        {/* Feedback View Body */}
        <Index.Box className="admin-modal-body">
          <Index.Typography
            className="admin-delete-modal-title"
            variant="body1"
          >
            Feedback
          </Index.Typography>

          {/* Description */}
          <Index.Box className="admin-input-box feedback-box" mt={2}>
            {data?.description ? (
              <Index.Typography
                className="admin-description-text"
                dangerouslySetInnerHTML={{
                  __html: data?.description,
                }}
              />
            ) : (
              <Index.Typography className="admin-description-text">
                No feedback provided.
              </Index.Typography>
            )}
          </Index.Box>

          {/* Cancel Button */}
          <Index.Box className="admin-feedback-modal-btn border-btn-main btn-main">
            <PageIndex.BorderButton
              className="admin-modal-cancel-btn border-btn"
              btnLabel="Close"
              onClick={handleClose}
            />
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </Index.Modal>
  );
};

export default FeedbackModal;
