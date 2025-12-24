import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../containers/admin/auth/Login";
import ForgotPassWord from "../containers/admin/auth/ForgotPassword";
import OtpVerify from "../containers/admin/auth/OtpVerify";
import ResetPassword from "../containers/admin/auth/ResetPassword";
import AdminLoginWithOtp from "../containers/admin/auth/LoginWithOtp";
import AdminLayout from "../containers/admin/pages/adminLayout/AdminLayout";
import AccountLayout from "../containers/admin/pages/adminAccountLayout/AccountLayout";
import Dashboard from "../containers/admin/pages/dashboard/Dashboard";
import UserManagement from "../containers/admin/pages/userManagement/UserManagement";
import AddEditRegistration from "../containers/admin/pages/userManagement/AddEditRegistration";
import ViewRegisterLayout from "../containers/admin/pages/userManagement/ViewRegisterLayout";
import AdminPrivateRoute from "./AdminPrivateRoute";
import CoursesList from "../containers/admin/pages/courses/CoursesList";
import AddEditCourse from "../containers/admin/pages/courses/AddCourse";
import ViewCourse from "../containers/admin/pages/courses/ViewCourse";
import TopicsList from "../containers/admin/pages/topics/TopicsList";
import AddTopics from "../containers/admin/pages/topics/AddTopics";
import QueryList from "../containers/admin/pages/customerQuery/QueryList";
import AddSections from "../containers/admin/pages/sections/AddSections";
import ViewTopic from "../containers/admin/pages/topics/ViewTopic";
import AdminUnPrivateRoutes from "./AdminUnPrivateRoutes";
import AddEditQuiz from "../containers/admin/pages/quiz/AddEditQuiz";
import HackathonList from "../containers/admin/pages/hackathon/HackathonList";
import AddEditHackthon from "../containers/admin/pages/hackathon/AddEditHackathon";
import ViewHackthon from "../containers/admin/pages/hackathon/ViewHackthon";
import QuizResult from "../containers/admin/pages/quizResult/QuizResult";
import ViewQuizResult from "../containers/admin/pages/quizResult/ViewQuizResult";
import PwdFeedbacks from "../containers/admin/pages/pwdFeedbacks/PwdFeedbacks";
import FaqList from "../containers/admin/pages/faq/FaqList";
import AddEditFaq from "../containers/admin/pages/faq/AddEditFaq";
import ViewFaq from "../containers/admin/pages/faq/ViewFaq";
import CourseTracking from "../containers/admin/pages/courseTracking/CourseTracking";
import TestimonialList from "../containers/admin/pages/testimonials/TestimonialList";
import AddEditTestimonial from "../containers/admin/pages/testimonials/AddEditTestimonial";
import ViewTestimonial from "../containers/admin/pages/testimonials/ViewTestimonial";
import CourseRating from "../containers/admin/pages/courseRating/CourseRating";
import ViewCourseRating from "../containers/admin/pages/courseRating/ViewCourseRating";
import ViewPwdFeedback from "../containers/admin/pages/pwdFeedbacks/ViewPwdFeedback";
import TeamList from "../containers/admin/pages/team/TeamList";
import TeamDetail from "../containers/admin/pages/team/TeamDetail";
import InternshipsList from "../containers/admin/pages/internships/InternshipsList";
import ViewQuery from "../containers/admin/pages/customerQuery/ViewQuery";
import InternshipCourseList from "../containers/admin/pages/internshipCourses/InternshipCourseList";
import AddEditInternshipCourse from "../containers/admin/pages/internshipCourses/AddEditInternshipCourse";
import ViewInternshipCourse from "../containers/admin/pages/internshipCourses/ViewInternshipCourse";
import AddEditWeekWiseCourse from "../containers/admin/pages/internshipCourses/weekWiseManagement/AddEditWeekWiseCourse";
import ViewWeekWiseCourse from "../containers/admin/pages/internshipCourses/weekWiseManagement/ViewWeekWiseCourse";
import AssessmentList from "../containers/admin/pages/Assessment/AssessmentList";
import InternshipTracking from "../containers/admin/pages/internships/InternshipTracking";
import InternshipsQuizResult from "../containers/admin/pages/internships/InternshipsQuizResult";
import InternshipsViewQuizResult from "../containers/admin/pages/internships/InternshipsViewQuizResult";
import InternshipWeekTracking from "../containers/admin/pages/internships/InternshipWeekTracking";
import ViewAssessment from "../containers/admin/pages/Assessment/ViewAssessment";
const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<AdminUnPrivateRoutes />}>
          <Route path="/" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassWord />} />
          <Route path="verify-otp" element={<OtpVerify />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="login-with-otp" element={<AdminLoginWithOtp />} />
        </Route>
        <Route element={<AdminPrivateRoute />}>
          <Route path="" element={<AdminLayout />}>
            <Route path="account" element={<AccountLayout />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="student-management" element={<UserManagement />} />
            <Route
              path="student-management/add"
              element={<AddEditRegistration />}
            />
            <Route
              path="student-management/edit/:id"
              element={<AddEditRegistration />}
            />
            <Route
              path="student-management/view/:id"
              element={<ViewRegisterLayout />}
            />
            <Route path="courses-list" element={<CoursesList />} />
            <Route path="add-edit-course/:id" element={<AddEditCourse />} />
            <Route path="view-course/:id" element={<ViewCourse />} />
            <Route path="view-topics/:id" element={<TopicsList />} />
            <Route path="topic-detail/:id" element={<ViewTopic />} />
            <Route path="add-edit-topics/:id" element={<AddTopics />} />
            <Route path="add-edit-topics/" element={<AddTopics />} />
            <Route path="add-edit-course/" element={<AddEditCourse />} />
            <Route path="add-edit-quiz/" element={<AddEditQuiz />} />
            <Route path="add-edit-quiz/:id" element={<AddEditQuiz />} />
            <Route path="view-quiz/:id" element={<AddEditQuiz />} />
            <Route path="query" element={<QueryList />} />
            <Route path="query/view/:id" element={<ViewQuery />} />
            <Route path="pwd-feedbacks" element={<PwdFeedbacks />} />
            <Route path="view-pwd-feedback/:id" element={<ViewPwdFeedback />} />
            <Route path="add-edit-sections" element={<AddSections />} />
            <Route path="hackathon-list" element={<HackathonList />} />
            <Route path="add-edit-hackathon" element={<AddEditHackthon />} />
            <Route
              path="add-edit-hackathon/:id"
              element={<AddEditHackthon />}
            />
            <Route path="view-hackathon/:id" element={<ViewHackthon />} />
            <Route path="quiz-result" element={<QuizResult />} />
            <Route path="quiz-result/view/:id" element={<ViewQuizResult />} />
            <Route path="course-tracking" element={<CourseTracking />} />
            <Route path="course-rating" element={<CourseRating />} />
            <Route
              path="course-rating/view/:id"
              element={<ViewCourseRating />}
            />
            <Route path="faq-list" element={<FaqList />} />
            <Route path="add-edit-faq" element={<AddEditFaq />} />
            <Route path="add-edit-faq/:id" element={<AddEditFaq />} />
            <Route path="view-faq/:id" element={<ViewFaq />} />
            <Route path="testimonial-list" element={<TestimonialList />} />
            <Route
              path="add-edit-testimonial"
              element={<AddEditTestimonial />}
            />
            <Route
              path="add-edit-testimonial/:id"
              element={<AddEditTestimonial />}
            />
            <Route path="view-testimonial/:id" element={<ViewTestimonial />} />
            <Route path="team-list" element={<TeamList />} />
            <Route path="view-team/:id" element={<TeamDetail />} />
            <Route path="internships" element={<InternshipsList />} />
            <Route path="assessment" element={<AssessmentList />} />
            <Route path="view-assessment/:id" element={<ViewAssessment />} />
            <Route path="internship-course">
              <Route index element={<InternshipCourseList />} />
              <Route path="add" element={<AddEditInternshipCourse />} />
              <Route path="edit/:id" element={<AddEditInternshipCourse />} />
              <Route path="view/:id" element={<ViewInternshipCourse />} />
              <Route
                path="add-weekwise-management"
                element={<AddEditWeekWiseCourse />}
              />
              <Route
                path="edit-weekwise-management/:id"
                element={<AddEditWeekWiseCourse />}
              />
              <Route
                path="view-weekwise-management/:id"
                element={<ViewWeekWiseCourse />}
              />
            </Route>
            <Route
              path="tracking-internships"
              element={<InternshipTracking />}
            />
{/*             
            <Route
              path="quiz-internships-result"
              element={<InternshipsQuizResult />}
            />
            <Route
              path="quiz-internships-result/view/:id"
              element={<InternshipsViewQuizResult />}
            /> 
*/}
            <Route
              path="internship-week-tracking"
              element={<InternshipWeekTracking />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;
