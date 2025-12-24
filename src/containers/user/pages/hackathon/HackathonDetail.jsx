import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { useParams } from "react-router-dom";
import {
  createTeamEligblility,
  getSingleHackathonService,
} from "../../../../redux/services/UserService";
import { imageUrl } from "../../../../config/DataService";
import HackathonTeam from "./HackathonTeam";

const HackathonDetail = () => {
  const navigate = PageIndex.useNavigate();
  const params = useParams();

  const [courseDetail, setCourseDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [createTeamBtn, setCreateTeamBtn] = useState(false);

  const formatDateTime = (date) => {
    if (!date) return "";
    return Index.moment(date)?.format("MMM D, YYYY h:mm A");
  };

  const handleCreateTeam = async (hackathonId) => {
    navigate(`/user/create-Team/${hackathonId}`);
  };


  const getSingleCourse = async () => {
    try {
      const response = await getSingleHackathonService(params?.id);
      if (response?.status === 200) {
        setCourseDetail(response?.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } else {
        setCourseDetail(null);
        setLoading(false);
      }
    } catch (error) {
      setCourseDetail(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleCourse();
  }, []);

  return (
    <>
      <Index.Box className="course-detail-main course-detail-box custom-course-details">
        {loading ? (
          <PageIndex.PageLoader />
        ) : (
          <>
            <Index.Box className="container">
              <Index.Grid container spacing={2}>
                <Index.Grid item md={12} xs={12} sm={12}>
                  <Index.Box className="course-detail-header btm-border">
                    <Index.Box className="course-detail-title-flex">
                      <Index.Typography
                        component="h1"
                        variant="h1"
                        className="course-detail-title d-none"
                      >
                        {courseDetail?.title || ""}
                      </Index.Typography>
                      <Index.Box className="admin-page-btn-end-flex primary-btn-main border-btn-main">
                        {!courseDetail?.isUserTeamExist && (
                          <PageIndex.PrimaryButton
                            className="primary-btn"
                            btnLabel="Create Team"
                            onClick={() => handleCreateTeam(courseDetail?.id)}
                          />
                        )}
                        <PageIndex.PrimaryButton
                          className="primary-btn"
                          btnLabel="Back"
                          onClick={() => navigate(-1)}
                        />
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Grid>
                <Index.Box className="hackathon-detail-view hackathon-detail-main">
                  <Index.Grid container spacing={2}>
                    <Index.Grid item xs={12} md={4} sm={12}>
                      <Index.Box>
                        <img
                          src={`${imageUrl}${courseDetail?.banner}` || ""}
                          className="blog-img"
                          alt="Internship image"
                        />
                      </Index.Box>
                    </Index.Grid>
                    <Index.Grid item xs={12} md={8} sm={12}>
                      <Index.Box className="hackathon-detail-box-list">
                        <Index.Box className="hackathon-detail-box">
                          <Index.Typography>
                            Course :<span>{courseDetail?.course_title} </span>
                          </Index.Typography>
                        </Index.Box>
                        <Index.Box className="hackathon-detail-box">
                          <Index.Typography>
                            Maximum Team Size :
                            <span>{courseDetail?.max_team_size}</span>
                          </Index.Typography>
                        </Index.Box>
                        <Index.Box className="hackathon-detail-box">
                          <Index.Typography>
                            Start From :
                            <span>
                              {formatDateTime(courseDetail?.start_datetime)}
                            </span>
                          </Index.Typography>
                        </Index.Box>
                        <Index.Box className="hackathon-detail-box">
                          <Index.Typography>
                            End At :
                            <span>
                              {formatDateTime(courseDetail?.end_datetime)}
                            </span>
                          </Index.Typography>
                        </Index.Box>
                        <Index.Box className="hackathon-detail-box">
                          <Index.Typography>
                            Description :
                            <span
                              // className="course-detail-description"
                              dangerouslySetInnerHTML={{
                                __html: courseDetail?.description,
                              }}
                            />
                          </Index.Typography>
                        </Index.Box>
                      </Index.Box>
                    </Index.Grid>
                    <Index.Grid item xs={12} md={12} sm={12}>
                      <div className="btm-brder"></div>
                    </Index.Grid>
                    <Index.Grid item md={12} xs={12} sm={12}>
                      <HackathonTeam courseDetail={courseDetail} getSingleCourse={getSingleCourse} />
                    </Index.Grid>
                  </Index.Grid>
                </Index.Box>
              </Index.Grid>
            </Index.Box>
          </>
        )}
      </Index.Box>
    </>
  );
};

export default HackathonDetail;
