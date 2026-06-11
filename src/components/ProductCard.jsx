"use client";

import { FaEye } from "react-icons/fa";
import Link from "next/link";

export default function ProductCard({ product }) {
  const formatViews = (views = 0) => {
    if (views >= 1000000)
      return (views / 1000000).toFixed(1) + "M";
    if (views >= 1000)
      return (views / 1000).toFixed(1) + "K";
    return views;
  };

  return (
    <Link href={`/product/${product.docId}`}>
      <div className="product-card">
        <img
          src={product.img}
          alt={product.name}
        />
        <div className="product-info">
          <h4>{product.name}</h4>
          <div className="product-views">
            <FaEye />
            {formatViews(product.views || 0)}
          </div>
        </div>
      </div>
    </Link>
  );
}