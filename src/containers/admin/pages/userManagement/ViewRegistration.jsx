import React, { useEffect, useState } from "react";

import {
  getSingleUserService,
} from "../../../../redux/services/AdminService";
import moment from "moment";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";

export default function ViewRegistration({userId}) {
  const navigate = PageIndex.useNavigate();
  // const userId = location?.state?.Id;
  console.log({userId});
  const [viewData, setViewData] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  // console.log(viewData,"viewData");

  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
  });

  const getSingleData = () => {
    setLoading((prev) => ({
      ...prev,
      pageLoading: true,
    }));
 
    getSingleUserService(userId)
      .then((res) => {
        const userData = res?.data;
        setViewData(userData);
        setLoading((prev) => ({
          ...prev,
          pageLoading: false,
        }));
      })
      .catch(() => {
        setLoading((prev) => ({
          ...prev,
          pageLoading: false,
        }));
      });
  };
  useEffect(() => {
    getSingleData();
  }, []);

  useEffect(() => {
    if (viewData?.image) {
      setImageUrl(`${PageIndex.imageUrl}${viewData?.image}`);
    }
  }, [viewData?.image]);

  return (
    <>
      {loading.pageLoading ? (
        <PageIndex.PageLoader />
      ) : (
        <>
          <Index.Box className="admin-dashboard-content">
            <Index.Box className="admin-page-title-flex admin-page-title-main">
              <Index.Typography
                className="admin-page-title"
                component="h2"
                variant="h2"
              >
                <Index.Box className="view-profile-flex view-card ">
                  <img
                    className="view-profile-img"
                    src={
                      viewData?.image ? imageUrl : PageIndex?.Png?.userAvtarIcon
                    }
                    // crossorigin="anonymous"
                    key={imageUrl}
                  />
                  <Index.Box>
                  <Index.Typography className="view-profile-name">
                    {viewData?.name} Details
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
                        User Information
                      </Index.Typography>
                    </Index.Box>
                    <Index.Box className="view-details-wrapper">
                      <Index.Box className="view-details-main">
                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Name:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.name}
                          </Index.Typography>
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Email:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.email}
                          </Index.Typography>
                        </Index.Box>
                      
                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                          College Name:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.college_name?.replace("Other -", "").trim()}
                          </Index.Typography>
                        </Index.Box>
                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                          Institute Type:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.institute_type || "-"}
                          </Index.Typography>
                        </Index.Box>
                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                          Stream:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.streamName || "-"}
                          </Index.Typography>
                        </Index.Box>
                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                          Semester:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.semesterName || "-"}
                          </Index.Typography>
                        </Index.Box>
                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                          Taluka:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.taluka_name}
                          </Index.Typography>
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            District:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.district_name}
                          </Index.Typography>
                        </Index.Box>

                       
                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Date Of Birth:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {moment(viewData?.dob).format("DD-MM-YYYY")}
                          </Index.Typography>
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Phone Number:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.contactNumber}
                          </Index.Typography>
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Gender:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.gender}
                          </Index.Typography>
                        </Index.Box>

                       
                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Registered Date & Time:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {Index.moment(viewData?.createdAt).format('DD-MM-YYYY HH:mm A')}
                          </Index.Typography>
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                           PwD:
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.pwdOption==1 ?"Yes":"No"}
                          </Index.Typography>
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
    </>
  );
}
