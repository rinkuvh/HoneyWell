import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  findUserByIdAndEmail,
  getMyTeamDetail,
  inviteMemberInTeamAction,
} from "../../../../redux/services/UserService";
import CommonTable from "../../../../components/common/commonTable/CommonTable";
import { useParams } from "react-router-dom";

export default function InviteMember() {
  const [loading, setLoading] = useState(true);
  const [isInviting, setIsInviting] = useState(false);
  const navigate = PageIndex?.useNavigate();
  const location = PageIndex.useLocation();
  const [teamDetail, setTeamDetail] = useState(null);
  const [userData, setUserData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [findBtnLoader, setFindBtnLoader] = useState(false);
  const params = useParams();

  const initialValues = {
    teamMember: "",
  };

  const validationSchema = Yup.object({
    // teamMember: Yup.array().min(1,"Team Member is required"),
  });

  const handleSubmit = async (values) => {
    const selectedUserIds = selectedUsers.map((user) => user.id);
    const data = {
      teamId: params.teamId,
      hackathonId: params.hackathonId,
      members: selectedUserIds,
    };

    try {
      const res = await inviteMemberInTeamAction(data);
      if (res?.status === 201 || res?.status === 200) {
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const findUser = async (data) => {
    setFindBtnLoader(true);
    setUserData([]);
    try {
      const res = await findUserByIdAndEmail(
        data,
        teamDetail?.teamData?.hackathon_name
      );
      if (res?.status === 200) {
        setUserData(res.data);
      }
    } catch (error) {
      console.log(error, "error");
    }
    setFindBtnLoader(false);
  };

  const handleUserRemove = (userId) => {
    setSelectedUsers((prev) =>
      prev.filter((user) => user.user_unique_id !== userId)
    );
  };

  const fetchTeamDetail = async () => {
    try {
      const response = await getMyTeamDetail(params?.teamId);
      if (response?.status === 200) {
        setTeamDetail(response?.data);

        setTimeout(() => {
          setLoading(false);
        }, 500);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    } catch (error) {}
  };

  const handleInviteMember = async (memberId, setFieldValue) => {
    setIsInviting(true);
    try {
      const data = {
        teamId: params?.teamId,
        hackathonId: params?.hackathonId,
        memberId,
      };

      const response = await inviteMemberInTeamAction(data);
      if (response?.status === 201 || response?.status === 200) {
        fetchTeamDetail();
        setTimeout(() => {
          setIsInviting(false);
          setUserData([]);
          setFieldValue("teamMember", "");
        }, 500);
      } else {
        setTimeout(() => {
          setIsInviting(false);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        setIsInviting(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchTeamDetail();
  }, []);

  return (
    <Index.Box className="container">
      {loading ? (
        <PageIndex.PageLoader />
      ) : (
        <Index.Box className="admin-dashboard-content invite-member-main">
          <Index.Box className="admin-page-title-flex admin-page-title-main btm-border">
            <Index.Typography
              className="admin-page-title"
              component="h2"
              variant="h2"
            >
              Invite Member :{" "}
              <span className="title-module">
                {teamDetail?.teamData?.hackathon_name || ""}
              </span>
            </Index.Typography>
            <PageIndex.PrimaryButton
              className="primary-btn"
              btnLabel="Back"
              onClick={() => navigate(-1)}
            />
          </Index.Box>
          <Index.Box className="hackathon-detail-view">
            <Index.Box className="common-card">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ handleChange, handleBlur, values, setFieldValue }) => (
                  <Form
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.type !== "textarea") {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Index.Box sx={{ width: 1 }} className="grid-main">
                      <Index.Box
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        // gap={1}
                      >
                        {/* Team Name Input */}
                        <Index.Box
                          gridColumn={{ xs: "span 12" }}
                          className="grid-column"
                        >
                          <Index.Box className="team-cont-box">
                            <Index.Box
                              className="team-detail-box"
                              sx={{ width: "auto" }}
                            >
                              <Index.Typography className="team-detail-label">
                                Team Name :
                              </Index.Typography>
                              <Index.Typography className="team-detail-value">
                                {teamDetail?.teamData?.team_name || ""}
                              </Index.Typography>
                            </Index.Box>
                            <Index.Box className="user-data-table">
                              <Index.Typography
                                variant="h6"
                                className="find-user-text"
                              >
                                {`Invited Members (${
                                  teamDetail?.members?.length || 0
                                } of ${
                                  teamDetail?.teamData?.max_team_size || 0
                                })`}
                              </Index.Typography>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>

                        {/* Invited Member */}
                        <Index.Box
                          gridColumn={{ xs: "span 12" }}
                          className="grid-column"
                        >
                          <Index.Box className="user-data-table">
                            <CommonTable
                              columns={[
                                { key: "member_unique_id", label: "User  ID" },
                                { key: "member_name", label: "Name" },
                                { key: "member_email", label: "Email" },
                                {
                                  key: "member_status",
                                  label: "Invite Status",
                                },
                              ]}
                              data={teamDetail?.members}
                              pagination={{
                                currentPage: 1,
                                rowsPerPage: 10,
                                totalRows: teamDetail?.members?.length,
                                handlePageChange: () => {},
                                handleRowsPerPageChange: () => {},
                              }}
                              moduleName="Invited Member"
                            />
                          </Index.Box>
                        </Index.Box>

                        {/* Team Member Input with Find Button */}
                        {teamDetail?.members?.length <
                          teamDetail?.teamData?.max_team_size && (
                          <Index.Box
                            gridColumn={{ xs: "span 12" }}
                            className="grid-column"
                          >
                            <Index.Box
                              className="add-page-form-main cus-add-page-form-main"
                              display="flex"
                              alignItems="center"
                            >
                              <Index.Box
                                className="admin-input-box"
                                sx={{ flexGrow: 1, marginTop: "16px" }}
                              >
                                <Index.FormHelperText className="admin-form-lable">
                                  Find Team Member (Email or User ID)
                                </Index.FormHelperText>
                                <Index.Box
                                  sx={{
                                    display: "flex",
                                    gap: "16px",
                                    alignItems: "center",
                                  }}
                                >
                                  <Index.Box className="admin-form-group">
                                    <Field
                                      as={Index.TextField}
                                      fullWidth
                                      className="admin-form-control"
                                      placeholder="Find Team Member (Email or User ID)"
                                      autoComplete="off"
                                      name="teamMember"
                                      onChange={(e) => {
                                        handleChange(e);
                                        if (userData?.length > 0) {
                                          setUserData([]);
                                        }
                                      }}
                                      onBlur={handleBlur}
                                      value={values.teamMember}
                                    />
                                    <ErrorMessage
                                      name="teamMember"
                                      component="div"
                                      className="error-message"
                                    />
                                  </Index.Box>
                                  <Index.Box
                                    className="admin-userlist-inner-btn-flex"
                                    sx={{ marginTop: "0 !important" }}
                                  >
                                    <PageIndex.PrimaryButton
                                      className="primary-btn"
                                      btnLabel="Find"
                                      onClick={() =>
                                        findUser(values.teamMember)
                                      }
                                      loading={findBtnLoader}
                                      disabled={!values.teamMember}
                                    />
                                  </Index.Box>
                                </Index.Box>
                              </Index.Box>
                              <Index.Box></Index.Box>
                            </Index.Box>
                          </Index.Box>
                        )}
                      </Index.Box>
                      <br />

                      {/* User Data Table */}
                      {teamDetail?.members?.length <
                        teamDetail?.teamData?.max_team_size &&
                        userData?.length > 0 && (
                          <Index.Box className="user-data-table">
                            <Index.Typography
                              variant="h6"
                              className="find-user-text"
                            >
                              Find User
                            </Index.Typography>
                            <CommonTable
                              columns={[
                                { key: "user_unique_id", label: "User  ID" },
                                { key: "name", label: "Name" },
                                { key: "email", label: "Email" },
                                {
                                  key: "action",
                                  label: "Action",
                                  render: (user) => {
                                    const isAlreadyInvited =
                                      teamDetail?.members?.find(
                                        (member) =>
                                          member?.member_id === user?.id
                                      );
                                    return isAlreadyInvited ? (
                                      isAlreadyInvited?.member_status ===
                                      "Pending" ? (
                                        <PageIndex.BorderButton
                                          className="admin-modal-cancel-btn border-btn"
                                          btnLabel="Sent"
                                          disableRipple
                                        />
                                      ) : (
                                        <PageIndex.BorderButton
                                          className="admin-modal-cancel-btn border-btn"
                                          btnLabel="Accepted"
                                          disableRipple
                                        />
                                      )
                                    ) : (
                                      <PageIndex.PrimaryButton
                                        className="primary-btn"
                                        btnLabel="Invite"
                                        onClick={() =>
                                          handleInviteMember(
                                            user?.id,
                                            setFieldValue
                                          )
                                        }
                                        loading={isInviting}
                                      />
                                    );
                                  },
                                },
                              ]}
                              data={userData}
                              pagination={{
                                currentPage: 1,
                                rowsPerPage: 10,
                                totalRows: userData.length,
                                handlePageChange: () => {},
                                handleRowsPerPageChange: () => {},
                              }}
                              moduleName="Find User"
                            />
                          </Index.Box>
                        )}

                      {/* Selected Users Table */}
                      {teamDetail?.members?.length <
                        teamDetail?.teamData?.max_team_size &&
                        selectedUsers?.length > 0 && (
                          <Index.Box className="user-data-table">
                            <Index.Typography
                              variant="h6"
                              className="find-user-text"
                            >
                              Selected User
                            </Index.Typography>
                            <CommonTable
                              columns={[
                                { key: "user_unique_id", label: "User  ID" },
                                { key: "name", label: "Name" },
                                { key: "email", label: "Email" },
                                {
                                  key: "action",
                                  label: "Action",
                                  render: (user) => (
                                    <Index.Button
                                      className="remove-btn"
                                      onClick={() =>
                                        handleUserRemove(user.user_unique_id)
                                      }
                                    >
                                      Remove
                                    </Index.Button>
                                  ),
                                },
                              ]}
                              data={selectedUsers}
                              pagination={{
                                currentPage: 1,
                                rowsPerPage: 10,
                                totalRows: selectedUsers.length,
                                handlePageChange: () => {},
                                handleRowsPerPageChange: () => {},
                              }}
                              moduleName="Selected Users"
                            />
                          </Index.Box>
                        )}
                    </Index.Box>
                  </Form>
                )}
              </Formik>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      )}
    </Index.Box>
  );
}
