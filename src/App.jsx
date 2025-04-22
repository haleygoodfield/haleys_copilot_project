/*
  App: Animal Fun Facts Explorer
  Features:
    - Dropdown to select an animal
    - Fetch and display a fun fact and image for the selected animal
    - Refresh button to re-fetch data
    - Handle loading states
*/

import React, { useEffect, useState } from "react";
import AnimalSelector from "./components/AnimalSelector";
import FactCard from "./components/FactCard";
import RefreshButton from "./components/RefreshButton";

const App = () => {
  // State to store the currently selected animal
  const [selectedAnimal, setSelectedAnimal] = useState("dog");

  // State to store the fun fact about the selected animal
  const [fact, setFact] = useState("");

  // State to store the image URL of the selected animal
  const [imageUrl, setImageUrl] = useState("");

  // State to track whether data is being loaded
  const [loading, setLoading] = useState(true);

  // State to track if there was an error during the fetch
  const [error, setError] = useState(false);

  // Function to fetch animal data (fact and image) from the API
  const fetchAnimalData = async () => {
    setLoading(true); // Set loading state to true
    setError(false); // Reset error state
    try {
      // Fetch data from the API for the selected animal
      const res = await fetch(`https://some-random-api.ml/animal/${selectedAnimal}`);
      const data = await res.json();

      // Update state with the fetched fact and image
      setFact(data.fact || "No fact available.");
      setImageUrl(data.image || "");
    } catch (err) {
      // Handle errors by setting the error state
      setError(true);
      setFact("");
      setImageUrl("");
    } finally {
      // Set loading state to false after fetch completes
      setLoading(false);
    }
  };

  // useEffect to fetch data whenever the selected animal changes
  useEffect(() => {
    fetchAnimalData();
  }, [selectedAnimal]);

  return (
    <div className="app">
      <h1>🐾 Animal Fun Facts Explorer</h1>
      {/* Dropdown to select an animal */}
      <AnimalSelector selectedAnimal={selectedAnimal} onAnimalChange={setSelectedAnimal} />
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