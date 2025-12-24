import React from "react";
import PageIndex from "../../../containers/PageIndex";
import Index from "../../../containers/Index";
import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";

const QuizInstructionModal = ({ open, handleClose, quizId }) => {
  const navigate = Index.useNavigate();
  const params = useParams();
  const instructions = [
    "The quiz consists of multiple-choice questions.",
    "Each question has four options, and you need to select the correct one.",
    "Once you submit your answers, you cannot change them.",
    "Make sure to read each question carefully before answering.",
    "Remember to review your answers before submitting.",
    "Please ensure you are in a quiet environment to avoid distractions.",
    "Make sure to have a stable internet connection throughout the quiz.",
    "Please ensure you have read and understood all the instructions before starting the quiz.",
    "If you encounter any technical issues, please contact support immediately.",
  ];
  return (
    <Index.Modal
      aria-labelledby="modal-modal-title"
      open={open}
      onClose={handleClose}
      aria-describedby="modal-modal-description"
      className="admin-modal share-modal"
    >
      <Index.Box
        sx={PageIndex.style}
        className="admin-modal-inner admin-delete-modal-inner-main quiz-modal-inner-main"
      >
        <Index.Box className="admin-modal-body">
          <Index.Typography
            className="admin-delete-modal-title"
            component="h2"
            variant="h2"
          >
            Quiz Instructions
          </Index.Typography>
          <Divider className="divider-line"/>
          <Index.Box className="admin-modal-hgt-scroll cus-scrollbar">
            {instructions.map((instruction, index) => (
              <Index.Box className="quiz-modal-text-box" key={index}>
                <Index.Typography
                  className="quiz-modal-text"
                  component="h6"
                  variant="h6"
                >
                  <strong> {index + 1}.</strong> {instruction}
                </Index.Typography>
              </Index.Box>
            ))}
            <Index.Box
            //   className="quiz-modal-text-box"
              sx={{ marginTop: "1rem", textAlign: "center" }}
            >
              <Index.Typography
                //   className="quiz-modal-text"
                component="h6"
                variant="h6"
                sx={{ fontSize: "1.2rem", fontWeight: "600" }}
              >
                Good luck and do your best!
              </Index.Typography>
            </Index.Box>
          </Index.Box>
        </Index.Box>
        <Index.Box className="admin-modal-footer">
          <Index.Box className="modal-footer-btn-flex primary-btn-main border-btn-main">
            <Index.Button className="border-btn" onClick={handleClose}>
              Cancel
            </Index.Button>
            <Index.Button
              className="primary-btn"
              onClick={() => {
                  const path = params?.weekId 
                    ? `/user/internship/${params?.internshipId}/week/${params?.weekId}/course/${quizId}/quiz` 
                    : `/user/course/${quizId}/quiz`;
                  navigate(path);
                  // navigate(`/user/course/${quizId}/quiz`)
                }
              }
            >
              Start Quiz
            </Index.Button>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </Index.Modal>
  );
};

export default QuizInstructionModal;
