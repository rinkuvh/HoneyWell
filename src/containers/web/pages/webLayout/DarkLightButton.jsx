import React, { useState, useEffect, useLayoutEffect } from "react";
import PageIndex from "../../../PageIndex";
import "./darkLightButton.css";
import Index from "../../../Index";

function darkLightButton() {
  // Initialize states with localStorage values or defaults
  const [contrastMode, setContrastMode] = useState(null);
  const [highlightLinks, setHighlightLinks] = useState(null);
  const [fontSizeMode, setFontSizeMode] = useState(null);
  const [textSpacing, setTextSpacing] = useState(null);
  const [lineHeightIncreased, setLineHeightIncreased] = useState(null);

  // Flag to track initialization
  const [initialized, setInitialized] = useState(false);

  const navigate = Index.useNavigate();
  const location = Index.useLocation();

  // Initialize settings only once on component mount using useLayoutEffect
  // to ensure settings are applied before the first render
  useLayoutEffect(() => {
    if (initialized) return;

    // Load settings from localStorage
    const savedContrastMode = localStorage.getItem("contrastMode") || "normal";
    const savedHighlightLinks =
      localStorage.getItem("highlightLinks") === "true";
    const savedFontSizeMode = localStorage.getItem("fontSizeMode") || "normal";
    const savedTextSpacing = localStorage.getItem("textSpacing") === "true";
    const savedLineHeight =
      localStorage.getItem("lineHeightIncreased") === "true";

    // Update state with loaded values
    setContrastMode(savedContrastMode);
    setHighlightLinks(savedHighlightLinks);
    setFontSizeMode(savedFontSizeMode);
    setTextSpacing(savedTextSpacing);
    setLineHeightIncreased(savedLineHeight);

    // Apply settings immediately on initialization
    applySettings(
      savedContrastMode,
      savedHighlightLinks,
      savedFontSizeMode,
      savedTextSpacing,
      savedLineHeight
    );

    setInitialized(true);
  }, [initialized]);

  // Function to apply all settings
  const applySettings = (contrast, links, fontSize, spacing, lineHeight) => {
    // Handle contrast modes
    if (contrast === "high") {
      document.body.classList.add("high-contrast");
      document.body.classList.remove("normal-contrast");
    } else {
      document.body.classList.remove("high-contrast");
      document.body.classList.add("normal-contrast");
    }

    // Handle link highlighting
    if (links) {
      document.body.classList.add("highlight-links");
    } else {
      document.body.classList.remove("highlight-links");
    }

    // Handle font size
    document.body.classList.remove(
      "font-size-increased",
      "font-size-decreased",
      "font-size-normal"
    );
    document.body.classList.add(`font-size-${fontSize}`);

    // Handle text spacing
    if (spacing) {
      document.body.classList.add("increased-text-spacing");
    } else {
      document.body.classList.remove("increased-text-spacing");
    }

    // Handle line height
    if (lineHeight) {
      document.body.classList.add("increased-line-height");
    } else {
      document.body.classList.remove("increased-line-height");
    }
  };

  // Effect for state changes (not on initial load)
  useEffect(() => {
    // Skip if not yet initialized
    if (
      !initialized ||
      contrastMode === null ||
      highlightLinks === null ||
      fontSizeMode === null ||
      textSpacing === null ||
      lineHeightIncreased === null
    ) {
      return;
    }

    // Apply settings
    applySettings(
      contrastMode,
      highlightLinks,
      fontSizeMode,
      textSpacing,
      lineHeightIncreased
    );

    // Save to localStorage
    localStorage.setItem("contrastMode", contrastMode);
    localStorage.setItem("highlightLinks", highlightLinks.toString());
    localStorage.setItem("fontSizeMode", fontSizeMode);
    localStorage.setItem("textSpacing", textSpacing.toString());
    localStorage.setItem("lineHeightIncreased", lineHeightIncreased.toString());
  }, [
    initialized,
    contrastMode,
    highlightLinks,
    fontSizeMode,
    textSpacing,
    lineHeightIncreased,
  ]);

  // Handle contrast button clicks
  const handleHighContrast = (e) => {
    e.preventDefault(); // Prevent default to maintain hover state
    setContrastMode("high");
  };

  const handleNormalContrast = (e) => {
    e.preventDefault(); // Prevent default to maintain hover state
    setContrastMode("normal");
  };

  const handleHighlightLinks = (e) => {
    e.preventDefault(); // Prevent default to maintain hover state
    setHighlightLinks((prev) => !prev);
  };

  // Handle font size button clicks
  const handleFontSizeIncrease = (e) => {
    e.preventDefault(); // Prevent default to maintain hover state
    setFontSizeMode("increased");
  };

  const handleFontSizeDecrease = (e) => {
    e.preventDefault(); // Prevent default to maintain hover state
    setFontSizeMode("decreased");
  };

  const handleFontSizeNormal = (e) => {
    e.preventDefault(); // Prevent default to maintain hover state
    setFontSizeMode("normal");
  };

  // Handle text spacing button click
  const handleTextSpacing = (e) => {
    e.preventDefault(); // Prevent default to maintain hover state
    setTextSpacing((prev) => !prev);
  };

  // Handle line height button click
  const handleLineHeight = (e) => {
    e.preventDefault(); // Prevent default to maintain hover state
    setLineHeightIncreased((prev) => !prev);
  };

  // Don't render anything until initialization is complete
  if (!initialized) {
    return null;
  }

  return (
    <>
      <div className="accesi-cont-box">
        <div className="accesi-link">
          <img
            src={PageIndex.Svg.Appreance}
            className="accesi-link-icon"
            alt="accessibility"
          />
        </div>

        <div className="accesi-detail-box">
          <h3 className="accesi-detail-title">Accessibility Tools</h3>
          <div className="accesi-options-box">
            <h5 className="accesi-detail-subtitle">Color Contrast</h5>
            <div className="accesibility-btn-box">
              <button
                className={`accessibility-common-btn ${
                  contrastMode === "high" ? "active" : ""
                }`}
                onClick={handleHighContrast}
                aria-pressed={contrastMode === "high"}
              >
                <span className="btn-icon-wrapper">
                  <img
                    src={PageIndex.Svg.Contrast}
                    alt=""
                    className="contrast-icon"
                  />
                </span>
                High Contrast
              </button>
              <button
                className={`accessibility-common-btn ${
                  contrastMode === "normal" ? "active" : ""
                }`}
                onClick={handleNormalContrast}
                aria-pressed={contrastMode === "normal"}
              >
                <span className="btn-icon-wrapper">
                  <img
                    src={PageIndex.Svg.NormalContrast}
                    alt=""
                    className="contrast-icon"
                  />
                </span>
                Normal Contrast
              </button>
              <button
                className={`accessibility-common-btn ${
                  highlightLinks ? "active" : ""
                }`}
                onClick={handleHighlightLinks}
                aria-pressed={highlightLinks}
              >
                <span className="btn-icon-wrapper">
                  <img
                    src={PageIndex.Svg.Highlightlink}
                    alt=""
                    className="link-icon"
                  />
                </span>
                Highlight Links
              </button>
            </div>
          </div>
          <div className="accesi-options-box">
            <h5 className="accesi-detail-subtitle">Text Size</h5>
            <div className="accesibility-btn-box">
              <button
                className={`accessibility-common-btn ${
                  fontSizeMode === "increased" ? "active" : ""
                }`}
                onClick={handleFontSizeIncrease}
                aria-pressed={fontSizeMode === "increased"}
              >
                <span className="btn-icon-wrapper">
                  <img
                    src={PageIndex.Svg.FontIncrease}
                    alt=""
                    className="font-icon"
                  />
                </span>
                Font Size Increase
              </button>
              <button
                className={`accessibility-common-btn ${
                  fontSizeMode === "decreased" ? "active" : ""
                }`}
                onClick={handleFontSizeDecrease}
                aria-pressed={fontSizeMode === "decreased"}
              >
                <span className="btn-icon-wrapper">
                  <img
                    src={PageIndex.Svg.FontDecrease}
                    alt=""
                    className="font-icon"
                  />
                </span>
                Font Size Decrease
              </button>
              <button
                className={`accessibility-common-btn ${
                  fontSizeMode === "normal" ? "active" : ""
                }`}
                onClick={handleFontSizeNormal}
                aria-pressed={fontSizeMode === "normal"}
              >
                <span className="btn-icon-wrapper">
                  <img
                    src={PageIndex.Svg.FontNormal}
                    alt=""
                    className="font-icon"
                  />
                </span>
                Normal Font
              </button>
              <button
                className={`accessibility-common-btn ${
                  textSpacing ? "active" : ""
                }`}
                onClick={handleTextSpacing}
                aria-pressed={textSpacing}
              >
                <span className="btn-icon-wrapper">
                  <img
                    src={PageIndex.Svg.TextSpacing}
                    alt=""
                    className="spacing-icon"
                  />
                </span>
                Text Spacing
              </button>
              <button
                className={`accessibility-common-btn ${
                  lineHeightIncreased ? "active" : ""
                }`}
                onClick={handleLineHeight}
                aria-pressed={lineHeightIncreased}
              >
                <span className="btn-icon-wrapper">
                  <img
                    src={PageIndex.Svg.LineHeight}
                    alt=""
                    className="line-height-icon"
                  />
                </span>
                Line Height
              </button>

              <button
                className={`accessibility-common-btn ${
                  location.pathname.includes("feedback") ? "active" : ""
                }`}
                onClick={() => navigate("/feedback")}
              >
                <span className="btn-icon-wrapper">
                  <img
                    src={PageIndex.Png.Feedback_icon}
                    alt=""
                    className="line-height-icon"
                  />
                </span>
                PWD Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default darkLightButton;
