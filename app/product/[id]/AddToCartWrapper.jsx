"use client";

import AddToCartButton from "../../components/AddToCartButton";
import { Button } from "@mui/material";

export default function AddToCartWrapper({ product }) {
  if (!product) {
    return (
      <Button
        disabled
        sx={{
          width: "100%",
          py: 1.6,
          borderRadius: "14px",
          backgroundColor: "#C8B7A6",
          color: "white",
          opacity: 0.7,
        }}
      >
        Loading...
      </Button>
    );
  }

  const isValid =
    product.id &&
    product.title &&
    typeof product.price === "number" &&
    product.price >= 0;

  if (!isValid) {
    return (
      <Button
        disabled
        sx={{
          width: "100%",
          py: 1.6,
          borderRadius: "14px",
          backgroundColor: "#BFA89A",
          color: "#FFF",
          opacity: 0.7,
        }}
      >
        Invalid Product
      </Button>
    );
  }

  return <AddToCartButton product={product} />;
}
