import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import { imageUrl } from "../../../../config/DataService";
import {
  getAllTestimonials,
  getTestimonial,
} from "../../../../redux/services/UserService";
import { useParams } from "react-router-dom";
import PageIndex from "../../../PageIndex";

const TestimonialDetail = () => {
  const navigate = PageIndex.useNavigate();
  const backgrounds = ["#CBCFF0", "#EAB79F", "#D2C1D6"];
  const [testimonialData, setTestimonialData] = useState([]);
  const [loadingTestimonial, setLoadingTestimonial] = useState(true);
  const params = useParams();
  const courseId = params.id;

  const [testimonialDetail, setTestimonialDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const getTestimonialData = async () => {
    try {
      const response = await getTestimonial({ id: courseId });
      if (response?.status === 200) {
        setTestimonialDetail(response?.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } else {
        setTestimonialDetail(null);
        setLoading(false);
      }
    } catch (error) {
      setTestimonialDetail(null);
      setLoading(false);
    }
  };

  const getTestimonialsList = async () => {
    try {
      const response = await getAllTestimonials();
      if (response?.status === 200) {
        setTestimonialData(response?.data);
        setLoadingTestimonial(false);
      } else {
        setTestimonialData([]);
        setLoadingTestimonial(false);
      }
    } catch (error) {
      setLoadingTestimonial(false);
      setTestimonialData([]);
    }
  };

  useEffect(() => {
    if (courseId) {
      getTestimonialData();
      getTestimonialsList();
    }
  }, [courseId]);

  const handleTestimonialDetail = (id) => {
    navigate(`/testimonials/${id}`);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 300);
  };

  return (
    <Index.Box className="course-detail-main course-detail-box custom-course-details">
      {loading ? (
        <PageIndex.PageLoader />
      ) : (
        <>
          <Index.Box className="container">
            <Index.Grid container spacing={2}>
              <Index.Grid item md={12} xs={12} sm={12}>
                <Index.Box className="course-detail-header btm-border">
                  <Index.Box className="course-detail-title-flex">
                    <Index.Typography
                      component="h1"
                      variant="h1"
                      className="course-detail-title d-none"
                    >
                      {testimonialDetail?.title || ""}
                    </Index.Typography>
                    <Index.Box className="primary-btn-main">
                      <Index.Button
                        className="primary-btn"
                        onClick={() => navigate("/testimonials")}
                      >
                        Back
                      </Index.Button>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Grid>
              <Index.Grid item md={8} xs={12} sm={12}>
                <Index.Box
                  sx={{ marginTop: "16px" }}
                  className="course-detail-description"
                  dangerouslySetInnerHTML={{
                    __html: testimonialDetail?.description,
                  }}
                />
              </Index.Grid>
              <Index.Grid item md={4} xs={12} sm={12}>
                <Index.Box>
                  <img
                    src={`${imageUrl}${testimonialDetail?.image}` || ""}
                    className="blog-img"
                    alt="Course image"
                  />
                </Index.Box>
              </Index.Grid>
            </Index.Grid>
          </Index.Box>

          <Index.Box className="container">
            <Index.Box className="section-title-flex">
              <Index.Box className="section-content-main">
                <Index.Typography className="section-title cus-testimonial-title">
                  Recently added
                </Index.Typography>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          {loadingTestimonial ? (
            <PageIndex.PageLoader />
          ) : (
            <Index.Box className="container">
              <Index.Box className="admin-dashboad-row">
                <Index.Grid container spacing={2} className="grid-p-0">
                  {testimonialData?.slice(0, 4)?.map((item, index) => (
                    <Index.Grid item xs={12} sm={6} md={4} key={index}>
                      <Index.Box className="blog-section popular-sect dash-sect">
                        <Index.Box className="container">
                          <Index.Box
                            className="blog-card cus-testimonial-card"
                            style={{
                              background:
                                backgrounds[index % backgrounds.length],
                            }}
                          >
                            <Index.Box className="course-image-box cus-testimo-img-detail">
                              <img
                                src={`${imageUrl}${item?.image}` || ""}
                                className="blog-img"
                              />
                            </Index.Box>
                            <Index.Box className="blog-card-content-box cus-testimonial-read-box">
                              <Index.Typography
                                className="blog-card-title cus-blog-card-title cus-testimonial"
                                variant="p"
                                component="p"
                              >
                                {item?.title}
                              </Index.Typography>
                              <Index.Box
                                className="dash-hackathon-card"
                                onClick={() =>
                                  handleTestimonialDetail(item?.id)
                                }
                              >
                                <Index.Typography>Read More</Index.Typography>
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Grid>
                  ))}
                </Index.Grid>
              </Index.Box>
            </Index.Box>
          )}
        </>
      )}
    </Index.Box>
  );
};

export default TestimonialDetail;
