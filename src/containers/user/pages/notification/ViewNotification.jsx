
import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { getTeamDetailService } from "../../../../redux/services/UserService";
import { imageUrl } from "../../../../config/DataService";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function ViewNotification() {
  const navigate = PageIndex.useNavigate();
  const params = useParams();
  const courseId = params.id;

  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,  
    sectionLoading: false,
  });
  const [teamData, setTeanData] = useState(null);

  const formatDateTime = (date) => {
    if (!date) return "";
    return moment(date).add(8, "hours").format("MMM D, YYYY h:mm A");
  };

  const fetchData = async () => {
    setLoading((prev) => ({ ...prev, pageLoading: true }));
    try {
      // const response = await getTeamDetailService({id:courseId});
      // console.log({response});
      // if (response?.data) {
      //   setTeanData(response?.data?.teamData);
      // }
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  };

  
  useEffect(() => {
    if (courseId) {
      fetchData();
    }
  }, [courseId]);


  return (
    <>
      <Index.Box className="container">
        {loading.pageLoading ? (
          <PageIndex.PageLoader />
        ) : (
          <Index.Box className="admin-dashboard-content">
            <Index.Box className="admin-page-title-flex admin-page-title-main admin-title-flex-box">
              <Index.Typography
                className="admin-page-title"
                component="h2"
                variant="h2"
              >
                View Notification
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
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 12",
                      md: "span 12",
                      lg: "span 12",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="add-page-form-main">
                      <Index.Box className="admin-input-box">
                        <Index.FormHelperText className="admin-form-lable">
                         Notification
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                          {teamData?.team_name || "-"}
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>

                  <Index.Box
                    gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="add-page-form-main">
                      <Index.Box className="admin-input-box">
                        <Index.FormHelperText className="admin-form-lable">
                          Created Date & Time
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                          {formatDateTime(teamData?.created_at) ||
                            "-"}
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>

      
          </Index.Box>
        )}
      </Index.Box>
    </>
  );
}
