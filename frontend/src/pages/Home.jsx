import { useState, useEffect } from "react";
import Navbar from "../components/Header";
import Hero from "../components/HeroComponent";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      let url = "http://localhost:3000";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Data fetched:", result);
        // Set the document title
        if (result.data?.title) {
          document.title = result.data.title;
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <main className="container mx-auto px-4 pt-20 md:pt-32">
        <Hero />
      </main>
    </div>
  );
}

export default App;
