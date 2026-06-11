"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AdSense from "@/src/components/AdSense";
import {
  FaEye,
  FaHeart,
  FaCopy,
  FaWhatsapp,
  FaShareAlt,
  FaArrowLeft
} from "react-icons/fa";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import "@/src/css/ProductView.css";

export default function ProductView() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [loadingCopy, setLoadingCopy] = useState(false);
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const docSnap = await getDoc(doc(db, "products", id));
      if (docSnap.exists()) {
        const data = {
          docId: docSnap.id,
          ...docSnap.data(),
        };
        setProduct(data);

        // Increment views
        try {
          await updateDoc(doc(db, "products", id), {
            views: increment(1),
          });
        } catch (e) {}
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const copyPrompt = () => {
    if (loadingCopy) return;

    setLoadingCopy(true);

    let time = 15;

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
        setCountdown(15);
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

  if (loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="product-page">

      {/* BACK BUTTON */}

      <button
        className="back-btn"
        onClick={() => router.back()}
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

        {/* ADSENSE INSERTED HERE */}
        <div style={{ margin: "20px 0" }}>
          <AdSense />
        </div>

        {/* ACTIONS */}

        <div className="action-grid">

          {!loadingCopy ? (
            <button
              className="copy-btn"
              onClick={copyPrompt}
            >
              <FaCopy />
              Copy Prompt
            </button>
          ) : (
            <div className="countdown-box">
              <p>{countdown}s</p>
            </div>
          )}

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
