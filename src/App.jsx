import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../src/components/Home";
import Auth from "./components/Auth";
import AllJobs from "./components/AllJobs";

import EmployeeDashboard from "../src/components/employee/EmployeeDashBoard";
import EmployeeCRUD from "./components/employee/EmployeeCRUD";
import EmployeeMainPanel from "./components/EmployeeMainPanel";
import Applicant from "./components/employee/Applicant";
import SingleJobView from "./components/SingleJobView";
import ApplicantProfile from "./components/ApplicantProfile";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth fromRegisterPage={true} />} />

        <Route path="/employer" element={<EmployeeMainPanel />}>
          <Route path="dashboard" index element={<EmployeeDashboard />} />
          <Route path="addjob" element={<EmployeeCRUD />} />
          <Route path="applications" element={<Applicant />} />
        </Route>

        <Route path="/jobs" element={<AllJobs />} />
        <Route path="/applicantprofile" element={<ApplicantProfile />} />
        <Route path="/singlepost" element={<SingleJobView />} />
      </Routes>
    </>
  );
}

export default App;
