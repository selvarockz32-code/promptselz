import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Search from "./pages/Search";
import ProductView from "./pages/ProductView";

//////////////////////////////////////////////////
// ✅ SCROLL TO TOP FIX COMPONENT
//////////////////////////////////////////////////

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

//////////////////////////////////////////////////
// APP
//////////////////////////////////////////////////

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* ✅ IMPORTANT FIX */}

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Gallery */}
        <Route path="/gallery" element={<Gallery />} />

        {/* Search */}
        <Route path="/search" element={<Search />} />

        {/* Product View */}
        <Route path="/product/:id" element={<ProductView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;