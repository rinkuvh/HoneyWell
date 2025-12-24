import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  addTeamFeedbackService,
  getAllCourses,
  getTeamListService,
  getAssesmentList,
  addFeedbackAssessment,
  getAllInternshipWeeksService,
  getAllInternship,
} from "../../../../redux/services/AdminService";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useQueryParams } from "../../../../hooks/useQueryParams";
import { imageUrl } from "../../../../config/DataService";
const statusOptions = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
  { label: "Approved", value: "approved" },
];
const AssessmentList = () => {
  const navigate = PageIndex.useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    exportBtnLoading: false,
  });
  const [totalCount, setTotalCount] = useState(0);

  //#region filter
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [internshipOptions, setInternshipOptions] = useState([]);
  const [internshipWeeksOptions, setInternshipWeeksOptions] = useState([]);
  const [assessmentFileModalState, setAssessmentFileModalState] = useState({
    open: false,
    data: null,
  });

  const handleFeedbackOpen = (row) => {
    setFeedbackOpen(true);
    setRowData(row);
  };

  const handleFeedbackClose = (row) => {
    setFeedbackOpen(false);
    setRowData(null);
  };

  const fetchData = async (
    searchTerm,
    pageNo,
    dataPerPage,
    tabValue,
    course,
    status
  ) => {
    setLoading((prev) => ({
      ...prev,
      pageLoading: true,
    }));
    try {
      const data = {
        page: parseInt(queryData.page) || 1,
        limit: parseInt(queryData.limit) || 10,
        search: queryData.search || "",
        status: queryData.status || "",
        internshipId: queryData.internship || "",
        weekId: queryData.week || "",
      };
      const res = await getAssesmentList(data);

      setData(res?.data || []);
      // setPage(res?.pagination.page);
      setTotalCount(res?.pagination.total);
    } catch (error) {
      console.error("Error fetching team data:", error);
    } finally {
      setLoading((prev) => ({
        ...prev,
        pageLoading: false,
      }));
    }
  };

  const {
    query,
    updateQueryParams,
    handleResetQueryParams,
    handlePageChange,
    handleRowsPerPageChange,
  } = useQueryParams(fetchData);

  const queryData = {
    page: parseInt(query.page) || 1,
    limit: parseInt(query.limit) || 10,
    search: query.search || "",
    internship: query.internship || "",
    status: query.status || "",
    week: query.week || "",
  };

  const [searchInput, setSearchInput] = useState(queryData.search || "");
  const [isSearch, setIsSearch] = useState(false);

  const columns = [
    { key: "#", label: "S.No.", width: "5%" },
    { key: "internship.title", label: "Intership Title", width: "15%" },
    { key: "week.title", label: "Week Title", width: "15%" },
    { key: "user.name", label: "User name", width: "15%" },
    {
      key: "Status",
      label: "Status",
      width: "15%",
      render: (row) =>
        row?.Status?.charAt(0).toUpperCase() + row?.Status?.slice(1),
    },
    { key: "created_at", label: "Created At", width: "15%", type: "datetime" },
  ];

  const setIndentRequest = (newData) => {
    // setData(newData || []);
    // setLoading((prev) => ({
    //   ...prev,
    //   pageLoading: false,
    // }));
  };

  const handleFilterChange = (filterKey, value) => {
    updateQueryParams({ [filterKey]: value, page: 1 });
  };

  const getAllCourseList = () => {
    getAllCourses().then((res) => {
      if (res?.status == 200) {
        setCourses(res?.data);
      }
    });
  };

  const handleExport = async () => {
    setLoading((prev) => ({
      ...prev,
      exportBtnLoading: true,
    }));
    const headers = [
      "S. No.",
      "Internship Assessment ID",
      "Internship Title",
      "Week Title",
      "User ID",
      "User Name",
      "Email ID",
      "Phone Number",
      "Document Link",
      "Status",
      "Description",
      "Created At",
    ];

    try {
       const data = {
        search: queryData.search || "",
        status: queryData.status || "",
        internshipId: queryData.internship || "",
        weekId: queryData.week || "",
        isExport: 1
      };
      const res = await getAssesmentList(data);

      const rowData = res?.data || [];

      const rows = rowData?.map((item, i) =>{
          const html = item?.userDescription || "";
          const plainText = html.replace(/<[^>]*>/g, '');

         const documents = item?.file && item?.file.length > 0
        ? item?.file.map((document, index) => {
            const url = `${imageUrl}${document}`;
            return url;
          }).join(", ")
        : "-";
          return {
            ID: i + 1 || "-",
            ["Internship Assessment ID"]: item?.id || "-",
            ["Internship Title"]: item?.internship?.title || "-",
            ["Week Title"]: `${item?.week?.title}` || "-",
            ["User Id"]: item?.user?.unique_id || "-",
            ["User Name"]: item?.user?.name || "-",
            ["Email ID"]: item?.user?.email || "-",
            ["Phone Number"]: item?.user?.contactNumber || "-",
            ["Document Link"]: documents|| "-",
            ["Status"]: item?.Status || "-",
            ["Description"]: plainText || "-",
            ["Created At"]: Index.moment(item?.created_at).format(
              "MMM D, YYYY h:mm A"
            ),
        }
      });
      PageIndex.handleCommonExport({
        headers,
        rows,
        nameFile: `Internship-assessment-${Index.moment().unix()}`,
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
  // const {
  //   page,
  //   rowsPerPage,
  //   search,
  //   setPage,
  //   handleSearchChange,
  //   handlePageChange,
  //   handleRowsPerPageChange,
  //   firstFilter,
  //   handleFirstFilter,
  //   secondFilter,
  //   handleSecondFilter,
  // } = PageIndex.usePaginationHook(fetchData, setIndentRequest);

  useEffect(() => {
    fetchData();
    getAllCourseList();
  }, []);

  const actions = [
    {
      width: "10%",
      label: "Feedback",
      image: PageIndex.Svg.feedbackIcon,
      isHidden: (row) => row?.Status == "approved",
      onClick: (row) => handleFeedbackOpen(row),
    },
    {
      width: "10%",
      label: "View",
      image: PageIndex.Svg.yelloweye,
      onClick: (row) => navigate(`/admin/view-assessment/${row?.id}`),
    },
  ];

  const getAllInternshipCourse = async () => {
    const res = await getAllInternship();
    if (res?.status == 200) {
      setInternshipOptions(
        res?.data?.length
          ? res?.data?.map((internship) => ({
              id: internship.id,
              name: internship.Title,
            }))
          : []
      );
    }
  };
  const getAllInternshipWeeks = async (id) => {
    const resp = await getAllInternshipWeeksService(id);
    if (resp?.status == 200) {
      setInternshipWeeksOptions(resp?.data || []);
    }
  };

  const filters = [
    {
      type: "dropdown",
      name: "internshipTitle",
      label: "Internship Title",
      value: query.internship || "",
      options: internshipOptions,
      handleFilter: (value) => {
        updateQueryParams({ internship: value, week: "", page: 1 });
      },
    },
    {
      type: "dropdown",
      name: "weekTitle",
      label: "Week Title",
      value: query.week || "",
      options: internshipWeeksOptions,
      disable: !queryData.internship,
      handleFilter: (value) => {
        updateQueryParams({ week: value, page: 1 });
      },
    },
  ];

  useEffect(() => {
    if (query.internship) {
      getAllInternshipWeeks(query.internship);
    }
  }, [query.internship]);

  useEffect(() => {
    let delayDebounce;
    if (isSearch) {
      delayDebounce = setTimeout(() => {
        updateQueryParams({ search: searchInput, page: 1 });
      }, 800);
    }

    return () => clearTimeout(delayDebounce);
  }, [searchInput, isSearch]);

  useEffect(() => {
    // fetchData();
    getAllInternshipCourse();
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <Index.Box className="admin-dashboard-content">
      <Index.Box className="admin-page-title-flex admin-page-title-main">
        <Index.Typography
          className="admin-page-title"
          component="h2"
          variant="h2"
        >
          Internship Assessment List
        </Index.Typography>
        <Index.Box className="admin-userlist-btn-flex">
          <Index.Box className="admin-input-box filter-input">
            <Index.Box className="admin-form-group">
              <Index.Box className="admin-dropdown-box filter-box">
                <Index.FormControl className="admin-form-control">
                  <Index.Select
                    className="admin-dropdown-select"
                    value={queryData.status || ""}
                    onChange={(e) => {
                      // handleSecondFilter(e.target.value);
                      handleFilterChange("status", e.target.value);
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    MenuProps={{
                      PaperProps: {
                        className: "form-select-field",
                      },
                    }}
                  >
                    {statusOptions?.map((option) => (
                      <Index.MenuItem
                        key={option.value}
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
          <Index.Box className="admin-search-main">
            <Index.Box className="admin-search-box">
              <Index.Box className="admin-form-group">
                <Index.TextField
                  fullWidth
                  id="fullWidth"
                  className="admin-form-control"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    setIsSearch(true);
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
          {/* Export Button */}
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

          {/* Filter drawer */}
          <Index.Box className="admin-filter-main">
            {["right"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Index.Box className="admin-filter-btn-main border-btn-main">
                  <Index.Button
                    className="admin-filter-btn border-btn"
                    onClick={toggleDrawer(anchor, true)}
                  >
                    <img
                      src={PageIndex.Svg.filterIcon}
                      className="admin-down-icon admin-icon"
                      alt="download icon"
                    />
                    Filter
                  </Index.Button>
                </Index.Box>
                <PageIndex.CommonFilterDrawer
                  state={state}
                  toggleDrawer={toggleDrawer}
                  filters={filters}
                  handleResetFilter={() => {
                    setSearchInput("");
                    setIsSearch(false);
                    handleResetQueryParams();
                  }}
                  anchor={anchor}
                  filterName="Internship Assessment Filter"
                />
              </React.Fragment>
            ))}
          </Index.Box>
        </Index.Box>
      </Index.Box>

      <Index.Box className="card-border common-card">
        {loading?.pageLoading ? (
          <PageIndex.PageLoader />
        ) : (
          <PageIndex.CommonTable
            columns={columns}
            data={data}
            actions={actions}
            pagination={{
              currentPage: queryData.page,
              rowsPerPage: queryData.limit,
              totalRows: totalCount,
              handlePageChange: handlePageChange,
              handleRowsPerPageChange: handleRowsPerPageChange,
            }}
            moduleName="Internship Team"
          />
        )}
      </Index.Box>
      {feedbackOpen && (
        <FeedbackModal
          open={feedbackOpen}
          handleClose={handleFeedbackClose}
          data={rowData}
          fetchData={fetchData}
        />
      )}
    </Index.Box>
  );
};

const FeedbackModal = ({ open, handleClose, data, fetchData }) => {
  console.log("dtaaaaaaaaaaa", data);
  const [secondFilter, setSecondFilter] = useState("");
  useEffect(() => {
    if (data?.Status?.toLowerCase() === "approved") setSecondFilter(1);
    else if (data?.Status?.toLowerCase() === "rejected") setSecondFilter(0);
    else setSecondFilter("");
  }, [data]);
  const statusOptions = [
    { label: "Rejected", value: "rejected" },
    { label: "Approved", value: "approved" },
  ];
  const handleSubmitFeedback = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        id: data?.id,
        description: values?.feedback,
        status: values?.status,
        email : data?.user?.email,
        weekId : data?.week?.id
      };
      const response = await addFeedbackAssessment(payload);
      if (response?.status === 200) {
        fetchData();
        handleClose();
        resetForm();
      } else {
        setSubmitting(false);
      }
    } catch (error) {
      setSubmitting(false);
    }
  };

  const teamFeedbackSchema = PageIndex.Yup.object().shape({
    status: PageIndex.Yup.string().required("Please select status"),
    feedback: PageIndex.Yup.string().required("Please enter feedback"),
  });

  const formik = Index.useFormik({
    initialValues: {
      feedback: "",
      status: data?.Status && data?.Status !== "pending" ? data?.Status : "",
    },
    validationSchema: teamFeedbackSchema,
    onSubmit: handleSubmitFeedback,
  });

  // Export 
  const handleExport = async () => {
      setLoading((prev) => ({
        ...prev,
        exportBtnLoading: true,
      }));
      let headers = [
        "S. No.",
        "Team ID",
        "Team Name",
        "Internship",
        "Team Admin",
      ];
  
      try {
        const data = {
          search: search,
          hackathon: firstFilter,
          status: secondFilter,
          isExport: 1,
        };
        const res = await exportTeamListService(data);
        const rowData = res?.data || [];
        const maxTeams = res?.meta?.maxTeams;
        for (let i = 1; i <= maxTeams; i++) {
          headers.push(`Team Member ${i}`);
        }
  
        headers.push("Document Status", "Documents", "Created At");
        const rows = rowData?.map((item, i) => {
          let teamAdmin = [
            item?.created_by_name || "",
            item?.created_by_uid ? `(${item?.created_by_uid})` : "",
          ]
            ?.join(" ")
            ?.trim();
          let dataObj = {
            ID: i + 1 || "-",
            ["Team ID"]: item?.team_unique_id || "-",
            ["Team Name"]: `${item?.team_name}` || "-",
            Internship: item?.hackathon_name || "-",
            ["Team Admin"]: teamAdmin || "-",
          };
          let members = item.members?.filter(
            (user) => user.user_unique_id != item?.created_by_uid
          );
  
          for (let i = 0; i < maxTeams; i++) {
            // headers.push(`Team Member ${i}`)
            let formatMember = members[i]
              ? `${members[i].name} (${members[i].user_unique_id})`
              : "-";
            dataObj[`Team Member ${i}`] = formatMember;
          }
          dataObj["Document Status"] = item?.is_doc || "-";
          if (item?.is_doc == "Submitted") {
            dataObj["Documents"] =
              item?.documents
                ?.map((doc) => `${imageUrl}${doc?.file}`)
                ?.join(", ") || "-";
          } else {
            dataObj["Documents"] = "-";
          }
          dataObj["Created At"] = Index.moment(item?.created_at).format(
            "MMM D, YYYY h:mm A"
          );
          return dataObj;
        });
        PageIndex.handleCommonExport({
          headers,
          rows,
          nameFile: `Internship-teams-${Index.moment().unix()}`,
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

  return (
    <>
      <Index.Modal
        aria-labelledby="modal-modal-title"
        open={open}
        onClose={handleClose}
        aria-describedby="modal-modal-description"
        className="admin-modal rating-modal team-feedback-modal"
      >
        <Index.Box
          sx={PageIndex.style}
          className="admin-modal-inner admin-delete-modal-inner-main team-feedback-inner-main"
        >
          <form onSubmit={formik?.handleSubmit}>
            <Index.Box className="admin-modal-body">
              <Index.Typography
                className="admin-delete-modal-title custom-modal-title"
                variant="body1"
              >
                Give feedback Assessment{" "}
                <span className="highlighted-text">{data?.team_name}</span>
              </Index.Typography>
              <Index.Box className="review-box">
                <Index.Box className="admin-input-box filter-input">
                  <Index.Typography className="review-label" variant="h5">
                    Status:
                  </Index.Typography>
                  <Index.Box className="admin-form-group">
                    <Index.Box className="admin-dropdown-box filter-box">
                      <Index.FormControl className="admin-form-control">
                        <Index.Select
                          className="admin-dropdown-select"
                          name="status"
                          value={formik.values.status}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          MenuProps={{
                            PaperProps: {
                              className: "form-select-field",
                            },
                          }}
                          renderValue={(value) => {
                            if (!value) {
                              return "Select Status";
                            }
                            return <>{value}</>;
                          }}
                        >
                          {statusOptions?.map((option) => (
                            <Index.MenuItem
                              key={option.value}
                              value={option.value}
                              className="admin-menuitem"
                              disabled={option.disabled}
                            >
                              {option.label}
                            </Index.MenuItem>
                          ))}
                        </Index.Select>
                      </Index.FormControl>
                    </Index.Box>
                  </Index.Box>
                  <Index.FormHelperText error className="admin-form-lable">
                    {formik?.touched?.status && formik?.errors?.status}
                  </Index.FormHelperText>
                </Index.Box>

                <Index.Box className="admin-form-group course-ckeditor-box">
                  <Index.Typography className="review-label" variant="h5">
                    Leave a feedback :
                  </Index.Typography>
                  <CKEditor
                    config={{
                      licenseKey: "GPL",
                      placeholder: "Please enter feedback",
                      toolbar: [
                        "undo",
                        "redo",
                        "|",
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "link",
                        "|",
                        "bulletedList",
                        "numberedList",
                        "|",
                      ],
                    }}
                    editor={ClassicEditor}
                    name="description"
                    contenteditable="true"
                    className=""
                    data={formik?.values?.feedback}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      formik?.setFieldValue("feedback", data);
                    }}
                    onBlur={formik.handleBlur}
                  />
                  <Index.FormHelperText error className="admin-form-lable">
                    {formik?.touched?.feedback && formik?.errors?.feedback}
                  </Index.FormHelperText>
                </Index.Box>
              </Index.Box>

              <Index.Box className="admin-delete-modal-btn-flex border-btn-main btn-main">
                <PageIndex.BorderButton
                  className="admin-modal-cancel-btn border-btn"
                  btnLabel="Cancel"
                  onClick={handleClose}
                  disabled={formik?.isSubmitting}
                />
                <PageIndex.PrimaryButton
                  className="primary-btn"
                  btnLabel="Submit"
                  type="submit"
                  loading={formik?.isSubmitting}
                />
              </Index.Box>
            </Index.Box>
          </form>
        </Index.Box>
      </Index.Modal>
    </>
  );
};

export default AssessmentList;
