import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Index from "../../../Index";
import {
  getUserQuizPassedResult,
} from "../../../../redux/services/UserService";
import PageIndex from "../../../PageIndex";
import { imageUrl } from "../../../../config/DataService";

export default function MyCertificate() {
  const [certificatesList, setCertificatesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadId, setDownloadId] = useState(null);
  const [shareModal, setShareModal] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState("");

  const handleShareOpen = (url) => {
    const shareUrl = `${import.meta.env.VITE_BASE_URL}/certificate/${url}`;
    setShareModal(true);
    setCertificateUrl(shareUrl);
  };

  const handleShareClose = () => {
    setShareModal(false);
    setCertificateUrl("");
  };

  const downloadCertificate = async (data) => {
    setDownloading(true);
    setDownloadId(data?.id);
    try {
      const pdfUrl = `${import.meta.env.VITE_BASE_URL}/certificate/${data?.certificate_image}`;
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error("Failed to fetch PDF");
  
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
  
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = `${data?.user_unique_id}-${data?.course_title}.pdf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
      setDownloading(false);
      setDownloadId(null);
    } catch (error) {
      setDownloading(false);
      setDownloadId(null);
      console.error("Error downloading certificate:", error);
    }
  };

  const fetchCertificates = async () => {
    try {
      const response = await getUserQuizPassedResult();

      if (response?.status === 200) {
        setCertificatesList(response?.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <Index.Box className="admin-edit-profile-containt">
      {loading ? (
        <PageIndex.PageLoader />
      ) : (
        <Index.Box className="container">
          <Index.Box className="admin-page-title-flex admin-page-title-main">
            <Index.Typography
              className="admin-page-title"
              component="h2"
              variant="h2"
            >
              My Certificate
            </Index.Typography>
          </Index.Box>

          <Index.Box className="my-certificate-list-main">
            {certificatesList?.length ? (
              certificatesList?.map((item) => (
                <Index.Box className="my-certificate-box">
                  <Index.Box className="my-certificate-inner-left">
                    <img
                      src={`${imageUrl}${item?.course_thumbnail}`}
                      className="course-image certificate-course-img"
                    />
                    <Index.Box className="my-certificate-box-content">
                      <Index.Box className="my-certificate-text-flex">
                        <Index.Typography
                          className="certificate-label"
                          component="h2"
                          variant="h2"
                        >
                          Course Name :
                        </Index.Typography>
                        <Index.Typography
                          className="certificate-title"
                          component="h2"
                          variant="h2"
                        >
                          {item?.course_title}
                        </Index.Typography>
                      </Index.Box>
                      <Index.Box className="my-certificate-text-flex">
                        <Index.Typography
                          className="certificate-label"
                          component="h2"
                          variant="h2"
                        >
                          Score :
                        </Index.Typography>
                        <Index.Typography
                          className="certificate-title"
                          component="h2"
                          variant="h2"
                        >
                          {item?.total_correct_answer}/{item?.total_questions}
                        </Index.Typography>
                      </Index.Box>
                      <Index.Box className="my-certificate-text-flex">
                        <Index.Typography
                          className="certificate-label"
                          component="h2"
                          variant="h2"
                        >
                          Quiz Date/Time :
                        </Index.Typography>
                        <Index.Typography
                          className="certificate-title"
                          component="h2"
                          variant="h2"
                        >
                          {Index.moment(item?.quiz_date)
                            .add(8, "hours")
                            .format("DD MMM, YYYY hh:mm:ss A")}
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>
                      <Index.Box className="my-certificate-inner-right">
                        <PageIndex.PrimaryButton
                          className="primary-btn download-certificate-btn"
                          btnLabel="Download certificate"
                          onClick={() => downloadCertificate(item)}
                          disabled={downloading && downloadId !== item?.id}
                          loading={downloading && downloadId === item?.id}
                        />
                        <PageIndex.PrimaryButton
                          className="primary-btn"
                          btnLabel="Share"
                          onClick={() =>
                            handleShareOpen(item?.certificate_image)
                          }
                        />
                      </Index.Box>
                  </Index.Box>
                </Index.Box>
              ))
            ) : (
              <Index.Box className="my-certificate-box no-certificate-box ">
                <Index.Typography
                  className="no-certificate"
                  component="h2"
                  variant="h2"
                >
                  No certificate available
                </Index.Typography>
              </Index.Box>
            )}
          </Index.Box>
        </Index.Box>
      )}
      {shareModal && (
        <PageIndex.ShareModal
          open={shareModal}
          url={certificateUrl}
          handleClose={handleShareClose}
        />
      )}
    </Index.Box>
  );
}
