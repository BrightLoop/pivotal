import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "./Components.css";
const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };
  return (
    <div className=" flex justify-between items-center  p-7 sticky top-10 rounded-2xl header-home">
      <div className="header">
        <ul className="flex gap-10 text-white">
          <li>Home</li>
          <li>Features</li>
          <li>Integration</li>
          <li>Pricing</li>
        </ul>
      </div>
      <div className="change-ui">
        <button
          onClick={toggleDarkMode}
          style={{
            fontSize: "24px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: isDarkMode ? "#ffd700" : "#fff",
          }}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
};

export default Header;
