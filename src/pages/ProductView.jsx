import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdSense from "../components/AdSense";
import {
  FaEye,
  FaHeart,
  FaCopy,
  FaWhatsapp,
  FaShareAlt,
  FaArrowLeft
} from "react-icons/fa";

import "../css/ProductView.css";

export default function ProductView() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const product = state || {};

  const [expanded, setExpanded] = useState(false);
  const [loadingCopy, setLoadingCopy] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const copyPrompt = () => {
    if (loadingCopy) return;

    setLoadingCopy(true);

    let time = 10;

    setCountdown(time);

    const timer = setInterval(() => {
      time--;

      setCountdown(time);

      if (time <= 0) {
        clearInterval(timer);

        navigator.clipboard.writeText(
          product.prompt || ""
        );

        alert("Prompt Copied Successfully!");

        setLoadingCopy(false);
        setCountdown(10);
      }
    }, 1000);
  };

  const sharePrompt = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.prompt,
      });
    }
  };

  const whatsappShare = () => {
    const text = encodeURIComponent(
      `${product.name}\n\n${product.prompt}`
    );

    window.open(
      `https://wa.me/?text=${text}`,
      "_blank"
    );
  };

  const formatViews = (views = 0) => {
    if (views >= 1000000)
      return (views / 1000000).toFixed(1) + "M";

    if (views >= 1000)
      return (views / 1000).toFixed(1) + "K";

    return views;
  };

  return (
    <div className="product-page">

      {/* BACK BUTTON */}

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
      </button>

      {/* HERO IMAGE */}

      <div className="hero-image">

        <img
          src={product.img}
          alt=""
        />

        <div className="view-badge">
          <FaEye />
          {formatViews(product.views || 0)}
        </div>

      </div>

      {/* CONTENT */}

      <div className="product-content">

        <h1>{product.name}</h1>

        <p className="description">
          {product.desc}
        </p>

        {/* PROMPT */}

        <div className="prompt-box">

          <h3>Prompt</h3>

          <p
            className={
              expanded
                ? "prompt-text expanded"
                : "prompt-text"
            }
          >
            {product.prompt}
          </p>

          <button
            className="show-more-btn"
            onClick={() =>
              setExpanded(!expanded)
            }
          >
            {expanded
              ? "Show Less"
              : "Show More"}
          </button>

        </div>
        {/* ✅ ADSENSE INSERTED HERE */}
          <div style={{ margin: "20px 0" }}>
            <AdSense />
          </div>

        {/* ACTIONS */}

        <div className="action-grid">

          <button
            className={`copy-btn ${
              loadingCopy
                ? "loading"
                : ""
            }`}
            onClick={copyPrompt}
            disabled={loadingCopy}
          >
            <FaCopy />

            {loadingCopy
              ? `Loading Ad ${countdown}s`
              : "Copy Prompt"}
          </button>

          <button
            className="share-btn"
            onClick={sharePrompt}
          >
            <FaShareAlt />
            Share
          </button>

          <button
            className="whatsapp-btn"
            onClick={whatsappShare}
          >
            <FaWhatsapp />
            WhatsApp
          </button>

          <button
            className="favorite-btn"
          >
            <FaHeart />
            Favorite
          </button>

        </div>

      </div>

    </div>
  );
}