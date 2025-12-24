import React, { useEffect, useState } from "react";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";
import { getCourseRatingById } from "../../../../redux/services/AdminService";
import StarIcon from "@mui/icons-material/Star";
import { imageUrl } from "../../../../config/DataService";

const ViewCourseRating = () => {
  const navigate = PageIndex.useNavigate();
  const params = PageIndex.useParams();

  const [viewData, setViewData] = useState(null);

  const [loading, setLoading] = useState(true);

  const getSingleData = async () => {
    try {
      const response = await getCourseRatingById(params?.id);
      if (response?.status === 200) {
        setViewData(response?.data);
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
    getSingleData();
  }, []);

  return (
    <>
      {loading ? (
        <PageIndex.PageLoader />
      ) : (
        <>
          <Index.Box className="admin-dashboard-content view-rating">
            <Index.Box className="admin-page-title-flex admin-page-title-main">
              <Index.Typography
                className="admin-page-title"
                component="h2"
                variant="h2"
              >
                <Index.Box className="view-profile-flex view-card ">
                  <img
                    className="view-profile-img"
                    src={`${imageUrl}${viewData?.user_image}`}
                    // crossorigin="anonymous"
                    onError={(e)=>{
                      e.target.src = PageIndex?.Png?.userAvtarIcon;
                    }}
                  />
                  <Index.Box>
                    <Index.Typography className="view-profile-name">
                      {viewData?.user_name} Details
                    </Index.Typography>
                    <Index.Typography className="view-card-data-value">
                      #{viewData?.user_unique_id}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
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
            <Index.Box
              sx={{ width: 1 }}
              className="grid-main card-bottom-space"
            >
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
                    lg: "span 12",
                  }}
                  className="grid-column"
                >
                  <Index.Box className="common-card view-card card-bottom-space">
                    <Index.Box className="view-card-title-flex">
                      <Index.Typography className="view-card-title">
                        <img
                          src={PageIndex.Svg.companyIcon}
                          alt="Send"
                          className="view-card-icons"
                        />{" "}
                        Rating Information
                      </Index.Typography>
                    </Index.Box>
                    <Index.Box className="view-details-wrapper">
                      <Index.Box className="view-details-main">
                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Course Name:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.course_title}
                          </Index.Typography>
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Rating:
                          </Index.Typography>
                          <Index.Box className="rate-star-flex view-rate-star-flex">
                            {[1, 2, 3, 4, 5].map((value) => (
                              <StarIcon
                                key={value}
                                className={`star-icon ${
                                  value <= viewData?.rating ? "active" : ""
                                }`}
                              />
                            ))}
                          </Index.Box>
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Rated On:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {Index.moment(viewData?.quiz_date).format(
                              "MMM D, YYYY h:mm A"
                            )}
                          </Index.Typography>
                        </Index.Box>
                      </Index.Box>
                      {viewData?.review && (
                        <Index.Box className="view-card-data-flex view-rating">
                          <Index.Typography className="view-card-data-lable">
                            Review:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.review || ""}
                          </Index.Typography>
                        </Index.Box>
                      )}
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </>
      )}
    </>
  );
};

export default ViewCourseRating;
