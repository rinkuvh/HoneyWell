import React, { useRef, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";

export default function BecomeOurPartner() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    document.getElementById("partner-video").play();
  };

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <Index.Box className="partner-section">
        <Index.Box className="container-fluid">
          <Index.Box className="partner-cust-box">
            <Index.Box className="partner-row-main">
              <Index.Box className="section-content-main">
                <Index.Box className="video-cust-box">
                  {!isPlaying && (
                    <div className="video-overlay" onClick={handlePlay}>
                      <div className="css-play-icon"></div>
                    </div>
                  )}
                  <video
                    id="partner-video"
                    width="100%"
                    // poster={PageIndex.Png.LearningImg}
                    // controls
                    // autoPlay
                    loop 
                    ref={videoRef}
                    onClick={togglePlayPause}
                  >
                    <source src={PageIndex.Png.AiVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
      <PageIndex.GoToTop />
    </>
  );
}
