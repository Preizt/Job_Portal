import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../src/components/Home";
import Auth from "./components/Auth";
import AllJobs from "./components/AllJobs";
import UploadJobs from "./components/UploadJobs";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";
import EmployeeCRUD from "./components/employee/EmployeeCRUD";
import EmployeeMainPanel from "./components/EmployeeMainPanel";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth fromRegisterPage={true} />} />


         <Route path="/employer" element={<EmployeeMainPanel/>}>
          <Route path="dashboard" index element={<EmployeeDashboard />} />
          <Route path="addjob" element={<EmployeeCRUD />} />
                   

        </Route>

        <Route path="/jobs" element={<AllJobs />} />
        <Route path="/uploadjobs" element={<UploadJobs />} />
        
      </Routes>
    </>
  );
}

export default App;
