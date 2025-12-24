import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  deleteTestimonial,
  getAllTestimonials,
} from "../../../../redux/services/AdminService";

export default function TestimonialList() {
  const navigate = PageIndex.useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [deleteState, setDeleteState] = React.useState({
    openDelete: false,
    selectedRow: null,
  });

  const columns = [
    { key: "#", label: "S.No.", width: "4%" },
    {
      key: "image",
      label: "Image",
      width: "10%",
      type: "image",
    },
    { key: "title", label: "Name", width: "10%" },
    { key: "stream", label: "Stream", width: "10%" },
    {
      key: "description",
      label: "Description",
      width: "30%",
      type: "ckeditor",
    },
    {
      key: "testimonial_date",
      label: "Testimonial Date",
      width: "16%",
      type: "date",
    },
    { key: "created_at", label: "Created At", width: "15%", type: "datetime" },
  ];

  const actions = [
    {
      label: "View",
      image: PageIndex.Svg.yelloweye,
      onClick: (row) => navigate(`/admin/view-testimonial/${row?.id}`),
    },
    {
      label: "Edit",
      image: PageIndex.Svg.editIcon,
      onClick: (row) => navigate(`/admin/add-edit-testimonial/${row?.id}`),
    },
    {
      label: "Delete",
      image: PageIndex.Svg.trash,
      onClick: (row) => handleOpenDelete(row),
    },
  ];

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
      const res = await deleteTestimonial({ id: deleteState.selectedRow?.id });

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
      console.error("Error deleting testimonial:", error);
    } finally {
      setLoading((prev) => ({
        ...prev,
        btnLoading: false,
      }));
    }
  };

  const fetchData = async (searchTerm, pageNo, dataPerPage) => {
    setLoading((prev) => ({
      ...prev,
      pageLoading: true,
    }));

    try {
      const data = {
        page: pageNo,
        limit: dataPerPage,
        search: searchTerm,
      };
      const res = await getAllTestimonials(data);

      setData(res?.data || []);
      setTotalCount(res?.meta.totalRecords);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading((prev) => ({
        ...prev,
        pageLoading: false,
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
  } = PageIndex.usePaginationHook(fetchData);

  useEffect(() => {
    fetchData();
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
            Testimonials
          </Index.Typography>
          <Index.Box className="admin-userlist-btn-flex">
            <Index.Box className="admin-search-main">
              <Index.Box className="admin-search-box">
                <Index.Box className="admin-form-group">
                  <Index.TextField
                    fullWidth
                    id="fullWidth"
                    className="admin-form-control"
                    placeholder="Search Testimonials"
                    onChange={(e) => handleSearchChange(e)}
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
                  onClick={() => navigate("/admin/add-edit-testimonial")}
                >
                  Add Testimonal
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
              moduleName="Testimonial"
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
