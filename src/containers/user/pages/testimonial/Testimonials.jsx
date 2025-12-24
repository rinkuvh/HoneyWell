import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import { getAllTestimonials } from "../../../../redux/services/UserService";
import PageIndex from "../../../PageIndex";
import { imageUrl } from "../../../../config/DataService";
import { Pagination } from "@mui/material";

const Testimonials = () => {
  const backgrounds = ["#CBCFF0", "#EAB79F", "#D2C1D6"];
  const navigate = PageIndex.useNavigate();
  const [testimonialData, setTestimonialData] = useState([]);
  const [loadingTestimonial, setLoadingTestimonial] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(9);
  const [totalCount, setTotalCount] = useState(0);

  const getTestimonialsList = async (pageNo = 1, limit = 9) => {
    setLoadingTestimonial(true);
    try {
      const response = await getAllTestimonials({ page: pageNo, limit });
      if (response?.status === 200) {
        setTestimonialData(response?.data);
        setTotalCount(response?.meta?.totalRecords);
      } else {
        setTestimonialData([]);
      }
    } catch (error) {
      setTestimonialData([]);
    } finally {
      setLoadingTestimonial(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    getTestimonialsList(page, rowsPerPage);
  }, [page]);

  return (
    <>
      <Index.Box className="cms-section testimonial-main">
        <Index.Box className="container">
          <Index.Box className="section-content-main">
            <Index.Typography className="section-title">
              Testimonials
            </Index.Typography>
          </Index.Box>
        </Index.Box>

        {loadingTestimonial ? (
          <PageIndex.PageLoader />
        ) : testimonialData?.length > 0 ? (
          <Index.Box className="container">
            <Index.Box className="admin-dashboad-row">
              <Index.Grid container spacing={3}>
                {testimonialData.map((item, index) => (
                  <Index.Grid item xs={12} sm={6} md={4} key={index}>
                    <Index.Box
                      sx={{
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                        textAlign: "center",
                        overflow: "hidden",
                        position: "relative",
                        paddingBottom: 3,
                      }}
                    >
                      {/* Colored Top Header */}
                      <Index.Box
                        sx={{
                          height: "90px",
                          background: backgrounds[index % backgrounds.length],
                          borderTopLeftRadius: "10px",
                          borderTopRightRadius: "10px",
                          clipPath: "circle(68% at 50% -92%)",
                        }}
                      />

                      {/* Avatar */}
                      <Index.Box
                        sx={{
                          position: "relative",
                          top: "-40px",
                          marginBottom: "-30px",
                        }}
                      >
                        <img
                          // src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
                          src={
                            `${imageUrl}${item.image}`
                              ? `${imageUrl}${item.image}`
                              : "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
                          }
                          alt={item.title}
                          style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            border: "4px solid white",
                            objectFit: "cover",
                          }}
                        />
                      </Index.Box>

                      {/* Name */}
                      <Index.Typography
                        variant="h6"
                        sx={{ fontWeight: "bold" }}
                      >
                        {item.title}
                      </Index.Typography>

                      {/* Rating */}
                      <Index.Box sx={{ my: 1 }}>
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            style={{
                              color:
                                i < Math.floor(item.rating || 0)
                                  ? "#FFA534"
                                  : "#ccc",
                              fontSize: "18px",
                            }}
                          >
                            ★
                          </span>
                        ))}
                        {/* {item.rating % 1 !== 0 && (
                          <span style={{ color: "#FFA534", fontSize: "18px" }}>
                            ½
                          </span>
                        )} */}
                      </Index.Box>

                      {/* Description */}
                      <Index.Box className="card-description-custom">
                        <Index.Typography
                          variant="body2"
                          sx={{
                            fontSize: "14px",
                            color: "#444",
                            px: 2,
                            textAlign: "start",
                            mb: 1,
                            fontStyle: "italic",
                            minHeight: "80px",
                          }}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                        </Index.Typography>
                      </Index.Box>

                      {/* Course */}
                      <Index.Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: "#333",
                          mb: 0.5,
                        }}
                      >
                        {item.course}
                      </Index.Typography>

                      {/* Placement */}
                      <Index.Box sx={{ textAlign: "left", mt: 1, ml: 2 }}>
                        <Index.Typography
                          variant="body2"
                          sx={{ color: "#333" }}
                        >
                          {item.stream ? item.stream : "-"}
                        </Index.Typography>
                        <Index.Typography
                          variant="body2"
                          sx={{ color: "#333" }}
                        >
                          <b>College:</b> {item.placed_in || "—"}
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>
                  </Index.Grid>
                ))}
              </Index.Grid>

              {/* Pagination */}
              {totalCount > rowsPerPage && (
                <Index.Box className="pagination-container" mt={4}>
                  <Pagination
                    count={Math.ceil(totalCount / rowsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Index.Box>
              )}
            </Index.Box>
          </Index.Box>
        ) : (
          <Index.Box className="container">
            <Index.Box className="admin-dashboad-row no-data-box">
              <Index.Typography className="no-data-text">
                No testimonial found
              </Index.Typography>
            </Index.Box>
          </Index.Box>
        )}
      </Index.Box>
    </>
  );
};

export default Testimonials;
