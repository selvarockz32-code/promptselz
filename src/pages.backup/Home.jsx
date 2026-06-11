// src/pages/Home.jsx
import AdSense from "../components/AdSense";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";

import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

import { FaEye } from "react-icons/fa";

import { db } from "../services/firebase";
import "../css/Home.css";

const HOMEPAGE_DOC_ID = "Kc3WZ25YxSMbTqjUlrSZ";

export default function Home() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState([]);
  const [top3, setTop3] = useState([]);
  const [sections, setSections] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      trending.length
        ? (prev + 1) % trending.length
        : 0
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      trending.length
        ? (prev - 1 + trending.length) % trending.length
        : 0
    );
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0]?.clientX || 0;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current =
      e.touches[0]?.clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) < 50) {
      touchStartX.current = null;
      touchDeltaX.current = 0;
      return;
    }

    if (touchDeltaX.current < 0) {
      nextSlide();
    } else {
      prevSlide();
    }

    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  //////////////////////////////////////////////////
  // LOAD HOME DATA
  //////////////////////////////////////////////////

  useEffect(() => {
    loadHomeData();
  }, []);

  //////////////////////////////////////////////////
  // AUTO SLIDER
  //////////////////////////////////////////////////

  useEffect(() => {
    if (!trending.length) return;

    const timer = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % trending.length
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [trending]);

  //////////////////////////////////////////////////
  // GET PRODUCTS
  //////////////////////////////////////////////////

  const getProducts = async (ids) => {
    if (!ids?.length) return [];

    const docs = await Promise.all(
      ids.map((id) =>
        getDoc(doc(db, "products", id))
      )
    );

    return docs
      .filter((snap) => snap.exists())
      .map((snap) => ({
        docId: snap.id,
        ...snap.data(),
      }));
  };

  //////////////////////////////////////////////////
  // LOAD HOMEPAGE
  //////////////////////////////////////////////////

  const loadHomeData = async () => {
    try {
      const homeSnap = await getDoc(
        doc(db, "Homepage", HOMEPAGE_DOC_ID)
      );

      if (!homeSnap.exists()) {
        setLoading(false);
        return;
      }

      const data = homeSnap.data();

      const allSections = [
        ...(data.sections || []),
      ].sort((a, b) => a.order - b.order);

      setSections(allSections);

      const trendingSection =
        allSections.find(
          (s) => s.type === "trending"
        ) || {};

      const top3Section =
        allSections.find(
          (s) => s.type === "top3"
        ) || {};

      const trendingProducts =
        await getProducts(
          trendingSection.items || []
        );

      const top3Products =
        await getProducts(
          top3Section.items || []
        );

      setTrending(trendingProducts);
      setTop3(top3Products);

      const categoryMap = {};

      for (const section of allSections) {
        if (
          section.type === "trending" ||
          section.type === "top3"
        ) {
          continue;
        }

        categoryMap[section.type] =
          await getProducts(
            section.items || []
          );
      }

      setCategoryData(categoryMap);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  //////////////////////////////////////////////////
  // HELPERS
  //////////////////////////////////////////////////

  const formatViews = (views = 0) => {
    views = Number(views);

    if (views >= 1000000)
      return (views / 1000000).toFixed(1) + "M";

    if (views >= 1000)
      return (views / 1000).toFixed(1) + "K";

    return views.toString();
  };

  const isNew = (createdAt) => {
    if (!createdAt) return false;

    const date =
      createdAt?.toDate?.() ||
      new Date(createdAt);

    const hours =
      (Date.now() - date.getTime()) /
      (1000 * 60 * 60);

    return hours <= 48;
  };

  //////////////////////////////////////////////////
  // OPEN PRODUCT
  //////////////////////////////////////////////////

  const openProduct = async (product) => {
    try {
      await updateDoc(
        doc(db, "products", product.docId),
        {
          views: increment(1),
        }
      );
    } catch (e) {}

    navigate(
      `/product/${product.docId}`,
      {
        state: product,
      }
    );
  };

  //////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////

  if (loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  //////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////

  return (
    <div className="home">

      <Header title="PromptSelz" />

      {/* TRENDING */}

{trending.length > 0 && (
  <>
    <div className="section-header">
      <h2 className="section-title">🔥 Trending</h2>

      <button
        className="gallery-btn"
        onClick={() => navigate("/gallery")}
      >
        View Gallery
      </button>
    </div>

    <div className="slider-holder">
      <div
        className="slider"
        onClick={() =>
          openProduct(trending[currentSlide])
        }
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {trending.map((item, index) => (
            <div
              key={item.docId}
              className={`slider-card ${
                currentSlide === index ? "active" : ""
              }`}
            >
              <img
                src={item.img}
                alt={item.name || "Trending prompt"}
              />
              <div className="slide-gradient" />
              <div className="slider-overlay">
                <span className="slider-badge">
                  Trending
                </span>
                <h3>{item.name}</h3>
                <p>
                  {item.desc ||
                    "Discover the most popular prompt for your next creative idea."}
                </p>
              </div>
            </div>
          ))}
        </div>

        {isNew(
          trending[currentSlide]?.createdAt
        ) && (
          <div className="new-badge">
            NEW
          </div>
        )}

        <div className="views">
          <FaEye />
          {formatViews(
            trending[currentSlide]?.views
          )}
        </div>

        <button
          className="slider-control left"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous slide"
        >
          ‹
        </button>

        <button
          className="slider-control right"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      <div className="slider-info">
        <div className="slider-info-left">
          <span className="slider-info-label">
            Now Trending
          </span>
          <h3>{trending[currentSlide]?.name}</h3>
          <p>
            {trending[currentSlide]?.desc ||
              "Swipe or tap arrows to browse the latest trending prompts."}
          </p>
        </div>
        <div className="slider-meta">
          <span className="meta-pill">
            {formatViews(
              trending[currentSlide]?.views
            )} views
          </span>
          {isNew(
            trending[currentSlide]?.createdAt
          ) && (
            <span className="meta-pill new">
              New drop
            </span>
          )}
        </div>
      </div>
    </div>

    {/* Slider Dots */}

    <div className="slider-dots">
      {trending.map((_, index) => (
        <button
          key={index}
          className={`dot ${currentSlide === index ? "active" : ""}`}
          onClick={() => setCurrentSlide(index)}
          aria-label={`Slide ${index + 1}`}
        />
      ))}
    </div>
  </>
)}


      {/* TOP 3 */}

      {top3.length > 0 && (
        <>
          <h2 className="section-title">
            🏆 Top 3
          </h2>

          {top3.map((item, index) => (
            <div
              key={item.docId}
              className="top-card"
              onClick={() =>
                openProduct(item)
              }
            >
              <div className="rank">
                #{index + 1}
              </div>

              <img
                src={item.img}
                alt=""
              />

              <div className="top-content">
                <h4>{item.name}</h4>

                <p>
                  {item.desc ||
                    "Premium AI Prompt"}
                </p>

                <span>
                  👁{" "}
                  {formatViews(
                    item.views
                  )}
                </span>
              </div>
            </div>
          ))}
        </>
      )}

      {/* ✅ ADSENSE INSERTED HERE */}
          <div style={{ margin: "20px 0" }}>
            <AdSense />
          </div>

      {/* DYNAMIC CATEGORIES */}

      {sections.map((section) => {
        if (
          section.type === "trending" ||
          section.type === "top3"
        ) {
          return null;
        }

        const items =
          categoryData[
            section.type
          ] || [];

        if (!items.length) return null;

        return (
          <div
            key={section.type}
            className="category-block"
            style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #f0f0f0" }}
          >
            <h2 className="section-title">
              {section.title}
            </h2>

            <div className="horizontal-list">
              {items.map((item) => (
                <ProductCard
                  key={item.docId}
                  product={item}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}