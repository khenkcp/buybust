"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Chip,
  Box,
  Stack,
} from "@mui/material";

import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }) {
  return (
    <Card
      sx={{
        width: 230,
        minHeight: 370,
        borderRadius: 3,
        background: "rgba(255,248,240,0.85)",
        border: "1px solid rgba(170,130,90,0.35)",
        backdropFilter: "blur(6px)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",

        boxShadow: `
          0 4px 14px rgba(90,60,35,0.18),
          inset 0 0 14px rgba(255,240,225,0.25)
        `,

        transition: "0.35s cubic-bezier(.25,.8,.25,1)",
        transform: "translateY(0)",

        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: `
            0 12px 28px rgba(90,60,35,0.28),
            inset 0 0 22px rgba(255,240,225,0.35)
          `,
        },

        position: "relative",
        "::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: "1px",
          background: "linear-gradient(135deg, rgba(140,110,85,0.25), rgba(255,240,225,0.3))",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        },
      }}
    >
      {/* IMAGE */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={product.thumbnail}
          alt={product.title}
          sx={{
            height: 160,
            objectFit: "cover",
            transition: "0.4s ease",

            ".MuiCard-root:hover &": {
              transform: "scale(1.07)",
            },
          }}
        />

        <Chip
          label={`₱${product.price}`}
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "#4B2E19",
            color: "#F5E6D3",
            fontWeight: 700,
            borderRadius: 2,
            boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
            px: 1.2,
            py: 0.2,
          }}
        />
      </Box>

      {/* CONTENT */}
      <CardContent sx={{ flexGrow: 1, p: 1.8 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 800,
            color: "#3A2414",
            mb: 0.5,
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.title}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Chip
            label={product.category}
            size="small"
            sx={{
              borderColor: "#85644A",
              color: "#6F4E37",
              fontWeight: 600,
              background: "rgba(255,245,230,0.6)",
            }}
            variant="outlined"
          />

          <Chip
            label={`⭐ ${product.rating}`}
            size="small"
            sx={{
              background: "rgba(255,225,200,0.75)",
              color: "#4B2E19",
              fontWeight: 700,
              boxShadow: "0 0 6px rgba(255,210,180,0.7)",
            }}
          />
        </Stack>

        <Typography
          variant="caption"
          sx={{
            color: "#6D5B4B",
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </Typography>
      </CardContent>

      {/* ACTIONS */}
      <CardActions
        sx={{
          px: 1.8,
          pb: 1.6,
          pt: 0.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
          <Button
            size="small"
            sx={{
              color: "#4B2E19",
              fontWeight: 700,
              textTransform: "none",
              transition: "0.2s",
              "&:hover": {
                color: "#7A553A",
              },
            }}
          >
            View
          </Button>
        </Link>

        <AddToCartButton product={product} />
      </CardActions>
    </Card>
  );
}
