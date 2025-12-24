import React, { useEffect, useState } from "react";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";
import { getContactByIdService } from "../../../../redux/services/AdminService";

const ViewQuery = () => {
  const navigate = PageIndex.useNavigate();
  const params = PageIndex.useParams();

  const [viewData, setViewData] = useState(null);

  const [loading, setLoading] = useState(true);

  const getSingleData = async () => {
    try {
      const response = await getContactByIdService(params?.id);
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
                View Contact Us
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
                    <Index.Box className="view-details-wrapper">
                      <Index.Box className="view-details-main">
                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Student Name:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.name}
                          </Index.Typography>
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Student Email:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.email}
                          </Index.Typography>
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Created At:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.created_at
                              ? Index.moment(viewData?.created_at)
                                  .add(5.5, "hours")
                                  .format("MMM D, YYYY hh:mm:ss A")
                              : ""}
                          </Index.Typography>
                        </Index.Box>

                        {viewData?.replied_on && (
                          <Index.Box className="view-card-data-flex">
                            <Index.Typography className="view-card-data-lable">
                              Replied on:
                            </Index.Typography>
                            <Index.Typography className="view-card-data-value">
                              {viewData?.created_at
                                ? Index.moment(viewData?.replied_on)
                                    .add(5.5, "hours")
                                    .format("MMM D, YYYY hh:mm:ss A")
                                : ""}
                            </Index.Typography>
                          </Index.Box>
                        )}
                      </Index.Box>

                      <Index.Box className="view-card-data-flex view-rating">
                        <Index.Typography className="view-card-data-lable">
                          Query:
                        </Index.Typography>
                        <Index.Typography className="view-card-data-value">
                          {viewData?.message || ""}
                        </Index.Typography>
                      </Index.Box>
                      {viewData?.reply_message && (
                        <Index.Box className="view-card-data-flex view-rating">
                          <Index.Typography className="view-card-data-lable">
                            Admin Reply:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.reply_message || ""}
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

export default ViewQuery;
