import React, { useEffect, useRef, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  activeDeactiveUserService,
  addBulkStudentService,
  deleteUserService,
  getAllDistrictServices,
  getAllTalukaServices,
  getAllUserService,
} from "../../../../redux/services/AdminService";
import moment from "moment";
import { useFormik } from "formik";
import * as yup from "yup";
import { downloadExcel } from "../../../../components/common/common";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
const pwdOption = [
  { id: 1, label: "Yes", value: "1" },
  { id: 2, label: "No", value: "0" },
];
const instituteTypeOptions = [
  { label: "Private", value: "Private" },
  { label: "Government", value: "Government" },
  { label: "Other", value: "Other" },
];

export default function UserRegistratonList() {
  const navigate = PageIndex.useNavigate();
  const fileInputRef = useRef();
  // const [country, setCountry] = useState([]);
  const [districtListData, setDistrictListData] = useState([]);

  const [talukaList, setTalukaList] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    importBtnLoading: false,
    exportBtnLoading: false,
  });

  const [totalCount, setTotalCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [pwdFilter, setPwdFilter] = useState("");
  const [dateRangeFiler, setDateRangeFiler] = useState([null, null]);
  const [dateRangeClear, setDateRangeClear] = useState(false);
  const [deleteState, setDeleteState] = React.useState({
    openDelete: false,
    selectedRow: null,
  });
  const [openImportModal, setOpenImportModal] = useState(false);

  const handleOpenDelete = (row) => {
    setDeleteState({ openDelete: true, selectedRow: row });
  };

  const handleCloseDelete = () => {
    setDeleteState({ openDelete: false, selectedRow: null });
  };
  const handleOpenImportModal = () => {
    setOpenImportModal(true);
  };
  const handleCloseImportModal = () => {
    setOpenImportModal(false);
  };
  const handleDeleteRecord = async () => {
    setLoading((prev) => ({
      ...prev,
      btnLoading: true,
    }));

    try {
      const res = await deleteUserService({
        id: deleteState.selectedRow?.id,
      });

      if (res?.status === 200) {
        if (data?.length === 1 && page > 1) {
          setPage(page - 1);
          fetchData(search, page - 1, rowsPerPage);
        } else {
          fetchData();
        }
        handleCloseDelete();
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    } finally {
      setLoading((prev) => ({
        ...prev,
        btnLoading: false,
      }));
    }
  };
  const handleStatusUpdate = async (e, row) => {
    try {
      console.log({ row });
      const response = await activeDeactiveUserService({
        id: row.id,
      });
      if (response) {
        fetchData();
      }
    } catch (error) {}
  };
  const columns = [
    { key: "#", label: "S.No.", width: "4%" },
    { key: "user_unique_id", label: "User Id", width: "7%" },
    { key: "name", label: "Name", limit: 20, width: "12%" },
    {
      key: "email",
      label: "Email",
      width: "7%",
      limit: "35"
    },
    { key: "contactNumber", label: "Phone Number", width: "5%" },
    {
      key: "pwdOption",
      label: "PWD",
      width: "5%",
      render: (row) => (row?.pwdOption == 1 ? "Yes" : "No"),
    },
    { key: "gender", label: "Gender", width: "5%" },
    { key: "district_name", label: "District", width: "8%" },
    { key: "institute_type", label: "Institute Type", width: "8%" },
    // { key: "college_name", label: "College Name", width: "7%" },
    { key: "taluka_name", label: "Taluka", width: "7%" },
    {
      key: "createdAt",
      label: "Joined On",
      width: "15%",
      type: "datetime",
    },
    {
      key: "is_active",
      label: "Status",
      width: "7%",
      type: "switch",
      handleChange: (e, row) => handleStatusUpdate(e, row),
    },
    // { key: "draft", label: "Status", width: "5%" },
  ];

  const actions = [
    {
      width: "5%",
      label: "View",
      image: PageIndex.Svg.yelloweye,
      requiredPermission: "user_view",
      onClick: (row) =>
        navigate(`/admin/student-management/view/${row?.id}`, {
          state: { userId: row?.id },
        }),
    },

    {
      label: "Edit",
      image: PageIndex.Svg.editIcon,
      requiredPermission: "user_edit",
      onClick: (row) =>
        navigate(`/admin/student-management/edit/${row?.id}`, {
          state: { Id: row?._id },
        }),
    },
    {
      label: "Delete",
      image: PageIndex.Svg.trash,
      requiredPermission: "user_delete",
      onClick: (row) => handleOpenDelete(row),
    },
  ];

  const fetchData = async (
    searchTerm,
    pageNo,
    dataPerPage,
    tabValue,
    firstFilterValue,
    secondFilterValue,
    thirdFilterValue
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
        district: firstFilterValue ?? firstFilter,
        talukas: secondFilterValue ?? secondFilter,
        gender: genderFilter || null,
        pwd: pwdFilter || null,
        startDate: dateRangeFiler?.[0] || null,
        endDate: dateRangeFiler?.[1] || null,
        institute_type: thirdFilterValue || thirdFilter
      };
      const res = await getAllUserService(data);
      setData(res?.data?.users || []);
      setPage(res?.data.currentPage);
      setTotalCount(res?.data.totalCount);
      setDateRangeClear(false)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading((prev) => ({
        ...prev,
        pageLoading: false,
      }));
    }
  };

  const handleResetDateRange = () => {
    setDateRangeClear(true)
    setDateRangeFiler([null, null]);
  };

  const setIndentRequest = (newData) => {};

  const {
    page,
    rowsPerPage,
    search,
    setPage,
    firstFilter,
    secondFilter,
    handleSecondFilter,
    handleFirstFilter,
    handleSearchChange,
    handlePageChange,
    handleRowsPerPageChange,
    handleResetFilter,
    searchInputRef,
    thirdFilter,
    handleThirdFilter
  } = PageIndex.usePaginationHook(fetchData, setIndentRequest);

  useEffect(() => {
    if (firstFilter) {
      fetchTalukaData(firstFilter);
    }
  }, [firstFilter]);

  const fetchDistrictData = async () => {
    try {
      const res = await getAllDistrictServices();
      setDistrictListData(res?.data?.districts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchTalukaData = async (districtDataId) => {
    try {
      const res = await getAllTalukaServices(districtDataId);
      const data = res?.data?.talukas?.map((taluka) => ({
        ...taluka,
        name: taluka.taluka_name,
        id: taluka.taluka_id,
      }));
      console.log({ data });
      setTalukaList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDistrictData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [genderFilter, pwdFilter]);

  useEffect(() => {
    if (dateRangeFiler[0] && dateRangeFiler[1]) {
      fetchData();
    }
  }, [dateRangeFiler]);

  useEffect(() => {
    if (dateRangeClear) {
      fetchData();
    }
  }, [dateRangeClear]);

  //#region filter
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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

  const filters = [
    {
      type: "dropdown",
      name: "district",
      label: "District",
      value: firstFilter,
      options: districtListData,
      handleFilter: (value) => {
        handleFirstFilter(value);
        handleSecondFilter("");
      },
    },
    {
      type: "dropdown",
      name: "talukas",
      label: "Taluka",
      value: secondFilter,
      options: talukaList,
      // options: PageIndex?.genderTypes,
      disable: !firstFilter,
      handleFilter: handleSecondFilter,
    },
    {
      type: "dropdown",
      name: "insitute_type",
      label: "Institute Type",
      value: thirdFilter,
      options: instituteTypeOptions,
      // options: PageIndex?.genderTypes,
      handleFilter: handleThirdFilter,
    },
  ];

  // for open handleChangedropdown
  const handleExport = async () => {
    setLoading((prev) => ({
      ...prev,
      exportBtnLoading: true,
    }));
    const headers = [
      "S. No.",
      "User Id",
      "Name",
      "Email",
      "Phone Number",
      "PWD",
      "Gender",
      "Date Of Birth",
      "District",
      "Taluka",
      "College Name",
      "Stream",
      "Semester",
      "Institute Type",
      "Registered Date & Time",
      "Status",
    ];

    try {
      const data = {
        search: search,
        district: firstFilter,
        talukas: secondFilter,
        gender: genderFilter,
        pwd: pwdFilter,
        startDate: dateRangeFiler?.[0] || null,
        endDate: dateRangeFiler?.[1] || null,
        isExport: 1,
        institute_type: thirdFilter
      };
      const res = await getAllUserService(data);
      const rowData = res?.data?.users;
      const rows = rowData?.map((item, i) => ({
        ID: i + 1 || "-",
        "User Id": item?.user_unique_id || "-",
        Name: `${item?.name}` || "-",
        Email: item?.email || "-",
        ["Phone Number"]: item?.contactNumber || "-",
        PWD: item?.pwdOption == 1 ? "Yes" : "No",
        Gender: item?.gender || "-",
        ["Date Of Birth"]: item?.dob || "-",
        District: item?.district_name || "-",
        ["Taluka"]: item?.taluka_name || "-",
        ["College Name"]: item?.college_name ? item.college_name?.replace("Other -", "").trim() : "-",
        Stream: item?.streamName || "-",
        Semester: item?.semesterName || "-",
        ["Institute Type"]: item?.institute_type || "-",
        ["Registered Date & Time"]: moment(item?.createdAt).format(
          "MMM D, YYYY h:mm A"
        ),
        Status: item?.is_active == 0 ? "Deactive" : "Active",
      }));
      PageIndex.handleCommonExport({
        headers,
        rows,
        nameFile: `student-details-${Index.moment().unix()}`,
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

  return (
    <>
      <Index.Box className="admin-dashboard-content">
        <Index.Box className="admin-page-title-flex admin-page-title-main">
          <Index.Typography
            className="admin-page-title"
            component="h2"
            variant="h2"
          >
            Student List
          </Index.Typography>
          <Index.Box className="admin-userlist-btn-flex">
            {/* Date Range Filter */}
            <Index.Box className="admin-date-range-picker-box">
              <Index.LocalizationProvider dateAdapter={Index.AdapterDayjs}>
                <Index.DateRangePicker
                  className="admin-form-control"
                  format="DD/MM/YYYY"
                  value={
                    [
                      Index.dayjs(dateRangeFiler[0]),
                      Index.dayjs(dateRangeFiler[1]),
                    ] || []
                  }
                  label="node"
                  localeText={{
                    start: "",
                    end: "",
                  }}
                  onChange={(newValue) => {
                    const startDate = newValue[0]
                      ? Index.moment(newValue[0].$d).format("YYYY-MM-DD")
                      : null;
                    const endDate = newValue[1]
                      ? Index.moment(newValue[1].$d).format("YYYY-MM-DD")
                      : null;
                    setDateRangeFiler([startDate, endDate]);
                  }}
                  renderInput={(startProps, endProps) => (
                    <>
                      <Index.TextField
                        {...startProps}
                        label={startProps.value ? "" : ""}
                        placeholder="DD/MM/YYYY"
                        slotProps={{
                          input: {
                            readOnly: true,
                            error: false
                          },
                        }}
                        className="date-input"
                      />

                      <Index.TextField
                        {...endProps}
                        label={endProps.value ? "" : ""}
                        placeholder="DD/MM/YYYY"
                        slotProps={{
                          input: {
                            readOnly: true,
                            error: false
                          },
                        }}
                        className="date-input"
                      />
                    </>
                  )}
                  slotProps={{
                    textField: {
                      readOnly: true,
                      error: false,
                    },
                  }}
                />
              </Index.LocalizationProvider>
              <Index.Box
                className={`filter-clear-box ${
                  dateRangeFiler[0] && dateRangeFiler[1] ? "active-reset" : ""
                }`}
              >
                <Index.Button
                  className="filter-clear-button"
                  disableRipple
                  onClick={handleResetDateRange}
                >
                  <img className="clear-icon" src={PageIndex.Svg.closeblack} />
                </Index.Button>
              </Index.Box>
            </Index.Box>

            {/* Gender Filter */}
            <Index.Box className="admin-input-box admin-autocomplete-box">
              <Index.Autocomplete
                options={["Male", "Female", "Other"]}
                getOptionLabel={(option) => option}
                value={genderFilter || null}
                onChange={(event, newValue) => {
                  setGenderFilter(newValue);
                }}
                renderInput={(params) => (
                  <Index.TextField
                    {...params}
                    fullWidth
                    id="course-select"
                    className="admin-form-control"
                    placeholder="Select Gender"
                    autoComplete="off"
                  />
                )}
                classes={{
                  option: "custom-hackathon-dropdown",
                }}
              />
            </Index.Box>

            {/* PWD Filter */}
            <Index.Box className="admin-input-box admin-autocomplete-box">
              <Index.Autocomplete
                options={pwdOption}
                getOptionLabel={(option) => option?.label}
                value={
                  pwdOption.find((item) => item.value == pwdFilter) || null
                }
                onChange={(event, newValue) => {
                  setPwdFilter(newValue?.value);
                }}
                renderInput={(params) => (
                  <Index.TextField
                    {...params}
                    fullWidth
                    id="course-select"
                    className="admin-form-control"
                    placeholder="Select PWD"
                    autoComplete="off"
                  />
                )}
                classes={{
                  option: "custom-hackathon-dropdown",
                }}
              />
            </Index.Box>

            {/* Search  */}
            <Index.Box className="admin-search-main">
              <Index.Box className="admin-search-box">
                <Index.Box className="admin-form-group">
                  <Index.TextField
                    fullWidth
                    id="fullWidth"
                    className="admin-form-control"
                    placeholder="Search Student"
                    inputRef={searchInputRef}
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
                    handleResetFilter={handleResetFilter}
                    anchor={anchor}
                    filterName="Student Filter"
                  />
                </React.Fragment>
              ))}
            </Index.Box>

            {/* Import Button */}
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
            <Index.Box className="admin-userlist-inner-btn-flex">
              <PageIndex.PrimaryButton
                className="primary-btn"
                btnLabel="Import"
                onClick={handleOpenImportModal}
                // loading={loading.exportBtnLoading}
              />
            </Index.Box>

            <Index.Box className="admin-userlist-inner-btn-flex">
              <Index.Box className="primary-btn-main">
                <Index.Button
                  className="primary-btn"
                  onClick={() => navigate("/admin/student-management/add")}
                >
                  Add Student
                </Index.Button>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>

        <Index.Box className="card-border common-card student-list-table">
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
              moduleName="Student"
            />
          )}
        </Index.Box>
      </Index.Box>

      <PageIndex.ConfirmationModal
        open={deleteState.openDelete}
        handleClose={handleCloseDelete}
        handleSubmit={handleDeleteRecord}
        loading={loading.btnLoading}
        description="Are you sure you want to delete this user? This action can't be undone."
      />
      <ImportStudentModal
        open={openImportModal}
        handleClose={handleCloseImportModal}
        fetchData={fetchData}
      />
    </>
  );
}

const ImportStudentModal = ({ open, handleClose, fetchData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [skippedRows, setSkippedRows] = useState([]);

  const handleCloseImportFile = () => {
    setFileError("");
    setSelectedFile(null);
    setSkippedRows([]);
    handleClose();
    fetchData();
  };
  const columns = [
    "Name",
    "Email",
    "College Name",
    "Institute Type",
    "Stream",
    "Semester",
    "Gender",
    "District",
    "Taluka",
    "Date of Birth",
    "Contact Number",
    "Password",
    "PWD",
  ];

  const handleImportStudents = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const formData = new FormData();
    formData.append("importFile", values?.file);
    const resp = await addBulkStudentService(formData);
    if (resp?.status == 200) {
      if (resp?.skippedRows?.length) {
        setSkippedRows(resp?.skippedRows);
      } else {
        handleCloseImportFile();
        fetchData();
      }
    } else if (resp?.response?.data?.skippedRows?.length) {
      setSkippedRows(resp?.response?.data?.skippedRows);
    }else{
      setSkippedRows([]);
    }
    setSubmitting(false);
  };
  const handleDownloadSample = () => {
    const sampleArrValue = [
      {
        Name: "Alice Sharma",
        Email: "alice@example.com",
        "Collage Name": "ABC College",
        "Institute Type": "Private",
        Stream: "Architecture",
        Semester: "1st Semester",
        Gender: "Female",
        District: "North Goa",
        Taluka: "Bardez",
        "Date of Birth": "25/01/2000",
        "Contact Number": "9876543210",
        Password: "password123",
        PWD: "No",
      },
      {
        Name: "Ravi Mehta",
        Email: "ravi@example.com",
        "Collage Name": "XYZ Institute",
        "Institute Type": "Government",
        Stream: "Design",
        Semester: "2nd Semester",
        Gender: "Male",
        District: "South Goa",
        Taluka: "Canacona",
        "Date of Birth": "12/05/1999",
        "Contact Number": "9123456780",
        Password: "ravi@321",
        PWD: "Yes",
      },
      {
        Name: "Sneha Patil",
        Email: "sneha@example.com",
        "Collage Name": "Sunrise College",
        "Institute Type": "Other",
        Stream: "Computer Applications",
        Semester: "3rd Semester",
        Gender: "Other",
        District: "North Goa",
        Taluka: "Pernem",
        "Date of Birth": "07/11/2001",
        "Contact Number": "9012345678",
        Password: "sneha2024",
        PWD: "No",
      },
    ];

    downloadExcel(columns, sampleArrValue, {
      fileName: `Sample${Index.moment().format("MM-DD-YYYY")}`,
    });
  };

  const formik = useFormik({
    initialValues: { file: null },
    validationSchema: yup.object().shape({
      file: yup.string().required("Please select file"),
    }),
    onSubmit: handleImportStudents,
  });
  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);
  return (
    <Index.Modal
      aria-labelledby="modal-modal-title"
      open={open}
      // onClose={handleClose}
      aria-describedby="modal-modal-description"
      className="admin-modal"
    >
      <Index.Box
        sx={PageIndex.style}
        className="admin-modal-inner view-document-modal-inner-main kyc-modal-box"
      >
        <form onSubmit={formik.handleSubmit}>
          <Index.Box className="admin-modal-header">
            <Index.Typography className="admin-modal-title">
              Import Students
            </Index.Typography>
            <Index.Button className="modal-close-btn" onClick={handleCloseImportFile}>
              <img
                src={PageIndex.Svg.closeblack}
                className="admin-modal-close-icon"
                alt="Close"
              />
            </Index.Button>
          </Index.Box>
          <Index.Box className="admin-modal-body">
            <Index.Box className="admin-modal-hgt-scroll cus-scrollbar">
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
                    <Index.Box className="admin-input-box ">
                    {/* <Index.FormHelperText className="admin-form-lable">
                      Import File (
                      <span onClick={handleDownloadSample} className="span-btn">
                        Download Sample
                      </span>
                      )<span className="sign-required">* </span>
                    </Index.FormHelperText> */}
                    <Index.Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <label htmlFor="excel-upload">
                        <input
                          accept=".xlsx,.xls"
                          id="excel-upload"
                          type="file"
                          hidden
                          onChange={(e) => {
                            const file = e.currentTarget.files[0];
                            const allowedTypes = [
                              "application/vnd.ms-excel",
                              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            ];
                            formik.setFieldTouched("file", true);

                            if (file) {
                              if (!allowedTypes.includes(file.type)) {
                                setFileError(
                                  "Only .xls or .xlsx files are allowed"
                                );
                                formik.setFieldValue("file", null);
                              } else {
                                setFileError("");
                                formik.setFieldValue("file", file);
                              }
                            }
                          }}
                        />
                        <Index.Box
                          sx={{
                            border: "2px dashed #90caf9",
                            borderRadius: 4,
                            width: 200,
                            height: 150,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            cursor: "pointer",
                            backgroundColor: "#f5f5f5",
                            transition: "all 0.3s",
                            "&:hover": {
                              backgroundColor: "#e3f2fd",
                            },
                          }}
                        >
                          {!formik.values.file ? (
                            <>
                              <CloudUploadIcon
                                fontSize="large"
                                color="primary"
                              />
                              <Index.Typography variant="body2" mt={1}>
                                Upload Excel
                              </Index.Typography>
                            </>
                          ) : (
                            <>
                              <InsertDriveFileIcon
                                fontSize="large"
                                color="success"
                              />
                              <Index.Typography
                                variant="body2"
                                mt={1}
                                textAlign="center"
                              >
                                {formik.values.file?.name}
                              </Index.Typography>
                            </>
                          )}
                        </Index.Box>
                      </label>
                      <span onClick={handleDownloadSample} className="span-btn admin-form-lable">
                        Download Sample
                      </span>
                      <Index.FormHelperText error className="admin-form-lable">
                        {formik.touched?.file &&
                          (fileError || formik?.errors?.file || null)}
                      </Index.FormHelperText>
                    </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
              {skippedRows?.length > 0 && (
                <Index.Box sx={{ mt: 0 }}>
                  <Index.Typography sx={{ color: "#d32f2f", fontWeight: 100 }}>
                    Skipped Rows (Invalid Data):
                  </Index.Typography>
                  <Index.Box className="page-table-main common-table-main">
                    <Index.TableContainer
                      component={Index.Paper}
                      className="table-container"
                      sx={{ maxHeight: 300 }}
                    >
                      <Index.Table
                        stickyHeader
                        aria-label="sticky table"
                        className="table"
                      >
                        <Index.TableHead className="table-head">
                          <Index.TableRow className="table-row">
                            <Index.TableCell
                              component="th"
                              variant="th"
                              className="table-th"
                            >
                              #
                            </Index.TableCell>
                            {columns.map((col) => (
                              <Index.TableCell
                                key={col}
                                component="th"
                                variant="th"
                                className="table-th"
                              >
                                {col}
                              </Index.TableCell>
                            ))}
                            <Index.TableCell
                              component="th"
                              variant="th"
                              className="table-th"
                              sx={{
                                minWidth: 250,
                                fontWeight: 600,
                                color: "#d32f2f",
                              }}
                            >
                              Reason
                            </Index.TableCell>
                          </Index.TableRow>
                        </Index.TableHead>

                        <Index.TableBody>
                          {skippedRows.map((row, index) => (
                            <Index.TableRow key={index}>
                              <Index.TableCell>{index + 1}</Index.TableCell>
                              {columns.map((col) => (
                                <Index.TableCell key={col}>
                                  {row[col] || "-"}
                                </Index.TableCell>
                              ))}
                              <Index.TableCell sx={{ color: "#b71c1c" }}>
                                {row.reason || "Invalid Data"}
                              </Index.TableCell>
                            </Index.TableRow>
                          ))}
                        </Index.TableBody>
                      </Index.Table>
                    </Index.TableContainer>
                  </Index.Box>
                </Index.Box>
              )}
            </Index.Box>
          </Index.Box>
          <Index.Box className="admin-modal-footer">
            <Index.Box className="modal-footer-btn-flex primary-btn-main border-btn-main">
              <Index.Button
                className="border-btn"
                disabled={formik.isSubmitting}
                onClick={handleCloseImportFile}
              >
                Discard
              </Index.Button>
              <Index.Button
                className="primary-btn"
                type="submit"
                loading={formik.isSubmitting}
                disabled={formik.isSubmitting}
              >
                Submit
              </Index.Button>
            </Index.Box>
          </Index.Box>
        </form>
      </Index.Box>
    </Index.Modal>
  );
};
