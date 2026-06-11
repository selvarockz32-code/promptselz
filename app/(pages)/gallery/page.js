"use client";

import { Suspense } from "react";
import GalleryContent from "./GalleryContent";

export default function Gallery() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GalleryContent />
    </Suspense>
  );
}
