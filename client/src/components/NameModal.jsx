import React from "react";

const NameModal = () => {
  return (
    <div className="name-modal-container">
      <form action="/leaderboard" method="POST">
        <input type="text" name="name" placeholder="Enter your name" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NameModal;
