// src/components/ProductCard.jsx

import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const formatViews = (views = 0) => {
    if (views >= 1000000)
      return (views / 1000000).toFixed(1) + "M";

    if (views >= 1000)
      return (views / 1000).toFixed(1) + "K";

    return views;
  };

  return (
    <div
      className="product-card"
      onClick={() =>
        navigate(`/product/${product.docId}`, {
          state: product,
        })
      }
    >
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
  );
}