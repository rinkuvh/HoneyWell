import React, { useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { imageUrl } from "../../../../config/DataService";
import { useNavigate } from "react-router-dom";
function Intership({internshipList}) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleInternshipDetails = (id) => {
      navigate(`/user/internship/${id}`);
    };

    if(!internshipList?.length){
      return null;
    }
  
  return (
    <Index.Box>
      <Index.Box className="container">
        <Index.Box className="intership-box-cont">
          <h2 className="intership-title">My Learning Plan</h2>
        </Index.Box>
        <Index.Box className="my-certificate-list-main intership-box">
          {internshipList?.map((item) => (
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
                    btnLabel="View Learning Plan"
                    onClick={() => handleInternshipDetails(item?.internship_id)}
                  />
                </Index.Box>
              </Index.Box>
            </Index.Box>
          ))}
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
}

export default Intership;
