import React, { useState, useEffect } from "react";

import * as Yup from "yup";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";

const DocumentViewModal = ({ isOpen, onClose, formName, multipleFile }) => {
  console.log(multipleFile, 88);

  return (
    <Index.Modal
      aria-labelledby="modal-modal-title"
      open={isOpen}
      onClose={onClose}
      aria-describedby="modal-modal-description"
      className="admin-modal"
    >
      <Index.Box
        sx={PageIndex.style}
        className="admin-modal-inner view-document-modal-inner-main"
      >
        <Index.Box className="admin-modal-header">
          <Index.Typography className="admin-modal-title">
            {formName}
          </Index.Typography>
          <Index.Button className="modal-close-btn" onClick={onClose}>
            <img
              src={PageIndex.Svg.closeblack}
              className="admin-modal-close-icon"
              alt="Close"
            />
          </Index.Button>
        </Index.Box>
        <Index.Box className="admin-modal-body">
          <Index.Box className="admin-modal-hgt-scroll cus-scrollbar">
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
                    lg: "span 12"
                  }}
                  className="grid-column"
                >
                  <Index.Box className="view-document-flex">
                    {multipleFile?.map((row) => (
                      <Index.Box className="view-document-box">
                        <img
                          className="view-document-img"
                          src={`${PageIndex.imageUrl}${row}`}
                          crossOrigin="anonymous"
                        />
                        <Index.Box className="view-document-content-box">
                          <Index.Typography className="view-document-title">
                            Aadhar card
                          </Index.Typography>
                        </Index.Box>
                      </Index.Box>
                    ))}
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
        <Index.Box className="admin-modal-footer">
          <Index.Box className="modal-footer-btn-flex primary-btn-main border-btn-main">
            <Index.Button className="border-btn" onClick={onClose}>
              Close
            </Index.Button>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </Index.Modal>
  );
};

export default DocumentViewModal;
