import React from "react";
import "./FactCard.css";

// Component to display the fun fact and image of the selected animal
const FactCard = ({ funFact, imageUrl, isLoading }) => {
  return (
    <div className="fact-card">
      <h2>Fun Fact</h2>
      {isLoading ? (
        // Show loading message while data is being fetched
        <p>🐾 Loading...</p>
      ) : (
        <>
          {/* Display the fun fact */}
          <p>{funFact || "No fact available."}</p>
          {/* Display the image or a fallback message */}
          {imageUrl ? (
            <img src={imageUrl} alt="Animal" className="animal-image" />
          ) : (
            <p>No image available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default FactCard;