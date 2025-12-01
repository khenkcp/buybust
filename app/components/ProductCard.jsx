"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Chip,
  Box,
  Stack,
  Button,
} from "@mui/material";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }) {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 2,
        transition: "transform .12s ease, box-shadow .12s ease",
        ":hover": { transform: "translateY(-6px)", boxShadow: 6 },
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="180"
          image={product.thumbnail}
          alt={product.title}
          sx={{
            objectFit: "cover",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        <Chip
          label={`₱${product.price}`}
          color="primary"
          size="small"
          sx={{ position: "absolute", top: 8, left: 8, fontWeight: 700 }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
          {product.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.description.length > 80
            ? product.description.substring(0, 80) + "..."
            : product.description}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Chip label={`⭐ ${product.rating}`} size="small" />
          <Chip label={product.category} size="small" variant="outlined" />
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, justifyContent: "space-between" }}>
        <Link href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
          <Button variant="text" size="small">View</Button>
        </Link>

        <AddToCartButton product={product} />
      </CardActions>
    </Card>
  );
}
