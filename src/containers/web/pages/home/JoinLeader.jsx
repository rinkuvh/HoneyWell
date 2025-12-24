import React from "react";
import Index from "../../../Index";
import "./JoinLeader.css";
import PageIndex from "../../../PageIndex";
import { colors } from "@mui/material";

function JoinLeader() {
  return (
    <Index.Box className="home-hero-main rm-mlr">
      <Index.Box className="join-leader-bg">
        <Index.Grid container alignItems={"center"}>
          <Index.Grid item xs={12} md={6}>
            <Index.Box className="join-leader-cont">
              <Index.Box className="section-content-main home-about-section">
                <Index.Typography className="section-title join-leader-title">
                  Inclusive Learning <br /> Limitless Possibilities
                </Index.Typography>
              </Index.Box>
            </Index.Box>
          </Index.Grid>
          <Index.Grid item xs={12} md={6}>
            <Index.Box className="join-leader-image-group">
              <img
                src={PageIndex.Png.CollageBg}
                className="collage-icon"
                alt="Collage"
              />
            </Index.Box>
          </Index.Grid>
          {/* <Index.Box className="join-leader-cont">
            <Index.Box className="section-content-main home-about-section">
              <Index.Typography className="section-title join-leader-title">
                Inclusive Learning <br /> Limitless Possibilities
              </Index.Typography>
            </Index.Box>
            <Index.Box className="join-leader-image-group">
              <img
                src={PageIndex.Png.CollageBg}
                className="collage-icon"
                alt="Collage"
              />
            </Index.Box>
            <Index.Box className="join-leader-image-group">
              <img
                src={PageIndex.Png.JoinImg1}
                alt="Team"
                className="jl-img jl-img-main"
              />
              <img
                src={PageIndex.Png.JoinImg2}
                alt="Code"
                className="jl-img jl-img-overlay"
              />
              <img
                src={PageIndex.Png.JoinImg3}
                alt="Presentation"
                className="jl-img jl-img-topright"
              />
              <img
                src={PageIndex.Png.JoinImg4}
                alt="Working"
                className="jl-img jl-img-bottomleft"
              />
            </Index.Box>
          </Index.Box> */}
        </Index.Grid>
      </Index.Box>
    </Index.Box>
  );
}

export default JoinLeader;
