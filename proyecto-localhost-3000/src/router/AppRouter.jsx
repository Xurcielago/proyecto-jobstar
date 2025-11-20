import { Navigate, Route, Routes } from "react-router";
import { Home } from "../pages/Home";
import { Login } from "../pages/LoginPage";
import { RegisterCompany } from "../pages/RegisterCompany";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { RegisterGeneral } from "../pages/RegisterGeneral";
import { RegisterGraduated } from "../pages/RegisterGraduated";
import { JobPost } from "../pages/JobPost";
import { WatchJobPosts } from "../pages/WatchJobPosts";
import { SendMessage } from "../pages/SendMessage";
import { SeeMessages } from "../pages/SeeMessages";
import { GraduatedProfile } from "../pages/GraduatedProfile";
import { CompanyProfile } from "../pages/CompanyProfile";
import { Profile } from "../pages/Profile";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/registerCompany" element={<RegisterCompany />} />
        <Route path="/registerGraduated" element={<RegisterGraduated />} />
        <Route path="/register" element={<RegisterGeneral />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/jobpost" element={<JobPost />} />
        <Route path="/jobs" element={<WatchJobPosts />} />
        <Route path="/messages" element={<SendMessage />} />
        <Route path="/mymessages" element={<SeeMessages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/graduatedprofile" element={<GraduatedProfile />} />
        <Route path="/companyprofile" element={<CompanyProfile />} />
      </Route>

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
