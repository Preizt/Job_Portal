import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", Applications: 30 },
  { name: "Feb", Applications: 45 },
  { name: "Mar", Applications: 28 },
  { name: "Apr", Applications: 60 },
  { name: "May", Applications: 40 },
  { name: "Jun", Applications: 70 },
];

const recentApplications = [
  { name: "John Doe", position: "Frontend Developer", date: "2025-07-25" },
  { name: "Jane Smith", position: "UI/UX Designer", date: "2025-07-24" },
  { name: "Michael Lee", position: "Backend Developer", date: "2025-07-23" },
];

const EmployeeDashboard = () => {
  return (
    <div style={styles.container}>
      

      {/* Summary Cards */}
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h5>Total Job Posts</h5>
          <h2>12</h2>
        </div>
        <div style={styles.card}>
          <h5>Total Applications</h5>
          <h2>245</h2>
        </div>
        <div style={styles.card}>
          <h5>Pending Reviews</h5>
          <h2>8</h2>
        </div>
      </div>

      {/* Chart Section */}
      <div style={styles.chartBox}>
        <h4 style={{ color: "#1E88E5", marginBottom: "20px" }}>
          Monthly Applications Overview
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Applications" fill="#1E88E5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Applications */}
      <div style={styles.recentBox}>
        <h4 style={{ color: "#1E88E5", marginBottom: "15px" }}>
          Recent Job Applications
        </h4>
        <ul>
          {recentApplications.map((app, index) => (
            <li key={index} style={{ marginBottom: "10px", color: "#444" }}>
              <strong>{app.name}</strong> applied for{" "}
              <em>{app.position}</em> on {app.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#f5f7fa",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#1E88E5",
    fontWeight: "600",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "40px",
  },
  card: {
    flex: "1 1 200px",
    backgroundColor: "#f0f4f8",
    borderLeft: "5px solid #1E88E5",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    transition: "transform 0.2s ease-in-out",
  },
  chartBox: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    marginBottom: "40px",
  },
  recentBox: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.07)",
  },
};

export default EmployeeDashboard;
