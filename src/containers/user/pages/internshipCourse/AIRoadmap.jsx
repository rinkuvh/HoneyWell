import React from "react";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";
import "./AI-Roadmap.css"; // We'll create this CSS file

const SingleRowTimeline = ({roadmapCompleted}) => {
  return (
    <svg
      className="ai-roadmap-svg-path"
      viewBox="0 0 1200 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        top: "0px",
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
      preserveAspectRatio="none"
    >
      {/* Top horizontal line */}
      <path
        d="M30 46 H1170"
        stroke="#B4B4B4"
        strokeWidth="2"
        strokeDasharray="8 10"
      />
      <circle
        cx="20"
        cy="46"
        r="10"
        fill="#7A126B"
        stroke="none"
        strokeWidth="1"
      />
      {/* End dot */}
      <circle
        cx="1170"
        cy="46"
        r="10"
        fill={roadmapCompleted ? "#7A126B" : "#505050"}
        stroke="none"
        stroke-width="1"
      ></circle>
    </svg>
  );
};

const DoubleRowTimeline = ({roadmapCompleted}) => {
  return (
    <svg
      className="ai-roadmap-svg-path"
      viewBox="0 0 1200 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
      preserveAspectRatio="none"
    >
      {/* Top horizontal line */}
      <path
        d="M30 46 H1170"
        stroke="#B4B4B4"
        strokeWidth="2"
        strokeDasharray="8 10"
      />
      {/* Top right curve */}
      <path
        d="M1170 46 Q1190 46 1190 66 V250 Q1190 274 1160 274"
        stroke="#B4B4B4"
        strokeWidth="2"
        strokeDasharray="8 10"
        fill="none"
      />
      {/* Bottom horizontal line */}
      <path
        d="M1170 274 H30"
        stroke="#B4B4B4"
        strokeWidth="2"
        strokeDasharray="8 10"
      />
      {/* Bottom left curve */}
      {/* <path d="M30 300 Q10 300 10 274 V86 Q10 46 30 46" stroke="#B4B4B4" strokeWidth="3" strokeDasharray="12 10" fill="none" /> */}
      {/* Start dot */}
      <circle
        cx="10"
        cy="46"
        r="10"
        fill="#7A126B"
        stroke="none"
        strokeWidth="1"
      />
      {/* End dot */}
      <circle
        cx="10"
        cy="274"
        r="10"
        fill={roadmapCompleted ? "#7A126B" : "#505050"}
        stroke="none"
        strokeWidth="1"
      />
    </svg>
  );
};
export default function AIRoadmap({
  selectedWeek,
  onWeekSelect,
  internshipWeekTracking,
}) {
  let lastCompletedWeek = -1;
  internshipWeekTracking?.forEach((week, index) => {
    let quizSubmitted = true;
    week?.courses?.forEach((course) => {
      if(course?.is_quiz_exist && !course?.is_quiz_completed){
        quizSubmitted = false;
      }
    })
    if (week.isAdded && quizSubmitted) lastCompletedWeek = index;
  });
  const handleWeekClick = (week, isCurrent) => {
    // setSelectedWeek(week);
    onWeekSelect(week, isCurrent);
  };
  const roadmapCompleted = lastCompletedWeek == (internshipWeekTracking?.length - 1);
  return (
    <div
      className={`ai-roadmap-container ai-roadmap-bg ${
        internshipWeekTracking?.length <= 4 ? "single-row-roadmap-bg" : ""
      }`}
    >
      {/* SVG Roadmap Path */}
      {lastCompletedWeek >= 3 && (
        <div className="ai-roadmap-horizontal-linetop"></div>
      )}
      {internshipWeekTracking?.length <= 4 ? (
        <>
          <SingleRowTimeline roadmapCompleted = {roadmapCompleted}/>
        </>
      ) : (
        <>
          {lastCompletedWeek >= 3 && (
            <>
              <div className="air-dotted-brder">
                <svg
                  className="ai-roadmap-svg-path"
                  viewBox="0 0 1200 500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                  }}
                  preserveAspectRatio="none"
                >
                  {/* Top right curve */}
                  <path
                    d="M1164 45 Q1190 45 1190 60 V250 Q1190 275 1160 275"
                    stroke="#7a126b"
                    strokeWidth="4"
                    strokeDasharray="0 0"
                    fill="none"
                  />
                </svg>
              </div>
            </>
          )}
          <DoubleRowTimeline roadmapCompleted = {roadmapCompleted}/>
        </>
      )}
      {lastCompletedWeek >= 3 && (
        <div className="ai-roadmap-horizontal-linetop"></div>
      )}

      {/* Weeks container */}
      <div
        className={`ai-roadmap-weeks-container ${
          internshipWeekTracking?.length <= 4 ? "single-row-weeks" : ""
        }`}
      >
        {lastCompletedWeek >= 3 && internshipWeekTracking?.length > 4 && (
          <div className="ai-roadmap-horizontal-linebottom"></div>
        )}
        {/* Top row: weeks 1-4 */}
        {internshipWeekTracking?.slice(0, 4).map((item, index) => {
          return (
            <div
              key={index}
              className={`ai-roadmap-week-column top-row ai-roadmap-week-${
                index + 1
              }`}
              onClick={() => {
                // if (selectedWeek?.id == item?.id) {
                //   return;
                // }
                handleWeekClick(
                  { ...item, weekNumber: index + 1 },
                  selectedWeek?.id == item?.id
                );
              }}
              style={{
                cursor: "pointer",
                pointerEvents: (index > lastCompletedWeek + 1) ? "none" : "auto",
              }}
            >
              {/* Show horizontal line only for active week card */}
              {index <= lastCompletedWeek + 1 && (
                <div className="ai-roadmap-horizontal-line"></div>
              )}
              <div className="ai-roadmap-lock-container">
                <div className="ai-roadmap-lock-circle">
                  <img
                    className={`${
                      index == lastCompletedWeek + 1 ? "circle-complete" : ""
                    }`}
                    src={
                      index > lastCompletedWeek + 1
                        ? PageIndex.Png.Lock
                        : index == lastCompletedWeek + 1
                        ? PageIndex.Png.RedCircleIcon
                        : PageIndex.Png.Complete
                    }
                    alt={index > lastCompletedWeek + 1 ? "Lock" : "Complete"}
                  />
                </div>
              </div>
              <div className="ai-roadmap-connector-line"></div>
              <div
                className={`ai-roadmap-week-card ${
                  index > lastCompletedWeek ? "" : "active"
                }`}
              >
                <p
                  className={`ai-roadmap-week-number ${
                    index > lastCompletedWeek ? "" : "active"
                  }`}
                >
                  Week {index + 1}
                </p>
                <p className="ai-roadmap-week-title">
                {item?.title}
                </p>
              </div>
            </div>
          );
        })}
        {/* Bottom row: weeks 8-5 (reverse order) */}
        <Index.Box className="ai-timeline-reverse">
          {internshipWeekTracking?.length >= 4 &&
            internshipWeekTracking
              ?.slice(4)
              .reverse()
              .map((item, index) => (
                <div
                  key={index + 4}
                  className={`ai-roadmap-week-column bottom-row ai-roadmap-week-${
                    internshipWeekTracking?.length - index
                  }`}
                  onClick={() => {
                    {
                      if (selectedWeek?.id == item?.id) {
                        return;
                      }
                      handleWeekClick(
                        {
                          ...item,
                          weekNumber: internshipWeekTracking?.length - index,
                        },
                        selectedWeek?.id == item?.id
                      );
                    }
                  }}
                  style={{
                    cursor: "pointer",
                    pointerEvents:
                      internshipWeekTracking?.length - index - 1 >
                      lastCompletedWeek + 1
                        ? "none"
                        : "auto",
                  }}
                >
                  {internshipWeekTracking?.length - index <=
                    lastCompletedWeek + 1 &&
                    lastCompletedWeek != internshipWeekTracking?.length - 1 && (
                      <div className="ai-roadmap-horizontal-line"></div>
                    )}
                  <div className="ai-roadmap-lock-container">
                    <div className="ai-roadmap-lock-circle">
                      <img
                        className={`${
                          internshipWeekTracking?.length - index - 1 ==
                          lastCompletedWeek + 1
                            ? "circle-complete"
                            : ""
                        }`}
                        src={
                          internshipWeekTracking?.length - index - 1 >
                          lastCompletedWeek + 1
                            ? PageIndex.Png.Lock
                            : internshipWeekTracking?.length - index - 1 ==
                              lastCompletedWeek + 1
                            ? PageIndex.Png.RedCircleIcon
                            : PageIndex.Png.Complete
                        }
                        alt={
                          internshipWeekTracking?.length - index - 1 >
                          lastCompletedWeek + 1
                            ? "Lock"
                            : "Complete"
                        }
                      />
                    </div>
                  </div>
                  <div className="ai-roadmap-connector-line"></div>
                  <div
                    className={`ai-roadmap-week-card ${
                      internshipWeekTracking?.length - index - 1 >
                      lastCompletedWeek + 1
                        ? ""
                        : "active"
                    }`}
                  >
                    <p
                      className={`ai-roadmap-week-number ${
                        internshipWeekTracking?.length - index - 1 >
                        lastCompletedWeek + 1
                          ? ""
                          : "active"
                      }`}
                    >
                      Week {internshipWeekTracking?.length - index}
                    </p>
                    <p className="ai-roadmap-week-title">
                    {item?.title}
                    </p>
                  </div>
                </div>
              ))}
          {internshipWeekTracking?.length > 4 &&
            internshipWeekTracking?.length - 1 == lastCompletedWeek && (
              <div className="ai-roadmap-horizontal-line ai-roadmap-fullline"></div>
            )}
        </Index.Box>
      </div>
    </div>
  );
}
