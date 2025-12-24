import React, { useEffect, useState } from "react";
import Index from "../../../../Index";
import PageIndex from "../../../../PageIndex";
import {
  deleteInternshipWeekManagement,
  getInternshipWeekManagement,
} from "../../../../../redux/services/AdminService";
const assignmentReqObj = {
  0: "No",
  1: "Yes"
}
const WeekWiseManagementList = ({
  internshipCourseId,
  courseData,
}) => {
  console.log({ internshipCourseId, courseData });
  const navigate = PageIndex.useNavigate();
  const [sections, setSections] = useState({
    data: [],
    meta: { page: 1, limit: 10 },
  });
  const [deleteState, setDeleteState] = React.useState({
    openDelete: false,
    selectedRow: null,
  });

  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    sectionLoading: false,
  });

  const sectionColumns = [
    {
      key: "#",
      label: "S.No.",
      width: "1%",
    },
    {
      key: "title",
      label: "Title",
      width: "4%",
    },
    {
      key: "courses",
      label: "Courses",
      width: "4%",
      render: (row)=>{
        const displayData = row?.courses?.length ? row?.courses?.map((course)=>course?.course_title).join(", ") : "-";
        return displayData
      },
      limit: 40
    },
    {
      key: "assignment_required",
      label: "Assignment Required",
      width: "4%",
      render: (row)=>{
        const displayData = assignmentReqObj[row?.assignment_required] || "-";
        return displayData
      },
      limit: 40
    },
    {
      key: "created_at",
      label: "Created At",
      width: "4%",
      type: "datetime",
    },
  ];
  const handleOpenDelete = async (row) => {
    setDeleteState({ openDelete: true, selectedRow: row });
  };

  const handleCloseDelete = () => {
    setDeleteState({ openDelete: false, selectedRow: null });
  };
  const sectionAction = [
    {
      width: "1%",
      label: "View",
      image: PageIndex.Svg.yelloweye,
      requiredPermission: "user_view",
      onClick: (row) =>
        navigate(`/admin/internship-course/view-weekwise-management/${row?.id}`, {}),
    },
    {
      label: "Edit",
      image: PageIndex.Svg.editIcon,
      requiredPermission: "user_edit",
      onClick: (row) => {
        navigate(
          `/admin/internship-course/edit-weekwise-management/${row.id}`,
          {
            state: { internshipCourse: internshipCourseId },
          }
        );
      },
    },
    {
      label: "Delete",
      image: PageIndex.Svg.trash,
      requiredPermission: "user_delete",
      onClick: handleOpenDelete,
    },
  ];
  const fetchData = async (searchTerm, pageNo, dataPerPage) => {
    try {
      setLoading((prev) => ({ ...prev, sectionLoading: true }));

      const response = await getInternshipWeekManagement({
        internshipId: internshipCourseId,
        page: pageNo ?? page,
        limit: dataPerPage ?? rowsPerPage,
      });
      if (response) {
        setSections(response);
      }
    } catch (error) {
      console.error("Error fetching sections:", error);
    } finally {
      setLoading((prev) => ({ ...prev, sectionLoading: false }));
    }
  };

  const handleDeleteSection = async (data) => {
    try {
      setLoading((prev) => ({
        ...prev,
        btnLoading: true,
      }));
      await deleteInternshipWeekManagement(deleteState.selectedRow?.id);
      fetchData();
      handleCloseDelete();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading((prev) => ({
        ...prev,
        btnLoading: false,
      }));
    }
  };
  const setIndentRequest = (newData) => {
    setSections(newData || []);
    setLoading((prev) => ({
      ...prev,
      pageLoading: false,
    }));
  };

  const {
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
  } = PageIndex.usePaginationHook(fetchData, setIndentRequest);

  useEffect(() => {
    if (internshipCourseId) {
      fetchData();
    }
  }, [internshipCourseId]);
  return (
    <>
      <Index.Box className="admin-page-title-flex admin-page-title-main section-main">
        <Index.Typography
          className="admin-page-title"
          component="h2"
          variant="h2"
        >
          Week-wise Management
        </Index.Typography>
        <Index.Box style={{ display: "flex", gap: "10px" }}>
          <Index.Box className="admin-userlist-inner-btn-flex">
            <Index.Box className="primary-btn-main">
              <Index.Button
                className="primary-btn"
                onClick={() =>
                  navigate("/admin/internship-course/add-weekwise-management", {
                    state: { internshipCourse: internshipCourseId },
                  })
                }
                disabled={loading.sectionLoading || sections.data?.length >= 8}
              >
                Add Week-wise Management
              </Index.Button>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
      <Index.Box className="common-card" sx={{ marginBottom: "20px" }}>
        {loading.sectionLoading ? (
          <PageIndex.PageLoader />
        ) : (
          <PageIndex.CommonTable
            columns={sectionColumns}
            data={sections.data}
            actions={sectionAction}
            pagination={{
              currentPage: page,
              rowsPerPage: rowsPerPage,
              totalRows: sections?.meta?.totalRecords,
              handlePageChange: handlePageChange,
              handleRowsPerPageChange: handleRowsPerPageChange,
            }}
            moduleName="Week-wise Management"
          />
        )}
      </Index.Box>
      <PageIndex.ConfirmationModal
        open={deleteState.openDelete}
        handleClose={handleCloseDelete}
        handleSubmit={handleDeleteSection}
        loading={loading.btnLoading}
        description="Are you sure you want to delete this section? This action can't be undone."
      />
    </>
  );
};

export default WeekWiseManagementList;
