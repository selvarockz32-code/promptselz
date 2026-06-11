"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";

import Header from "@/src/components/Header";
import ProductCard from "@/src/components/ProductCard";

import { FaEye } from "react-icons/fa";

import { db } from "@/lib/firebase";
import "@/src/css/Home.css";

const HOMEPAGE_DOC_ID = "Kc3WZ25YxSMbTqjUlrSZ";

export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState([]);
  const [top3, setTop3] = useState([]);
  const [sections, setSections] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

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

    router.push(`/product/${product.docId}`);
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
          <h2 className="section-title">
            🔥 Trending
          </h2>

          <div
            className="slider"
            onClick={() =>
              openProduct(
                trending[currentSlide]
              )
            }
          >
            <img
              src={
                trending[currentSlide]?.img
              }
              alt=""
            />

            {isNew(
              trending[currentSlide]
                ?.createdAt
            ) && (
              <div className="new-badge">
                NEW
              </div>
            )}

            <div className="views">
              <FaEye />
              {formatViews(
                trending[currentSlide]
                  ?.views
              )}
            </div>

            <div className="slider-overlay">
              <h3>
                {
                  trending[currentSlide]
                    ?.name
                }
              </h3>
            </div>
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
