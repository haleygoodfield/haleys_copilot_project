/*
  App: Animal Fun Facts Explorer
  Features:
    - Dropdown to select an animal
    - Fetch and display a fun fact and image for the selected animal
    - Refresh button to re-fetch data
    - Handle loading states
*/

import React, { useEffect, useState } from "react";
import FactCard from "./components/FactCard"; // Component to display the fun fact and image
import RefreshButton from "./components/RefreshButton"; // Component for the refresh button

const App = () => {
  // State to store the fun fact about the animal
  const [fact, setFact] = useState("");

  // State to store the image URL of the animal
  const [imageUrl, setImageUrl] = useState("");

  // State to track whether data is being loaded
  const [loading, setLoading] = useState(true);

  // State to track if there was an error during the fetch
  const [error, setError] = useState(false);

  // Function to fetch random animal data (fact and image) from the API
  const fetchAnimalData = async () => {
    setLoading(true); // Set loading state to true
    setError(false); // Reset error state
    try {
      // Fetch data from the API
      const res = await fetch("https://zoo-animal-api.vercel.app/api/animals/rand");
      const data = await res.json();

      // Update state with the fetched fact and image
      setFact(
        `The ${data.name} is a ${data.animal_type}. It lives in ${data.habitat}, eats ${data.diet}, and can live up to ${data.lifespan} years.`
      );
      setImageUrl(data.image_link);
    } catch (err) {
      // Handle errors by setting the error state
      setError(true);
      setFact(""); // Clear the fact if an error occurs
      setImageUrl(""); // Clear the image if an error occurs
    } finally {
      // Set loading state to false after fetch completes
      setLoading(false);
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchAnimalData(); // Fetch data on initial render
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="app">
      <h1>🐾 Random Zoo Animal Facts</h1>
      {/* Button to refresh the fun fact */}
      <RefreshButton onRefresh={fetchAnimalData} />
      {/* Display error message or the fact card */}
      {error ? (
        <p style={{ color: "red" }}>Oops! Couldn't fetch data. Try again later.</p>
      ) : (
        <FactCard funFact={fact} imageUrl={imageUrl} isLoading={loading} />
      )}
    </div>
  );
};

export default App;