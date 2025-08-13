import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import EmployeeSidePanel from './EmployeeSidePanel';

const EmployeeMainPanel = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div style={styles.wrapper}>
      {/* Toggle Button */}
      {!sidebarVisible && (
        <button onClick={() => setSidebarVisible(true)} style={styles.toggleBtn}>
          <i className="fa-solid fa-bars" />
        </button>
      )}

      {/* Sidebar */}
      {sidebarVisible && (
        <div style={styles.sidebar}>
          <EmployeeSidePanel toggleSidebar={() => setSidebarVisible(false)} />
        </div>
      )}

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
    position: 'relative',
  },
  sidebar: {
    width: '250px',
    minWidth: '250px',
    backgroundColor: '#121212',
    boxShadow: '2px 0 6px rgba(0,0,0,0.3)',
    overflowY: 'auto',
    transition: 'all 0.3s ease-in-out',
  },
  main: {
    flexGrow: 1,
    padding: '20px',
    overflowY: 'auto',
    backgroundColor: '#121212',
    color: '#fff',
    boxSizing: 'border-box',
  },
  toggleBtn: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '24px',
    cursor: 'pointer',
    zIndex: 9999,
  },
};

export default EmployeeMainPanel;
