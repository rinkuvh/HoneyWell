import React, { useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  getDashboardData,
  getDashboardInternshipChartInfo,
  getDashboardStudentChartInfo,
  getInternshipRegisterUserCount,
} from "../../../../redux/services/AdminService";
import BarChart from "./BarChart";
import CustomPieChart from "./CustomPieChart";

const Dashboard = () => {
  const navigate = Index.useNavigate();
  const [dashboardData, setDashboardData] = useState();
  const [loading, setLoading] = useState(true);
  const [studentChartInfo, setStudentChartInfo] = useState({});
  const [internshipChartInfo, setInternshipChartInfo] = useState({});
  const [internshipRegisterUserCount, setInternshipRegisterUserCount] =
    useState([]);
  const pwdAndNonPwdUsers = [
    {
      label: "PWD Registered Users",
      value: dashboardData?.totalPwdRegisteredUsers || 0,
      color: "#81C784",
    },
    {
      label: "Non-PWD Registered Users",
      value: dashboardData?.totalNonPwdRegisteredUsers || 0,
      color: "#F44336",
    },
  ];
  const genderWiseRegisterUser = [
    {
      label: "Male",
      value: dashboardData?.genderWiseRegisterUser?.male || 0,
      color: "#81C784",
    },
    {
      label: "Female",
      value: dashboardData?.genderWiseRegisterUser?.female || 0,
      color: "#F44336",
    },
    {
      label: "Other",
      value: dashboardData?.genderWiseRegisterUser?.other || 0,
      color: "#F44336",
    },
  ];
  const fetchData = async () => {
    let resp = await getDashboardData();

    console.log(resp);
    if (resp?.success == true) {
      setDashboardData(resp.data);
      setLoading(false);
    }
  };
  const fetchStudentChartData = async (timeRange) => {
    let resp = await getDashboardStudentChartInfo(timeRange);

    if (resp?.status == 200) {
      setStudentChartInfo(resp.data);
    } else {
      setStudentChartInfo({});
    }
  };
  const fetchInternshipChartData = async (timeRange) => {
    let resp = await getDashboardInternshipChartInfo(timeRange);

    if (resp?.status == 200) {
      setInternshipChartInfo(resp.data);
    } else {
      setInternshipChartInfo({});
    }
  };
  const fetchInternshipRegisterUserCount = async () => {
    let resp = await getInternshipRegisterUserCount();

    if (resp?.status == 200) {
      let result = resp.data.map((item) => ({
        label: item.title,
        value: item.total_registered,
      }));
      setInternshipRegisterUserCount(result);
    } else {
      setInternshipRegisterUserCount([]);
    }
  };
  const handleNavigate = (path) => {
    navigate(path);
  };
  React.useEffect(() => {
    fetchData();
    fetchInternshipRegisterUserCount();
  }, []);
  if (loading) {
    return <PageIndex.PageLoader />;
  }
  return (
    <>
      <Index.Box className="admin-dashboard-content admin-dashboard">
        <Index.Box className="admin-page-title-flex admin-page-title-main">
          <Index.Typography
            className="admin-page-title"
            component="h2"
            variant="h2"
          >
            Dashboard
          </Index.Typography>
        </Index.Box>
        {/* <Index.Box className=" card-border common-card chart-section">
          <BarChart
            title="Students Registrations"
            chartData={studentChartInfo}
            fetchData={fetchStudentChartData}
          />
        </Index.Box> */}
        <Index.Box className=" card-border common-card chart-section">
          <BarChart
            title="Internship Registrations"
            chartData={internshipChartInfo}
            fetchData={fetchInternshipChartData}
          />
        </Index.Box>
        <Index.Box className="card-border common-card chart-section pie-chart-container fw-pie-chart">
          <CustomPieChart
            title="Student Registered In Internship Course"
            data={internshipRegisterUserCount}
            legendPosition="right"
          />
        </Index.Box>
        <Index.Box className=" card-border pie-chart-container chart-section">
          <Index.Box
            container
            className="dashboard-grid-main dashboard-grid-main-custom"
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={{ xs: 2, sm: 2, md: 2, lg: 2 }}
          >
            <Index.Box
              gridColumn={{
                xs: "span 12",
                sm: "span 12",
                md: "span 6",
                lg: "span 6",
              }}
              className="pie-grid"
            >
              <CustomPieChart
                title="Pwc/Non-Pwd Regsitered Users"
                dashboardData={dashboardData}
                data={pwdAndNonPwdUsers}
              />
            </Index.Box>
            <Index.Box
              gridColumn={{
                xs: "span 12",
                sm: "span 12",
                md: "span 6",
                lg: "span 6",
              }}
              className="pie-grid"
            >
              <CustomPieChart
                title="Gender Wise Registered Users"
                dashboardData={dashboardData}
                data={genderWiseRegisterUser}
              />
            </Index.Box>
          </Index.Box>
        </Index.Box>
        <Index.Box className="card-border common-card">
          <Index.Grid container className="dashboard-grid-main">
            <Index.Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              className="dashboard-grid-item"
            >
              <Index.Box
                className="dashboard-tile"
                onClick={() => handleNavigate("/admin/student-management")}
              >
                <Index.Box className="dash-icon-box">
                  <img
                    className="dash-icon"
                    src={PageIndex.Png.totalStudents}
                    alt=""
                  />
                </Index.Box>
                <Index.Box className="">
                  <Index.Typography variant="h6" className="tile-title">
                    Total Students
                  </Index.Typography>
                  <Index.Typography variant="h4" className="tile-count">
                    {dashboardData?.totalRegisteredUsers}
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
            </Index.Grid>

            <Index.Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              className="dashboard-grid-item"
            >
              <Index.Box
                className="dashboard-tile"
                onClick={() => handleNavigate("/admin/internships")}
              >
                <Index.Box className="dash-icon-box">
                  <img
                    className="dash-icon"
                    src={PageIndex.Png.totalHackathon}
                    alt=""
                  />
                </Index.Box>
                <Index.Box className="">
                  <Index.Typography variant="h6" className="tile-title">
                    Internship Enrolled Students
                  </Index.Typography>
                  <Index.Typography variant="h4" className="tile-count">
                    {dashboardData?.totalInternshipEnrolledStudents || 0}
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
            </Index.Grid>
            <Index.Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              className="dashboard-grid-item"
            >
              <Index.Box
                className="dashboard-tile"
                onClick={() => handleNavigate("/admin/course-tracking")}
              >
                <Index.Box className="dash-icon-box">
                  <img
                    className="dash-icon"
                    src={PageIndex.Png.totalHackathon}
                    alt=""
                  />
                </Index.Box>
                <Index.Box className="">
                  <Index.Typography variant="h6" className="tile-title">
                    Total Learning Hours
                  </Index.Typography>
                  <Index.Typography variant="h4" className="tile-count">
                    {dashboardData?.totalWatchedTime || 0}
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
            </Index.Grid>
            <Index.Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              className="dashboard-grid-item"
            >
              <Index.Box
                className="dashboard-tile"
                onClick={() => handleNavigate("/admin/quiz-result")}
              >
                <Index.Box className="dash-icon-box">
                  <img
                    className="dash-icon"
                    src={PageIndex.Png.totalPassedQuiz}
                    alt=""
                  />
                </Index.Box>
                <Index.Box className="">
                  <Index.Typography variant="h6" className="tile-title">
                    Total Certificate Issued Individuals
                  </Index.Typography>
                  <Index.Typography variant="h4" className="tile-count">
                    {dashboardData?.totalPassedQuiz || 0}
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
            </Index.Grid>
            <Index.Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              className="dashboard-grid-item"
            >
              <Index.Box
                className="dashboard-tile"
                onClick={() => handleNavigate("/admin/team-list")}
              >
                <Index.Box className="dash-icon-box">
                  <img
                    className="dash-icon"
                    src={PageIndex.Png.totalHackathon}
                    alt=""
                  />
                </Index.Box>
                <Index.Box className="">
                  <Index.Typography variant="h6" className="tile-title">
                    Total Submissions
                  </Index.Typography>
                  <Index.Typography variant="h4" className="tile-count">
                    {dashboardData?.totalProjectSubmitted +
                      dashboardData?.week7th +
                      dashboardData?.week8th || 0}
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
            </Index.Grid>
            {/* <Index.Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              className="dashboard-grid-item"
            >
              <Index.Box
                className="dashboard-tile"
                onClick={() => handleNavigate("/admin/team-list")}
              >
                <Index.Box className="dash-icon-box">
                  <img
                    className="dash-icon"
                    src={PageIndex.Png.totalHackathon}
                    alt=""
                  />
                </Index.Box>
                <Index.Box className="">
                  <Index.Typography variant="h6" className="tile-title">
                    Projects submitted
                  </Index.Typography>
                  <Index.Typography variant="h4" className="tile-count">
                    {dashboardData?.totalProjectSubmitted || 0}
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
            </Index.Grid>
            <Index.Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              className="dashboard-grid-item"
            >
              <Index.Box
                className="dashboard-tile"
                onClick={() => handleNavigate("/admin/team-list")}
              >
                <Index.Box className="dash-icon-box">
                  <img
                    className="dash-icon"
                    src={PageIndex.Png.totalHackathon}
                    alt=""
                  />
                </Index.Box>
                <Index.Box className="">
                  <Index.Typography variant="h6" className="tile-title">
                    Assessment Submission - Week 7
                  </Index.Typography>
                  <Index.Typography variant="h4" className="tile-count">
                    {dashboardData?.week7th || 0}
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
            </Index.Grid>

            {console.log("dashboardData", dashboardData)}
            <Index.Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              className="dashboard-grid-item"
            >
              <Index.Box
                className="dashboard-tile"
                onClick={() => handleNavigate("/admin/team-list")}
              >
                <Index.Box className="dash-icon-box">
                  <img
                    className="dash-icon"
                    src={PageIndex.Png.totalHackathon}
                    alt=""
                  />
                </Index.Box>
                <Index.Box className="">
                  <Index.Typography variant="h6" className="tile-title">
                    Assessment Submission - Week 8
                  </Index.Typography>
                  <Index.Typography variant="h4" className="tile-count">
                    {dashboardData?.week8th || 0}
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
            </Index.Grid> */}
          </Index.Grid>
        </Index.Box>
      </Index.Box>
    </>
  );
};

export default Dashboard;
