import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { getFaqListAction } from "../../../../redux/services/UserService";

const Faq = () => {
  const [listData, setListData] = useState([]);
  const [expanded, setExpanded] = useState('panel0');


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getFaqList = async () => {
    try {
      const res = await getFaqListAction();
      if (res?.status === 200) {
        setListData(res?.data);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getFaqList();
  }, []);
  return (
    <>
      {listData?.length > 0 ? (
        <Index.Box className="faq-new-box">
          <Index.Box className="about-coustomer-section about-box">
            <Index.Box className="container">
              <Index.Box className="section-content-main">
                <Index.Typography className="section-title">
                  FAQs
                </Index.Typography>
                <Index.Box className="faq-cont-box">
                  {listData?.length > 0 &&
                    listData?.map((item, index) => (
                      <Index.Accordion
                        key={index}
                        className="faq-cont-detail"
                        expanded={expanded === `panel${index}`}
                        onChange={handleChange(`panel${index}`)}
                      >
                        <Index.AccordionSummary
                          expandIcon={<Index.ExpandMoreIcon />}
                          aria-controls={`panel${index}-content`}
                          id={`panel${index}-header`}
                          className="faq-cont-list"
                        >
                          <Index.Typography className="faq-title">
                            {item?.question}
                          </Index.Typography>
                        </Index.AccordionSummary>
                        <Index.AccordionDetails>
                          <Index.Typography
                            className="faq-descript"
                            dangerouslySetInnerHTML={{
                              __html: item?.answer,
                            }}
                          ></Index.Typography>
                        </Index.AccordionDetails>
                      </Index.Accordion>
                    ))}
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          <PageIndex.GoToTop />
        </Index.Box>
      ) : (
        ""
      )}
    </>
  );
};

export default Faq;
