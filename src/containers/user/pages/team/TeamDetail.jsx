import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { getTeamDetailService } from "../../../../redux/services/UserService";
import { imageUrl } from "../../../../config/DataService";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function TeamDetail() {
  const navigate = PageIndex.useNavigate();
  const params = useParams();
  const courseId = params.id;

  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    sectionLoading: false,
  });
  const [teamData, setTeanData] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

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
      key: "is_certificate",
      label: "Certificate",
      width: "10%",
      type: "iconImage",
      style: {
        width: "20px",
        height: "20px",
      },
      render: (row) =>
        row?.has_certificate == 1
          ? PageIndex.Svg.approveIcon
          : PageIndex.Svg.closeblack,
    },
    { key: "member_status", label: "Status", width: "15%" },
  ];

  const {
    page,
    rowsPerPage,
    search,
    setPage,
    handleSearchChange,
    handlePageChange,
    handleRowsPerPageChange,
  } = PageIndex.usePaginationHook(fetchData);

  return (
    <>
      <Index.Box className="container">
        {loading.pageLoading ? (
          <PageIndex.PageLoader />
        ) : (
          <Index.Box className="admin-dashboard-content">
            <Index.Box className="admin-page-title-flex admin-page-title-main admin-title-flex-box btm-border">
              <Index.Typography
                className="admin-page-title"
                component="h2"
                variant="h2"
                sx={{ color: "#109cc7 !important" }}
              >
                View Team : {teamData?.teamData?.team_name || ""} |{" "}
                {teamData?.teamData?.hackathon_name || ""}
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

            <Index.Box className="hackathon-detail-view">
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
                        md: "span 3",
                        lg: "span 3",
                      }}
                      className="grid-column team-detail-box"
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
                        md: "span 3",
                        lg: "span 3",
                      }}
                      className="grid-column team-detail-box"
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
                        md: "span 3",
                        lg: "span 3",
                      }}
                      className="grid-column team-detail-box"
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
                        md: "span 3",
                        lg: "span 3",
                      }}
                      className="grid-column team-detail-box"
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
                        md: "span 3",
                        lg: "span 3",
                      }}
                      className="grid-column team-detail-box"
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

                    {teamData?.documents?.length > 0 && (
                      <Index.Box
                        gridColumn={{
                          xs: "span 12",
                          sm: "span 6",
                          md: "span 3",
                          lg: "span 3",
                        }}
                        className="grid-column team-detail-box"
                      >
                        <Index.Box className="add-page-form-main">
                          <Index.Box className="admin-input-box">
                            <Index.FormHelperText className="admin-form-lable">
                              Documents
                            </Index.FormHelperText>
                            <Index.Typography className="view-card-data-value cus-view-card-data-link">
                              {teamData?.documents &&
                              teamData?.documents.length > 0
                                ? teamData?.documents.map((document, index) => (
                                    <div key={index}>
                                      <a
                                        href={`${imageUrl}${document.file_path}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                          textDecoration: "none",
                                          color: "inherit",
                                        }}
                                      >
                                        {`Document_${index + 1}`}
                                      </a>
                                    </div>
                                  ))
                                : "-"}
                            </Index.Typography>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    )}

                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 6",
                        md: "span 3",
                        lg: "span 3",
                      }}
                      className="grid-column team-detail-box"
                    >
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box">
                          <Index.FormHelperText className="admin-form-lable">
                            Created Date & Time
                          </Index.FormHelperText>
                          <Index.Typography className="view-card-data-value">
                            {formatDateTime(teamData?.teamData?.created_at) ||
                              "-"}
                          </Index.Typography>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>

                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 6",
                        md: "span 3",
                        lg: "span 3",
                      }}
                      className="grid-column team-detail-box"
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

                    {teamData?.teamData?.feedback_text && (
                      <Index.Box
                        gridColumn={{
                          xs: "span 12",
                          sm: "span 12",
                          md: "span 12",
                          lg: "span 12",
                        }}
                        className="grid-column team-detail-box"
                      >
                        <Index.Box className="add-page-form-main">
                          <Index.Box className="admin-input-box">
                            <Index.FormHelperText className="admin-form-lable">
                              Admin Feedback
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
                <Index.Box
                  className="btm-brder"
                  style={{ margin: "16px 0" }}
                ></Index.Box>
                <Index.Box className="card-border">
                  <Index.Typography
                    className="admin-page-team-title"
                    component="h6"
                    variant="h6"
                    style={{ margin: "16px 0" }}
                  >
                    Team Member List
                  </Index.Typography>
                  <PageIndex.CommonTable
                    columns={columns}
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
            </Index.Box>
          </Index.Box>
        )}
      </Index.Box>
    </>
  );
}
