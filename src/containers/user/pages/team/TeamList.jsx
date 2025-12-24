import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { getTeamListService } from "../../../../redux/services/UserService";

const TeamList = () => {
  const navigate = PageIndex.useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const columns = [
    { key: "#", label: "S.No.", width: "5%" },
    { key: "team_unique_id", label: "Team ID", width: "10%" },
    { key: "team_name", label: "Team Name", width: "15%" },
    { key: "hackathon_name", label: "Internship Name", width: "15%" },
    { key: "created_by_name", label: "Team Admin", width: "15%" },
    { key: "is_doc", label: "Document Status", width: "15%", type: "documentStatus" },
    { key: "created_at", label: "Created At", width: "15%", type: "datetime" },
  ];

  const fetchData = async (searchTerm, pageNo, dataPerPage) => {
    setLoading(true);
    try {
      const data = {
        page: pageNo ?? page,
        limit: dataPerPage ?? rowsPerPage,
        search: searchTerm ?? search,
      };
      const res = await getTeamListService(data);

      setData(res?.data || []);
      setPage(res?.meta.page);
      setTotalCount(res?.meta.totalRecords);
    } catch (error) {
      console.error("Error fetching team data:", error);
    } finally {
      setLoading(false);
    }
  };

  const setIndentRequest = (newData) => {
    // setData(newData || []);
    // setLoading((prev) => ({
    //   ...prev,
    //   pageLoading: false,
    // }));
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

  useEffect(() => {
    fetchData();
  }, []);

  const actions = [
    {
      width: "10%",
      label: "Upload Document",
      image: PageIndex.Png.arrow,
      onClick: (row) => navigate(`/user/team-upload-doc/${row?.team_id}`),
    },
    {
      width: "10%",
      label: "View",
      image: PageIndex.Svg.yelloweye,
      onClick: (row) => navigate(`/user/team-detail/${row?.team_id}`),
    },
  ];

  return (
    <Index.Box className="container">
      <Index.Box className="admin-dashboard-content">
        <Index.Box className="admin-page-title-flex admin-page-title-main btm-border">
          <Index.Typography
            className="admin-page-title"
            component="h2"
            variant="h2"
            sx={{ color: "#109cc7 !important" }}
          >
            Team List
          </Index.Typography>
          <Index.Box className="admin-userlist-btn-flex">
            <Index.Box className="admin-search-main">
              <Index.Box className="admin-search-box">
                <Index.Box className="admin-form-group">
                  <Index.TextField
                    fullWidth
                    id="fullWidth"
                    className="admin-form-control"
                    placeholder="Search Team"
                    onChange={(e) => {
                      handleSearchChange(e);
                    }}
                  />
                  <img
                    src={PageIndex.Svg.searchIcon}
                    className="admin-search-grey-img admin-icon"
                    alt="search"
                  />
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>

        <Index.Box className="hackathon-detail-view">
          <Index.Box className="card-border common-card">
            {loading ? (
              <PageIndex.PageLoader />
            ) : (
              <PageIndex.CommonTable
                columns={columns}
                data={data}
                actions={actions}
                pagination={{
                  currentPage: page,
                  rowsPerPage: rowsPerPage,
                  totalRows: totalCount,
                  handlePageChange: handlePageChange,
                  handleRowsPerPageChange: handleRowsPerPageChange,
                }}
                moduleName="Teams"
              />
            )}
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
};

export default TeamList;
