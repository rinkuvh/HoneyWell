import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  deleteQuiz,
  deleteUserWiseTeamByAdmin,
  deleteUserWiseTeamMember,
} from "../../../../redux/services/AdminService";
import { getTeamDetailByHackathon } from "../../../../redux/services/UserService";

export default function HackathonTeam({ courseDetail,getSingleCourse }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    pageLoading: false,
    btnLoading: false,
    importBtnLoading: false,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [deleteState, setDeleteState] = React.useState({
    openDelete: false,
    selectedRow: null
  });

  const [deleteTeamState, setDeleteTeamState] =useState({
    openDelete: false,
    selectedRow: null
  })

  const params = PageIndex.useParams();
  const [teamDetail, setTeamDetail] = useState(null);
  const handleCloseDelete = () => {
    setDeleteState({ openDelete: false, selectedRow: null });
  };

  const handleInviteMember = (team) => {
    navigate(
      `/user/hackathon/${team?.hackathon_id}/${team?.team_id}/invite-member`
    );
  };

  const handleDeleteRecord = async () => {
    setLoading((prev) => ({
      ...prev,
      btnLoading: true,
    }));
    try {
      // const response = await deleteQuiz({ id: deleteState?.selectedRow?.id });
      // await deleteUserWiseTeamMember({ id: deleteState?.selectedRow?.id });
      const params = {
        team_id: teamDetail?.teamData?.team_id,
        member_id: deleteState?.selectedRow?.member_id,
      };
      await deleteUserWiseTeamMember(params);
      setDeleteState({ openDelete: false, selectedRow: null });
      setLoading((prev) => ({
        ...prev,
        btnLoading: false,
      }));

      fetchData();
      getSingleCourse();
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

  const columns = [
    { key: "member_unique_id", label: "User ID" },
    { key: "member_name", label: "Name", limit: 30 },
    { key: "member_email", label: "Email" },
    { key: "member_status", label: "Invite Status" },
  ];

  const actions = [
    {
      label: "Delete",
      image: PageIndex.Svg.trash,
      requiredPermission: "user_delete",
      isHidden: (row) => {
        return row?.is_admin == 1;
      },
      onClick: (row) => handleOpenDelete(row),
    },
  ];

  const handleOpenDelete = (row) => {
    // console.log("row",row,teamDetail?.teamData?.team_id)
    setDeleteState({ openDelete: true, selectedRow: row });
  };

  const fetchData = async () => {
    setLoading((prev) => ({
      ...prev,
      pageLoading: true,
    }));
    try {
      const res = await getTeamDetailByHackathon(params.id);
      // setData(res?.data || []);
      if (res?.status === 200) {
        setTeamDetail(res?.data || []);
        setPage(res?.meta?.page);
        setTotalCount(res?.meta.totalRecords);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading((prev) => ({
        ...prev,
        pageLoading: false,
      }));
    }
  };

  const handleEditTeam = (hackathon_id,teamId) => {
    try {
      navigate(`/user/edit-Team/${hackathon_id}/${teamId}`);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
      // setLoading((prev) => ({
      //   ...prev,
      //   pageLoading: false,
      // }));
    }
  }

  const handleOpenTeamDelete = (row) => {
    setDeleteTeamState({ openDelete: true, selectedRow: row });
  };

   const handleCloseTeamDelete = () => {
    setDeleteTeamState({ openDelete: false, selectedRow: null });
  };


  const handleDeleteTeamRecord = async () => {
    setLoading((prev) => ({
      ...prev,
      btnLoading: true,
    }));
    try {

      await deleteUserWiseTeamByAdmin({ team_id: deleteTeamState?.selectedRow?.team_id });
      setDeleteTeamState({ openDelete: false, selectedRow: null });
      setLoading((prev) => ({
        ...prev,
        btnLoading: false,
      }));
      setTeamDetail(null)
      // navigate(`/user/hackathon/${selectedRow?.hackathon_id}`)
      
      // fetchData();
    } catch (err) {
      console.log(err);
      setDeleteTeamState({ openDelete: false, selectedRow: null });
    } finally {
      setLoading((prev) => ({
        ...prev,
        btnLoading: false,
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {teamDetail?.members?.length > 0 && teamDetail ? (
        <>
          <Index.Grid item md={12} xs={12} sm={12}>
            <Index.Box className="hackathon-team-main">
              <Index.Box className="admin-dashboard-content">
                <Index.Box className="course-content-section">
                  <Index.Box className="course-content-heading-flex cus-course-content-heading">
                    <Index.Typography
                      component="h3"
                      variant="h3"
                      className="course-content-heading"
                    >
                      {teamDetail?.teamData?.team_name || ""}
                      
                    </Index.Typography>
                    
                    {(!teamDetail ||
                      teamDetail?.teamData?.is_team_admin == 1) && (
                      <Index.Box className="admin-userlist-inner-btn-flex team-btn-flex">
                        {teamDetail?.teamData?.is_doc == 0 && (
                          <Index.Tooltip title="Upload Document">
                            <Index.Button
                              disableRipple
                              className="upload-document-btn"
                              onClick={() =>
                                navigate(
                                  `/user/team-upload-doc/${teamDetail?.teamData?.team_id}`
                                )
                              }
                            >
                              <img
                                className="upload-icon"
                                src={PageIndex.Png.arrow}
                              />
                            </Index.Button>
                          </Index.Tooltip>
                        )}
                        <PageIndex.PrimaryButton
                          className="primary-btn"
                          btnLabel="Delete Team"
                          onClick={() => handleOpenTeamDelete(teamDetail?.teamData)}
                        />
                        <PageIndex.PrimaryButton
                          className="primary-btn"
                          btnLabel="Edit Team"
                          onClick={() => handleEditTeam(teamDetail?.teamData?.hackathon_id,teamDetail?.teamData?.team_id)}
                        />
                        <Index.Box className="primary-btn-main">
                          <Index.Button
                            className="primary-btn"
                            onClick={() => {
                              if (teamDetail?.teamData?.team_id) {
                                handleInviteMember(teamDetail?.teamData);
                              } else {
                                // handleCreateTeam(courseDetail?.id);
                              }
                            }}
                          >
                            {teamDetail?.teamData?.team_id
                              ? "Invite Member"
                              : "Create Team"}
                          </Index.Button>
                        </Index.Box>
                      </Index.Box>
                    )}
                  </Index.Box>
                </Index.Box>

                <Index.Box className="common-card">
                  {loading?.pageLoading ? (
                    <PageIndex.PageLoader />
                  ) : (
                    <PageIndex.CommonTable
                      columns={columns}
                      data={teamDetail?.members}
                      actions={
                        teamDetail?.teamData?.is_team_admin == 1 ? actions : []
                      }
                      //   onSearch={handleSearch}
                      pagination={{
                        currentPage: 1,
                        rowsPerPage: 10,
                        totalRows: teamDetail?.members?.length || 0,
                        handlePageChange: () => {},
                        handleRowsPerPageChange: () => {},
                      }}
                      moduleName="Team"
                    />
                  )}
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Grid>

          <PageIndex.ConfirmationModal
            open={deleteState.openDelete}
            handleClose={handleCloseDelete}
            handleSubmit={handleDeleteRecord}
            loading={loading.btnLoading}
            description="Are you sure you want to delete this member? This action can't be undone."
          />

          <PageIndex.ConfirmationModal
            open={deleteTeamState.openDelete}
            handleClose={handleCloseTeamDelete}
            handleSubmit={handleDeleteTeamRecord}
            loading={loading.btnLoading}
            description="Are you sure you want to delete this team? This action can't be undone."
          />
        </>
      ) : null}
    </>
  );
}
