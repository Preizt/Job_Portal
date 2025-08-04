import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./Footer";
import { toast } from "react-toastify";
import {
  FaBriefcase,
  FaUpload,
  FaUserCheck,
  FaRocket,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";

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
        <span className="loader"></span>
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

        <div
          className="hero-section py-5 py-lg-7"
          style={{ backgroundColor: "#000" }}
        >
          <div className="container">
            <div className="row align-items-center justify-content-center">
              {/* Left Content */}
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="mb-4">
                  <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3">
                    <i className="fas fa-bolt me-2"></i> Trusted by 10,000+
                    companies
                  </span>
                </div>

                <h1 className="display-4 fw-bold mb-4 text-white">
                  Launch Your <span className="text-primary">Career</span>{" "}
                  <br />
                  Land Your <span className="text-primary">Dream Team</span>
                </h1>

                <p
                  className="lead text-light mb-5 opacity-75"
                  style={{ maxWidth: "500px" }}
                >
                  Nex<span className="text-primary">Hire</span> connects top
                  talent with innovative companies through AI-powered matching
                  technology.
                </p>

                <div className="d-flex flex-wrap gap-3 mb-5">
                  <Link
                    to="/jobs"
                    className="btn btn-primary btn-lg rounded-pill px-4 fw-semibold d-flex align-items-center"
                  >
                    <i className="fas fa-search me-2"></i> Explore Jobs
                  </Link>
                  <button
                    onClick={handlePostJob}
                    className="btn btn-outline-light btn-lg rounded-pill px-4 fw-semibold d-flex align-items-center"
                  >
                    <i className="fas fa-plus me-2"></i> Post a Job
                  </button>
                </div>

                <div className="d-flex align-items-center flex-wrap gap-4">
                  <div className="d-flex align-items-center">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="border border-2 border-dark rounded-circle"
                        style={{
                          width: "40px",
                          height: "40px",
                          marginLeft: i > 1 ? "-12px" : "0",
                          backgroundImage: `url(https://randomuser.me/api/portraits/${
                            i % 2 === 0 ? "women" : "men"
                          }/${i}.jpg)`,
                          backgroundSize: "cover",
                          zIndex: 5 - i,
                        }}
                      ></div>
                    ))}
                  </div>
                  <div>
                    <p className="mb-0 text-white small">
                      <span className="fw-bold">5,000+</span> successful hires
                      this month
                    </p>
                    <div className="d-flex align-items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className="fas fa-star text-warning small me-1"
                        ></i>
                      ))}
                      <span className="text-white-50 small ms-2">
                        4.9/5 (2,500 reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="col-lg-6 position-relative">
                <div className="position-relative">
                  <img
                    src="https://i.pinimg.com/564x/da/8c/68/da8c6866ef2e8e4b2acca1e36322564c.jpg"
                    alt="Job Search"
                    className="img-fluid rounded-4 shadow-lg"
                  />

                  {/* Floating elements */}
                  <div
                    className="position-absolute top-0 start-0 bg-dark p-3 rounded-4 shadow ms-3 mt-3"
                    style={{ width: "160px" }}
                  >
                    <div className="d-flex align-items-center">
                      <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-2 me-2">
                        <i className="fas fa-briefcase"></i>
                      </div>
                      <div>
                        <p className="mb-0 small fw-bold">25K+ Jobs</p>
                        <p className="mb-0 x-small opacity-75">
                          Active listings
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="position-absolute bottom-0 end-0 bg-primary p-3 rounded-4 shadow me-3 mb-3"
                    style={{ width: "160px" }}
                  >
                    <div className="d-flex align-items-center">
                      <div className="bg-white text-primary rounded-circle p-2 me-2">
                        <i className="fas fa-rocket"></i>
                      </div>
                      <div>
                        <p className="mb-0 small fw-bold">Fast Hiring</p>
                        <p className="mb-0 x-small opacity-75">7 day average</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Logos */}
            <div className="row mt-5 pt-4">
              <div className="col-12">
                <p className="text-center text-white-50 small mb-4">
                  TRUSTED BY INDUSTRY LEADERS
                </p>
                <div className="d-flex flex-wrap align-items-center justify-content-center gap-4">
                  {[
                    "https://cdn-icons-png.flaticon.com/512/2504/2504799.png", // Google
                    "https://cdn-icons-png.flaticon.com/512/732/732221.png", // Amazon
                    "https://cdn-icons-png.flaticon.com/512/5968/5968342.png", // Microsoft
                    "https://cdn-icons-png.flaticon.com/512/733/733553.png", // Facebook (Meta)
                    "https://cdn-icons-png.flaticon.com/512/5969/5969059.png", // Apple
                    "https://cdn-icons-png.flaticon.com/512/6124/6124994.png", // Netflix
                    "https://cdn-icons-png.flaticon.com/512/174/174857.png", // LinkedIn
                    "https://cdn-icons-png.flaticon.com/512/882/882730.png", // Infosys
                    "https://cdn-icons-png.flaticon.com/512/732/732228.png", // TCS
                  ].map((logo, index) => (
                    <img
                      key={index}
                      src={logo}
                      alt="Company logo"
                      className="img-fluid"
                      style={{
                        height: "50px",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <section className="py-5 bg-dark-gradient">
          <div className="container">
            <div className="row g-4 text-center">
              {[
                { value: "50K+", label: "Active Jobs" },
                { value: "10M+", label: "Candidates" },
                { value: "25K+", label: "Companies" },
                { value: "98%", label: "Satisfaction Rate" },
              ].map((stat, i) => (
                <div className="col-md-3 col-6" key={i}>
                  <h2 className="display-5 fw-bold text-primary">
                    {stat.value}
                  </h2>
                  <p className="opacity-75">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-5 py-lg-7">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold mb-3">
                How Nex<span className="text-primary">Hire</span> Works
              </h2>
              <p
                className="lead opacity-75 mx-auto"
                style={{ maxWidth: "700px" }}
              >
                Our platform makes hiring and getting hired simple, efficient,
                and effective
              </p>
            </div>
            <div className="row g-4">
              {[
                {
                  icon: <FaBriefcase size={32} className="text-primary" />,
                  title: "Create Profile",
                  desc: "Complete your profile to showcase your skills and experience",
                },
                {
                  icon: <FaChartLine size={32} className="text-primary" />,
                  title: "Smart Matching",
                  desc: "Our AI matches you with the most relevant opportunities",
                },
                {
                  icon: <FaUserCheck size={32} className="text-primary" />,
                  title: "Apply Easily",
                  desc: "One-click applications for qualified candidates",
                },
                {
                  icon: <FaShieldAlt size={32} className="text-primary" />,
                  title: "Get Hired",
                  desc: "Secure your next career opportunity faster",
                },
              ].map((step, i) => (
                <div className="col-md-3 col-6" key={i}>
                  <div className="p-4 bg-dark rounded-4 h-100 text-center">
                    <div className="mb-3">{step.icon}</div>
                    <h5 className="fw-bold mb-2">{step.title}</h5>
                    <p className="small opacity-75 mb-0">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      
       

        {/* Testimonials */}
        <section className="py-5 py-lg-7">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold mb-3">Success Stories</h2>
              <p
                className="lead opacity-75 mx-auto"
                style={{ maxWidth: "700px" }}
              >
                Don't just take our word for it - hear from our community
              </p>
            </div>
            <div className="row g-4">
              {[
                {
                  quote:
                    "NexHire helped me transition to a remote role with a 40% salary increase in just 2 weeks of searching.",
                  name: "Akshay R.",
                  role: "Senior Developer at Google",
                  img: "https://randomuser.me/api/portraits/men/32.jpg",
                },
                {
                  quote:
                    "We filled 3 critical positions in under 10 days using NexHire's targeted matching system.",
                  name: "Priya M.",
                  role: "HR Director at Microsoft",
                  img: "https://randomuser.me/api/portraits/women/44.jpg",
                },
                {
                  quote:
                    "The quality of candidates we receive through NexHire is consistently higher than other platforms.",
                  name: "Rahul S.",
                  role: "CTO at Startup",
                  img: "https://randomuser.me/api/portraits/men/75.jpg",
                },
              ].map((testimonial, i) => (
                <div className="col-md-4" key={i}>
                  <div className="p-4 bg-dark rounded-4 h-100 d-flex flex-column">
                    <p className="fst-italic mb-4">"{testimonial.quote}"</p>
                    <div className="mt-auto d-flex align-items-center">
                      <img
                        src={testimonial.img}
                        alt={testimonial.name}
                        className="rounded-circle me-3"
                        width="50"
                        height="50"
                      />
                      <div>
                        <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
                        <small className="opacity-75">{testimonial.role}</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

       
      </div>
      <Footer />
    </>
  );
};

export default Home;
