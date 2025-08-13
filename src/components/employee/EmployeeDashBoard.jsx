import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { getChartData, getDashBoard } from "../../services/allAPI";

const EmployeeDashboard = () => {
  const [chart, setChart] = useState([]);
  const [stats, setStats] = useState({});

  console.log(chart);

  useEffect(() => {
    dashboardStats();
    chartData();
  }, []);

  const dashboardStats = async () => {
    const token = sessionStorage.getItem("jwttoken");

    if (token) {
      try {
        const reqHeader = { Authorization: `Bearer ${token}` };

        const apiResponse = await getDashBoard(reqHeader);

        if (apiResponse.status === 200) {
          setStats(apiResponse.data);
        } else {
          alert(apiResponse.data);
        }
      } catch (err) {
        alert(err.message || "Something went wrong while fetching jobs");
      }
    } else {
      toast.error("Please login first");
    }
  };

  const chartData = async () => {
    const token = sessionStorage.getItem("jwttoken");

    if (token) {
      try {
        const reqHeader = { Authorization: `Bearer ${token}` };

        const apiResponse = await getChartData(reqHeader);

        if (apiResponse.status === 200) {
          setChart(apiResponse.data);
        } else {
          alert(apiResponse.data);
        }
      } catch (err) {
        alert(err.message || "Something went wrong while fetching jobs");
      }
    } else {
      toast.error("Please login first");
    }
  };

  return (
    <div style={styles.container}>
      {/* Summary Cards */}
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h5 style={styles.cardTitle}>Total Job Posts</h5>
          <h2 style={styles.cardNumber}>{stats.totalJobPosts}</h2>
        </div>
        <div style={styles.card}>
          <h5 style={styles.cardTitle}>Total Applications</h5>
          <h2 style={styles.cardNumber}>{stats.totalApplications}</h2>
        </div>
        <div style={styles.card}>
          <h5 style={styles.cardTitle}>Pending Reviews</h5>
          <h2 style={styles.cardNumber}>{stats.pendingApplications}</h2>
        </div>
      </div>

      {/* Chart Section */}
      <div style={styles.chartBox}>
        <h4 style={styles.sectionTitle}>Monthly Applications Overview</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chart}
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
