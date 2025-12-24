import React from "react";
import { Route, Routes } from "react-router-dom";
import UserPrivateRoute from "./UserPrivateRoute";
import UserLogin from "../containers/user/auth/Login";
import UserForgotPassword from "../containers/user/auth/UserForgotPassword";
import UserOtpLogin from "../containers/user/auth/UserOtpLogin";
import UserOtpVerify from "../containers/user/auth/UserOtpVerify";
import UserResetPassword from "../containers/user/auth/UserResetPassword";
import UserLayout from "../containers/user/pages/userLayout/UserLayout";
import UserAccountLayout from "../containers/user/pages/userAccountLayout/AccountLayout";
import UserDashboard from "../containers/user/pages/dashboard/Dashboard";
import Register from "../containers/user/auth/Register";
import UserRegisterOtp from "../containers/user/auth/UserRegisterOtp";
import CourseDetail from "../containers/user/pages/course/CourseDetail";
import TopicDetail from "../containers/user/pages/course/TopicDetail";
import UserUnPrivateRoute from "./UserUnPrivateRoute ";
import UpdatePersonalInformation from "../containers/user/pages/userAccountLayout/UpdatePersonalInformation";
import Quiz from "../containers/user/pages/quiz/Quiz";
import QuizSuccess from "../containers/user/pages/quiz/QuizSuccess";
import HackathonDetail from "../containers/user/pages/hackathon/HackathonDetail";
import MyCertificate from "../containers/user/pages/myCertificate/MyCertificate";
import AddTeam from "../containers/user/pages/hackathon/AddTeam";
import ViewTeam from "../containers/user/pages/hackathon/ViewTeam";
import InviteMember from "../containers/user/pages/hackathon/InviteMember";
import TeamDetail from "../containers/user/pages/team/TeamDetail";
import TeamList from "../containers/user/pages/team/TeamList";
import UploadDocument from "../containers/user/pages/team/UploadDocument";
import NotificationList from "../containers/user/pages/notification/NotificationList";
import ViewNotification from "../containers/user/pages/notification/ViewNotification";
import CourseLevel from "../containers/user/pages/course/CourseLevel";
import CoursesAndInternships from "../containers/user/pages/myCourses/CoursesAndInternships";
import InternshipHomePage from "../containers/user/pages/internshipCourse/InternshipHomePage";
import InternshipHome from "../containers/user/pages/internshipCourse/InternshipHome";

const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<UserUnPrivateRoute />}>
          <Route path="/" element={<UserLogin />} />
          <Route path="/sign-up" element={<Register />} />
          <Route
            path="/user-forgot-password"
            element={<UserForgotPassword />}
          />
          <Route path="/user-login-with-otp" element={<UserOtpLogin />} />
          <Route path="/user-verify-otp" element={<UserOtpVerify />} />
          <Route
            path="/user-register-verify-otp"
            element={<UserRegisterOtp />}
          />
          <Route path="/user-reset-password" element={<UserResetPassword />} />
        </Route>
        <Route element={<UserPrivateRoute />}>
          <Route path="" element={<UserLayout />}>
            <Route path="account" element={<UserAccountLayout />} />
            <Route
              path="edit-profile"
              element={<UpdatePersonalInformation />}
            />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="notifications" element={<NotificationList />} />
            <Route path="view-notification/:id" element={<ViewNotification />} />
            <Route path="/course-level" element={<CourseLevel />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/create-Team/:id" element={<AddTeam />} />
            <Route path="/edit-Team/:id/:teamId" element={<AddTeam />} />
            <Route
              path="/hackathon/:hackathonId/:teamId/invite-member"
              element={<InviteMember />}
            />
            <Route path="/view-Team/:id" element={<ViewTeam />} />
            <Route
              path="/course/:courseId/:topicId"
              element={<TopicDetail />}
            />
            <Route path="/course/:courseId/quiz" element={<Quiz />} />
            <Route
              path="/course/:courseId/quiz/result/:id"
              element={<QuizSuccess />}
            />
            <Route path="/hackathon/:id" element={<HackathonDetail />} />
            <Route path="/my-certificates" element={<MyCertificate />} />
            <Route path="/my-team" element={<TeamList />} />
            <Route path="/team-detail/:id" element={<TeamDetail />} />
            <Route path="/team-upload-doc/:id" element={<UploadDocument />} />
            <Route path="/my-internships-and-courses" element={<CoursesAndInternships />} />
            <Route path="internship">
              <Route path=":id" element={<InternshipHome />} />
              <Route path="test/:id" element={<InternshipHomePage />} />
              <Route path=":internshipId/week/:weekId/course/:id" element={<CourseDetail />} />
              <Route
                path=":internshipId/week/:weekId/course/:courseId/:topicId"
                element={<TopicDetail />}
              />
              <Route path=":internshipId/week/:weekId/course/:courseId/quiz" element={<Quiz />} />
              <Route
                path=":internshipId/week/:weekId/course/:courseId/quiz/result/:id"
                element={<QuizSuccess />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default UserRoutes;
