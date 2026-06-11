import { Analytics } from "@vercel/analytics/react";
import "../src/css/Home.css";
import "../src/css/Gallery.css";
import "../src/css/ProductView.css";
import "../src/css/Search.css";
import "../src/components/components.css";
import "../src/App.css";
import "../src/index.css";
import Footer from "./components/Footer";

export const metadata = {
  title: "PromptSelz",
  description: "Discover amazing prompts for AI, Design, Social Media, and more",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4333070677760037"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
