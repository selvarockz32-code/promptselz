"use client";

export default function CategoryChip({ text, onClick }) {
  return (
    <button className="category-chip" onClick={onClick}>
      {text}
    </button>
  );
}