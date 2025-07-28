import React from 'react';
import { Outlet } from 'react-router-dom';
import EmployeeSidePanel from './EmployeeSidePanel';

const EmployeeMainPanel = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Fixed Sidebar */}
      <div
        style={{
          width: "240px",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          backgroundColor: "#fff",
          boxShadow: "2px 0 6px rgba(0,0,0,0.05)",
          zIndex: 1000,
        }}
      >
        <EmployeeSidePanel />
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: "240px", padding: "20px", flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeMainPanel;
