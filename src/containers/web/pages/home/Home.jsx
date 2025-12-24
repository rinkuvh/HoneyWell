import React, { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";
import Faq from "./Faq";

export default function Home() {
  const [currentTab, setCurrentTab, homeSectionRef] = useOutletContext();

  const HEADER_HEIGHT = 86;

  const sectionsRefs = {
    ["home-hero-main"]: useRef(null),
    ["courses"]: useRef(null),
    ["contact-us"]: useRef(null),
    ["become-our-partner-main"]: useRef(null),
    ["prodest-achievements-main"]: useRef(null),
    ["about-coustomer-main"]: useRef(null),
    ["blog-main"]: useRef(null),
    ["faq-main"]: useRef(null),
  };

  const handleScroll = () => {
    for (const key in sectionsRefs) {
      const sectionRef = sectionsRefs[key];
      if (sectionRef.current) {
        const targetTop =
          sectionRef.current.getBoundingClientRect().top - HEADER_HEIGHT;
        const windowHeight = window.innerHeight;
        const threshold = windowHeight * 0.8;
        if (targetTop < threshold) {
          if (window.screen.width > 991) {
            setCurrentTab(key);
          }
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollMarginStyle = { scrollMarginTop: "100px" }; // Inline style to prevent hiding under header

  return (
    <>
      <Index.Box
        className="home-hero-main rm-mlr"
        ref={sectionsRefs["home-hero-main"]}
        id="home-hero-main"
        style={scrollMarginStyle}
      >
        <PageIndex.Hero />
      </Index.Box>

      <Index.Box>
        <PageIndex.JoinLeader />
      </Index.Box>

      <Index.Box
        className="about-coustomer-main about-section"
        id="about-coustomer-main"
        ref={sectionsRefs["about-coustomer-main"]}
        style={scrollMarginStyle}
      >
        <PageIndex.AboutNew />
      </Index.Box>

      {/* <Index.Box className="featured-partner-wrapper">
        <Index.Box
          className="featured-main"
          id="featured-main"
          ref={sectionsRefs["featured-main"]}
          style={scrollMarginStyle}
        >
          <PageIndex.Featured />
        </Index.Box>
        <Index.Box
          className="become-our-partner-main"
          id="become-our-partner-main"
          ref={sectionsRefs["become-our-partner-main"]}
          style={scrollMarginStyle}
        >
          <PageIndex.BecomeOurPartner />
        </Index.Box>
      </Index.Box> */}

      {/* <Index.Box
        className="about-coustomer-main about-section"
        id="about-coustomer-main"
        ref={sectionsRefs["about-coustomer-main"]}
        style={scrollMarginStyle}
      >
        <PageIndex.AboutCoustomer />
      </Index.Box> */}

      <Index.Box
        className="blog-main blog-main-hide-scroll"
        id="courses"
        ref={sectionsRefs["courses"]}
        style={scrollMarginStyle}
      >
        <PageIndex.Blog />
      </Index.Box>

      <Index.Box
        className="blog-main"
        id="contact-us"
        ref={sectionsRefs["contact-us"]}
        style={scrollMarginStyle}
      >
        <PageIndex.ContactSect />
      </Index.Box>
      {/* <Index.Box className="container">
        <Index.Box className="sect-border"></Index.Box>
      </Index.Box> */}
      <Index.Box
        className="about-coustomer-main about-section"
        id="faq-main"
        ref={sectionsRefs["faq-main"]}
        style={scrollMarginStyle}
      >
        <Faq />
      </Index.Box>

      <PageIndex.GoToTop />
    </>
  );
}
