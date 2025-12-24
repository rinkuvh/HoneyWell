import React, { useEffect, useRef, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { getCourseTrackingService } from "../../../../redux/services/AdminService";

export default function CourseTracking() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    importBtnLoading: false,
    exportBtnLoading: false,
  });

  const [totalCount, setTotalCount] = useState(0);

  const columns = [
    { key: "#", label: "S.No.", width: "4%" },
    {
      key: "course_thumbnail",
      label: "Image",
      limit: 30,
      width: "5%",
      type: "image",
    },
    { key: "course_title", label: "Course Name", limit: 30, width: "10%" },
    { key: "user_name", label: "Student Name", width: "7%" },
    { key: "user_unique_id", label: "Student ID", width: "7%" },
    {
      key: "total_topic_count",
      label: "Total Topics",
      width: "6%",
      type: "count",
    },
    {
      key: "total_completed_topic_count",
      label: "Completed Topics",
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
      };
      const res = await getCourseTrackingService(data);

      setData(res?.data || []);
      setPage(parseInt(res?.meta.page));
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
      "Course Name",
      "Student Name",
      "Student ID",
      "Total Topics",
      "Completed Topics",
      "Status",
      "Updated At",
    ];

    try {
      const data = {
        search: search,
        isExport: 1,
      };
      const res = await getCourseTrackingService(data);
      const rowData = res?.data || [];
      const rows = rowData?.map((item, i) => ({
        "S.No.": i + 1 || "-",
        // ["Image"]: item?.course_thumbnail || "-",
        ["Course Name"]: `${item?.course_title}` || "-",
        ["Student Name"]: item?.user_name || "-",
        ["Student ID"]: item?.user_unique_id || "-",
        ["Total Topics"]: item?.total_topic_count || "-",
        ["Completed Topics"]: item?.total_completed_topic_count || "-",
        Status: item?.status || "-",
        ["Updated At"]: Index.moment(item?.updated_at).format(
          "MMM D, YYYY h:mm A"
        ),
      }));
      PageIndex.handleCommonExport({
        headers,
        rows,
        nameFile: `Course-Tracking-${Index.moment().unix()}`,
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
    handleSearchChange,
    handlePageChange,
    handleRowsPerPageChange,
  } = PageIndex.usePaginationHook(fetchData, setIndentRequest);
/* 
  useEffect(() => {
    fetchData();
  }, []);
 */

  return (
    <>
      <Index.Box className="admin-dashboard-content">
        <Index.Box className="admin-page-title-flex admin-page-title-main">
          <Index.Typography
            className="admin-page-title"
            component="h2"
            variant="h2"
          >
            Course Tracking
          </Index.Typography>
          <Index.Box className="admin-userlist-btn-flex">
            {/* Search  */}
            <Index.Box className="admin-search-main">
              <Index.Box className="admin-search-box">
                <Index.Box className="admin-form-group">
                  <Index.TextField
                    fullWidth
                    id="fullWidth"
                    className="admin-form-control"
                    placeholder="Search Course Tracking"
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
