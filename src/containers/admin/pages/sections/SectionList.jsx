import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { addSection, deleteSection, getSections } from "../../../../redux/services/AdminService";
import * as Yup from "yup";

const SectionList = ({ courseId ,courseData,isDisabled}) => {
  const navigate = PageIndex.useNavigate();
  const [editSectionData, setEditSection] = useState(null);
  const [sections, setSections] = useState({
    data: [],
    meta: { page: 1, limit: 10 },
  });
  const [deleteState, setDeleteState] = React.useState({
    openDelete: false,
    selectedRow: null,
  });
    const [sectionModal, setSectionModal] = useState(false);
  
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    sectionLoading: false,
  });
  const fields = [
    {
      name: "section_name",
      label: "Section name",
      type: "text",
      placeholder: "Section Name",
      validation: Yup.string().required("Please enter Section name"),
      handleChange: (e, formik) => {
        formik.setFieldValue("section_name", e.target.value);
      },
    },
  ];

  const sectionColumns = [
    {
      key: "#",
      label: "S.No.",
      width: "1%",
    },
    {
      key: "section_name",
      label: "Section Name",
      width: "4%",
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
      width: "5%",
      label: "Add Topic",
      image: PageIndex.Svg.addIcon,
      requiredPermission: "user_view",
      onClick: (row) =>
        navigate(`/admin/add-edit-topics`, {
          state: { course_details: courseData, section_details: row },
        }),
    },
    {
      width: "5%",
      label: "View Topics",
      image: PageIndex.Svg.activityLog,
      requiredPermission: "user_view",
      onClick: (row) =>
        navigate(`/admin/view-topics/${row.id}`, {
          state: { course_details: courseData, section_details: row },
        }),
    },
    {
        label: "Edit",
        image: PageIndex.Svg.editIcon,
        requiredPermission: "user_edit",
        onClick: (row) => {
            navigate("/admin/add-edit-sections", {
              state: { data: { course_id: courseId, id: row?.id } },
            })
        }
    },
    {
        label: "Delete",
        image: PageIndex.Svg.trash,
        requiredPermission: "user_delete",
        onClick: handleOpenDelete,
    },
  ];
    const fetchSections = async (searchTerm, pageNo, dataPerPage) => {
      try {
        setLoading((prev) => ({ ...prev, sectionLoading: true }));
  
        const response = await getSections({
          course_id: courseId,
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
  
    const handleAddSection = async (values) => {
      try {
        setLoading((prev) => ({ ...prev, btnLoading: true }));
  
        const requestData = {
          sectionName: values.section_name,
          courseId: courseData.CourseID,
        };
  
        const response = await addSection(requestData);
  
        if (response?.status === 201) {
          setSectionModal(false);
          fetchSections();
        }
      } catch (error) {
        console.error("Error adding section:", error);
      } finally {
        setLoading((prev) => ({ ...prev, btnLoading: false }));
      }
    };
  
    const handleEditSection = async (values, sectionId) => {
      try {
        setLoading((prev) => ({ ...prev, btnLoading: true }));
        const response = await fetch(
          `/api/courses/${courseId}/sections/${sectionId}`,
          {
            method: "PUT",
            body: JSON.stringify(values),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.ok) {
          setSectionModal(false);
          fetchSections();
        }
      } catch (error) {
        console.error("Error editing section:", error);
      } finally {
        setLoading((prev) => ({ ...prev, btnLoading: false }));
      }
    };
  
  
    const handleDeleteSection = async (data) => {
      try {
        setLoading((prev) => ({
          ...prev,
          btnLoading: true,
        }));    
        await deleteSection({ sectionId: deleteState.selectedRow?.id });
        fetchSections();
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
  } = PageIndex.usePaginationHook(fetchSections, setIndentRequest);
  
  useEffect(() => {
    if (courseId) {
      fetchSections();
    }
  }, [courseId]);
  return (
    <>
      <Index.Box className="admin-page-title-flex admin-page-title-main section-main">
        <Index.Typography
          className="admin-page-title"
          component="h2"
          variant="h2"
        >
          Sections List
        </Index.Typography>
        <Index.Box style={{ display: "flex", gap: "10px" }}>
          <Index.Box className="admin-userlist-inner-btn-flex">
            <Index.Box className="primary-btn-main">
              <Index.Button
                className="primary-btn"
                onClick={() =>
                  navigate("/admin/add-edit-sections", {
                    state: { data: { course_id: courseId } },
                  })
                }
                disabled={isDisabled}
                // onClick={() => setSectionModal(true)}
              >
                Add Section
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
            moduleName="Sections"
          />
        )}
      </Index.Box>
      <PageIndex.CommonFormModal
        isOpen={sectionModal}
        onClose={() => {
          setSectionModal(false);
          setEditSection(null);
        }}
        fields={fields}
        onSubmit={editSectionData ? handleEditSection : handleAddSection}
        formName="Section"
        initialData={editSectionData}
        loading={loading.btnLoading}
      />
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

export default SectionList;
