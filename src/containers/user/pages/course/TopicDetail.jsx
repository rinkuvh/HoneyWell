import React, { useEffect, useState, useRef } from "react";
import Index from "../../../Index";
import ReactPlayer from "react-player";
import {
  addPdfTracking,
  addVideoTracking,
  getSingleTopicService,
  getSingleInternshipTopicService,
  addInternshipVideoTracking,
  addInternshipPdfTracking,
} from "../../../../redux/services/UserService";
import { imageUrl } from "../../../../config/DataService";
import PageIndex from "../../../PageIndex";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PdfViewer from "../../../../components/pdfViewer/PdfViewer";

const TopicDetail = () => {
  const navigate = PageIndex.useNavigate();
  const params = useParams();
  const playerRef = useRef(null);
  const playedSecondsRef = useRef(0);
  console.log("22222: ", params);
  const internshipId = params?.internshipId;
  const internshipWeekId = params?.weekId;

  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [topicDetail, setTopicDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ratingModal, setRatingModal] = useState(false);
  const [videoSeeked, setVideoSeeked] = useState(false);
  const userId = useSelector((state) => state?.user?.userProfile?.id);
  const section_id = topicDetail?.section?.id;
  const topicProgress =
    (topicDetail?.completedTopics * 100) / topicDetail?.totalTopics;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [descriptionTrackUpdated, setDescriptionTrackUpdated] = useState(false);
  const [trackingInProgress, setTrackingInProgress] = useState(false);

  const handleRatingModalOpen = () => setRatingModal(true);
  const handleRatingModalClose = () => setRatingModal(false);

  const handleProgress = (state) => {
    if (playerRef.current) {
      const currentTime = state.playedSeconds;
      // if(topicDetail.topic.lastWatchTime && !videoSeeked){
      //   playerRef.current.seekTo(parseInt(topicDetail.topic.lastWatchTime), "seconds");
      //   playedSecondsRef.current = parseInt(topicDetail.topic.lastWatchTime)
      //   setVideoSeeked(true);
      // }else


      // if (currentTime > playedSecondsRef.current + 2) {
      //   playerRef.current.seekTo(playedSecondsRef.current, "seconds");
      // } else {
      //   playedSecondsRef.current = currentTime;
      // }

      playedSecondsRef.current = state.playedSeconds;
    }
  };

  const handlePlayerReady = () => {
    if (
      playerRef.current &&
      topicDetail?.topic?.lastWatchTime &&
      !videoSeeked
    ) {
      const lastTime = parseInt(topicDetail.topic.lastWatchTime);
      playerRef.current.seekTo(lastTime, "seconds");
      playedSecondsRef.current = lastTime;
      setVideoSeeked(true);
    }
  };
  const handleDownloadDocument = (name, url) => {
    window.open(url, "_blank");
  };

  const formatDuration = (minutes) => {
    const formattedMinutes = parseFloat(minutes);
    if (isNaN(formattedMinutes)) return "";
    const duration = Index.moment.duration(formattedMinutes, "minutes");
    const hours = Math.floor(duration.asHours());
    const remainingMinutes = duration.minutes();

    let formattedTime = hours > 0 ? `${hours}hr ` : "";
    formattedTime += `${remainingMinutes} ${
      Number(minutes) !== 1 ? "minutes" : "minute"
    }`;
    return formattedTime;
  };

  const getSingleTopic = async (topicId = null) => {
    try {
      const id = topicId || params?.topicId;
      // const response = internshipWeekId
      //   ? await getSingleInternshipTopicService(id, userId, params?.courseId)
      //   : await getSingleTopicService(id, userId, params?.courseId);
      const response = await getSingleTopicService(id, userId, params?.courseId);
      if (response?.status === 200) {
        setTopicDetail(response?.data);
        setTimeout(() => setLoading(false), 500);

        if (response?.data?.isCourseCompleted && !response?.data?.isRated) {
          setTimeout(() => handleRatingModalOpen(), 500);
        }
      } else {
        setTopicDetail(null);
      }
    } catch (error) {
      setTopicDetail(null);
    }
  };

  const handleGoToTopic = (id) => {
    const path = internshipId
      ? `/user/internship/${internshipId}/week/${internshipWeekId}/course/${params?.courseId}/${id}`
      : `/user/course/${params?.courseId}/${id}`;
    navigate(path);
    // navigate(`/user/course/${params?.courseId}/${id}`);
    setLoading(true);
    setDescriptionTrackUpdated(false);
    getSingleTopic(id);
    scrollToTop();
  };

  const handleVideoStart = async () => {
    const payload = {
      topic_id: params?.topicId,
      user_id: userId,
      section_id: section_id,
      last_time: playerRef.current.getDuration(),
    };
    // if (internshipId) {
    //   payload.week_id = internshipWeekId;
    //   payload.internship_id = internshipId;
    //   addInternshipVideoTracking(payload);
    // } else {
    //   addVideoTracking(payload);
    // }
    await addVideoTracking(payload);
    setIsPlaying(true);
  };
  const handleVideoEnd = () => {
    const topicId = params?.topicId;
    const payload = {
      last_time: playerRef.current.getDuration(),
      is_completed: 1,
      topic_id: topicId,
      user_id: userId,
      section_id: section_id,
      total_watched_time: playerRef.current.getDuration(),
    };
    // let trackingFunction = internshipId
    //   ? addInternshipVideoTracking
    //   : addVideoTracking;
    // if (internshipId) {
    //   payload.week_id = internshipWeekId;
    //   payload.internship_id = internshipId;
    // }
    let trackingFunction = addVideoTracking;
    trackingFunction(payload).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        getSingleTopic();
        const currentTopicIndex = topicDetail?.related_topics?.findIndex(
          (topic) => topic?.id == topicId
        );
        const nextTopic = topicDetail?.related_topics?.find(
          (topic, index) => index == currentTopicIndex + 1
        );
        // const nextTopic = topicDetail?.related_topics?.[currentTopicIndex + 1];
        if (nextTopic?.id) {
          const payload = {
            topic_id: nextTopic?.id,
            user_id: userId,
            section_id: section_id,
          };
          if (internshipId) {
            payload.week_id = internshipWeekId;
            payload.internship_id = internshipId;
          }
          trackingFunction(payload);
        }
      }
    });
    setIsPlaying(false);
  };
  const handlePdfComplete = async () => {
    if (topicDetail?.topic?.video_url) {
      return;
    }
    const topicId = params?.topicId;
    const payload = {
      topic_id: topicId,
      user_id: userId,
      section_id: section_id,
    };

    // let trackingFunction = internshipId
    //   ? addInternshipPdfTracking
    //   : addPdfTracking;
    // if (internshipId) {
    //   payload.week_id = internshipWeekId;
    //   payload.internship_id = internshipId;
    // }
    let trackingFunction = addPdfTracking;

    await trackingFunction(payload).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        getSingleTopic();
        // const currentTopicIndex = topicDetail?.related_topics?.findIndex(
        //   (topic) => topic?.id == topicId
        // );
        // const nextTopic = topicDetail?.related_topics?.find(
        //   (topic, index) => index == currentTopicIndex + 1
        // );
        // // const nextTopic = topicDetail?.related_topics?.[currentTopicIndex + 1];
        // if (nextTopic?.id) {
        //   const payload = {
        //     topic_id: nextTopic?.id,
        //     user_id: userId,
        //     section_id: section_id,
        //   };
        //   if(internshipId){
        //     payload.week_id = internshipWeekId;
        //     payload.internship_id = internshipId;
        //   }
        //   trackingFunction(payload);
        // }
      }
    });
    setIsPlaying(false);
  };
  const handlePause = () => {
    if (isPlaying) {
      handleUpdateVideoTime();
    }
    setIsPlaying(!isPlaying);
  };
  const handleUpdateVideoTime = async () => {
    if (trackingInProgress) return;
  
    setTrackingInProgress(true);
    const payload = {
      topic_id: params?.topicId,
      user_id: userId,
      section_id: section_id,
      last_time: playerRef.current.getDuration(),
      total_watched_time: Math.floor(playedSecondsRef.current),
    };
    // if (internshipId) {
    //   payload.week_id = internshipWeekId;
    //   payload.internship_id = internshipId;
    //   addInternshipVideoTracking(payload);
    // } else {
    //   addVideoTracking(payload);
    // }
    await addVideoTracking(payload);
    setTrackingInProgress(false);
  };
  const handleDescriptionComplete = async () => {
    if (topicDetail?.topic?.video_url || topicDetail?.topic?.topic_document) {
      return;
    }
    const topicId = params?.topicId;
    const payload = {
      topic_id: topicId,
      user_id: userId,
      section_id: section_id,
    };

    // let trackingFunction = internshipId
    //   ? addInternshipPdfTracking
    //   : addPdfTracking;
    // if (internshipId) {
    //   payload.week_id = internshipWeekId;
    //   payload.internship_id = internshipId;
    // }
    let trackingFunction = addPdfTracking;

    await trackingFunction(payload).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        getSingleTopic();
        setDescriptionTrackUpdated(true);
      }
    });
    setIsPlaying(false);
  };

  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        handleUpdateVideoTime();
      }, 10000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);
  useEffect(() => {
    getSingleTopic();
  }, []);

  let lastCompletedIndex = -1;
  topicDetail?.related_topics?.forEach((topic, index) => {
    if (topic.is_completed === 1) lastCompletedIndex = index;
  });
  useEffect(() => {
    if (topicDetail?.topic?.description) {
      handleDescriptionComplete();
    }
  }, [topicDetail?.topic?.id]);

  return (
    <Index.Box className="container-fluid">
      <Index.Box className="topic-detail-main topic-detail-box user-topic-view">
        {loading ? (
          <PageIndex.PageLoader />
        ) : (
          <>
            <Index.Box className="container">
              <Index.Box className="topic-detail-title-box topic-detail-title-box-flex">
                <Index.Typography
                  component="h1"
                  variant="h1"
                  className="topic-detail-title"
                >
                  <span>
                    <Index.Link
                      to={
                        internshipId
                          ? `/user/internship/${internshipId}/week/${internshipWeekId}/course/${params?.courseId}`
                          : `/user/course/${params?.courseId}`
                      }
                      className="title-breadcrumb-link"
                    >
                      {topicDetail?.course?.title}
                    </Index.Link>
                  </span>
                  <span> {" > "} </span>
                  <span>
                    <Index.Link
                      to={
                        internshipId
                          ? `/user/internship/${internshipId}/week/${internshipWeekId}/course/${params?.courseId}`
                          : `/user/course/${params?.courseId}`
                      }
                      className="title-breadcrumb-link"
                    >
                      {topicDetail?.section?.name}
                    </Index.Link>
                  </span>
                </Index.Typography>
                <PageIndex.PrimaryButton
                  className="primary-btn"
                  btnLabel="Back"
                  onClick={() => {
                    if (internshipId) {
                      navigate(
                        `/user/internship/${internshipId}/week/${internshipWeekId}/course/${params?.courseId}`
                      );
                    } else {
                      navigate(`/user/course/${params?.courseId}`);
                    }
                  }}
                  // onClick={() => navigate(-1)}
                />
              </Index.Box>
              <Index.Box className="topic-progress">
                <Index.Box className="progress-label">
                  <Index.Typography>
                    {/* {Math.floor(topicProgress)}% */}
                    {Math.floor(topicProgress) !== 100 && (
                      <Index.Box className="progress-label">
                        <Index.Typography>
                          {Math.floor(topicProgress)}%
                        </Index.Typography>
                      </Index.Box>
                    )}
                  </Index.Typography>
                </Index.Box>
                <Index.Box sx={{ width: "100%", padding: "0 5px" }}>
                  <Index.LinearProgress
                    variant="determinate"
                    value={topicProgress}
                    sx={{
                      height: 15,
                      borderRadius: 5,
                      backgroundColor: "#ddd",
                      "& .MuiLinearProgress-bar": {
                        background: "linear-gradient(90deg, #ff8a00, #e52e71)", // Gradient applied directly
                      },
                    }}
                  />
                </Index.Box>
                <Index.Box className="progress-label">
                  <Index.Typography>{`100%`}</Index.Typography>
                </Index.Box>
              </Index.Box>
              <Index.Grid container spacing={2} className="order-first">
                <Index.Grid item md={8} xs={12} sm={12}>
                  <Index.Grid container spacing={2}>
                    {topicDetail?.topic?.video_url && (
                      <Index.Grid item md={12} xs={12} sm={12}>
                        <Index.Box className="video-container">
                          <Index.Box className="video-box">
                            <ReactPlayer
                              className="react-player"
                              ref={playerRef}
                              playing={true}
                              url={`${imageUrl}${topicDetail?.topic?.video_url}`}
                              width="100%"
                              height="100%"
                              controls
                              onReady={handlePlayerReady}
                              onProgress={handleProgress}
                              onEnded={handleVideoEnd}
                              onStart={handleVideoStart}
                              onPause={handlePause}
                              onPlay={handlePause}
                              config={{
                                file: {
                                  attributes: {
                                    controlsList: "nodownload", //noplaybackrate
                                  },
                                },
                              }}
                            />
                          </Index.Box>
                        </Index.Box>
                      </Index.Grid>
                    )}
                    {topicDetail?.topic?.topic_document && (
                      <Index.Grid item md={12} xs={12} sm={12}>
                        <PdfViewer
                          file={`${imageUrl}${topicDetail?.topic?.topic_document}`}
                          handleComplete={handlePdfComplete}
                        />
                      </Index.Grid>
                    )}
                    {!topicDetail?.topic?.topic_document &&
                      !topicDetail?.topic?.video_url &&
                      topicDetail?.topic?.description && (
                        <Index.Box className="topic-detail-description-box">
                          <Index.Typography
                            component="h1"
                            variant="h1"
                            className="description-title"
                          >
                            Description
                          </Index.Typography>
                          <Index.Grid container spacing={2}>
                            {/* <Index.Grid item md={12} xs={12} sm={12}>
                              <Index.Box>
                                <img
                                  src={
                                    `${imageUrl}${topicDetail?.topic?.image}` ||
                                    ""
                                  }
                                  className="blog-img"
                                />
                              </Index.Box>
                            </Index.Grid> */}
                            <Index.Grid item md={12} xs={12} sm={12}>
                              <div
                                className="topic-detail-description ck-content"
                                dangerouslySetInnerHTML={{
                                  __html: topicDetail?.topic?.description || "",
                                }}
                              />
                            </Index.Grid>
                          </Index.Grid>
                        </Index.Box>
                      )}
                  </Index.Grid>
                </Index.Grid>

                <Index.Grid item md={4} xs={12} sm={12}>
                  <Index.Box className="topic-list-main video-box">
                    <Index.Typography
                      component="h1"
                      variant="h1"
                      className="topic-list-title"
                    >
                      Topics
                    </Index.Typography>

                    <Index.Box className="topic-list-box">
                      <Index.List className="topic-ul">
                        {topicDetail?.related_topics?.map((topic, index) => {
                          const isCurrentTopic =
                            topic.id === topicDetail?.topic?.id;
                          const isDisabled = index > lastCompletedIndex + 1;

                          return (
                            <Index.ListItem
                              key={topic.id}
                              className={`topic-li ${
                                isCurrentTopic ? "active" : ""
                              } ${isDisabled ? "disabled" : ""} ${
                                topic?.is_completed == 1
                                  ? "topic-completed"
                                  : ""
                              }`}
                              onClick={() => {
                                if (!isDisabled && !isCurrentTopic) {
                                  handleGoToTopic(topic.id);
                                }
                              }}
                            >
                              <Index.Box className="topic-list-item-content">
                                <Index.Box className="topic-list-item-content-left">
                                  <img
                                    className="topic-image"
                                    src={
                                      topic?.is_completed == 0
                                        ? `${imageUrl}${topic?.image}`
                                        : PageIndex.Svg.approveIcon
                                    }
                                    alt="topic"
                                  />
                                  <Index.Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      width: "100%",
                                    }}
                                  >
                                    <Index.Typography
                                      component="p"
                                      variant="p"
                                      className="topic-text"
                                    >
                                      {topic?.name || ""}
                                    </Index.Typography>
                                    <Index.Typography
                                      component="p"
                                      variant="p"
                                      className="topic-text"
                                    >
                                      {topic?.duration
                                        ? formatDuration(topic?.duration)
                                        : ""}
                                    </Index.Typography>
                                  </Index.Box>
                                </Index.Box>
                              </Index.Box>
                            </Index.ListItem>
                          );
                        })}
                      </Index.List>
                    </Index.Box>
                  </Index.Box>
                </Index.Grid>
              </Index.Grid>

              {(topicDetail?.topic?.topic_document ||
                topicDetail?.topic?.video_url) &&
                topicDetail?.topic?.description && (
                  <Index.Box className="topic-detail-description-box">
                    <Index.Typography
                      component="h1"
                      variant="h1"
                      className="description-title"
                    >
                      Description
                    </Index.Typography>
                    <Index.Grid container spacing={2}>
                      {/* <Index.Grid item md={4} xs={12} sm={12}>
                        <Index.Box>
                          <img
                            src={
                              `${imageUrl}${topicDetail?.topic?.image}` || ""
                            }
                            className="blog-img"
                          />
                          sdgfgfdggfdgfgfdg
                        </Index.Box>
                      </Index.Grid> */}
                      <Index.Grid item md={8} xs={12} sm={12}>
                        <div
                          className="topic-detail-description ck-content"
                          dangerouslySetInnerHTML={{
                            __html: topicDetail?.topic?.description || "",
                          }}
                        />
                      </Index.Grid>
                    </Index.Grid>
                  </Index.Box>
                )}

              {topicDetail?.topic?.documents?.length > 0 && (
                <Index.Box className="topic-detail-document-box">
                  <Index.Typography
                    component="h1"
                    variant="h1"
                    className="document-title"
                  >
                    Resources
                  </Index.Typography>
                  <Index.Box className="document-list">
                    {topicDetail?.topic?.documents?.map((document, index) => {
                      const documentUrl = `${imageUrl}${document?.document_url}`;
                      return (
                        <Index.Box
                          className="document-box"
                          key={index}
                          onClick={() =>
                            handleDownloadDocument(
                              document?.document_name,
                              documentUrl
                            )
                          }
                        >
                          {document?.document_name}
                        </Index.Box>
                      );
                    })}
                  </Index.Box>
                </Index.Box>
              )}
            </Index.Box>
          </>
        )}
        {ratingModal && (
          <PageIndex.CourseRatingModal
            open={ratingModal}
            handleClose={handleRatingModalClose}
            courseDetail={{
              course_id: topicDetail?.course?.id,
              course_title: topicDetail?.course?.title,
            }}
          />
        )}
      </Index.Box>
    </Index.Box>
  );
};

export default TopicDetail;
