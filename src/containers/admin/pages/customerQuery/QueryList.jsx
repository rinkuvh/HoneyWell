import React, { useEffect, useRef, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  deleteCourse,
  replyToContactInquiryService,
} from "../../../../redux/services/AdminService";
import { getContactQueryService } from "../../../../redux/services/UserService";

export default function QueryList() {
  const navigate = PageIndex.useNavigate();
  const fileInputRef = useRef();
  const [country, setCountry] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    importBtnLoading: false,
  });

  const [totalCount, setTotalCount] = useState(0);
  const [deleteState, setDeleteState] = React.useState({
    openDelete: false,
    selectedRow: null,
  });
  const [replyOpen, setReplyOpen] = useState(false);
  const [rowData, setRowData] = useState(null);

  const handleReplyOpen = (row) => {
    setReplyOpen(true);
    setRowData(row);
  };

  const handleReplyClose = (row) => {
    setReplyOpen(false);
    setRowData(null);
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
      const res = await deleteCourse({
        id: deleteState.selectedRow?.CourseID,
      });

      console.log(res);
      if (res?.data.status === 200) {
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

  const columns = [
    { key: "#", label: "S.No.", width: "4%" },

    { key: "name", label: "Name", limit: 30, width: "7%" },
    {
      key: "email",
      label: "Email",
      width: "7%",
    },
    { key: "message", label: "Description", limit: 22, width: "5%" },
    { key: "created_at", label: "Created At", width: "7%", type: "datetime" },
  ];

  const actions = [
    {
      width: "1%",
      label: (row) => row?.is_replied == 0 ? "Reply" : "Replied",
      image: (row) => row?.is_replied == 0 ? PageIndex.Svg.replyIcon : PageIndex.Svg.approveIcon,
      requiredPermission: "user_view",
      onClick: (row) => row?.is_replied == 0 ? handleReplyOpen(row) : null,
    },
    {
      width: "1%",
      label: "View",
      image: PageIndex.Svg.yelloweye,
      requiredPermission: "user_view",
      onClick: (row) => navigate(`/admin/query/view/${row?.id}`),
    },
  ];

  const fetchData = async (
    searchTerm,
    pageNo,
    dataPerPage,
    tabValue,
    firstFilterValue,
    secondFilterValue
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
      };
      const res = await getContactQueryService(data);

      setData(res?.data?.contacts);
      setPage(res?.data?.currentPage);
      setTotalCount(res?.data?.totalCount);
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
    firstFilter,
    secondFilter,
    handleSecondFilter,
    handleFirstFilter,
    handleSearchChange,
    handlePageChange,
    handleRowsPerPageChange,
  } = PageIndex.usePaginationHook(fetchData, setIndentRequest);

  useEffect(() => {
    fetchData();
  }, []);

  //#region filter
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  // for open handleChangedropdown

  return (
    <>
      <Index.Box className="admin-dashboard-content">
        <Index.Box className="admin-page-title-flex admin-page-title-main">
          <Index.Typography
            className="admin-page-title"
            component="h2"
            variant="h2"
          >
            Contact Us
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
                    placeholder="Search Contact Us"
                    // value={searchValue}
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
              moduleName="Contact Us"
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

      {replyOpen && (
        <ReplyModal
          open={replyOpen}
          handleClose={handleReplyClose}
          data={rowData}
          fetchData={fetchData}
        />
      )}
    </>
  );
}

const ReplyModal = ({ open, handleClose, data, fetchData }) => {
  const handleSubmitReply = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        contactId: data?.id,
        reply: values?.reply,
      };
      const response = await replyToContactInquiryService(payload);
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

  const contactUsReplySchema = PageIndex.Yup.object().shape({
    reply: PageIndex.Yup.string().required("Please enter your reply"),
  });

  const formik = Index.useFormik({
    initialValues: { reply: "" },
    validationSchema: contactUsReplySchema,
    onSubmit: handleSubmitReply,
  });

  return (
    <>
      <Index.Modal
        aria-labelledby="modal-modal-title"
        open={open}
        onClose={handleClose}
        aria-describedby="modal-modal-description"
        className="admin-modal rating-modal"
      >
        <Index.Box
          sx={PageIndex.style}
          className="admin-modal-inner admin-delete-modal-inner-main rating-modal-inner-main"
        >
          <form onSubmit={formik?.handleSubmit}>
            <Index.Box className="admin-modal-body">
              <Index.Typography
                className="admin-delete-modal-title"
                variant="body1"
              >
                Reply to Student Inquiry
              </Index.Typography>
              <Index.Box className="review-box">
                <Index.Typography className="review-label" variant="h5">
                  Leave a reply :
                </Index.Typography>
                <Index.TextareaAutosize
                  value={formik?.values?.reply}
                  name="reply"
                  onChange={formik?.handleChange}
                  minRows={5}
                  maxRows={5}
                  placeholder="Enter your reply here..."
                  className="custom-textarea"
                  onBlur={formik?.handleBlur}
                />
                <Index.FormHelperText error className="admin-form-lable">
                  {formik?.touched?.reply && formik?.errors?.reply}
                </Index.FormHelperText>
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
