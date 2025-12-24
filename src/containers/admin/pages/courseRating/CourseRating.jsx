import React, { useEffect, useRef, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  getAllCourses,
  getCourseRatingsService,
} from "../../../../redux/services/AdminService";
const courseRatingOptions = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
];

export default function CourseRating() {
  const navigate = PageIndex.useNavigate();
  const [data, setData] = useState();
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    importBtnLoading: false,
    exportBtnLoading: false,
  });
  const [courses, setCourses] = useState([]);
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
    { key: "rating", label: "Rating", width: "7%" },
    { key: "review", label: "Feedback", limit: 20, width: "10%" },
    { key: "created_at", label: "Rated On", width: "9%", type: "datetime" },
  ];

  const actions = [
    {
      width: "1%",
      label: "View",
      image: PageIndex.Svg.yelloweye,
      onClick: (row) => navigate(`/admin/course-rating/view/${row?.id}`),
    },
  ];

  const fetchData = async (
    searchTerm,
    pageNo,
    dataPerPage,
    tabValue,
    course,
    rating
  ) => {
    setLoading((prev) => ({
      ...prev,
      pageLoading: true,
    }));
    try {
      const data = {
        page: pageNo ?? page,
        limit: dataPerPage ?? rowsPerPage,
        search: searchTerm ?? search,
        course: course ?? firstFilter,
        rating: rating ?? secondFilter,
      };
      const res = await getCourseRatingsService(data);

      setData(res?.data || []);
      setPage(parseInt(res?.meta.page) || 1);
      setTotalCount(parseInt(res?.meta.totalCount) || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading((prev) => ({
        ...prev,
        pageLoading: false,
      }));
    }
  };

  const setIndentRequest = (newData) => {
    // setData(newData || []);
    // setLoading((prev) => ({
    //   ...prev,
    //   pageLoading: false,
    // }));
  };
  const handleExport = async () => {
    setLoading((prev) => ({
      ...prev,
      exportBtnLoading: true,
    }));
    const headers = [
      "S.No.",
      //  "Image",
      "Course Name",
      "Student Name",
      "Student ID",
      "Rating",
      "Feedback",
      "Rated On",
    ];

    try {
      const data = {
        search: search,
        course: firstFilter,
        rating: secondFilter,
        isExport: 1,
      };
      const res = await getCourseRatingsService(data);
      const rowData = res?.data || [];
      const rows = rowData?.map((item, i) => ({
        "S.No.": i + 1 || "-",
        //  ["Image"]: item?.course_thumbnail || "-",
        ["Course Name"]: `${item?.course_title}` || "-",
        ["Student Name"]: item?.user_name || "-",
        ["Student ID"]: item?.user_unique_id || "-",
        Rating: item?.rating || "-",
        Feedback: item?.review || "-",
        ["Rated On"]: Index.moment(item?.created_at).format(
          "MMM D, YYYY h:mm A"
        ),
      }));
      PageIndex.handleCommonExport({
        headers,
        rows,
        nameFile: `Course-Ratings-${Index.moment().unix()}`,
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
    firstFilter,
    secondFilter,
    thirdFilter,
    fourthFilter,
    handleFourthFilter,
    handleThirdFilter,
    handleSecondFilter,
    handleFirstFilter,
    handleSearchChange,
    handlePageChange,
    handleRowsPerPageChange,
    handleResetFilter,
  } = PageIndex.usePaginationHook(fetchData, setIndentRequest);
  const getAllCourseList = () => {
    getAllCourses().then((res) => {
      if (res?.status == 200) {
        setCourses(res?.data);
      }
    });
  };
  useEffect(() => {
    // fetchData();
    getAllCourseList();
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
            Course Rating
          </Index.Typography>
          <Index.Box className="admin-userlist-btn-flex">
            <Index.Box className="admin-input-box filter-input">
              <Index.Box className="admin-form-group">
                <Index.Box className="admin-dropdown-box filter-box">
                  <Index.FormControl className="admin-form-control">
                    <Index.Select
                      className="admin-dropdown-select"
                      value={firstFilter}
                      onChange={(e) => {
                        handleFirstFilter(e.target.value);
                      }}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      MenuProps={{
                        PaperProps: {
                          className: "form-select-field",
                        },
                      }}
                    >
                      <Index.MenuItem value="" className="admin-menuitem">
                        All Course
                      </Index.MenuItem>
                      {courses?.map((option, idx) => (
                        <Index.MenuItem
                          key={idx}
                          value={option.CourseID}
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
                      inputProps={{ "aria-label": "Without label" }}
                      MenuProps={{
                        PaperProps: {
                          className: "form-select-field",
                        },
                      }}
                    >
                      <Index.MenuItem value="" className="admin-menuitem">
                        All Rating
                      </Index.MenuItem>
                      {courseRatingOptions?.map((option, idx) => (
                        <Index.MenuItem
                          key={`rating-${idx}`}
                          value={option.value}
                          className="admin-menuitem"
                        >
                          {option.label}
                        </Index.MenuItem>
                      ))}
                    </Index.Select>
                  </Index.FormControl>
                </Index.Box>
              </Index.Box>
            </Index.Box>
            {/* Search  */}
            <Index.Box className="admin-search-main">
              <Index.Box className="admin-search-box">
                <Index.Box className="admin-form-group">
                  <Index.TextField
                    fullWidth
                    id="fullWidth"
                    className="admin-form-control"
                    placeholder="Search Course Rating"
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
              moduleName="Course Rating"
            />
          )}
        </Index.Box>
      </Index.Box>
    </>
  );
}
