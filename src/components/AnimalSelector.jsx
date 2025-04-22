import React from "react";

// Dropdown component to select an animal
const AnimalSelector = ({ selectedAnimal, onAnimalChange }) => {
  // List of animals supported by the API
  const animals = [
    "cat",
    "dog",
    "panda",
    "fox",
    "red_panda",
    "koala",
    "birb",
    "racoon",
    "kangaroo",
  ];

  return (
    <select
      value={selectedAnimal} // Bind the selected value to the state
      onChange={(e) => onAnimalChange(e.target.value)} // Update state on selection change
    >
      {/* Render each animal as an option in the dropdown */}
      {animals.map((animal) => (
        <option key={animal} value={animal}>
          {animal.replace("_", " ").toUpperCase()} {/* Format animal names */}
        </option>
      ))}
    </select>
  );
};

export default AnimalSelector;