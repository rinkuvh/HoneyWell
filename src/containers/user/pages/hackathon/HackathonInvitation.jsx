import React, { memo, useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  getHackathonTeamInvitationAction,
  hackathonInvitationStatus,
} from "../../../../redux/services/UserService";

const HackathonInvitation = () => {
  const [loading, setLoading] = useState({
    pageLoading: false,
    statusLoading: false,
    importBtnLoading: false,
  });

  const [statusModal, setStatusModal] = useState({
    open: false,
    selectedRow: null,
  });

  const [data, setData] = useState([]);

  const handleOpenStatus = (row, changeStatus) => {
    setStatusModal({ statusOpen: true, selectedRow: { ...row, changeStatus } });
  };

  const handleCloseStatus = () => {
    setStatusModal({ statusOpen: false, selectedRow: null });
  };

  const fetchData = async () => {
    setLoading((prev) => ({
      ...prev,
      pageLoading: true,
    }));
    try {
      const res = await getHackathonTeamInvitationAction();
      setData(res?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading((prev) => ({
        ...prev,
        pageLoading: false,
      }));
    }
  };

  const handleAcceptRejectInvitation = async () => {
    setLoading((prev) => ({
      ...prev,
      statusLoading: true,
    }));
    try {
      const payload = {
        invitationId: statusModal?.selectedRow?.invite_unique_id,
        status: statusModal?.selectedRow?.changeStatus,
      };
      const response = await hackathonInvitationStatus(payload);

      if (response?.status === 200) {
        fetchData();
        setLoading((prev) => ({
          ...prev,
          statusLoading: false,
        }));
        setStatusModal({ statusOpen: false, selectedRow: null });
      } else {
        setLoading((prev) => ({
          ...prev,
          statusLoading: false,
        }));
        setStatusModal({ statusOpen: false, selectedRow: null });
      }
    } catch (error) {
      setLoading((prev) => ({
        ...prev,
        statusLoading: false,
      }));
      setStatusModal({ statusOpen: false, selectedRow: null });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { key: "#", label: "S.No." },
    { key: "hackathon_title", label: "Internship Name", limit: 30 },
    { key: "team_name", label: "Team Name", limit: 30 },
    { key: "invited_by_name", label: "Invited By" },
    { key: "invite_status", label: "Invite Status" },
    { key: "invited_date", label: "Invited Date" },
  ];

  const actions = [
    {
      label: "Accept",
      image: PageIndex.Svg.approveIcon,
      onClick: (row) => {
        handleOpenStatus(row, "accepted");
      },
    },
    {
      label: "Reject",
      image: PageIndex.Svg.closeblack,
      onClick: (row) => {
        handleOpenStatus(row, "rejected");
      },
    },
  ];

  return (
    <>
      {data?.length > 0 ? (
        <>
          <Index.Box className="container">
            <Index.Box
              className="admin-page-title-flex admin-page-title-main user-dashboard-title-flex"
              sx={{ justifyContent: "center" }}
            >
              <Index.Typography
                className="admin-page-title"
                component="h2"
                variant="h2"
              >
                Internship Invitations
              </Index.Typography>
            </Index.Box>
          </Index.Box>

          <Index.Box className="container">
            <Index.Box className="admin-dashboad-row">
              <Index.Grid container spacing={2} className="grid-p-0">
                <Index.Grid item xs={12} sm={12} md={12}>
                  <Index.Box className="admin-dashboard-content">
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
                          moduleName="Invitation"
                        />
                      )}
                    </Index.Box>
                  </Index.Box>
                </Index.Grid>
              </Index.Grid>
            </Index.Box>
          </Index.Box>
          <br /> <br />

          <PageIndex.ConfirmationModal
            open={statusModal.statusOpen}
            handleClose={handleCloseStatus}
            handleSubmit={handleAcceptRejectInvitation}
            loading={loading.statusLoading}
            successBtnLabel={
              statusModal?.selectedRow?.changeStatus === "accepted"
                ? "Accept"
                : "Reject"
            }
            description={`Are you sure you want to ${
              statusModal?.selectedRow?.changeStatus === "accepted"
                ? "accept"
                : "reject"
            } this invitation ? This action can't be undone.`}
          />
        </>
      ) : null}
    </>
  );
};

export default memo(HackathonInvitation);
