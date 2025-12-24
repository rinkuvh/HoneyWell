import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ScreenReader = () => {
  const location = useLocation();
  const { isScreenReader, screenReaderRate } = useSelector(
    (state) => state.user
  );
  const rate =
    screenReaderRate === "Slow" ? 0.5 : screenReaderRate === "Fast" ? 1.5 : 1;

  const getFullParagraph = (target) => {
    if (!target) return "";
    let paragraph = target.closest("p");
    return paragraph ? paragraph.innerText.trim() : target.innerText.trim();
  };

  const handleImageClick = (image) => {
    if (!isScreenReader) return;
    let imageName = image.getAttribute("alt") || "";
    speechSynthesis.cancel();
    let utterance = new SpeechSynthesisUtterance(imageName);
    utterance.rate = rate;
    speechSynthesis.speak(utterance);
  };

  const handleTextClick = (event) => {
    if (!isScreenReader || location.pathname.includes("admin")) return;
    let clickedElement = event.target;
    if (clickedElement.tagName === "IMG") {
      handleImageClick(clickedElement);
      return;
    }
    let fullParagraph = getFullParagraph(clickedElement);
    if (!fullParagraph) return;
    speechSynthesis.cancel();
    let utterance = new SpeechSynthesisUtterance(fullParagraph);
    utterance.rate = rate;
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    document.addEventListener("click", handleTextClick);
    return () => {
      document.removeEventListener("click", handleTextClick);
    };
  }, [isScreenReader, screenReaderRate]);

  return <></>;
};

export default ScreenReader;
