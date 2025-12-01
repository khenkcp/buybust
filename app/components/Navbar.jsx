"use client";

import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "./CartProvider";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { totalItems } = useCart();
  const router = useRouter();

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            BuyBust
          </Typography>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/products" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="body1">Products</Typography>
          </Link>

          {/* FIXED CART REDIRECT */}
          <IconButton
            color="inherit"
            onClick={() => router.push("/checkout")}
          >
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

        </div>
      </Toolbar>
    </AppBar>
  );
}
