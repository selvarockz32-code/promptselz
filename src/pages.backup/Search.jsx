// src/pages/Search.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaPalette,
  FaRobot,
  FaGamepad,
  FaVideo
} from "react-icons/fa";

import CategoryChip from "../components/CategoryChip";

import "../css/Search.css";

export default function Search() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const categories = [
    "AI",
    "Logo",
    "Instagram",
    "UI Design",
    "Poster",
    "Gaming",
    "Anime",
    "Business",
    "Marketing",
    "YouTube",
    "Thumbnail",
    "Wallpaper",
  ];

  //////////////////////////////////////////////////
  // SEARCH
  //////////////////////////////////////////////////

  const openSearch = (text) => {
    navigate(
      `/gallery?search=${encodeURIComponent(
        text
      )}`
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchText.trim()) return;

    openSearch(searchText);
  };

  //////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////

  return (
    <div className="search-page">

      <div className="search-header">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>
        <h1>Discover</h1>
      </div>

      {/* SEARCH BOX */}

      <form
        className="search-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search anything..."
          value={searchText}
          onChange={(e) =>
            setSearchText(e.target.value)
          }
        />

        <button type="submit">
          Search
        </button>
      </form>

      {/* CATEGORIES */}

      <h2 className="section-title">
        Explore Categories
      </h2>

      <div className="category-list">

        {categories.map((item) => (
          <CategoryChip
            key={item}
            text={item}
            onClick={() =>
              openSearch(item)
            }
          />
        ))}

      </div>

      {/* FEATURE GRID */}

      <div className="feature-grid">

        <div
          className="feature-card ai"
          onClick={() =>
            openSearch("AI")
          }
        >
          <FaRobot />
          <h3>AI Prompts</h3>
        </div>

        <div
          className="feature-card design"
          onClick={() =>
            openSearch("Design")
          }
        >
          <FaPalette />
          <h3>Design</h3>
        </div>

        <div
          className="feature-card social"
          onClick={() =>
            openSearch("Social Media")
          }
        >
          <FaVideo />
          <h3>Social Media</h3>
        </div>

        <div
          className="feature-card gaming"
          onClick={() =>
            openSearch("Gaming")
          }
        >
          <FaGamepad />
          <h3>Gaming</h3>
        </div>

      </div>

      {/* POPULAR SEARCHES */}

      <div className="popular-searches">

        <h2 className="section-title">
          Popular Searches
        </h2>

        <div className="popular-tags">

          <CategoryChip
            text="ChatGPT"
            onClick={() =>
              openSearch("ChatGPT")
            }
          />

          <CategoryChip
            text="Midjourney"
            onClick={() =>
              openSearch("Midjourney")
            }
          />

          <CategoryChip
            text="Anime"
            onClick={() =>
              openSearch("Anime")
            }
          />

          <CategoryChip
            text="Logo Design"
            onClick={() =>
              openSearch("Logo Design")
            }
          />

        </div>

      </div>

    </div>
  );
}