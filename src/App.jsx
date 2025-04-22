/*
  App: Animal Fun Facts Explorer
  Features:
    - Dropdown to select an animal
    - Fetch and display a fun fact and image for the selected animal
    - Refresh button to re-fetch data
    - Handle loading states
*/

import React, { useEffect, useState } from "react";
import FactCard from "./components/FactCard";
import RefreshButton from "./components/RefreshButton";

const App = () => {
  const [fact, setFact] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch random animal from local /public/data/animals.json
  const fetchAnimalData = async () => {
    setLoading(true);
    setError(false);
    try {
      console.log("🔍 Fetching /data/animals.json...");

      const res = await fetch("/data/animals.json");

      console.log("✅ Response status:", res.status);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      console.log("🐾 Animal data loaded:", data);

      const randomAnimal = data[Math.floor(Math.random() * data.length)];

      setFact(
        `The ${randomAnimal.name} is a ${randomAnimal.type}. It lives in ${randomAnimal.habitat}, eats ${randomAnimal.diet}, and can live up to ${randomAnimal.lifespan}.`
      );
      setImageUrl(`/${randomAnimal.image}`);
    } catch (err) {
      console.error("❌ Fetch failed:", err);
      setError(true);
      setFact("");
      setImageUrl("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimalData();
  }, []);

  return (
    <div className="app">
      <h1>🐾 Random Zoo Animal Facts</h1>
      <RefreshButton onRefresh={fetchAnimalData} />
      {error ? (
        <p style={{ color: "red" }}>Oops! Couldn't fetch data. Try again later.</p>
      ) : (
        <FactCard funFact={fact} imageUrl={imageUrl} isLoading={loading} />
      )}
    </div>
  );
};

export default App;