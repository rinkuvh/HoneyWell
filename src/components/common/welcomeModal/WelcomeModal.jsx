import React from "react";
import PageIndex from "../../../containers/PageIndex";
import Index from "../../../containers/Index";

const WelcomeModal = ({ open, handleClose, userId }) => {
  const navigate = PageIndex.useNavigate();
  return (
    <>
      <Index.Modal
        aria-labelledby="modal-modal-title"
        open={open}
        aria-describedby="modal-modal-description"
        className="admin-modal"
      >
        <Index.Box
          sx={PageIndex.style}
          className="admin-modal-inner welcome-modal-inner admin-delete-modal-inner-main"
        >
          <Index.Box className="admin-modal-body">
            <Index.Typography
              className="admin-delete-modal-title"
              component="h2"
              variant="h2"
            >
              Registration Successfull
            </Index.Typography>
            <Index.Typography
              className="admin-delete-modal-para admin-common-para"
              component="p"
            >
              Welcome to the platform your ID is <span>{userId}</span>
            </Index.Typography>
            <Index.Box className="admin-delete-modal-btn-flex border-btn-main btn-main">

              <PageIndex.PrimaryButton
                className="primary-btn"
                btnLabel={`Sign in`}
                onClick={() => {
                  handleClose();
                  navigate("/user");
                }}
              />
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Modal>
    </>
  );
};

export default WelcomeModal;
