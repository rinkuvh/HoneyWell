import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  deleteFaq,
  getAllFaqList,
} from "../../../../redux/services/AdminService";

export default function FaqList() {
  const navigate = PageIndex.useNavigate();
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
      const res = await deleteFaq({
        id: deleteState.selectedRow?.id,
      });

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
    {
      key: "question",
      label: "Question",
      width: "10%",
    },

    {
      key: "answer",
      label: "Answer",
      width: "14%",
      type:"ckeditor"
    },

    { key: "createdAt", label: "Created At", width: "9%", type: "datetime" },
  ];

  const actions = [
    {
      width: "1%",
      label: "View",
      image: PageIndex.Svg.yelloweye,
      requiredPermission: "user_view",
      onClick: (row) => navigate(`/admin/view-faq/${row?.id}`, {}),
    },
    {
      label: "Edit",
      image: PageIndex.Svg.editIcon,
      requiredPermission: "user_edit",
      onClick: (row) => navigate(`/admin/add-edit-faq/${row?.id}`, {}),
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
      const res = await getAllFaqList(data);

      setData(res?.data || []);
      setPage(res?.meta.page);
      setTotalCount(res?.meta.totalRecords);
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

  return (
    <>
      <Index.Box className="admin-dashboard-content">
        <Index.Box className="admin-page-title-flex admin-page-title-main">
          <Index.Typography
            className="admin-page-title"
            component="h2"
            variant="h2"
          >
            FAQ List
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
                    placeholder="Search FAQ"
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

            <Index.Box className="admin-userlist-inner-btn-flex">
              <Index.Box className="primary-btn-main">
                <Index.Button
                  className="primary-btn"
                  onClick={() => navigate("/admin/add-edit-faq")}
                >
                  Add FAQ
                </Index.Button>
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
              moduleName="FAQ"
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
    </>
  );
}
