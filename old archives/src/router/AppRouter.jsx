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
      </Route>

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
