import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./Footer";

const Home = () => {
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
            <Link
              to="/uploadjobs"
              className="btn btn-light text-black px-4 rounded-pill fw-semibold"
            >
              Post a Job
            </Link>
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
            <div className="col-md-3 mb-4">
              <img
                src="https://logo.clearbit.com/google.com"
                alt="Google"
                width="80"
                height="80"
              />
              <p className="mt-2 fw-semibold">Google</p>
            </div>
            <div className="col-md-3 mb-4">
              <img
                src="https://logo.clearbit.com/microsoft.com"
                alt="Microsoft"
                width="80"
                height="80"
              />
              <p className="mt-2 fw-semibold">Microsoft</p>
            </div>
            <div className="col-md-3 mb-4">
              <img
                src="https://logo.clearbit.com/amazon.com"
                alt="Amazon"
                width="80"
                height="80"
              />
              <p className="mt-2 fw-semibold">Amazon</p>
            </div>
            <div className="col-md-3 mb-4">
              <img
                src="https://logo.clearbit.com/meta.com"
                alt="Meta"
                width="80"
                height="80"
              />
              <p className="mt-2 fw-semibold">Meta</p>
            </div>
            <div className="col-md-3 mb-4">
              <img
                src="https://logo.clearbit.com/tcs.com"
                alt="TCS"
                width="80"
                height="80"
              />
              <p className="mt-2 fw-semibold">TCS</p>
            </div>
            <div className="col-md-3 mb-4">
              <img
                src="https://logo.clearbit.com/infosys.com"
                alt="Infosys"
                width="80"
                height="80"
              />
              <p className="mt-2 fw-semibold">Infosys</p>
            </div>
            <div className="col-md-3 mb-4">
              <img
                src="https://logo.clearbit.com/accenture.com"
                alt="Accenture"
                width="80"
                height="80"
              />
              <p className="mt-2 fw-semibold">Accenture</p>
            </div>
            <div className="col-md-3 mb-4">
              <img
                src="https://logo.clearbit.com/adobe.com"
                alt="Adobe"
                width="80"
                height="80"
              />
              <p className="mt-2 fw-semibold">Adobe</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="container py-5">
          <h2 className="text-center fw-bold mb-5 text-white">
            What Our Users Say
          </h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 bg-dark border rounded-4 text-white h-100 shadow">
                <p className="fst-italic">
                  "NexHire helped me land my first remote job. Super easy and
                  effective!"
                </p>
                <h6 className="mt-3 text-end">- Akshay R., Developer</h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-dark border rounded-4 text-white h-100 shadow">
                <p className="fst-italic">
                  "I posted a job and got 15+ qualified applicants within 2
                  days."
                </p>
                <h6 className="mt-3 text-end">- Priya M., Recruiter</h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-dark border rounded-4 text-white h-100 shadow">
                <p className="fst-italic">
                  "Clean interface, fast application process. Love the dark
                  theme!"
                </p>
                <h6 className="mt-3 text-end">- Neha S., Designer</h6>
              </div>
            </div>
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
      <Footer/>
    </>
  );
};

export default Home;
