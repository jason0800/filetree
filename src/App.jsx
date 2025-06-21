import { useState } from "react";
import "./App.css"

function App() {
  const [fileName, setFileName] = useState("")
  const [fileSize, setFileSize] = useState("")

  const handleDrop = (event) => {
    event.preventDefault();

    setFileName(event.dataTransfer.files[0].name)
    setFileSize(event.dataTransfer.files[0].size / 1000)
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <>
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
      <div className="file-container">
        <p className="file-name">{fileName}</p>
        <p className="file-size"> {fileSize} kb</p>
      </div>
    </>
  );
}

export default App;
