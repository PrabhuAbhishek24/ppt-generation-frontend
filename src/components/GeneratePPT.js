import React, { useState } from "react";
import API_BASE_URL from "../config";

const GeneratePPT = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGeneratePPT = async () => {
    if (!query) {
      alert("Please enter a topic.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/generate-ppt`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ query }),
      });

      if (!response.ok) throw new Error("Failed to generate PPT");

      // Convert response to a Blob for downloading
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${query}.pptx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate PPT");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Generate a Medical/Pharma PPT</h2>
      <input
        type="text"
        placeholder="Enter topic..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleGeneratePPT} disabled={loading}>
        {loading ? "Generating..." : "Generate PPT"}
      </button>
    </div>
  );
};

export default GeneratePPT;
