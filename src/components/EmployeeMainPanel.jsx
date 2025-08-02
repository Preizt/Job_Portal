import React from 'react';
import { Outlet } from 'react-router-dom';
import EmployeeSidePanel from './EmployeeSidePanel';

const EmployeeMainPanel = () => {
  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <EmployeeSidePanel />
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        
        <Outlet />
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  sidebar: {
    width: '250px',
    minWidth: '250px',
    backgroundColor: '#121212',
    boxShadow: '2px 0 6px rgba(0,0,0,0.3)',
    overflowY: 'auto',
  },
  main: {
    flexGrow: 1,
    padding: '20px',
    overflowY: 'auto',
    backgroundColor: '#121212',
    color: '#fff',
    boxSizing: 'border-box',
  },
};

export default EmployeeMainPanel;
