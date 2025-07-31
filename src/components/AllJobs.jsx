import React, { useState } from "react";
import { Form, Row, Col, Card, Button, Stack } from "react-bootstrap";
import Header from '../components/Header';
import Footer from "../components/Footer";

const AllJobs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechNova",
      category: "IT",
      location: "Remote",
      type: "Full-time",
      salary: "₹6,00,000 - ₹9,00,000 / year",
    },
    {
      id: 2,
      title: "Marketing Executive",
      company: "MarketMinds",
      category: "Marketing",
      location: "Kochi",
      type: "Part-time",
      salary: "₹3,00,000 - ₹4,50,000 / year",
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "CodeCraft",
      category: "IT",
      location: "Bangalore",
      type: "Full-time",
      salary: "₹7,00,000 - ₹11,00,000 / year",
    },
    {
      id: 4,
      title: "Graphic Designer",
      company: "PixelPoint Studios",
      category: "Design",
      location: "Mumbai",
      type: "Contract",
      salary: "₹4,00,000 - ₹5,50,000 / year",
    },
    {
      id: 5,
      title: "HR Generalist",
      company: "PeopleFirst",
      category: "HR",
      location: "Chennai",
      type: "Full-time",
      salary: "₹5,00,000 - ₹6,50,000 / year",
    },
    {
      id: 5,
      title: "HR Generalist",
      company: "PeopleFirst",
      category: "HR",
      location: "Chennai",
      type: "Full-time",
      salary: "₹5,00,000 - ₹6,50,000 / year",
    },
  ];

  const categories = ["All", "IT", "Marketing", "HR", "Design"];

  const filteredJobs = jobs.filter((job) => {
    return (
      (category === "All" || job.category === category) &&
      job.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (

    <>

    <Header/>

        <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <h2 className="mb-4 fw-bold text-center text-dark">
          Start Your Future with NexHire
        </h2>

        {/* Sticky Filters */}
        <div
          className="bg-white p-3 shadow-sm rounded mb-4 sticky-top"
          style={{ top: "70px", zIndex: 1000 }}
        >
          <Form className="mb-3">
            <Form.Control
              type="text"
              placeholder="🔍 Search by job title..."
              className="rounded-pill px-4 py-2 shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>

          <Stack
            direction="horizontal"
            gap={3}
            className="justify-content-center flex-wrap"
          >
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={cat === category ? "dark" : "outline-dark"}
                onClick={() => setCategory(cat)}
                className="rounded-pill"
              >
                {cat}
              </Button>
            ))}
          </Stack>
        </div>

        {/* Job Cards */}
        <Row className="g-4 justify-content-center">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Col md={6} lg={4} key={job.id}>
                <Card className="shadow-sm border-0 h-100">
                  <Card.Body>
                    <Card.Title className="fw-bold">{job.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {job.company}
                    </Card.Subtitle>
                    <Card.Text>
                      <small className="d-block">📍 {job.location}</small>
                      <small className="d-block">💼 {job.type}</small>
                      <small className="d-block">💰 {job.salary}</small>
                    </Card.Text>
                    <Button
                      variant="outline-dark"
                      className="w-100 mt-3 rounded-pill"
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-muted text-center">No jobs found.</p>
          )}
        </Row>
      </div>
    </div>

    <Footer/>
    
    </>


  );
};

export default AllJobs;
