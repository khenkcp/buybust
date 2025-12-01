"use client";

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function SuccessPage({ searchParams }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Order Successful!
      </Typography>

      <Typography sx={{ mb: 2 }}>
        Your order ID: <b>{searchParams.order}</b>
      </Typography>

      <Link href="/products">
        <Button variant="contained">Continue Shopping</Button>
      </Link>
    </Box>
  );
}
