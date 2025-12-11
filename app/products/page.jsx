"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Grid,
  Box,
  Typography,
  Skeleton,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Stack,
} from "@mui/material";

import ProductCard from "../components/ProductCard";

function SkeletonCard() {
  return (
    <Box
      sx={{
        width: "100%",
        background: "rgba(255,245,230,0.55)",
        borderRadius: 2,
        p: 1,
        boxShadow: "0 4px 14px rgba(100,70,45,0.20)",
      }}
    >
      <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 2 }} />
      <Skeleton width="60%" sx={{ mt: 1 }} />
      <Skeleton width="80%" />
    </Box>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sort, setSort] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=200");
        const data = await res.json();

        if (!active) return;

        const arr = Array.isArray(data.products) ? data.products : [];
        setProducts(arr);

        const uniqueCats = [...new Set(arr.map((p) => p.category))].sort();
        setCategories(uniqueCats);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  // --------------------------------
  // FILTER + SORT (Memoized)
  // --------------------------------
  const filtered = useMemo(() => {
    let list = products;

    // search filter
    if (search.trim() !== "") {
      const term = search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(term));
    }

    // category filter
    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // copy before sorting (avoid mutating state)
    let sorted = [...list];

    switch (sort) {
      case "price_low":
        sorted.sort((a, b) => a.price - b.price);
        break;

      case "price_high":
        sorted.sort((a, b) => b.price - a.price);
        break;

      case "rating_high":
        sorted.sort((a, b) => b.rating - a.rating);
        break;

      case "name_az":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "name_za":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;

      default:
        break;
    }

    return sorted;
  }, [products, search, selectedCategory, sort]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: `
          radial-gradient(circle at 20% 20%, rgba(255,240,220,0.65), transparent 60%),
          radial-gradient(circle at 80% 80%, rgba(190,160,120,0.35), transparent 60%),
          #EDE0D0
        `,
        position: "relative",
        overflow: "hidden",
        py: 5,
        px: 2,
      }}
    >
      {/* Decorative blobs */}
      <div className="prodblob prod1"></div>
      <div className="prodblob prod2"></div>

      <Typography
        variant="h3"
        sx={{
          mb: 4,
          fontWeight: "900",
          textAlign: "center",
          color: "#4B2E19",
          textShadow: "0 2px 8px rgba(80,50,30,0.25)",
          animation: "fadeDown 0.9s ease-out",
        }}
      >
        Explore Our Products
      </Typography>

      {/* SEARCH + FILTERS */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{
          maxWidth: "1050px",
          mx: "auto",
          mb: 5,
          animation: "fadeIn 1.1s ease-out",
        }}
        justifyContent="center"
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            background: "rgba(255,248,240,0.9)",
            borderRadius: 2,
            "& input": { color: "#4A2D18" },
          }}
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{
              background: "rgba(255,248,240,0.9)",
              borderRadius: 2,
            }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort</InputLabel>
          <Select
            value={sort}
            label="Sort"
            onChange={(e) => setSort(e.target.value)}
            sx={{
              background: "rgba(255,248,240,0.9)",
              borderRadius: 2,
            }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="price_low">Price: Low → High</MenuItem>
            <MenuItem value="price_high">Price: High → Low</MenuItem>
            <MenuItem value="rating_high">Rating: High → Low</MenuItem>
            <MenuItem value="name_az">Name: A → Z</MenuItem>
            <MenuItem value="name_za">Name: Z → A</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* GRID */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{
          maxWidth: "1500px",
          mx: "auto",
        }}
      >
        {(loading ? Array.from({ length: 12 }) : filtered).map((product, i) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            key={loading ? i : product.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              opacity: 0,
              animation: `fadeInScale 0.6s ease forwards`,
              animationDelay: `${i * 0.07}s`,
            }}
          >
            {loading ? <SkeletonCard /> : <ProductCard product={product} />}
          </Grid>
        ))}
      </Grid>

      {!loading && filtered.length === 0 && (
        <Typography
          sx={{
            mt: 4,
            color: "#6F4E37",
            textAlign: "center",
            fontSize: "1.2rem",
            fontWeight: 600,
          }}
        >
          No matching products found.
        </Typography>
      )}

      {/* Styles */}
      <style jsx>{`
        @keyframes fadeDown {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }

        .prodblob {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.35;
          z-index: 0;
        }
        .prod1 {
          width: 450px;
          height: 450px;
          background: #f4d7b2;
          top: -100px;
          left: -80px;
        }
        .prod2 {
          width: 380px;
          height: 380px;
          background: #d7b892;
          bottom: -80px;
          right: -60px;
        }
      `}</style>
    </Box>
  );
}
