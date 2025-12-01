import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Stack,
  Button,
} from "@mui/material";

import AddToCartWrapper from "./AddToCartWrapper";

export default async function ProductDetails({ params }) {
  const id = params.id;

  const res = await fetch(`https://dummyjson.com/products/${id}`, { cache: "no-store" });
  const product = await res.json();

  if (!product || product.message === "Product not found") {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">Product not found.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={4} sx={{ p: 0 }}>
      {/* Left column */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{
              width: "100%",
              borderRadius: 8,
              objectFit: "cover",
              maxHeight: 520,
            }}
          />

          {/* thumbnails row if images array exists */}
          {Array.isArray(product.images) && product.images.length > 1 && (
            <Stack direction="row" spacing={1} sx={{ mt: 2, overflowX: "auto" }}>
              {product.images.slice(0, 6).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.title}-${idx}`}
                  style={{ width: 80, height: 64, objectFit: "cover", borderRadius: 6 }}
                />
              ))}
            </Stack>
          )}
        </Paper>
      </Grid>

      {/* Right column */}
      <Grid item xs={12} md={6}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          {product.title}
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Chip label={`₱${product.price}`} color="primary" />
          <Chip label={product.category} variant="outlined" />
          <Chip label={`⭐ ${product.rating}`} />
        </Stack>

        <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
          {product.description}
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <AddToCartWrapper product={product} />
          <Button variant="outlined">Add to Wishlist</Button>
        </Box>
      </Grid>
    </Grid>
  );
}
