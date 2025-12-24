import { useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  XIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import Index from "../../../containers/Index";
import PageIndex from "../../../containers/PageIndex";
import CheckIcon from "@mui/icons-material/Check";

const ShareModal = ({ open, url, handleClose }) => {
  const [copying, setCopying] = useState(false);
  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopying(true);
      Index.toast.success("Copied!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeButton: false,
        style: {
          width: "110px",
          height: "20px",
          padding: "10px",
        },
      });
      setTimeout(() => {
        setCopying(false);
      }, 2000);

      console.log("Text copied to clipboard!");
    } catch (err) {
      setCopying(false);
      console.error("Error copying text: ", err);
    }
  };

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
        className="admin-modal-inner admin-delete-modal-inner-main"
      >
        <Index.Box className="admin-modal-body">
          <Index.Typography
            className="admin-delete-modal-title"
            component="h2"
            variant="h2"
          >
            Share
          </Index.Typography>
          <Index.Box className="share-links-flex">
            <Index.Box className="share-links-btn-main">
              <FacebookShareButton url={url} className="share-links-btn">
                <FacebookIcon className="share-links-btn-icon" />
              </FacebookShareButton>
            </Index.Box>
            <Index.Box className="share-links-btn-main">
              <WhatsappShareButton url={url} className="share-links-btn">
                <WhatsappIcon className="share-links-btn-icon" />
              </WhatsappShareButton>
            </Index.Box>
            <Index.Box className="share-links-btn-main">
              <LinkedinShareButton url={url} className="share-links-btn">
                <LinkedinIcon className="share-links-btn-icon" />
              </LinkedinShareButton>
            </Index.Box>
            <Index.Box className="share-links-btn-main">
              <TwitterShareButton url={url} className="share-links-btn">
                <XIcon className="share-links-btn-icon" />
              </TwitterShareButton>
            </Index.Box>
            <Index.Box className="share-links-btn-main">
              <TelegramShareButton url={url} className="share-links-btn">
                <TelegramIcon className="share-links-btn-icon" />
              </TelegramShareButton>
            </Index.Box>
          </Index.Box>
          <Index.Box className="share-copy-link-box">
            <Index.Typography
              className="admin-delete-modal-title"
              component="h2"
              variant="h2"
            >
              Link:
            </Index.Typography>
            <Index.Typography
              className="share-link-text"
              component="h2"
              variant="h2"
            >
              {url ? url?.slice(0, 25) + "..." : ""}
            </Index.Typography>
            <Index.Box className="copy-btn-main">
              <Index.Button
                className="copy-btn"
                startIcon={
                  copying ? (
                    <CheckIcon className="copy-icon" />
                  ) : (
                    <ContentCopyRoundedIcon className="copy-icon" />
                  )
                }
                disableRipple={copying}
                onClick={() => {
                  if (!copying) {
                    copyToClipboard(url);
                  }
                }}
              />
            </Index.Box>
          </Index.Box>
          <Index.Box className="admin-delete-modal-btn-flex border-btn-main btn-main">
            <PageIndex.BorderButton
              className="admin-modal-cancel-btn border-btn"
              btnLabel="Cancel"
              onClick={handleClose}
            />
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </Index.Modal>
  );
};

export default ShareModal;
