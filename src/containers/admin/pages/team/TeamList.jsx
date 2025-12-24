import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  addTeamFeedbackService,
  deleteUserWiseTeamByAdmin,
  exportTeamListService,
  getAllHackathonList,
  getTeamListService,
  updateTeamDataAdminService,
} from "../../../../redux/services/AdminService";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { imageUrl } from "../../../../config/DataService";
const statusOptions = [
  { label: "All", value: "" },
  { label: "Submitted", value: "Submitted" },
  { label: "Pending", value: "Pending" },
];
const TeamList = () => {
  const navigate = PageIndex.useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    exportBtnLoading: false,
  });
  const [totalCount, setTotalCount] = useState(0);

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [teamUpdateOpen, setTeamUpdateOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [hackathonList, setHackathonList] = useState([]);
  const handleFeedbackOpen = (row) => {
    setFeedbackOpen(true);
    setRowData(row);
  };

  const handleFeedbackClose = (row) => {
    setFeedbackOpen(false);
    setRowData(null);
  };
  const handleTeamUpdateOpen = (row) => {
    setTeamUpdateOpen(true);
    setRowData(row);
  };

  const handleTeamUpdateClose = (row) => {
    setTeamUpdateOpen(false);
    setRowData(null);
  };

  const columns = [
    { key: "#", label: "S.No.", width: "5%" },
    { key: "team_unique_id", label: "Team ID", width: "10%" },
    { key: "team_name", label: "Team Name", width: "15%" },
    { key: "course_title", label: "Course", width: "15%", limit: 30 },
    { key: "hackathon_name", label: "Internship", width: "15%" },
    { key: "created_by_name", label: "Team Admin", width: "15%" },
    { key: "is_doc", label: "Document Status", width: "15%" },
    { key: "created_at", label: "Created At", width: "15%", type: "datetime" },
  ];

  const fetchData = async (
    searchTerm,
    pageNo,
    dataPerPage,
    tabValue,
    hackathon,
    status
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
        hackathon: hackathon ?? firstFilter,
        status: status ?? secondFilter,
      };
      const res = await getTeamListService(data);

      setData(res?.data || []);
      setPage(res?.meta.page);
      setTotalCount(res?.meta.totalRecords);
    } catch (error) {
      console.error("Error fetching team data:", error);
    } finally {
      setLoading((prev) => ({
        ...prev,
        pageLoading: false,
      }));
    }
  };
  console.log("datata", data);
  const setIndentRequest = (newData) => {};
  const fetchHackathonList = () => {
    getAllHackathonList().then((res) => {
      if (res?.status == 200) {
        setHackathonList(res?.data);
      }
    });
  };

  const formatDateTime = (date) => {
    console.log("datatatatattatatatata");
    if (!date) return "";
    return Index.moment(date).add(8, "hours").format("MMM D, YYYY h:mm A");
  };

  const handleExport = async () => {
    setLoading((prev) => ({
      ...prev,
      exportBtnLoading: true,
    }));
    let headers = [
      "S. No.",
      "Team ID",
      "Team Name",
      "Course",
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
      // const res = await getTeamListService(data);
      const rowData = res?.data || [];
      const maxTeams = res?.meta?.maxTeams;
      for (let i = 1; i <= maxTeams; i++) {
        headers.push(`Team Member ${i}`);
      }

      // console.log(
      //   "rowData",
      //   rowData?.map((item, i) =>
      //     Index.moment(item?.created_at)
      //       .subtract(1, 'hours')
      //       .subtract(30, 'minutes')
      //       .format("MMM D, YYYY h:mm A")
      //   )
      // );

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
          ["Course"]: `${item?.course_title}` || "-",
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
        dataObj["Created At"] =
          Index.moment(item?.created_at)
            .subtract(1, "hours")
            .subtract(30, "minutes")
            .format("MMM D, YYYY h:mm A") || null;
        //  dataObj["Created At"] = formatDateTime(item?.created_at || null)
        // dataObj["Created At"] = Index.moment(item?.created_at).format(
        //   "MMM D, YYYY h:mm A"
        // );
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

  const {
    page,
    rowsPerPage,
    search,
    setPage,
    handleSearchChange,
    handlePageChange,
    handleRowsPerPageChange,
    firstFilter,
    handleFirstFilter,
    secondFilter,
    handleSecondFilter,
  } = PageIndex.usePaginationHook(fetchData, setIndentRequest);

  useEffect(() => {
    fetchData();
    fetchHackathonList();
  }, []);

  const actions = [
    {
      width: "10%",
      label: "Feedback",
      image: PageIndex.Svg.feedbackIcon,
      isHidden: (row) =>
        row?.is_doc !== "Submitted" ||
        (row?.is_doc === "Submitted" && row?.feedback_given == 1),
      onClick: (row) => handleFeedbackOpen(row),
    },
    {
      width: "10%",
      label: "View",
      image: PageIndex.Svg.yelloweye,
      onClick: (row) => navigate(`/admin/view-team/${row?.team_id}`),
    },
    {
      label: "Edit",
      image: PageIndex.Svg.editIcon,
      requiredPermission: "user_edit",
      onClick: (row) => handleTeamUpdateOpen(row),
    },
    {
      label: "Delete",
      image: PageIndex.Svg.trash,
      // requiredPermission: "user_delete",
      onClick: (row) => handleOpenDelete(row),
      width: "5%",
    },
  ];

  const [deleteState, setDeleteState] = React.useState({
    openDelete: false,
    selectedRow: null,
  });

  const handleOpenDelete = (row) => {
    setDeleteState({ openDelete: true, selectedRow: row });
  };

  const handleCloseDelete = () => {
    setDeleteState({ openDelete: false, selectedRow: null });
  };

  const handleDeleteRecord = async () => {
    setLoading((prev) => ({
      ...prev,
      btnLoading: true,
    }));
    try {
      // console.log("deleteState",deleteState)
      await deleteUserWiseTeamByAdmin({
        team_id: deleteState?.selectedRow?.team_id,
      });
      setDeleteState({ openDelete: false, selectedRow: null });
      setLoading((prev) => ({
        ...prev,
        btnLoading: false,
      }));

      fetchData();
    } catch (err) {
      console.log(err);
      setDeleteState({ openDelete: false, selectedRow: null });
    } finally {
      setLoading((prev) => ({
        ...prev,
        btnLoading: false,
      }));
    }
  };

  return (
    <Index.Box className="admin-dashboard-content">
      <Index.Box className="admin-page-title-flex admin-page-title-main">
        <Index.Typography
          className="admin-page-title"
          component="h2"
          variant="h2"
        >
          Internship Team
        </Index.Typography>
        <Index.Box className="admin-userlist-btn-flex">
          <Index.Box className="admin-input-box filter-input">
            <Index.Box className="admin-form-group">
              <Index.Box className="admin-dropdown-box filter-box">
                <Index.FormControl className="admin-form-control">
                  <Index.Select
                    className="admin-dropdown-select admin-next"
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
                      All Internship
                    </Index.MenuItem>
                    {hackathonList?.map((option, idx) => (
                      <Index.MenuItem
                        key={idx}
                        value={option.id}
                        className="admin-menuitem"
                      >
                        {option.title}
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
                  placeholder="Search Internship Team"
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
        {loading?.pageLoading ? (
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
      <UpdateTeamModal
        open={teamUpdateOpen}
        handleClose={handleTeamUpdateClose}
        data={rowData}
        fetchData={fetchData}
      />

      <PageIndex.ConfirmationModal
        open={deleteState.openDelete}
        handleClose={handleCloseDelete}
        handleSubmit={handleDeleteRecord}
        loading={loading.btnLoading}
        description="Are you sure you want to delete this team? This action can't be undone."
      />
    </Index.Box>
  );
};

const FeedbackModal = ({ open, handleClose, data, fetchData }) => {
  const handleSubmitFeedback = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        teamId: data?.team_id,
        feedback: values?.feedback,
      };
      const response = await addTeamFeedbackService(payload);
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
    feedback: PageIndex.Yup.string().required("Please enter feedback"),
  });

  const formik = Index.useFormik({
    initialValues: { feedback: "" },
    validationSchema: teamFeedbackSchema,
    onSubmit: handleSubmitFeedback,
  });

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
                Give feedback for team{" "}
                <span className="highlighted-text">{data?.team_name}</span>
              </Index.Typography>
              <Index.Box className="review-box">
                <Index.Typography className="review-label" variant="h5">
                  Leave a feedback :
                </Index.Typography>
                <Index.Box className="admin-form-group course-ckeditor-box">
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
const UpdateTeamModal = ({ open, handleClose, data, fetchData }) => {
  console.log("datatatata", data);

  const teamTeamUpdateSchema = PageIndex.Yup.object().shape({
    teamName: PageIndex.Yup.string().required("Please enter team name"),
  });

  const handleSubmitFeedback = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        teamId: data?.team_id,
        teamName: values?.teamName,
      };
      const response = await updateTeamDataAdminService(payload);
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

  const formik = Index.useFormik({
    initialValues: { teamName: data ? data?.team_name : "" },
    enableReinitialize: true,
    validationSchema: teamTeamUpdateSchema,
    onSubmit: handleSubmitFeedback,
  });

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
                Update Name for team{" "}
                {/* <span className="highlighted-text">{data?.team_name}</span> */}
              </Index.Typography>
              {console.log("formik.values", formik.values)}
              <Index.Box
                gridColumn={{
                  xs: "span 12",
                  sm: "span 6",
                  md: "span 6",
                  lg: "span 6",
                }}
                className="grid-column"
              >
                <Index.Box className="add-page-form-main">
                  <Index.Box className="admin-input-box">
                    <Index.FormHelperText className="admin-form-lable">
                      Team Name
                      <span className="sign-required">* </span>
                    </Index.FormHelperText>
                    <Index.Box className="admin-form-group">
                      <Index.TextField
                        fullWidth
                        id="fullWidth"
                        className="admin-form-control"
                        placeholder="Enter Team Name"
                        onBlur={formik?.handleBlur}
                        value={formik?.values?.teamName}
                        onChange={(e) => {
                          const value = e.target.value;
                          const testRegex = /^(?!\s)[A-Za-z\s]+$/;
                          if (testRegex.test(value) || value == "") {
                            formik.setFieldValue(
                              "teamName",
                              value.replace(/\s+/g, " ")
                            );
                          }
                        }}
                        autoComplete="off"
                        name="teamName"
                      />
                      <Index.FormHelperText error className="admin-form-lable">
                        {formik?.touched?.teamName && formik?.errors?.teamName}
                      </Index.FormHelperText>
                    </Index.Box>
                  </Index.Box>
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
                  btnLabel="Update"
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

export default TeamList;
