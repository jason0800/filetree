import React from "react";

function App() {
  const handleDrop = (e) => {
    e.preventDefault();
    console.log("Something was dropped!");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        width: "100%",
        height: "100vh",
        border: "2px dashed #ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Drop folder here</h2>
    </div>
  );
}

export default App;
