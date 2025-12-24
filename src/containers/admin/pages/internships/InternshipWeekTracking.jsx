import React, { useEffect, useRef, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  getWeekTrackingService,
  getAllInternship,
} from "../../../../redux/services/AdminService";

export default function InternshipWeekTracking() {
  const navigate = PageIndex.useNavigate();
  const [data, setData] = useState();
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    importBtnLoading: false,
    exportBtnLoading: false,
  });

  const [totalCount, setTotalCount] = useState(0);
  const [internship, setInternship] = useState([]);

  const columns = [
    { key: "#", label: "S.No.", width: "4%" },
    {
      key: "course_thumbnail",
      label: "Image",
      limit: 30,
      width: "5%",
      type: "image",
    },
    {
      key: "internship_title",
      label: "Internship Title",
      limit: 30,
      width: "10%",
    },
    { key: "user_name", label: "Student Name", width: "7%" },
    { key: "user_unique_id", label: "Student ID", width: "7%" },
    {
      key: "total_weeks",
      label: "Total Week",
      width: "6%",
      type: "count",
    },
    {
      key: "completed_weeks",
      label: "Completed Week",
      width: "8%",
      type: "count",
    },
    { key: "status", label: "Status", width: "5%" },
    { key: "updated_at", label: "Updated At", width: "11%", type: "datetime" },
  ];

  const actions = [];

  const fetchData = async (searchTerm, pageNo, dataPerPage) => {
    setLoading((prev) => ({
      ...prev,
      pageLoading: true,
    }));

    try {
      const data = {
        page: pageNo ?? page,
        limit: dataPerPage ?? rowsPerPage,
        search: searchTerm ?? search,
        internship_id: secondFilter,
        status: thirdFilter,
      };

      const res = await getWeekTrackingService(data);

      setData(res?.data || []);
      setPage(res?.meta.page);
      setTotalCount(res?.meta.totalCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading((prev) => ({
        ...prev,
        pageLoading: false,
      }));
    }
  };

  const setIndentRequest = (newData) => {};

  const handleExport = async () => {
    setLoading((prev) => ({
      ...prev,
      exportBtnLoading: true,
    }));
    const headers = [
      "S.No.",
      // "Image",
      "Internship Title",
      "Student Name",
      "Student ID",
      "Total Week",
      "Completed Week",
      "Status",
      "Updated At",
    ];

    try {
      const data = {
        search: search,
        internship_id: secondFilter,
        status: thirdFilter,
        isExport: 1,
      };
      const res = await getWeekTrackingService(data);
      const rowData = res?.data || [];
      const rows = rowData.map((item, i) => ({
        "S.No.": i + 1 || "-",
        // Image: item?.course_thumbnail || "-",
        "Internship Title": item?.internship_title || "-",
        "Student Name": item?.user_name || "-",
        "Student ID": item?.user_unique_id || "-",
        "Total Week": item?.total_weeks || "-",
        "Completed Week": item?.completed_weeks || "-",
        Status: item?.status || "-",
        "Updated At": Index.moment(item?.updated_at).format(
          "MMM D, YYYY h:mm A"
        ),
      }));
      PageIndex.handleCommonExport({
        headers,
        rows,
        nameFile: `week-Tracking-${Index.moment().unix()}`,
      });
    } catch (error) {
      console.error("Error exporting user data:", error);
      setLoading((prev) => ({
        ...prev,
        exportBtnLoading: false,
      }));
    } finally {
      setLoading((prev) => ({
        ...prev,
        exportBtnLoading: false,
      }));
    }
  };

  const {
    page,
    rowsPerPage,
    search,
    setPage,
    secondFilter,
    thirdFilter,
    handleThirdFilter,
    handleSecondFilter,
    handleSearchChange,
    handlePageChange,
    handleRowsPerPageChange,
  } = PageIndex.usePaginationHook(fetchData, setIndentRequest);

  useEffect(() => {
    fetchData();
  }, []);
  const getAllInternshipList = () => {
    getAllInternship().then((res) => {
      if (res?.status == 200) {
        setInternship(res?.data);
      }
    });
  };
  useEffect(() => {
    getAllInternshipList();
  }, []);

  return (
    <>
      <Index.Box className="admin-dashboard-content">
        <Index.Box className="admin-page-title-flex admin-page-title-main">
          <Index.Typography
            className="admin-page-title"
            component="h2"
            variant="h2"
          >
            Week Tracking
          </Index.Typography>
          <Index.Box className="admin-userlist-btn-flex">
            <Index.Box className="admin-input-box filter-input">
              <Index.Box className="admin-form-group">
                <Index.Box className="admin-dropdown-box filter-box">
                  <Index.FormControl className="admin-form-control">
                    <Index.Select
                      className="admin-dropdown-select"
                      value={thirdFilter}
                      onChange={(e) => {
                        handleThirdFilter(e.target.value);
                      }}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <span style={{ color: "#aaa" }}>Select Status</span>
                          );
                        }
                        return selected === "In Progress"
                          ? "In Progress"
                          : "Completed";
                      }}
                      inputProps={{ "aria-label": "Without label" }}
                      MenuProps={{
                        PaperProps: {
                          className: "form-select-field",
                        },
                      }}
                    >
                      <Index.MenuItem value="" className="admin-menuitem">
                        All
                      </Index.MenuItem>
                      <Index.MenuItem
                        value="In Progress"
                        className="admin-menuitem"
                      >
                        In Progress
                      </Index.MenuItem>

                      <Index.MenuItem
                        value="Completed"
                        className="admin-menuitem"
                      >
                        Completed
                      </Index.MenuItem>
                    </Index.Select>
                  </Index.FormControl>
                </Index.Box>
              </Index.Box>
            </Index.Box>
            <Index.Box className="admin-input-box filter-input">
              <Index.Box className="admin-form-group">
                <Index.Box className="admin-dropdown-box filter-box">
                  <Index.FormControl className="admin-form-control">
                    <Index.Select
                      className="admin-dropdown-select"
                      value={secondFilter}
                      onChange={(e) => {
                        handleSecondFilter(e.target.value);
                      }}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <span style={{ color: "#aaa" }}>
                              Select Internship
                            </span>
                          ); // Placeholder style
                        }
                        if (selected === "") {
                          return "All";
                        }
                        const selectedOption = internship.find(
                          (i) => i.id === selected
                        );
                        return selectedOption?.Title || "";
                      }}
                      inputProps={{ "aria-label": "Without label" }}
                      MenuProps={{
                        PaperProps: {
                          className: "form-select-field",
                        },
                      }}
                    >
                      {/* Add "All" option */}
                      <Index.MenuItem value="" className="admin-menuitem">
                        All
                      </Index.MenuItem>

                      {internship?.map((option) => (
                        <Index.MenuItem
                          key={option.id}
                          value={option.id}
                          className="admin-menuitem"
                        >
                          {option.Title}
                        </Index.MenuItem>
                      ))}
                    </Index.Select>
                  </Index.FormControl>
                </Index.Box>
              </Index.Box>
            </Index.Box>

            <Index.Box className="admin-search-main">
              <Index.Box className="admin-search-box">
                <Index.Box className="admin-form-group">
                  <Index.TextField
                    fullWidth
                    id="fullWidth"
                    className="admin-form-control"
                    placeholder="Search Week Tracking"
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
            {data?.length > 0 && (
              <Index.Box className="admin-userlist-inner-btn-flex">
                <PageIndex.PrimaryButton
                  className="primary-btn"
                  btnLabel="Export"
                  onClick={handleExport}
                  loading={loading.exportBtnLoading}
                />
              </Index.Box>
            )}
          </Index.Box>
        </Index.Box>

        <Index.Box className="card-border common-card">
          {loading.pageLoading ? (
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
              moduleName="Course Tracking"
            />
          )}
        </Index.Box>
      </Index.Box>
    </>
  );
}
