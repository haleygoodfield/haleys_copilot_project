import React from "react";

// Button to re-fetch the current animal's data
const RefreshButton = ({ onRefresh }) => {
  return (
    <button onClick={onRefresh} className="refresh-button">
      Refresh Fun Fact
    </button>
  );
};

export default RefreshButton;