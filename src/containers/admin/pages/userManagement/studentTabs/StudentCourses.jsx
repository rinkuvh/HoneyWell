import React, { useState } from "react";
import Index from "../../../../Index";
import PageIndex from "../../../../PageIndex";
import { getStudentCoursesService } from "../../../../../redux/services/AdminService";
import { useParams } from "react-router-dom";

const StudentCourses = () => {
  const [courses, setCourses] = useState({
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
    { key: "course_thumbnail", label: "Image", limit: 30, width: "3%" ,type:"image"},
    {
      key: "course_title",
      label: "Course Name",
      width: "4%",
    },
    {
      key: "total_topic_count",
      label: "Total Topics",
      width: "4%",
    },
    {
      key: "total_completed_topic_count",
      label: "Completed Topics",
      width: "4%",
      render: (row) => row.total_completed_topic_count || "0"
    },
    {
        key: "status",
        label: "Status",
        width: "4%",
    },
  ];

  const fetchData = async (searchTerm, pageNo, dataPerPage) => {
    try {
      setLoading((prev) => ({ ...prev, dataLoading: true }));

      const response = await getStudentCoursesService(studentId, {
        page: pageNo ?? page,
        limit: dataPerPage ?? rowsPerPage,
      });
      if (response) {
        setCourses(response);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
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
            data={courses.data}
            pagination={{
              currentPage: page,
              rowsPerPage: rowsPerPage,
              totalRows: courses.meta.totalRecords,
              handlePageChange: handlePageChange,
              handleRowsPerPageChange: handleRowsPerPageChange,
            }}
            moduleName="Courses"
          />
        )}
      </Index.Box>
    </>
  );
};

export default StudentCourses;
