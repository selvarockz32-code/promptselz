"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  FaPalette,
  FaRobot,
  FaGamepad,
  FaVideo
} from "react-icons/fa";

import Header from "@/src/components/Header";
import CategoryChip from "@/src/components/CategoryChip";

import "@/src/css/Search.css";

export default function Search() {
  const router = useRouter();

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

  const openSearch = (text) => {
    router.push(`/gallery?search=${encodeURIComponent(text)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchText.trim()) return;

    openSearch(searchText);
  };

  return (
    <div className="search-page">

      <Header title="Discover" />

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
