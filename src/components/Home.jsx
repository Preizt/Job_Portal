import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./Footer";
import { toast } from "react-toastify";

const Home = () => {
  // const [loading, setLoading] = useState(true);
  // const [percent, setPercent] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setPercent((prev) => {
  //       if (prev >= 100) {
  //         clearInterval(interval);
  //         setTimeout(() => setLoading(false), 500); // Delay to show 100% momentarily
  //         return 100;
  //       }
  //       return prev + 1;
  //     });
  //   }, 5); // Adjust speed

  //   return () => clearInterval(interval);
  // }, []);

  // if (loading) {
  //   return (
  //     <div
  //       className="d-flex flex-column justify-content-center align-items-center text-white"
  //       style={{
  //         backgroundColor: "#000",
  //         minHeight: "100vh",
  //       }}
  //     >

  //       <h1 className="fw-bold"> NexHire</h1>
  //       <p>Where Employers Meet Exceptional Talent</p>
  //       <div className="spinner-border text-light mb-3" role="status" />
  //       <p className="mt-2">{percent}%</p>
  //     </div>
  //   );
  // }

  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("jwttoken");

  const navigate = useNavigate();

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
        <div className="container py-5 text-center">
          <h1 className="display-4 fw-bold mb-3">
            Welcome to <span style={{ color: "#fff" }}>NexHire</span>
          </h1>
          <p className="lead mb-4">
            Discover jobs, post opportunities, and connect with top talent—all
            in one place.
          </p>
          <div className="d-flex justify-content-center gap-3 mb-4">
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
          <p className="text-light w-75 mx-auto">
            <strong>NexHire</strong> is a modern job portal web application that
            bridges the gap between job seekers and employers. Employers can
            post job openings and manage applicants, while job seekers can
            explore opportunities and apply instantly.
          </p>
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
