import React from "react";
import PageIndex from "../../../containers/PageIndex";
import Index from "../../../containers/Index";

const ConfirmationModal = ({
  open,
  handleClose,
  handleSubmit,
  loading,
  description,
  isConfirmation = false,
  successBtnLabel = null,
}) => {
  return (
    <>
      <Index.Modal
        aria-labelledby="modal-modal-title"
        open={open}
        onClose={handleClose}
        aria-describedby="modal-modal-description"
        className="admin-modal"
      >
        <Index.Box
          sx={PageIndex.style}
          className="admin-modal-inner admin-delete-modal-inner-main"
        >
          <Index.Box className="admin-modal-body">
            <Index.Typography
              className="admin-delete-modal-title"
              component="h2"
              variant="h2"
            >
              Are you sure?
            </Index.Typography>
            <Index.Typography
              className="admin-delete-modal-para admin-common-para"
              component="p"
            >
              {description}
            </Index.Typography>
            <Index.Box className="admin-delete-modal-btn-flex border-btn-main btn-main">
              <PageIndex.BorderButton
                className="admin-modal-cancel-btn border-btn"
                btnLabel="Cancel"
                onClick={() => {
                  handleClose();
                }}
              />

              <PageIndex.PrimaryButton
                className="primary-btn"
                btnLabel={`${successBtnLabel ? successBtnLabel : isConfirmation ? "Ok" : "Delete"}`}
                loading={loading}
                onClick={() => {
                  handleSubmit();
                }}
              />
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Modal>
    </>
  );
};

export default ConfirmationModal;
