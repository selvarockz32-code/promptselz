//src/components/Header.jsx

import { FaBell, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header({ title = "PromptSelz" }) {
  const navigate = useNavigate();
  return (
    <div className="home-header">
      <h1>{title}</h1>
      <div className="header-icons">
        <button onClick={() => navigate("/search")} className="icon-btn" aria-label="Search"><FaSearch /></button>
        <button className="icon-btn" aria-label="Notifications"><FaBell /></button>
      </div>
    </div>
  );
}