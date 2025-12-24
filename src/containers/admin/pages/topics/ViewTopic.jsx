import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { useParams } from "react-router-dom";
import { getSingleTopic } from "../../../../redux/services/AdminService";
import { imageUrl } from "../../../../config/DataService";
import ReactPlayer from "react-player";

const ViewTopic = () => {
  const navigate = PageIndex.useNavigate();
  const params = useParams();
  const [topicDetail, setTopicDetails] = useState(null);

  const [loading, setLoading] = useState(true);

  const handleViewDocument = (url) => {
    window.open(url, "_blank");
  };

  const fetchTopicDetails = async () => {
    try {
      const response = await getSingleTopic({ id: params?.id });

      if (response?.status === 200) {
        setTopicDetails(response?.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchTopicDetails();
  }, []);
  return (
    <Index.Box className="admin-dashboard-content">
      {loading ? (
        <PageIndex.PageLoader />
      ) : (
        <>
          <Index.Box className="admin-page-title-flex admin-page-title-main admin-title-flex-box">
            <Index.Typography
              className="admin-page-title"
              component="h2"
              variant="h2"
            >
              View Topic | {topicDetail?.course_title} |{" "}
              {topicDetail?.section_name} | {topicDetail?.name}
            </Index.Typography>
            <Index.Box className="admin-userlist-inner-btn-flex">
              <Index.Box className="primary-btn-main">
                <Index.Button
                  className="primary-btn"
                  onClick={() => navigate(-1)}
                >
                  Back
                </Index.Button>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          <Index.Box className="common-card">
            <Index.Box sx={{ width: 1 }} className="grid-main">
              <Index.Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap={{ xs: 2, sm: 2, md: 2, lg: 2 }}
              >
                {topicDetail?.video && (
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 12",
                      md: "span 12",
                      lg: "span 12",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="video-container">
                      <Index.Box className="video-box">
                        <ReactPlayer
                          className="react-player"
                          url={`${imageUrl}${topicDetail?.video}`}
                          light={`${imageUrl}${topicDetail?.image}`}
                          width="100%"
                          height="100%"
                          controls
                        />
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                )}
                {topicDetail?.document && (
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 12",
                      md: "span 12",
                      lg: "span 12",
                    }}
                    className="grid-column"
                  >
                    <>
                      <Index.Box className="admin-input-box add-user-input">
                        <Index.FormHelperText className="admin-form-lable">
                          Document
                        </Index.FormHelperText>
                        <Index.Box className="multi-file-upload-main">
                          <Index.Box
                            className="multi-file-upload-box topic-detail"
                            onClick={() =>
                              handleViewDocument(
                                `${imageUrl}${topicDetail?.document}`
                              )
                            }
                          >
                            <Index.Box className="file-preview doc-preview">
                              <img
                                className="file-icon"
                                src={PageIndex.Png.pdfIcon}
                                alt="File"
                              />
                              <span className="document-name-label">
                                {PageIndex.getLimitedString(
                                  topicDetail?.document,
                                  7
                                )}
                              </span>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </>
                  </Index.Box>
                )}

                {topicDetail?.documents?.length > 0 && (
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 12",
                      md: "span 12",
                      lg: "span 12",
                    }}
                    className="grid-column"
                  >
                    <>
                      <Index.Box className="admin-input-box add-user-input">
                        <Index.FormHelperText className="admin-form-lable">
                          Resources
                        </Index.FormHelperText>
                        <Index.Box className="multi-file-upload-main">
                          {topicDetail?.documents?.map(
                            ({ document_url, document_name }) => {
                              const url = `${imageUrl}${document_url}`;
                              return (
                                <Index.Box
                                  className="multi-file-upload-box topic-detail"
                                  key={document_url}
                                  onClick={() => handleViewDocument(url)}
                                >
                                  <Index.Box className="file-preview doc-preview">
                                    <img
                                      className="file-icon"
                                      src={PageIndex.Png.pdfIcon}
                                      alt="File"
                                    />
                                    <span className="file-name document-name-label">
                                      {document_name}
                                    </span>
                                  </Index.Box>
                                </Index.Box>
                              );
                            }
                          )}
                        </Index.Box>
                      </Index.Box>
                    </>
                  </Index.Box>
                )}

                <Index.Box
                  gridColumn={{
                    xs: "span 12",
                    sm: "span 12",
                    md: "span 12",
                    lg: "span 12",
                  }}
                  className="grid-column"
                  // className="admin-dashboard-content"
                >
                  <Index.Box className="common-card view-card card-bottom-space">
                    <Index.Box className="view-card-title-flex">
                      <Index.Typography className="view-card-title">
                        <img
                          src={PageIndex.Svg.companyIcon}
                          alt="Topic"
                          className="view-card-icons"
                        />{" "}
                        Topic Information{" "}
                      </Index.Typography>
                    </Index.Box>

                    <Index.Box className="view-details-wrapper">
                      <Index.Box>
                        <Index.Box className="admin-input-box add-user-input">
                          <Index.FormHelperText className="admin-form-lable">
                            Section Image
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.Box className="file-upload-btn-main">
                              <img
                                className="file-upload-profile-img"
                                src={`${imageUrl}${topicDetail?.image}`}
                                // crossOrigin="anonymous"
                                alt="Section Image"
                                onError={(e) => {
                                  e.target.src = PageIndex.Png.CoursePlacholder;
                                }}
                              />
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                      <Index.Box className="view-details-main">
                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Section:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {topicDetail?.section_name}
                          </Index.Typography>
                        </Index.Box>
                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Topic Description:
                          </Index.Typography>
                          <Index.Typography
                            className="view-card-data-value"
                            dangerouslySetInnerHTML={{
                              __html: topicDetail?.description || "",
                            }}
                          />
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Course Name:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {topicDetail?.course_title}
                          </Index.Typography>
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Created At:
                          </Index.Typography>
                          <Index.Box className="view-card-data-value">
                            {Index.moment(topicDetail.created_at).format(
                              "DD-MM-YYYY HH:mm:ss"
                            )}
                          </Index.Box>
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Course Duration:
                          </Index.Typography>
                          <Index.Box className="view-card-data-value">
                            {topicDetail?.duration
                              ? `${topicDetail.duration} ${
                                  topicDetail.duration > 1
                                    ? "minutes"
                                    : "minute"
                                }`
                              : "0 minute"}
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </>
      )}
    </Index.Box>
  );
};

export default ViewTopic;
