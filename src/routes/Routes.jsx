import React from "react";
import { BrowserRouter, Route, Routes as Routess } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import WebLayout from "../containers/web/pages/webLayout/WebLayout";
import Home from "../containers/web/pages/home/Home";
import FeedbackForm from "../containers/user/pages/feedbackForm/FeedbackForm";
import UserLayout from "../containers/user/pages/userLayout/UserLayout";
import PrivacyPolicy from "../containers/web/pages/home/PrivacyPolicy";
import TermsAndCondition from "../containers/web/pages/home/TermsAndCondition";
import ScreenReader from "../utils/ScreenReader";
import Testimonials from "../containers/user/pages/testimonial/Testimonials";
import TestimonialDetail from "../containers/user/pages/testimonial/TestimonialDetail";
import HackathonTeamInvitation from "../containers/user/pages/hackathon/HackathonTeamInvitation";
import UserCertificate from "../containers/user/pages/userCertificate/UserCertificate";

const Routes = () => {
  return (
    <BrowserRouter>
      <ScreenReader />
      <Routess>
        <Route path="/" element={<WebLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="" element={<UserLayout />}>
        <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-condition" element={<TermsAndCondition />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="testimonials/:id" element={<TestimonialDetail />} />
          <Route path="/hackathon/invite/:id" element={<HackathonTeamInvitation />} />
          <Route path="/certificate/:type/:typeId/:id" element={<UserCertificate/>} />
        </Route>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/user/*" element={<UserRoutes />} />
      </Routess>
    </BrowserRouter>
  );
};

export default Routes;
