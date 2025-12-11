import Image from "next/image";
import Link from "next/link";
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
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";

export default async function ProductDetails({ params, searchParams }) {
  const resolved = await params;
  const id = resolved.id;

  let product = null;

  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Fetch failed");

    product = await res.json();
  } catch (e) {
    return <ProductDetailsSkeleton />;
  }

  if (!product || product.message === "Product not found") {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">Product not found.</Typography>
      </Box>
    );
  }

  /* ------------------ IMAGE CLEANUP ------------------ */

  const validImages = Array.isArray(product.images)
    ? product.images
        .filter((img) => typeof img === "string" && img.trim() !== "")
        .filter((value, index, self) => self.indexOf(value) === index)
    : [];

  const mainImage =
    searchParams?.img ??
    product.thumbnail ??
    validImages[0] ??
    "/fallback.png";

  /* ------------- SANITIZED CART OBJECT --------------- */

  const productForCart = {
    id: product.id,
    title: product.title,
    price: Number(product.price),
    thumbnail: product.thumbnail,
    description: product.description,
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, md: 5 },

        background: `
          radial-gradient(circle at 25% 20%, rgba(255,235,215,0.45), transparent 60%),
          radial-gradient(circle at 80% 85%, rgba(180,140,110,0.30), transparent 65%),
          linear-gradient(135deg, #C9A27C, #B08665 40%, #8A6247)
        `,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Back Button */}
      <Box sx={{ mb: 4 }}>
        <Link href="/products" style={{ textDecoration: "none" }}>
          <Button
            sx={{
              px: 3,
              py: 1.4,
              borderRadius: "14px",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#1A0F08",
              background: "rgba(255,255,255,0.45)",
              border: "1px solid rgba(255,255,255,0.55)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 6px 22px rgba(0,0,0,0.25)",
              textTransform: "none",
              transition: "0.25s ease",
              "&:hover": {
                background: "rgba(255,255,255,0.7)",
                transform: "translateX(-5px)",
              },
            }}
          >
            ← Back to Products
          </Button>
        </Link>
      </Box>

      <Grid container spacing={6} sx={{ maxWidth: "1500px", mx: "auto" }}>
        {/* LEFT */}
        <Grid item xs={12} md={7}>
          <Paper
            sx={{
              p: 4,
              borderRadius: "30px",
              background: "rgba(255,255,255,0.32)",
              border: "1px solid rgba(255,255,255,0.55)",
              backdropFilter: "blur(14px)",
              boxShadow: `
                0 30px 60px rgba(0,0,0,0.30),
                inset 0 0 45px rgba(255,255,255,0.25)
              `,
            }}
          >
            {/* MAIN IMAGE */}
            <Box
              sx={{
                width: "100%",
                aspectRatio: "4/3",
                borderRadius: "22px",
                overflow: "hidden",
                background: "#FFF",
                border: "1px solid rgba(255,255,255,0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
                p: 2,
                boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
              }}
            >
              <Image
                src={mainImage}
                alt={product.title}
                width={900}
                height={650}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
                priority
              />
            </Box>

            {/* THUMBNAILS WITH SERVER-SAFE CLICK */}
            {validImages.length > 1 && (
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  overflowX: "auto",
                  width: "100%",
                  pb: 1,
                }}
              >
                {validImages.slice(0, 6).map((img, idx) => (
                  <Link
                     key={idx}
  href={`?img=${encodeURIComponent(img)}`}
  scroll={false}
  replace
  style={{ textDecoration: "none" }}
                  >
                    <Box
                      sx={{
                        width: 95,
                        height: 75,
                        borderRadius: "12px",
                        overflow: "hidden",
                        background: "#FFF",
                        border: "1px solid rgba(255,255,255,0.55)",
                        cursor: "pointer",
                        transition: "0.25s ease",
                        "&:hover": {
                          transform: "scale(1.12)",
                          boxShadow: "0 10px 26px rgba(0,0,0,0.35)",
                        },
                      }}
                    >
                      <Image
                        src={img}
                        alt={`thumb-${idx}`}
                        width={120}
                        height={90}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </Box>
                  </Link>
                ))}
              </Stack>
            )}
          </Paper>
        </Grid>

        {/* RIGHT */}
        <Grid item xs={12} md={5}>
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: "#1A0F08",
                mb: 3,
                letterSpacing: 1,
                textShadow: "0 3px 8px rgba(0,0,0,0.35)",
              }}
            >
              {product.title}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
              <Chip
                label={`₱${product.price}`}
                sx={{
                  background: "linear-gradient(135deg, #7A4E2C, #59341C)",
                  color: "white",
                  fontWeight: 800,
                  px: 2,
                  borderRadius: "14px",
                }}
              />

              <Chip
                label={product.category}
                variant="outlined"
                sx={{
                  borderColor: "#7A4E2C",
                  color: "#2B1A11",
                  fontWeight: 700,
                  borderRadius: "14px",
                }}
              />

              <Chip
                label={`⭐ ${product.rating}`}
                sx={{
                  background: "rgba(255,255,255,0.7)",
                  color: "#2B1A11",
                  fontWeight: 700,
                  borderRadius: "14px",
                }}
              />
            </Stack>

            <Typography
              variant="body1"
              sx={{
                color: "#1E140E",
                lineHeight: 1.9,
                fontSize: "1.2rem",
                mb: 5,
              }}
            >
              {product.description}
            </Typography>

            <AddToCartWrapper product={productForCart} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
