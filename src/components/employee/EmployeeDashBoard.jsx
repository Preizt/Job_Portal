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
          <h5 style={styles.cardTitle}>Total Job Posts</h5>
          <h2 style={styles.cardNumber}>12</h2>
        </div>
        <div style={styles.card}>
          <h5 style={styles.cardTitle}>Total Applications</h5>
          <h2 style={styles.cardNumber}>245</h2>
        </div>
        <div style={styles.card}>
          <h5 style={styles.cardTitle}>Pending Reviews</h5>
          <h2 style={styles.cardNumber}>8</h2>
        </div>
      </div>

      {/* Chart Section */}
      <div style={styles.chartBox}>
        <h4 style={styles.sectionTitle}>Monthly Applications Overview</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1e1e2f", border: "none" }}
              labelStyle={{ color: "#ccc" }}
              itemStyle={{ color: "#fff" }}
            />
            <Bar dataKey="Applications" fill="#4FC3F7" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Applications */}
      <div style={styles.recentBox}>
        <h4 style={styles.sectionTitle}>Recent Job Applications</h4>
        <ul>
          {recentApplications.map((app, index) => (
            <li key={index} style={styles.listItem}>
              <strong style={{ color: "#fff" }}>{app.name}</strong> applied for{" "}
              <em style={{ color: "#90caf9" }}>{app.position}</em> on{" "}
              <span style={{ color: "#ccc" }}>{app.date}</span>
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
    backgroundColor: "#121212",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#e0e0e0",
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
    backgroundColor: "#1f1f1f",
    borderLeft: "5px solid #4FC3F7",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    transition: "transform 0.2s ease-in-out",
  },
  cardTitle: {
    color: "#aaa",
    fontSize: "14px",
    marginBottom: "8px",
  },
  cardNumber: {
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: "600",
  },
  chartBox: {
    backgroundColor: "#1f1f1f",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
    marginBottom: "40px",
  },
  sectionTitle: {
    color: "#4FC3F7",
    marginBottom: "15px",
  },
  recentBox: {
    backgroundColor: "#1f1f1f",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
  },
  listItem: {
    marginBottom: "10px",
    fontSize: "15px",
    lineHeight: "1.5",
  },
};

export default EmployeeDashboard;
