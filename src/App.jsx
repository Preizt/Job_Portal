import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../src/components/Home";
import Auth from "./components/Auth";
import AllJobs from "./components/AllJobs";

import EmployeeDashboard from "../src/components/employee/EmployeeDashBoard";
import EmployeeCRUD from "./components/employee/EmployeeCRUD";
import EmployeeMainPanel from "./components/EmployeeMainPanel";
import Applicant from "./components/employee/Applicant";
import ApplicantProfile from "./components/ApplicantProfile";
import { Bounce, ToastContainer } from "react-toastify";
import SingleJobView from "./components/SingleJobView";
import JobPostView from "./components/employee/JobPostView";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
       <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth fromRegisterPage={true} />} />

        <Route path="/employer" element={<EmployeeMainPanel />}>
          <Route path="dashboard" index element={<EmployeeDashboard />} />
          <Route path="addjob" element={<EmployeeCRUD />} />
          <Route path="applications" element={<Applicant />} />
          <Route path="singlejobpost/:id" element={<JobPostView />} />
        </Route>

        <Route path="/jobs" element={<AllJobs />} />
        <Route path="/applicantprofile" element={<ApplicantProfile />} />
        <Route path="/applicantsinglepost/:id" element={<SingleJobView />} />
      </Routes>
    </>
  );
}

export default App;
