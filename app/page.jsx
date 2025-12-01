"use client";

import { Button, Typography, Box } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: "bold" }}>
        Welcome to BuyBust
      </Typography>

      <Typography variant="h6">Your affordable online marketplace.</Typography>

      <Link href="/products">
        <Button variant="contained" size="large">
          Browse Products
        </Button>
      </Link>
    </Box>
  );
}
