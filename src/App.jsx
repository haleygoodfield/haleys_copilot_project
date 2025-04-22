/*
  App: Random Zoo Animal Explorer
  Features:
    - Load a list of animals from a local JSON file
    - Randomly display one animal's name, fun fact, and image
    - Refresh button to load a new random animal
    - Handles loading and error states
    - Uses local images stored in the /public folder
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

  // Function to fetch random animal data (fact and image) from the local JSON file
  const fetchAnimalData = async () => {
    setLoading(true); // Set loading state to true
    setError(false); // Reset error state
    try {
      console.log("🔍 Fetching /data/animals.json...");

      // Fetch data from the local JSON file
      const res = await fetch("/data/animals.json");

      console.log("✅ Response status:", res.status);

      // Check if the response is not OK
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // Parse the JSON response
      const data = await res.json();

      console.log("🐾 Animal data loaded:", data);

      // Select a random animal from the data
      const randomAnimal = data[Math.floor(Math.random() * data.length)];

      // Update the state with the fun fact and image URL
      setFact(
        `The ${randomAnimal.name} is a ${randomAnimal.type}. It lives in ${randomAnimal.habitat}, eats ${randomAnimal.diet}, and can live up to ${randomAnimal.lifespan}.`
      );
      setImageUrl(`/${randomAnimal.image}`);
    } catch (err) {
      // Handle errors by logging and updating the error state
      console.error("❌ Fetch failed:", err);
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