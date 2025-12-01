"use client";

import { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Box,
  Typography,
  Skeleton,
} from "@mui/material";
import ProductCard from "../components/ProductCard";

function SkeletonCard() {
  return (
    <Box sx={{ width: "100%" }}>
      <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2 }} />
      <Skeleton width="60%" sx={{ mt: 1 }} />
      <Skeleton width="80%" />
      <Skeleton width="40%" />
    </Box>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        if (!cancelled) setProducts(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => (cancelled = true);
  }, []);

  return (
    <Box sx={{ pt: 1 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Products
      </Typography>

      {loading ? (
        <Grid container spacing={3}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <SkeletonCard />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
