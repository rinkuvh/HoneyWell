import React, { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  deleteTopic,
  getAllTopics,
  getCourses,
  updateTopicStatusService,
} from "../../../../redux/services/AdminService";
import { imageUrl } from "../../../../config/DataService";

export default function TopicsList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    importBtnLoading: false,
    courseInfoLoading: false,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [deleteState, setDeleteState] = React.useState({
    openDelete: false,
    selectedRow: null,
  });

  const params = PageIndex.useParams();

  const [data, setData] = useState([]);

  const { state } = useLocation();
  const [courseData, setCourseData] = useState(state?.course_details);

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
      const response = await deleteTopic({ id: deleteState?.selectedRow?.id });
      setDeleteState({ openDelete: false, selectedRow: null });
      setLoading((prev) => ({
        ...prev,
        btnLoading: false,
      }));

      fetchData();
    } catch (err) {
      console.log(err);
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
      console.log({ row });
      const response = await updateTopicStatusService({
        id: row.id,
        status: row.status === 1 ? 0 : 1,
      });
      if (response) {
        fetchData();
      }
    } catch (error) {}
  };
  const columns = [
    { key: "#", label: "S.No." },
    { key: "name", label: "Title", limit: 30 },
    // { key: "description", label: "Description", limit: 50 },
    { key: "created_at", label: "Created Date" },
    {
      key: "status",
      label: "Status",
      type: "switch",
      handleChange: (e, row) => handleStatusUpdate(e, row),
    },
  ];

  const actions = [
    {
      label: "View",
      image: PageIndex.Svg.yelloweye,
      onClick: (row) => {
        navigate(`/admin/topic-detail/${row?.id}`);
      },
    },
    {
      label: "Edit",
      image: PageIndex.Svg.editIcon,
      onClick: (row) =>
        navigate(`/admin/add-edit-topics/${row.id}`, {
          state: {
            course_details: courseData,
            section_details: state?.section_details,
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
        section_id: params.id,
      };
      const res = await getAllTopics(data);
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

  function formatDuration(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);

    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
  }

  const setIndentRequest = (newData) => {
    setData(newData || []);
    setLoading((prev) => ({
      ...prev,
      pageLoading: false,
    }));
  };
  const { page, rowsPerPage, search, setPage } = PageIndex.usePaginationHook(
    fetchData,
    setIndentRequest
  );
  const fetchCourseDetails = async (courseId) => {
    try {
      setLoading((prev) => ({ ...prev, courseInfoLoading: true }));
      const response = await getCourses({ CourseID: courseId });

      if (response?.data) {
        const course = response.data;
        setCourseData(course);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading((prev) => ({ ...prev, courseInfoLoading: false }));
    }
  };
  useEffect(() => {
    if (state?.course_details?.CourseID) {
      fetchCourseDetails(state?.course_details?.CourseID);
    }
  }, [state?.course_details]);
  console.log("231: ", loading);
  if (loading?.courseInfoLoading) {
    return <PageIndex.PageLoader />;
  }
  return (
    <>
      <Index.Box className="admin-dashboard-content">
        <Index.Box className="admin-page-title-flex admin-page-title-main admin-title-flex-box">
          <Index.Typography
            className="admin-page-title"
            component="h2"
            variant="h2"
          >
            Course Details | {courseData?.Title} |{" "}
            {state?.section_details?.section_name}
          </Index.Typography>
          <Index.Box className="admin-userlist-inner-btn-flex">
            <Index.Box className="primary-btn-main">
              <Index.Button
                className="primary-btn"
                onClick={() => navigate(`/admin/view-course/${state?.course_details?.CourseID}`)}
              >
                Back
              </Index.Button>
            </Index.Box>
          </Index.Box>
        </Index.Box>

        <Index.Box className="common-card view-card card-bottom-space">
          <Index.Box className="view-card-title-flex">
            <Index.Typography className="view-card-title">
              <img
                src={PageIndex.Svg.companyIcon}
                alt="Topic"
                className="view-card-icons"
              />{" "}
              Course Information{" "}
            </Index.Typography>
          </Index.Box>

          <Index.Box className="view-details-wrapper">
            <Index.Box
              gridColumn={{
                xs: "span 12",
                sm: "span 12",
                md: "span 12",
                lg: "span 12",
              }}
              className="grid-column"
            >
              <Index.Box className="admin-input-box add-user-input">
                <Index.FormHelperText className="admin-form-lable">
                  Section Image
                </Index.FormHelperText>
                <Index.Box className="admin-form-group">
                  <Index.Box className="file-upload-btn-main">
                    <img
                      className="file-upload-profile-img"
                      src={`${imageUrl}${state?.section_details?.image}`}
                      // crossOrigin="anonymous"
                      alt="Section Image"
                      onError={(e) => {
                        e.target.src = PageIndex.Png.CoursePlacholder;
                      }}
                    />
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
            <Index.Box className="view-details-main">
              <Index.Box className="view-card-data-flex">
                <Index.Typography className="view-card-data-lable">
                  Section:
                </Index.Typography>
                <Index.Typography className="view-card-data-value">
                  {state?.section_details?.section_name}
                </Index.Typography>
              </Index.Box>
              <Index.Box className="view-card-data-flex">
                <Index.Typography className="view-card-data-lable">
                  Course Description:
                </Index.Typography>
                <Index.Typography
                  className="view-card-data-value"
                  dangerouslySetInnerHTML={{
                    __html: courseData?.Description || "",
                  }}
                />
              </Index.Box>

              <Index.Box className="view-card-data-flex">
                <Index.Typography className="view-card-data-lable">
                  Course Name:
                </Index.Typography>
                <Index.Typography className="view-card-data-value">
                  {courseData?.Title}
                </Index.Typography>
              </Index.Box>

              <Index.Box className="view-card-data-flex">
                <Index.Typography className="view-card-data-lable">
                  Created At:
                </Index.Typography>
                <Index.Box className="view-card-data-value">
                  {Index.moment(state.section_details.created_at).format(
                    "DD-MM-YYYY HH:mm:ss"
                  )}
                </Index.Box>
              </Index.Box>

              <Index.Box className="view-card-data-flex">
                <Index.Typography className="view-card-data-lable">
                  Course Duration:
                </Index.Typography>
                <Index.Box className="view-card-data-value">
                  {formatDuration(courseData?.Duration || 0)}
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>

        <Index.Box className="admin-page-title-flex admin-page-title-main">
          <Index.Typography
            className="admin-page-title"
            component="h2"
            variant="h2"
          >
            Topics List
          </Index.Typography>
          <Index.Box className="admin-userlist-btn-flex">
            <Index.Box className="admin-userlist-inner-btn-flex">
              <Index.Box className="primary-btn-main">
                <Index.Button
                  className="primary-btn"
                  onClick={() =>
                    navigate("/admin/add-edit-topics", {
                      state: {
                        course_details: courseData,
                        section_details: state?.section_details,
                      },
                    })
                  }
                >
                  Add Topics
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
                currentPage: 1,
                rowsPerPage: 10,
                totalRows: data.length,
                handlePageChange: () => {},
                handleRowsPerPageChange: () => {},
              }}
              moduleName="Topics"
            />
          )}
        </Index.Box>
      </Index.Box>

      <PageIndex.ConfirmationModal
        open={deleteState.openDelete}
        handleClose={handleCloseDelete}
        handleSubmit={handleDeleteRecord}
        loading={loading.btnLoading}
        description="Are you sure you want to delete this topic? This action can't be undone."
      />
    </>
  );
}
