import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import { getMyInternshipsService } from "../../../../redux/services/UserService";
import PageIndex from "../../../PageIndex";
import { imageUrl } from "../../../../config/DataService";
import { useNavigate } from "react-router-dom";

export default function MyInternships() {
  const [internshipList, setInternshipList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();
  const fetchData = async (searchTerm, pageNo, dataPerPage) => {
    setLoading(true);
    try {
      const data = {
        page: pageNo ?? page,
        limit: dataPerPage ?? rowsPerPage,
        search: searchTerm ?? search,
      };
      const res = await getMyInternshipsService(data);

      setInternshipList(res?.data || []);
      setPage(res?.meta.page);
      setTotalCount(res?.meta.totalCount);
      getNotificationCountData();
    } catch (error) {
      console.error("Error fetching team data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleInternshipDetails = (id) => {
    navigate(`/user/internship/${id}`);
  };
  const setIndentRequest = (newData) => {};

  const {
    page,
    rowsPerPage,
    search,
    setPage,
    handleSearchChange,
    handlePageChange,
    handleRowsPerPageChange,
  } = PageIndex.usePaginationHook(fetchData, setIndentRequest);

  return (
    <Index.Box className="admin-edit-profile-containt">
      {loading ? (
        <PageIndex.PageLoader />
      ) : (
        <Index.Box className="container">
          <Index.Box className="admin-page-title-flex admin-page-title-main">
            <Index.Typography
              className="admin-page-title"
              component="h2"
              variant="h2"
            >
              My Internships
            </Index.Typography>
          </Index.Box>

          <Index.Box className="my-certificate-list-main">
            {internshipList?.length ? (
              internshipList?.map((item) => (
                <Index.Box className="my-certificate-box">
                  <Index.Box className="my-certificate-inner-left course-internship-section">
                    <img
                      src={`${imageUrl}${item?.image}`}
                      className="course-image certificate-course-img"
                      onError={(e) => {
                        e.target.src = PageIndex.Png.CoursePlacholder;
                        e.target.style.objectFit = "contain";
                      }}
                    />
                    <Index.Box className="my-certificate-box-content">
                      <Index.Box className="my-certificate-text-flex">
                        <Index.Typography
                          className="certificate-label"
                          component="h2"
                          variant="h2"
                        >
                          Course Name :
                        </Index.Typography>
                        <Index.Typography
                          className="certificate-title"
                          component="h2"
                          variant="h2"
                        >
                          {item?.internship_title}
                        </Index.Typography>
                      </Index.Box>
                      <Index.Box className="my-certificate-text-flex">
                        <Index.Typography
                          className="certificate-label"
                          component="h2"
                          variant="h2"
                        >
                          Applied Date :
                        </Index.Typography>
                        <Index.Typography
                          className="certificate-title"
                          component="h2"
                          variant="h2"
                        >
                          {Index.moment(item?.created_at).format("MMM D, YYYY h:mm A")}
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>
                    <Index.Box className="my-certificate-inner-right internship-btns-box">
                      <PageIndex.PrimaryButton
                        className="primary-btn download-certificate-btn"
                        btnLabel="Join Whatsapp Group"
                        onClick={() => {
                          if (item?.whatsapp_link) {
                            window.open(item.whatsapp_link, "_blank");
                          }
                        }}
                      />                      
                      <PageIndex.PrimaryButton
                        className="primary-btn download-certificate-btn"
                        btnLabel="View Internship"
                        onClick={() => handleInternshipDetails(item?.internship_id)}
                      />
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              ))
            ) : (
              <Index.Box className="my-certificate-box no-certificate-box ">
                <Index.Typography
                  className="no-certificate"
                  component="h2"
                  variant="h2"
                >
                  No internships found
                </Index.Typography>
              </Index.Box>
            )}
          </Index.Box>
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
      )}
    </Index.Box>
  );
}
