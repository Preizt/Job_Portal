import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UploadJobs = () => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: '',
    requirements: '',
    employer: '',
    applications: 0, // default to 0, read-only
    type: '',
    category: '',
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job Posted:', jobData);
    // Add Axios POST request here to your backend
  };

  const jobTypes = ['Full-time', 'Part-time', 'Internship', 'Contract'];
  const categories = ['IT', 'Marketing', 'Design', 'HR', 'Finance'];

  return (
    <>

    <Header/>
      <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f4f6f8',
        padding: '60px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        fluid
        style={{
          background: '#ffffff',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 0 25px rgba(0, 0, 0, 0.1)',
          maxWidth: '1000px',
        }}
      >
        <h2 className="text-center mb-5 fw-bold">Create a Job Opening</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="g-4">
            <Col md={6}>
              <Form.Group controlId="title">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={jobData.title}
                  onChange={handleChange}
                  placeholder="e.g. React Developer"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  name="company"
                  value={jobData.company}
                  onChange={handleChange}
                  placeholder="e.g. NexHire Pvt Ltd"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={jobData.location}
                  onChange={handleChange}
                  placeholder="e.g. Bangalore / Remote"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="salary">
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  type="text"
                  name="salary"
                  value={jobData.salary}
                  onChange={handleChange}
                  placeholder="e.g. ₹10,00,000 / year"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="type">
                <Form.Label>Job Type</Form.Label>
                <Form.Select
                  name="type"
                  value={jobData.type}
                  onChange={handleChange}
                >
                  {jobTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={jobData.category}
                  onChange={handleChange}
                >
                  {categories.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group controlId="description">
                <Form.Label>Job Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  value={jobData.description}
                  onChange={handleChange}
                  placeholder="Describe the job responsibilities, tools, expectations, etc."
                  required
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group controlId="requirements">
                <Form.Label>Requirements</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="requirements"
                  value={jobData.requirements}
                  onChange={handleChange}
                  placeholder="List skills, qualifications, experience needed, etc."
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="employer">
                <Form.Label>Posted By (Employer)</Form.Label>
                <Form.Control
                  type="text"
                  name="employer"
                  value={jobData.employer}
                  onChange={handleChange}
                  placeholder="e.g. John Doe, HR Manager"
                  required
                />
              </Form.Group>
            </Col>

            
          </Row>

          <div className="text-center mt-4">
            <Button variant="success" type="submit" className="px-5 py-2 rounded-pill">
              Submit Job
            </Button>
          </div>
        </Form>
      </Container>
    </div>
    <Footer/>
    </>
  
  );
};

export default UploadJobs;
