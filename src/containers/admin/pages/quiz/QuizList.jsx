import React, { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  deleteQuiz,
  getAllQuiz,
  updateQuizStatusService,
} from "../../../../redux/services/AdminService";

export default function QuizList({ courseId ,courseData,isDisabled}) {
  const navigate = useNavigate();
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

  const params = PageIndex.useParams();

  const [data, setData] = useState([]);

  const handleOpenDelete = (row) => {
    console.log(row);
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
      const response = await deleteQuiz({ id: deleteState?.selectedRow?.id });
      setDeleteState({ openDelete: false, selectedRow: null });
      setLoading((prev) => ({
        ...prev,
        btnLoading: false,
      }));

      fetchData();
    } catch (err) {
      setDeleteState({ openDelete: false, selectedRow: null });
    } finally {
      setLoading((prev) => ({
        ...prev,
        btnLoading: false,
      }));
    }
  };
  const handleStatusUpdate = async (e, row) => {
    try {
      const response = await updateQuizStatusService({
        id: row.id,
        status: row.is_active === 1 ? 0 : 1,
      });
      if (response) {
        fetchData();
      }
    } catch (error) {}
  };
  const columns = [
    { key: "#", label: "S.No." },
    { key: "question", label: "Question", limit: 30 },
    { key: "correct_answer", label: "Answer",},
    {
      key: "is_active",
      label: "Status",
      type: "switch",
      handleChange: (e, row) => handleStatusUpdate(e, row),
    },
    { key: "created_at", label: "Created Date" },
  ];

  const actions = [
    {
      label: "View",
      image: PageIndex.Svg.yelloweye,
      onClick: (row) => {
        navigate(`/admin/view-quiz/${row?.id}`, {
        state: {
          course_details: courseData,
          row,
          isView: true,
        },
      })
      },
    },
    {
      label: "Edit",
      image: PageIndex.Svg.editIcon,
      onClick: (row) =>
        navigate(`/admin/add-edit-quiz/${row.id}`, {
          state: {
            course_details: courseData,
            row,
          },
        }),
    },
    {
      label: "Delete",
      image: PageIndex.Svg.trash,
      onClick: (row) => handleOpenDelete(row),
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
        course_id: params.id,
      };
      const res = await getAllQuiz(data);
      console.log({ res });
      setData(res?.data || []);
      setPage(res?.meta?.page);
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

  useEffect(() => {
    fetchData();
  }, []);

  const setIndentRequest = (newData) => {
    setData(newData || []);
    setLoading((prev) => ({
      ...prev,
      pageLoading: false,
    }));
  };
  const { page, rowsPerPage, search, setPage, handlePageChange, handleRowsPerPageChange } = PageIndex.usePaginationHook(
    fetchData,
    setIndentRequest
  );

  return (
    <>
      <Index.Box className="admin-dashboard-content">
     

        <Index.Box className="admin-page-title-flex admin-page-title-main section-main">
          <Index.Typography
            className="admin-page-title"
            component="h2"
            variant="h2"
          >
            Questions
          </Index.Typography>
          <Index.Box className="admin-userlist-btn-flex">
            <Index.Box className="admin-userlist-inner-btn-flex">
              <Index.Box className="primary-btn-main">
                <Index.Button
                  className="primary-btn"
                  onClick={() =>
                    navigate("/admin/add-edit-quiz", {
                      state: {
                        course_details: courseData,
                        // section_details: state?.section_details,
                      },
                    })
                  }
                  disabled={isDisabled}
                >
                  Add Question
                </Index.Button>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>

        <Index.Box className="common-card">
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
              moduleName="Questions"
            />
          )}
        </Index.Box>
      </Index.Box>

      <PageIndex.ConfirmationModal
        open={deleteState.openDelete}
        handleClose={handleCloseDelete}
        handleSubmit={handleDeleteRecord}
        loading={loading.btnLoading}
        description="Are you sure you want to delete this question? This action can't be undone."
      />
    </>
  );
}
