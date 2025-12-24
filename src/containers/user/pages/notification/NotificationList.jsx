import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  getNotificationListService,
  getUnreadNotificationService,
} from "../../../../redux/services/UserService";
import { setNotificationCountAction } from "../../../../redux/slices/UserSlice";

const NotificationList = () => {
  const navigate = PageIndex.useNavigate();
  const dispatch = PageIndex.useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const columns = [
    { key: "#", label: "S.No.", width: "6%" },
    { key: "title", label: "Title", width: "15%" },
    { key: "message", label: "Message", width: "25%", limit: 60 },
    { key: "created_at", label: "Created At", width: "15%", type: "datetime" },
  ];

  const getNotificationCountData = async () => {
    try {
      const response = await getUnreadNotificationService();
      if (response?.status === 200) {
        dispatch(setNotificationCountAction(response?.data?.unreadCount));
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const fetchData = async (searchTerm, pageNo, dataPerPage) => {
    setLoading(true);
    try {
      const data = {
        page: pageNo ?? page,
        limit: dataPerPage ?? rowsPerPage,
        search: searchTerm ?? search,
      };
      const res = await getNotificationListService(data);

      setData(res?.data || []);
      setPage(res?.meta.page);
      setTotalCount(res?.meta.totalRecords);
      getNotificationCountData();
    } catch (error) {
      console.error("Error fetching team data:", error);
    } finally {
      setLoading(false);
    }
  };

  const setIndentRequest = (newData) => {
    // setData(newData || []);
    // setLoading((prev) => ({
    //   ...prev,
    //   pageLoading: false,
    // }));
  };

  const {
    page,
    rowsPerPage,
    search,
    setPage,
    handleSearchChange,
    handlePageChange,
    handleRowsPerPageChange,
  } = PageIndex.usePaginationHook(fetchData, setIndentRequest);

  useEffect(() => {
    fetchData();
  }, []);

  const actions = [
    {
      width: "10%",
      label: "View",
      image: PageIndex.Svg.yelloweye,
      onClick: (row) => navigate(`/user/view-notification/${row?.team_id}`),
    },
  ];

  return (
    <>
      <Index.Box className="admin-edit-profile-containt">
        <Index.Box className="container">
          <Index.Box className="admin-dashboard-content">
            <Index.Box className="admin-page-title-flex admin-page-title-main">
              <Index.Typography
                className="admin-page-title"
                component="h2"
                variant="h2"
              >
                Notifications
              </Index.Typography>
            </Index.Box>
            {loading ? (
              <PageIndex.PageLoader />
            ) : data?.length ? (
              data?.map((item) => (
                <Index.Box className="my-certificate-box">
                  <Index.Box className="my-certificate-inner-left">
                    <Index.Box className="my-certificate-box-content">
                      <Index.Box className="notification-flex-wrapper">
                        <Index.Box className={`notification-header`}>
                          <Index.Typography
                            variant="subtitle1"
                            component="div"
                            className="notification-title"
                          >
                            {item.title}
                          </Index.Typography>

                          <Index.Typography
                            color="text.secondary"
                            className={`notification-date desktop`}
                          >
                            {Index.moment(item?.created_at).format(
                              "DD MMM, YYYY hh:mm A"
                            )}
                          </Index.Typography>
                        </Index.Box>

                        <Index.Typography
                          variant="body2"
                          color="text.secondary"
                          className="notification-message"
                        >
                          {item.message}
                        </Index.Typography>
                        <Index.Typography
                          color="text.secondary"
                          className={`notification-date mobile`}
                        >
                          {Index.moment(item?.created_at).format(
                            "DD MMM, YYYY hh:mm A"
                          )}
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              ))
            ) : (
              <Index.Box sx={{ p: 3, textAlign: "center" }}>
                <Index.Typography variant="body1" color="text.secondary">
                  No notifications to display
                </Index.Typography>
              </Index.Box>
            )}
            {totalCount >= 10 && (
              <Index.Box className="admin-pagination-main">
                <Index.TablePagination
                  className="pagination"
                  component="div"
                  count={totalCount}
                  page={page - 1}
                  onPageChange={handlePageChange}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleRowsPerPageChange}
                />
              </Index.Box>
            )}
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
};

export default NotificationList;
