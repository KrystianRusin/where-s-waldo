import React, { useState } from "react";
import "../styles/NameModal.css";

const NameModal = ({ time, resetDifficulty }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/leaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, time }),
    });

    if (response.ok) {
      console.log("Response Worked: ", response);
    }
    resetDifficulty();
  };

  return (
    <div className="name-modal-container">
      <div className="name-form-container">
        <h2>Please Enter Your Name</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NameModal;
