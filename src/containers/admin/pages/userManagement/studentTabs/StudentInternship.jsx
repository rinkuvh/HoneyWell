import React, { useState } from "react";
import Index from "../../../../Index";
import PageIndex from "../../../../PageIndex";
import { getStudentInternshipsService } from "../../../../../redux/services/AdminService";
import { useParams } from "react-router-dom";

const StudentInternship = () => {
  const [internships, setInternships] = useState({
    data: [],
    meta: { page: 1, limit: 10 },
  });
  const params = useParams();
  const studentId = params?.id;

  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    dataLoading: false,
  });

  const columns = [
    {
      key: "#",
      label: "S.No.",
      width: "1%",
    },
    { key: "image", label: "Image", limit: 30, width: "3%" ,type:"image"},
    {
      key: "course_title",
      label: "Course Name",
      width: "4%",
    },
    {
      key: "created_at",
      label: "Applied date",
      width: "4%",
      type: "datetime",
    },
  ];

  const fetchData = async (searchTerm, pageNo, dataPerPage) => {
    try {
      setLoading((prev) => ({ ...prev, dataLoading: true }));

      const response = await getStudentInternshipsService(studentId, {
        page: pageNo ?? page,
        limit: dataPerPage ?? rowsPerPage,
      });
      if (response) {
        setInternships(response);
      }
    } catch (error) {
      console.error("Error fetching internships:", error);
    } finally {
      setLoading((prev) => ({ ...prev, dataLoading: false }));
    }
  };

  const setIndentRequest = (newData) => {};

  const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } =
    PageIndex.usePaginationHook(fetchData, setIndentRequest);
  return (
    <>
      <Index.Box className="common-card" sx={{ marginBottom: "20px" }}>
        {loading.dataLoading ? (
          <PageIndex.PageLoader />
        ) : (
          <PageIndex.CommonTable
            columns={columns}
            data={internships.data}
            pagination={{
              currentPage: page,
              rowsPerPage: rowsPerPage,
              totalRows: internships.meta.totalRecords,
              handlePageChange: handlePageChange,
              handleRowsPerPageChange: handleRowsPerPageChange,
            }}
            moduleName="Internships"
          />
        )}
      </Index.Box>
    </>
  );
};

export default StudentInternship;
