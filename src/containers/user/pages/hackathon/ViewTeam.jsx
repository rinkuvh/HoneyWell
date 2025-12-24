import React, { useEffect, useState } from "react";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";
import { getMyTeamDetail } from "../../../../redux/services/UserService";

export default function ViewTeam() {
  const navigate = PageIndex.useNavigate();
  const params = PageIndex.useParams();
  const userId = params?.id;
  const [viewData, setViewData] = useState({});

  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
  });

  const getSingleData = () => {
    setLoading((prev) => ({
      ...prev,
      pageLoading: true,
    }));

    getMyTeamDetail(userId)
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

  const columns = [
    { key: "#", label: "S.No." },
    { key: "member_name", label: "Member Name", limit: 30 },
    { key: "member_email", label: "Member Email" },
    { key: "member_status", label: "Status" },
  ];

  const actions = [
    {
      label: "Delete",
      image: PageIndex.Svg.trash,
      // onClick: (row) => handleOpenDelete(row),
    },
  ];

  useEffect(() => {
    getSingleData();
  }, []);

  return (
    <Index.Box className="container">
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
                  Team Detail
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
                    <Index.Box className="view-details-wrapper">
                      <Index.Box className="view-details-main">
                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Team Name :
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.teamData?.team_name}
                          </Index.Typography>
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Internship Name :
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.teamData?.hackathon_name}
                          </Index.Typography>
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Created By :
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.teamData?.created_by_name}
                          </Index.Typography>
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Created Date & Time :
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {Index.moment(
                              viewData?.teamData?.created_at
                            )?.format("DD-MM-YYYY HH:mm A")}
                          </Index.Typography>
                        </Index.Box>

                        <Index.Box className="view-card-data-flex">
                          <Index.Typography className="view-card-data-lable">
                            Team Size :
                          </Index.Typography>
                          <Index.Typography className="view-card-data-value">
                            {viewData?.members?.length}
                          </Index.Typography>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
            <PageIndex.CommonTable
              columns={columns}
              data={viewData?.members}
              actions={actions}
              //   onSearch={handleSearch}
              pagination={{
                currentPage: 1,
                rowsPerPage: 10,
                totalRows: viewData?.members?.length,
                handlePageChange: () => {},
                handleRowsPerPageChange: () => {},
              }}
              moduleName="Member"
            />
          </Index.Box>
        </>
      )}
    </Index.Box>
  );
}
