import React from 'react';

const mockApplicants = [
  {
    id: 1,
    name: 'Rahul Kumar',
    job: 'Frontend Developer',
    location: 'Bangalore',
    status: 'Pending',
    avatar: 'https://i.pravatar.cc/100?img=1',
  },
  {
    id: 2,
    name: 'Sneha Patel',
    job: 'UI/UX Designer',
    location: 'Mumbai',
    status: 'Interviewed',
    avatar: 'https://i.pravatar.cc/100?img=2',
  },
  {
    id: 3,
    name: 'Vikram Singh',
    job: 'Backend Developer',
    location: 'Hyderabad',
    status: 'Hired',
    avatar: 'https://i.pravatar.cc/100?img=3',
  },
];

const Applicant = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Applicant List</h2>

      <div style={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search Applicants"
          style={styles.searchInput}
        />
      </div>

      <div style={styles.cardWrapper}>
        {mockApplicants.map((applicant) => (
          <div key={applicant.id} style={styles.card}>
            <img src={applicant.avatar} alt="Avatar" style={styles.avatar} />
            <div style={{ flex: 1 }}>
              <h4 style={styles.name}>{applicant.name}</h4>
              <p style={styles.detail}><strong>Job:</strong> {applicant.job}</p>
              <p style={styles.detail}><strong>Location:</strong> {applicant.location}</p>
              <p style={styles.status(applicant.status)}><strong>Status:</strong> {applicant.status}</p>
              <div style={styles.buttonGroup}>
                <button style={{ ...styles.actionButton, backgroundColor: '#4caf50' }}>Accept</button>
                <button style={{ ...styles.actionButton, backgroundColor: '#f44336' }}>Reject</button>
                <button style={{ ...styles.actionButton, backgroundColor: '#2196f3' }}>View Application</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    minHeight: '100vh',
    backgroundColor: '#121212',
    color: '#fff',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  searchWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  searchInput: {
    padding: '10px 16px',
    width: '100%',
    maxWidth: '400px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
    outline: 'none',
    transition: 'border 0.2s ease, box-shadow 0.2s ease',
  },
  cardWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: '20px',
    borderRadius: '10px',
    display: 'flex',
    gap: '15px',
    alignItems: 'flex-start',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  name: {
    margin: '0 0 8px',
    color: '#fff',
  },
  detail: {
    margin: '4px 0',
    fontSize: '14px',
    color: '#ccc',
  },
  status: (status) => ({
    marginTop: '8px',
    color:
      status === 'Pending'
        ? '#ffc107'
        : status === 'Interviewed'
        ? '#00bcd4'
        : '#4caf50',
    fontWeight: 'bold',
    fontSize: '14px',
  }),
  buttonGroup: {
    marginTop: '12px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  actionButton: {
    padding: '6px 12px',
    fontSize: '13px',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default Applicant;
