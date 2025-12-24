import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  deleteUserWiseTeamMemberByAdmin,
  getTeamDetailService,
} from "../../../../redux/services/AdminService";
import { imageUrl } from "../../../../config/DataService";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function TeamDetail() {
  const navigate = PageIndex.useNavigate();
  const params = useParams();
  const courseId = params.id;
  const [deleteState, setDeleteState] = React.useState({
    openDelete: false,
    selectedRow: null,
  });

  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    sectionLoading: false,
  });
  const [imgURL, setImageUrl] = useState(null);
  const [teamData, setTeanData] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  // console.log({ teamData });

  const initialValues = {
    courseTitle: "",
    description: "",
    image: null,
    duration: "",
  };

  const formik = Index.useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: PageIndex.CourseSchema,
  });

  useEffect(() => {
    if (courseId) {
      fetchData();
    }
  }, [courseId]);

  const formatDateTime = (date) => {
    if (!date) return "";
    return moment(date).add(8, "hours").format("MMM D, YYYY h:mm A");
  };

  const fetchData = async (searchTerm, pageNo, dataPerPage) => {
    setLoading((prev) => ({ ...prev, pageLoading: true }));
    try {
      const data = {
        id: courseId,
        page: pageNo ?? page,
        limit: dataPerPage ?? rowsPerPage,
        search: searchTerm ?? search,
      };
      const response = await getTeamDetailService(data);

      if (response?.data) {
        const course = response.data;
        setTeanData(course);
        setPage(course?.meta.page);
        setTotalCount(course?.meta.totalRecords);
        formik.setValues({
          courseTitle: course.Title,
          description: course.Description,
          image: course.Thumbnail,
          duration: course.Duration,
        });
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  };

  const columns = [
    { key: "#", label: "S.No.", width: "6%" },
    { key: "member_name", label: "Member Name", width: "15%" },
    { key: "member_email", label: "Member Email", width: "15%" },
    {
      key: "member_status",
      label: "Team Lead",
      width: "15%",
      render: (row) => {
        let status = row?.is_admin == 1 ? "Yes" : "No";
        return status;
      },
    },
    { key: "member_status", label: "Status", width: "15%" },
  ];

  const actions = [
    {
      label: "Delete",
      image: PageIndex.Svg.trash,
      // requiredPermission: "user_delete",
      onClick: (row) => handleOpenDelete(row),
      width: "5%",
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
    // console.log("teamData",deleteState)
    // console.log("teamData2",teamData)
    try {
      const params = {
        team_id: teamData?.teamData?.team_id,
        member_id: deleteState?.selectedRow?.member_id,
      };
      const response = await deleteUserWiseTeamMemberByAdmin(params);
      setDeleteState({ openDelete: false, selectedRow: null });
      setLoading((prev) => ({
        ...prev,
        btnLoading: false,
      }));
      if (response?.data?.teamDelete) {
        navigate("/admin/team-list");
      } else {
        fetchData();
      }
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

  const {
    page,
    rowsPerPage,
    search,
    setPage,
    handlePageChange,
    handleRowsPerPageChange,
  } = PageIndex.usePaginationHook(fetchData);

  const downloadFile = async (filePath, fileLabel) => {

    // console.log("filePath",filePath)
    // console.log("filePath",fileLabel)
    const fileExtension = filePath.slice(filePath.lastIndexOf("."));
    const fileName = `${fileLabel}${fileExtension}`;

    try {
      const response = await fetch(`${imageUrl}${filePath}`);

      if (!response.ok) {
        throw new Error("Failed to download file.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  return (
    <>
      {loading.pageLoading ? (
        <PageIndex.PageLoader />
      ) : (
        <Index.Box className="admin-dashboard-content">
          <Index.Box className="admin-page-title-flex admin-page-title-main admin-title-flex-box">
            <Index.Typography
              className="admin-page-title breadcrumb-text"
              component="h2"
              variant="h2"
            >
              View Team
              <span>({teamData?.teamData?.team_unique_id})</span>
            </Index.Typography>
            <Index.Box className="admin-userlist-inner-btn-flex">
              <Index.Box className="primary-btn-main">
                <Index.Button
                  className="primary-btn"
                  onClick={() => navigate(-1)}
                >
                  Back
                </Index.Button>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          <Index.Box className="common-card">
            <Index.Box sx={{ width: 1 }} className="grid-main">
              <Index.Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap={{ xs: 2, sm: 2, md: 2, lg: 2 }}
              >
                <Index.Box
                  gridColumn={{
                    xs: "span 12",
                    sm: "span 6",
                    md: "span 6",
                    lg: "span 6",
                  }}
                  className="grid-column"
                >
                  <Index.Box className="add-page-form-main">
                    <Index.Box className="admin-input-box">
                      <Index.FormHelperText className="admin-form-lable">
                        Team Name
                      </Index.FormHelperText>
                      <Index.Typography className="view-card-data-value">
                        {teamData?.teamData?.team_name || "-"}
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>

                <Index.Box
                  gridColumn={{
                    xs: "span 12",
                    sm: "span 6",
                    md: "span 6",
                    lg: "span 6",
                  }}
                  className="grid-column"
                >
                  <Index.Box className="add-page-form-main">
                    <Index.Box className="admin-input-box">
                      <Index.FormHelperText className="admin-form-lable">
                        Internship Name
                      </Index.FormHelperText>
                      <Index.Typography className="view-card-data-value">
                        {teamData?.teamData?.hackathon_name || "-"}
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>

                <Index.Box
                  gridColumn={{
                    xs: "span 12",
                    sm: "span 6",
                    md: "span 6",
                    lg: "span 6",
                  }}
                  className="grid-column"
                >
                  <Index.Box className="add-page-form-main">
                    <Index.Box className="admin-input-box">
                      <Index.FormHelperText className="admin-form-lable">
                        Team Admin
                      </Index.FormHelperText>
                      <Index.Typography className="view-card-data-value">
                        {teamData?.teamData?.created_by_name || "-"}
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>

                <Index.Box
                  gridColumn={{
                    xs: "span 12",
                    sm: "span 6",
                    md: "span 6",
                    lg: "span 6",
                  }}
                  className="grid-column"
                >
                  <Index.Box className="add-page-form-main">
                    <Index.Box className="admin-input-box">
                      <Index.FormHelperText className="admin-form-lable">
                        Team Admin Email Id
                      </Index.FormHelperText>
                      <Index.Typography className="view-card-data-value">
                        {teamData?.teamData?.created_by_email || "-"}
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>

                <Index.Box
                  gridColumn={{
                    xs: "span 12",
                    sm: "span 6",
                    md: "span 6",
                    lg: "span 6",
                  }}
                  className="grid-column"
                >
                  <Index.Box className="add-page-form-main">
                    <Index.Box className="admin-input-box">
                      <Index.FormHelperText className="admin-form-lable">
                        Max Team Size
                      </Index.FormHelperText>
                      <Index.Typography className="view-card-data-value">
                        {teamData?.teamData?.max_team_size || "-"}
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>

                <Index.Box
                  gridColumn={{
                    xs: "span 12",
                    sm: "span 6",
                    md: "span 6",
                    lg: "span 6",
                  }}
                  className="grid-column"
                >
                  <Index.Box className="add-page-form-main">
                    <Index.Box className="admin-input-box">
                      <Index.FormHelperText className="admin-form-lable">
                        Created Date & Time
                      </Index.FormHelperText>
                      <Index.Typography className="view-card-data-value">
                        {formatDateTime(teamData?.teamData?.created_at) || "-"}
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>

                {teamData?.documents?.length > 0 && (
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 6",
                      lg: "span 6",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="add-page-form-main">
                      <Index.Box className="admin-input-box">
                        <Index.FormHelperText className="admin-form-lable">
                          Documents
                        </Index.FormHelperText>

                        <Index.Typography className="view-card-data-value document-text">
                          {teamData?.documents && teamData?.documents.length > 0
                            ? teamData?.documents.map((document, index) => {
                                const fileLabel = `${
                                  teamData?.teamData?.team_id || ""
                                }_${
                                  teamData?.teamData?.team_name || ""
                                }_Document_${index + 1}`;
                                return (
                                  <span key={index}>
                                    <span
                                      onClick={() =>
                                        downloadFile(
                                          document.file_path,
                                          fileLabel.replace(/\s+/g,"_")
                                        )
                                      }
                                      className="a-text"
                                      style={{
                                        cursor: "pointer",
                                        color: "blue",
                                        textDecoration: "underline",
                                      }}
                                    >
                                      {fileLabel.replace(/\s+/g,"_")}
                                    </span>
                                    {index !== teamData.documents.length - 1 &&
                                      ", "}
                                  </span>
                                );
                              })
                            : "-"}
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                )}

                {teamData?.teamData?.feedback_given_at && (
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 6",
                      lg: "span 6",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="add-page-form-main">
                      <Index.Box className="admin-input-box">
                        <Index.FormHelperText className="admin-form-lable">
                          Feedback Given At
                        </Index.FormHelperText>
                        <Index.Typography className="view-card-data-value">
                          {formatDateTime(
                            teamData?.teamData?.feedback_given_at
                          ) || "-"}
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                )}

                {teamData?.teamData?.feedback_text && (
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 12",
                      md: "span 12",
                      lg: "span 12",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="add-page-form-main">
                      <Index.Box className="admin-input-box">
                        <Index.FormHelperText className="admin-form-lable">
                          Feedback
                        </Index.FormHelperText>
                        <Index.Typography
                          className="view-card-data-value ck-editor-text"
                          dangerouslySetInnerHTML={{
                            __html: teamData?.teamData?.feedback_text,
                          }}
                        />
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                )}
              </Index.Box>
            </Index.Box>
          </Index.Box>

          <Index.Box className="card-border common-card">
            <Index.Typography
              className="admin-page-team-title"
              component="h6"
              variant="h6"
            >
              Member List
            </Index.Typography>
            <PageIndex.CommonTable
              columns={columns}
              actions={actions}
              data={teamData?.members}
              pagination={{
                currentPage: page,
                rowsPerPage: rowsPerPage,
                totalRows: totalCount,
                handlePageChange: handlePageChange,
                handleRowsPerPageChange: handleRowsPerPageChange,
              }}
              moduleName="Team member"
            />
          </Index.Box>
        </Index.Box>
      )}
      <PageIndex.ConfirmationModal
        open={deleteState.openDelete}
        handleClose={handleCloseDelete}
        handleSubmit={handleDeleteRecord}
        loading={loading.btnLoading}
        description="Are you sure you want to delete this member? This action can't be undone."
      />
    </>
  );
}
