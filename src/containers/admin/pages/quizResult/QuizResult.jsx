import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { getAllQuizResults } from "../../../../redux/services/AdminService";

export default function QuizResult() {
  const navigate = PageIndex.useNavigate();
  const [data, setData] = useState();
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
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
    { key: "score", label: "Score", width: "6%" },
    { key: "result", label: "Result", width: "6%" },
    {
      key: "quiz_date",
      label: "Quiz Date & Time",
      width: "9%",
      type: "datetime",
    },
  ];

  const actions = [
    {
      width: "1%",
      label: "View",
      image: PageIndex.Svg.yelloweye,
      onClick: (row) => navigate(`/admin/quiz-result/view/${row?.id}`),
    },
  ];

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
      const res = await getAllQuizResults(data);

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
      "Course Name",
      "Student Name",
      "Student ID",
      "Score",
      "Result",
      "Quiz Date & Time",
    ];

    try {
      const data = {
        search: search,
        course: firstFilter,
        status: secondFilter,
        isExport: 1,
      };
      const res = await getAllQuizResults(data);
      const rowData = res?.data || [];
      const rows = rowData?.map((item, i) => ({
        "S.No.": i + 1 || "-",
        // ["Image"]: item?.course_thumbnail || "-",
        ["Course Name"]: `${item?.course_title}` || "-",
        ["Student Name"]: item?.user_name || "-",
        ["Student ID"]: item?.user_unique_id || "-",
        Score: item?.score || "-",
        Result: item?.result || "-",
        ["Quiz Date & Time"]: Index.moment(item?.quiz_date).format(
          "MMM D, YYYY h:mm A"
        ),
      }));
      PageIndex.handleCommonExport({
        headers,
        rows,
        nameFile: `Quiz-results-${Index.moment().unix()}`,
      });
    } catch (error) {
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
    firstFilter,
    secondFilter,
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
            Quiz Result List
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
                    placeholder="Search Quiz Result"
                    onChange={(e) => {
                      // setSearchValue(e.target.value);
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
              moduleName="Quiz Result"
            />
          )}
        </Index.Box>
      </Index.Box>
    </>
  );
}
