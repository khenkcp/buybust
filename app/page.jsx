"use client";

import { useEffect, useState } from "react";
import { Button, Typography, Box, Paper } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const [imgs, setImgs] = useState([]);
  const [carousel, setCarousel] = useState([]);

  // 🎤 Typing effect states
  const phrases = [
    "premium-crafted essentials.",
    "products made for your lifestyle.",
    "quality you can trust.",
    "your next favorite item.",
  ];

  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blink cursor
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Typing logic
  useEffect(() => {
    if (index >= phrases.length) setIndex(0);

    if (!deleting && subIndex === phrases[index].length) {
      setTimeout(() => setDeleting(true), 1500);
      return;
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
      setDisplayText(phrases[index].substring(0, subIndex));
    }, deleting ? 60 : 120);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);


  // Load thumbnails from categories
  async function loadCategory(cat) {
    const res = await fetch(`https://dummyjson.com/products/category/${cat}`);
    const data = await res.json();
    return (data.products || []).map((p) => p.thumbnail);
  }

  async function loadCarouselProducts() {
    const res = await fetch("https://dummyjson.com/products?limit=12");
    const data = await res.json();
    return data.products;
  }

  useEffect(() => {
    let mount = true;

    async function loadAll() {
      try {
        const cats = ["groceries", "beauty", "fragrances", "kitchen-accessories"];
        const results = await Promise.all(cats.map(loadCategory));
        const allImgs = results.flat().filter(Boolean);

        if (mount && allImgs.length > 0) {
          setImgs(
            Array.from({ length: 18 }).map((_, i) => ({
              id: `float-${i}`,
              src: allImgs[i % allImgs.length],
              size: i % 2 === 0 ? 180 : 130,
              depth: i % 2 === 0 ? "fg" : "bg",
              delay: (i % 5) * 0.6,
            }))
          );
        }

        const prods = await loadCarouselProducts();
        if (mount) setCarousel(prods);
      } catch (err) {
        console.error("loading error:", err);
      }
    }

    loadAll();
    return () => (mount = false);
  }, []);

  // Floating positions
  const positions = [
    { top: "8%", left: "12%" },
    { top: "12%", right: "15%" },
    { top: "28%", left: "6%" },
    { top: "30%", right: "6%" },
    { top: "48%", left: "4%" },
    { top: "50%", right: "8%" },
    { bottom: "18%", left: "15%" },
    { bottom: "20%", right: "15%" },
    { top: "15%", left: "38%" },
    { bottom: "15%", right: "38%" },
    { top: "65%", left: "20%" },
    { top: "65%", right: "20%" },
    { bottom: "8%", left: "45%" },
    { bottom: "8%", right: "45%" },
    { top: "42%", left: "28%" },
    { top: "44%", right: "28%" },
    { top: "72%", left: "10%" },
    { top: "72%", right: "12%" },
  ];

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        width: "100%",
        overflow: "hidden",
        position: "relative",

        background: `
          radial-gradient(circle at 30% 20%, rgba(255, 236, 209, 0.55), transparent 70%),
          radial-gradient(circle at 70% 80%, rgba(155, 115, 80, 0.4), transparent 70%),
          linear-gradient(135deg, #EAD9C3 0%, #CBB395 60%, #B89A7A 100%)
        `,
      }}
    >

      {/* FLOATING LAYER */}
      <Box sx={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>

        {imgs.map((item, index) => {
          const pos = positions[index];
          const fg = item.depth === "fg";
          return (
            <Box
              key={item.id}
              sx={{
                position: "absolute",
                ...pos,
                zIndex: fg ? 2 : 1,
                opacity: fg ? 0.85 : 0.45,
                filter: fg
                  ? "drop-shadow(0 12px 24px rgba(90,60,40,0.45))"
                  : "blur(1px) drop-shadow(0 4px 12px rgba(90,60,40,0.35))",
                animation: `float ${8 + (index % 4)}s ease-in-out infinite`,
                animationDelay: `${item.delay}s`,
              }}
            >
              <Image
                src={item.src}
                width={item.size}
                height={item.size}
                alt="floating-product"
                style={{ objectFit: "contain" }}
              />
            </Box>
          );
        })}
      </Box>

      {/* HERO SECTION */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "55vh",
          display: "grid",
          placeItems: "center",
          zIndex: 5,
          pointerEvents: "none",
          mt: 4,
        }}
      >
        <Paper
          elevation={12}
          sx={{
            pointerEvents: "auto",
            background: "rgba(255, 248, 240, 0.55)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(120, 90, 60, 0.35)",
            borderRadius: 4,
            padding: "45px 65px",
            textAlign: "center",
            maxWidth: 520,

            boxShadow: `
              0 6px 22px rgba(90,60,40,0.22),
              0 14px 38px rgba(70,50,35,0.18),
              inset 0 0 22px rgba(255, 240, 220, 0.25)
            `,
            animation: "fadeInUp 1s ease-out",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              color: "#3A2414",
              mb: 2,
              letterSpacing: 1,
              textShadow: "0 2px 6px rgba(90,60,40,0.3)",
            }}
          >
            BuyBust
          </Typography>

          {/* TYPING EFFECT TEXT */}
          <Typography
            variant="h6"
            sx={{
              color: "#5E422C",
              mb: 4,
              opacity: 0.95,
              height: "32px",
              fontFamily: "monospace",
              whiteSpace: "nowrap",
            }}
          >
            {displayText}
            <span style={{ opacity: blink ? 1 : 0 }}>|</span>
          </Typography>

          <Link href="/products" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(90deg, #7A553A, #A07C5C)",
                color: "white",
                px: 4,
                py: 1.4,
                fontSize: "1.15rem",
                borderRadius: 3,
                fontWeight: 700,
                textTransform: "none",
                transition: "0.3s",
                boxShadow: "0 4px 12px rgba(90,60,40,0.4)",
                ":hover": {
                  background: "linear-gradient(90deg, #5D3F2A, #8D6A50)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(70,50,35,0.45)",
                },
              }}
            >
              Browse Products
            </Button>
          </Link>
        </Paper>
      </Box>

      {/* CAROUSEL */}
      <Box
        sx={{
          mt: 1,
          width: "100%",
          overflow: "hidden",
          zIndex: 20,
          position: "relative",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: 800,
            color: "#3A2414",
            textShadow: "0 2px 4px rgba(90,60,40,0.25)",
            mb: 2,
            animation: "fadeIn 0.9s ease-out",
          }}
        >
          Popular Picks
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            width: "max-content",
            animation: "scroll 20s linear infinite",
            px: 2,
            mb: 4,
          }}
        >
          {[...carousel, ...carousel].map((p, i) => (
            <Box
              key={i}
              sx={{
                minWidth: 210,
                height: 210,
                borderRadius: 4,
                background: "rgba(255, 250, 245, 0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(140,110,85,0.35)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 6px 18px rgba(80,50,30,0.25)",
                transition: "0.3s",
                ":hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 10px 26px rgba(70,50,35,0.4)",
                },
              }}
            >
              <Image
                src={p.thumbnail}
                width={160}
                height={160}
                alt={p.title}
                style={{ objectFit: "contain" }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* STYLES */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
          100% { transform: translateY(0); }
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(55px);
          opacity: 0.35;
        }
        .blob1 {
          width: 400px;
          height: 400px;
          background: #f8e3c8;
          top: -60px;
          left: -60px;
        }
        .blob2 {
          width: 350px;
          height: 350px;
          background: #d2b08a;
          bottom: -50px;
          right: -40px;
        }
        .blob3 {
          width: 300px;
          height: 300px;
          background: #e4c8a2;
          top: 40%;
          left: 30%;
        }
      `}</style>
    </Box>
  );
}
