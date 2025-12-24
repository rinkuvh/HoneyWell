import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import { getMyCoursesService, generateCourseCertificate } from "../../../../redux/services/UserService";
import PageIndex from "../../../PageIndex";
import { certificateImageUrl, imageUrl } from "../../../../config/DataService";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const [coursesList, setCoursesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [downloadId, setDownloadId] = useState(null);
  const [shareModal, setShareModal] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState("");

  const navigate = useNavigate();
  const fetchData = async (searchTerm, pageNo, dataPerPage) => {
    setLoading(true);
    try {
      const data = {
        page: pageNo ?? page,
        limit: dataPerPage ?? rowsPerPage,
        search: searchTerm ?? search,
      };
      const res = await getMyCoursesService(data);

      setCoursesList(res?.data || []);
      setPage(res?.meta.page);
      setTotalCount(res?.meta.totalCount);
      getNotificationCountData();
    } catch (error) {
      console.error("Error fetching team data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCourseDetail = (id) => {
    navigate(`/user/course/${id}`);
  };
  const setIndentRequest = (newData) => {};

  const downloadCertificate = async (data) => {
    setDownloading(true);
    setDownloadId(data?.CourseID);
    try {
      // const pdfUrl = `${import.meta.env.VITE_BASE_URL}/certificate/${data?.certificate_image}`;
      const pdfUrl = `${certificateImageUrl}/${data?.certificate_image}`;
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

  const generateCertificate = async (data, type) => {
    setDownloading(true);
    setDownloadId(data?.CourseID);
    try {
      const certificateData = await generateCourseCertificate({
        course_id: data?.CourseID,
      });
      if (certificateData?.data?.url) {
        const pdfUrl = certificateData?.data?.url;
        if(type === "share"){
          setCertificateUrl(pdfUrl);
          setShareModal(true);
        }else{
          const response = await fetch(pdfUrl);
          if (!response.ok) throw new Error("Failed to fetch PDF");
  
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
  
          const downloadLink = document.createElement("a");
          downloadLink.href = url;
          downloadLink.download = `certificate-${data?.course_title}.pdf`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(url);
        }
      }
    } catch (error) {
      console.error("Error downloading certificate:", error);
    } finally {
      setDownloading(false);
      setDownloadId(null);
    }
  };

  // const downloadCertificate = async (data) => {
  //   setDownloading(true);
  //   setDownloadId(data?.CourseID);
  //   try {
  //     const pdfUrl = `${certificateImageUrl}/${data?.certificate_image}`;
  
  //     if (pdfUrl) {
  //       const anchor = document.createElement("a");
  //       anchor.href = pdfUrl;
  
  //       anchor.setAttribute("target", `_blank`);
  //       anchor.setAttribute("download",  `${data?.user_unique_id}-${data?.course_title}.pdf`);
  //       document.body.appendChild(anchor);
  //       anchor.click();
  //       document.body.removeChild(anchor);
  //     }
  //   } catch (error) {
  //     console.error("Error downloading certificate:", error);
  //   } finally {
  //     setDownloading(false);
  //     setDownloadId(null);
  //   }
  // };
  const handleShareOpen = (url) => {
    // const shareUrl = `${import.meta.env.VITE_BASE_URL}/certificate/${url}`;
    const shareUrl = `${certificateImageUrl}/${url}`;
    setShareModal(true);
    setCertificateUrl(shareUrl);
  };
  const handleShareClose = () => {
    setShareModal(false);
    setCertificateUrl("");
  };

  const {
    page,
    rowsPerPage,
    search,
    setPage,
    handleSearchChange,
    handlePageChange,
    handleRowsPerPageChange,
  } = PageIndex.usePaginationHook(fetchData, setIndentRequest);

  return (
    <>
      <Index.Box className="admin-edit-profile-containt internship-section">
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
                My Courses
              </Index.Typography>
            </Index.Box>

            <Index.Box className="my-certificate-list-main">
              {coursesList?.length ? (
                coursesList?.map((item) => (
                  <Index.Box className="my-certificate-box">
                    <Index.Box className="my-certificate-inner-left course-internship-section">
                      <img
                        src={`${imageUrl}${item?.course_thumbnail}`}
                        className="course-image certificate-course-img"
                        onError={(e)=>{
                          e.target.src = PageIndex.Png.CoursePlacholder
                          e.target.style.objectFit = "contain"
                        }}
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
                        {/* <Index.Box className="my-certificate-text-flex">
                          <Index.Typography
                            className="certificate-label"
                            component="h2"
                            variant="h2"
                          >
                            Total Topics :
                          </Index.Typography>
                          <Index.Typography
                            className="certificate-title"
                            component="h2"
                            variant="h2"
                          >
                            {item?.total_completed_topic_count} / {item?.total_topic_count} ({item?.total_topic_count == item?.total_completed_topic_count && item?.total_topic_count != 0 ? "Completed" : "In Progress"})
                          </Index.Typography>
                        </Index.Box> */}
                        {item?.total_correct_answer !== null && item?.total_questions && (
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
                        )}
                        {item?.latest_quiz_update && (
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
                              {Index.moment(item?.latest_quiz_update).add(8, "hours")
                                .format("DD MMM, YYYY hh:mm:ss A")}
                            </Index.Typography>
                          </Index.Box>
                        )}
                      </Index.Box>
                      <Index.Box className="my-certificate-inner-right view-course-btn">
                          <PageIndex.PrimaryButton
                            className="primary-btn download-certificate-btn"
                            btnLabel="View course"
                            onClick={() => handleCourseDetail(item?.CourseID)}
                          />
                          {(item?.certificate_image || item?.is_pass == 1 ) && (
                            <Index.Box className="certificate-actions">
                              <PageIndex.PrimaryButton
                                className="primary-btn download-certificate-btn"
                                btnLabel="Download certificate"
                                onClick={() => {
                                  if(item?.certificate_image){
                                    downloadCertificate(item)
                                  }else if(item?.is_pass == 1){
                                    generateCertificate(item)
                                  }
                                }}
                                disabled={downloading && downloadId == item?.CourseID}
                                loading={downloading && downloadId === item?.CourseID}
                              />
                              <PageIndex.PrimaryButton
                                className="primary-btn"
                                btnLabel="Share"
                                disabled={downloading && downloadId == item?.CourseID}
                                loading={downloading && downloadId === item?.CourseID}
                                onClick={() => {
                                  if(item?.certificate_image){
                                    handleShareOpen(item?.certificate_image)
                                  }else if(item?.is_pass == 1){
                                    generateCertificate(item, "share")
                                  }
                                }}
                              />
                            </Index.Box>
                          )}
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
                    No courses found
                  </Index.Typography>
                </Index.Box>
              )}
            </Index.Box>
            {totalCount >= 10 && (
              <Index.Box className="admin-pagination-main">
                <Index.TablePagination
                  className="pagination"
                  component="div"
                  count={totalCount}
                  page={page - 1}
                  onPageChange={handlePageChange}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleRowsPerPageChange}
                />
              </Index.Box>
            )}
          </Index.Box>
        )}
      </Index.Box>
      {shareModal && (
        <PageIndex.ShareModal
          open={shareModal}
          url={certificateUrl}
          handleClose={handleShareClose}
        />
      )}
    </>
  );
}
