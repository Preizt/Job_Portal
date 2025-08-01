import React from 'react';
import { Edit } from 'lucide-react'; // ✅ Make sure you import this icon

const EditJobPost = () => {
  return (
    <button
      style={{ ...darkStyles.button, backgroundColor: "#43a047" }}
    >
      <Edit size={16} color="#fff" />
    </button>
  );
};

const darkStyles = {
  cardWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#121212", // Dark background
  },
   button: {
    flex: 1, // each button takes equal width
    border: "none",
    color: "#fff",
    padding: "10px 0", // vertical padding only
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center", // center icon horizontally
    alignItems: "center", // center icon vertically
  },
};

export default EditJobPost;
