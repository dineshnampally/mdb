import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header className="bg-gray-800 px-4 py-3 flex justify-between items-center fixed top-0 left-0 w-full z-50 ">
      {/* Container for Logo and Menu Icon */}
      <div className="flex items-center space-x-4">
        {/* Hamburger Icon for Mobile (before logo) */}
        <div className="md:hidden" ref={buttonRef}>
          <button
            className="text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              className="w-20 cursor-pointer"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
              alt="IMDB Logo"
            />
          </Link>
        </div>
      </div>

      {/* Navigation Links for Larger Screens */}
      <nav className="hidden md:flex space-x-6">
        <Link
          to="/movies/popular"
          className="text-white text-lg hover:text-red-500"
        >
          Popular
        </Link>
        <Link
          to="/movies/top_rated"
          className="text-white text-lg hover:text-red-500"
        >
          Top Rated
        </Link>
        <Link
          to="/movies/upcoming"
          className="text-white text-lg hover:text-red-500"
        >
          Upcoming
        </Link>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 w-full bg-gray-800 flex flex-col items-center py-4 space-y-4 md:hidden z-10"
          ref={menuRef}
        >
          <Link
            to="/movies/popular"
            className="text-white text-lg hover:text-red-500"
            onClick={() => setMenuOpen(false)}
          >
            Popular
          </Link>
          <Link
            to="/movies/top_rated"
            className="text-white text-lg hover:text-red-500"
            onClick={() => setMenuOpen(false)}
          >
            Top Rated
          </Link>
          <Link
            to="/movies/upcoming"
            className="text-white text-lg hover:text-red-500"
            onClick={() => setMenuOpen(false)}
          >
            Upcoming
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
