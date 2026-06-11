"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { FaSearch, FaEye, FaArrowLeft } from "react-icons/fa";
import { db } from "@/lib/firebase";
import "@/src/css/Gallery.css";

export default function GalleryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [search, sort, products]);

  const loadProducts = async () => {
    try {
      const q = query(
        collection(db, "products"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));

      setProducts(data);
    } catch (e) {
      console.log(e);
    }
  };

  const filterProducts = () => {
    let list = [...products];

    if (search.trim()) {
      list = list.filter((item) =>
        item.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (sort === "popular") {
      list.sort(
        (a, b) => (b.views || 0) - (a.views || 0)
      );
    }

    setFiltered(list);
  };

  const formatViews = (views = 0) => {
    if (views >= 1000000)
      return (views / 1000000).toFixed(1) + "M";

    if (views >= 1000)
      return (views / 1000).toFixed(1) + "K";

    return views;
  };

  return (
    <div className="gallery-page">

      <div className="gallery-header">
        <button className="back-btn" onClick={() => router.back()} aria-label="Go back"><FaArrowLeft /></button>
        <h2>Gallery</h2>
      </div>

      {/* Search */}

      <div className="search-box compact">
        <FaSearch />
        <input
          type="text"
          placeholder="Search prompts..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {/* Filters */}

      <div className="filter-row">

        <button
          className={
            sort === "latest"
              ? "active-filter"
              : ""
          }
          onClick={() =>
            setSort("latest")
          }
        >
          Latest
        </button>

        <button
          className={
            sort === "popular"
              ? "active-filter"
              : ""
          }
          onClick={() =>
            setSort("popular")
          }
        >
          Popular
        </button>

      </div>

      {/* Masonry Grid */}

      <div className="gallery-grid">

        {filtered.map((item) => (
          <div
            key={item.docId}
            className="gallery-card"
            onClick={() =>
              router.push(`/product/${item.docId}`)
            }
          >

            <img
              src={item.img}
              alt=""
            />

            <div className="gallery-info">

              <h4>{item.name}</h4>

              <div className="view-row">
                <FaEye />
                {formatViews(
                  item.views || 0
                )}
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
