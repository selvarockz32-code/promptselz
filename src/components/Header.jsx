"use client";

import { FaBell, FaSearch } from "react-icons/fa";
import Link from "next/link";

export default function Header({ title = "PromptSelz" }) {
  return (
    <div className="home-header">
      <h1>{title}</h1>
      <div className="header-icons">
        <Link href="/search" className="icon-btn" aria-label="Search">
          <FaSearch />
        </Link>
        <button className="icon-btn" aria-label="Notifications">
          <FaBell />
        </button>
      </div>
    </div>
  );
}