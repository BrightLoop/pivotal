import { Moon, Sun } from "lucide-react";

function Navbar({ darkMode, toggleDarkMode }) {
  const navItems = ["Home", "Features", "Signup", "Pricing"];

  return (
    <div className="flex justify-center w-full fixed top-0 z-50 pt-11">
      <nav className="w-2/3 bg-green-950 text-white text-xl rounded-2xl p-4 md:p-6 ">
        <div className="flex items-center justify-between px-4 md:px-8">
          {/* Navigation Items */}
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="hidden md:block hover:text-green-300 transition-colors"
              >
                {item}
              </a>
            ))}

            {/* Mobile Menu */}
            <select className="md:hidden bg-green-950 outline-none  p-2 rounded-lg">
              {navItems.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-green-900 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
