import React, { useEffect, useRef, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  changeStudentInternshipCourse,
  getAllInternship,
  getAllIntershipsService,
} from "../../../../redux/services/AdminService";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function InternshipsList() {
  const [courses, setCourses] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    importBtnLoading: false,
    exportBtnLoading: false,
  });
  const [internshipChangeModal, setInternshipChangeModal] = useState({
    open: false,
    internshipDetails: null
  })

  const handleOpenInternshipChangeModal = (value) => {
    setInternshipChangeModal({open: true, internshipDetails: value})
  }
  const handleCloseInternshipChangeModal = () => {
    setInternshipChangeModal({open: false, internshipDetails: null})
  }

  const [filter, setFilter] = useState("");

  const [totalCount, setTotalCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const columns = [
    { key: "#", label: "S.No.", width: "2%" },
    { key: "user_unique_id", label: "User ID", width: "10%" },
    { key: "user_name", label: "User Name", limit: 30, width: "15%" },
    { key: "email", label: "User Email", limit: 30, width: "15%" },
    { key: "contactNumber", label: "Contact Number", limit: 30, width: "15%" },
    {
      key: "internship_title",
      label: "Internship Title",
      width: "15%",
    },
    { key: "created_at", label: "Created At", width: "15%", type: "datetime" },
  ];
  const actions = [
    {
      label: "Edit",
      image: PageIndex.Svg.editIcon,
      requiredPermission: "user_edit",
      onClick: (row) => {
        handleOpenInternshipChangeModal(row)
      },
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
        filter: filter ?? filter,
      };
      const res = await getAllIntershipsService(data);
      setData(res?.data);
      setPage(res?.meta?.page);
      setTotalCount(res?.meta?.totalRecords);
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

  const {
    page,
    rowsPerPage,
    search,
    setPage,
    handleSearchChange,
    handlePageChange,
    handleRowsPerPageChange,
    searchInputRef
  } = PageIndex.usePaginationHook(fetchData, setIndentRequest);

  const handleExport = async () => {
    setLoading((prev) => ({
      ...prev,
      exportBtnLoading: true,
    }));
    const headers = [
      "S. No.",
      "User ID",
      "User Name",
      "User Email",
      "Contact Number",
      "Internship Title",
      "Created At",
    ];

    try {
      const data = {
        search: search,
        filter,
        isExport: 1,
      };
      const res = await getAllIntershipsService(data);
      const rowData = res?.data;
      const rows = rowData?.map((item, i) => ({
        ID: i + 1 || "-",
        "User ID": item?.user_unique_id || "-",
        "User Name": `${item?.user_name}` || "-",
        "User Email": item?.email || "-",
        "Contact Number": item?.contactNumber || "-",
        "Internship Title": item?.internship_title || "-",
        "Created At": Index.moment(item?.created_at).format(
          "MMM D, YYYY h:mm A"
        ),
      }));
      PageIndex.handleCommonExport({
        headers,
        rows,
        nameFile: `internship-details-${Index.moment().unix()}`,
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

  const getAllCourseList = () => {
    getAllInternship().then((res) => {
      if (res?.status == 200) {
        setCourses(res?.data);
      }
    });
  };
  const handleChangeInternship = async (values) => {
    try {
      const res = await changeStudentInternshipCourse({
        id: internshipChangeModal.internshipDetails?.id,
        internship_id: values?.internship_id
      });

      if (res?.status === 200) {
        fetchData();
        handleCloseInternshipChangeModal();
      }
    } catch (error) {
      console.error("Error changing internship:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [filter]);

  useEffect(() => {
    getAllCourseList();
  }, []);

  return (
    <>
      <Index.Box className="admin-dashboard-content student-internship-page">
        <Index.Box className="admin-page-title-flex admin-page-title-main">
          <Index.Typography
            className="admin-page-title"
            component="h2"
            variant="h2"
          >
            Internships
          </Index.Typography>

          <Index.Box className="admin-userlist-btn-flex">
            <Index.Box className="admin-input-box filter-input">
              <Index.Box className="admin-form-group">
                <Index.Box className="admin-dropdown-box filter-box">
                  <Index.FormControl className="admin-form-control">
                    <Index.Select
                      className="admin-dropdown-select"
                      value={filter}
                      onChange={(e) => {
                        setFilter(e.target.value);
                        // setSearchValue("");
                        // handleSearchChange();
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
                        All Internship Course
                      </Index.MenuItem>
                      {courses?.map((option, idx) => (
                        <Index.MenuItem
                          key={idx}
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
            {/* Search  */}
            <Index.Box className="admin-search-main">
              <Index.Box className="admin-search-box">
                <Index.Box className="admin-form-group">
                  <Index.TextField
                    fullWidth
                    id="fullWidth"
                    className="admin-form-control"
                    placeholder="Search Internship"
                    // value={searchValue}
                    inputRef={searchInputRef}
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
            <PageIndex.PrimaryButton
              className="primary-btn"
              btnLabel="Export"
              onClick={handleExport}
              loading={loading.exportBtnLoading}
            />
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
              moduleName="Internships"
            />
          )}
        </Index.Box>
      </Index.Box>
      <ChangeStudentInternship 
        open={internshipChangeModal?.open} 
        courses={courses} 
        handleClose={handleCloseInternshipChangeModal}
        data={internshipChangeModal?.internshipDetails}
        handleSubmit={handleChangeInternship}
      />
    </>
  );
}

const ChangeStudentInternship = ({
  open,
  courses = [],
  handleClose,
  handleSubmit,
  data
}) => {
  const formik = useFormik({
    initialValues: { internship_id: data?.internship_id || ""},
    validationSchema: Yup.object().shape({
      internship_id: Yup.string().required("Please select internship course")
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      await handleSubmit(values);
      setSubmitting(false)
    },
    enableReinitialize: true
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
      <form onSubmit={formik.handleSubmit}>
        <Index.Box
          sx={PageIndex.style}
          className="admin-modal-inner view-document-modal-inner-main kyc-modal-box"
        >
          <Index.Box className="admin-modal-header">
            <Index.Typography className="admin-modal-title">
              Change Internship Course (#{data?.user_unique_id})
            </Index.Typography>
            <Index.Button className="modal-close-btn" onClick={handleClose}>
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
                        <Index.FormHelperText className="admin-form-lable">
                          Select Internship Course
                          <span className="sign-required">* </span>
                        </Index.FormHelperText>
                        <Index.Box className="admin-form-group">
                          <Index.Box className="admin-dropdown-box filter-box">
                            <Index.FormControl className="admin-form-control">
                              <Index.Select
                                className="admin-dropdown-select"
                                value={formik.values.internship_id}
                                onChange={(e) => {
                                  formik.setFieldValue("internship_id", e.target.value);
                                }}
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                                MenuProps={{
                                  PaperProps: {
                                    className: "form-select-field",
                                  },
                                }}
                              >
                                  {/* <Index.MenuItem
                                    value=""
                                    className="admin-menuitem"
                                  >
                                    Select Internship Course
                                  </Index.MenuItem> */}
                                {courses?.map((option, idx) => (
                                  <Index.MenuItem
                                    key={idx}
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
                        <Index.FormHelperText
                            error
                            className="admin-form-lable"
                          >
                            {formik.touched.internship_id &&
                              formik.errors.internship_id}
                          </Index.FormHelperText>
                      </Index.Box>
                    </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          <Index.Box className="admin-modal-footer">
            <Index.Box className="modal-footer-btn-flex primary-btn-main border-btn-main">
              <Index.Button className="border-btn" onClick={handleClose} disabled={formik.isSubmitting}>
                Discard
              </Index.Button>
              <Index.Button
                className="primary-btn"
                type="submit"
                loading={formik.isSubmitting}
                disabled={data?.internship_id == formik.values.internship_id || formik.isSubmitting}
              >
                Submit
              </Index.Button>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </form>
    </Index.Modal>
  );
};