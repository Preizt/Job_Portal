import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./Footer";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500); // Delay to show 100% momentarily
          return 100;
        }
        return prev + 1;
      });
    }, 10); // Adjust speed

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center text-white"
        style={{
          backgroundColor: "#000",
          minHeight: "100vh",
        }}
      >
        <h1 className="fw-bold">
          {" "}
          Nex<span style={{ color: "#2196F3" }}>Hire</span>
        </h1>
        <p>Where Employers Meet Exceptional Talent</p>
        <span class="loader"></span>
      </div>
    );
  }

  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("jwttoken");

  const handlePostJob = () => {
    const token = sessionStorage.getItem("jwttoken");
    const role = sessionStorage.getItem("role");

    if (!token) {
      toast.warning("Login Required");
    } else if (role === "employer") {
      navigate("/employer/addjob");
    } else {
      toast.error("Access Denied");
    }
  };

  return (
    <>
      <Header />

      <div
        className="home-container text-white"
        style={{ backgroundColor: "#000", minHeight: "100vh" }}
      >
        {/* Hero Section */}
        <div className="container py-5">
          <div className="row align-items-center">
            {/* Left Side: Text Content */}
            <div className="col-md-6 text-center text-md-start">
              <h1 className="display-4 fw-bold mb-3">
                Welcome to{" "}
                <span style={{ color: "#fff" }}>
                  Nex<span style={{ color: "#2196F3" }}>Hire</span>
                </span>
              </h1>
              <p className="lead mb-4 text-light">
                Discover jobs, post opportunities, and connect with top
                talent—all in one place.
              </p>

              <div className="d-flex flex-column flex-sm-row justify-content-start gap-3 mb-4">
                <Link
                  to="/jobs"
                  className="btn btn-outline-light px-4 rounded-pill fw-semibold"
                >
                  Find Jobs
                </Link>
                <button
                  className="btn btn-light text-black px-4 rounded-pill fw-semibold"
                  onClick={handlePostJob}
                >
                  Post a Job
                </button>
              </div>

              {/* Top Companies Tag Section */}
              <div className="mt-4">
                <p className="text-light fw-semibold mb-1">
                  Top companies hiring from NexHire:
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge bg-light text-dark px-3 py-2 rounded-pill">
                    Google
                  </span>
                  <span className="badge bg-light text-dark px-3 py-2 rounded-pill">
                    Amazon
                  </span>
                  <span className="badge bg-light text-dark px-3 py-2 rounded-pill">
                    Microsoft
                  </span>
                  <span className="badge bg-light text-dark px-3 py-2 rounded-pill">
                    Infosys
                  </span>
                  <span className="badge bg-light text-dark px-3 py-2 rounded-pill">
                    TCS
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: Hero Illustration */}
            <div className="col-md-6 text-center mt-5 mt-md-0">
             <img
  src="data:image/png;base64,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" 
  alt="Job Search Illustration"
  className="img-fluid"
  style={{ maxHeight: "400px" }}
/>

            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container py-5">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <i className="fa-solid fa-briefcase fs-1 mb-3 text-white"></i>
              <h4 className="fw-semibold">Explore Jobs</h4>
              <p className="text-light">
                Browse jobs from various categories that fit your passion.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <i className="fa-solid fa-upload fs-1 mb-3 text-white"></i>
              <h4 className="fw-semibold">Post Opportunities</h4>
              <p className="text-light">
                Quickly post and manage job listings with ease.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <i className="fa-solid fa-user-check fs-1 mb-3 text-white"></i>
              <h4 className="fw-semibold">Track Applicants</h4>
              <p className="text-light">
                View who applied and manage candidates efficiently.
              </p>
            </div>
          </div>
        </div>

        {/* Top Companies Section */}
        <div className="container py-5">
          <h2 className="text-center fw-bold mb-4">
            Top Companies Hiring From Us
          </h2>
          <div className="row text-center mt-5">
            {[
              "google.com",
              "microsoft.com",
              "amazon.com",
              "meta.com",
              "tcs.com",
              "infosys.com",
              "accenture.com",
              "adobe.com",
            ].map((domain, index) => (
              <div className="col-md-3 mb-4" key={index}>
                <img
                  src={`https://logo.clearbit.com/${domain}`}
                  alt={domain}
                  width="80"
                  height="80"
                />
                <p className="mt-2 fw-semibold">
                  {domain.replace(".com", "").toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="container py-5">
          <h2 className="text-center fw-bold mb-5 text-white">
            What Our Users Say
          </h2>
          <div className="row g-4">
            {[
              {
                text: `"NexHire helped me land my first remote job. Super easy and effective!"`,
                name: "- Akshay R., Developer",
              },
              {
                text: `"I posted a job and got 15+ qualified applicants within 2 days."`,
                name: "- Priya M., Recruiter",
              },
              {
                text: `"Clean interface, fast application process. Love the dark theme!"`,
                name: "- Neha S., Designer",
              },
            ].map((item, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="p-4 bg-dark border rounded-4 text-white h-100 shadow">
                  <p className="fst-italic">{item.text}</p>
                  <h6 className="mt-3 text-end">{item.name}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="container py-5 text-center">
          <h2 className="fw-bold">Ready to find your next opportunity?</h2>
          <p className="mb-4">
            Join thousands of users getting hired through NexHire every day.
          </p>
          <Link
            to="/register"
            className="btn btn-light text-black px-5 py-2 rounded-pill fw-semibold"
          >
            Get Started
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
