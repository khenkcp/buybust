"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Avatar,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "./CartProvider";
import { useAuth } from "./AuthProvider";

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);

  const navItem = (label, path) => (
    <Typography
      component={Link}
      href={path}
      sx={{
        textDecoration: "none",
        color: pathname === path ? "#F0D8B0" : "#F5E6D3",
        fontWeight: pathname === path ? 700 : 500,
        transition: "0.2s ease",
        fontSize: "1rem",
        "&:hover": {
          color: "#FFF3E1",
          transform: "scale(1.05)",
        },
      }}
    >
      {label}
    </Typography>
  );

  const openMenu = (e) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    logout();
    closeMenu();
    router.push("/");
  };

  return (
    <AppBar
      elevation={10}
      position="sticky"
      sx={{
        top: 0,
        zIndex: 3000,                   // ⭐ ensures toast appears BELOW navbar but remains visible
        backgroundColor: "#4B2E19",     // ⭐ FULLY OPAQUE — FIXES WHITE LINE
        borderBottom: "1px solid rgba(255, 240, 215, 0.25)",
        boxShadow: `
          0 4px 18px rgba(0,0,0,0.35),
          inset 0 0 6px rgba(255,255,255,0.15)
        `,

        // ⭐ Removed blur to prevent UI issues
        backdropFilter: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1,
        }}
      >
        <Typography
          component={Link}
          href="/"
          sx={{
            textDecoration: "none",
            color: "#F5E6D3",
            fontWeight: "bold",
            fontSize: "1.7rem",
            letterSpacing: 1,
            transition: "0.25s",
            textShadow: "0 2px 6px rgba(255, 240, 215, 0.3)",
            "&:hover": {
              opacity: 0.9,
              transform: "scale(1.03)",
            },
          }}
        >
          BuyBust
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          {navItem("Products", "/products")}
          {navItem("Orders", "/orders")}

          <IconButton
            onClick={() => router.push("/checkout")}
            sx={{
              color: "#F5E6D3",
              transition: "0.25s",
              "&:hover": {
                color: "#FFEFD7",
                transform: "scale(1.1)",
              },
            }}
          >
            <Badge
              badgeContent={totalItems}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#A68C6D",
                  color: "#fff",
                },
              }}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* AUTH — Logged out */}
          {!user ? (
            <>
              <Button
                component={Link}
                href="/login"
                sx={{
                  color: "#F5E6D3",
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#FFEED9",
                  },
                }}
              >
                Login
              </Button>

              <Button
                component={Link}
                href="/register"
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  backgroundColor: "#A68C6D",
                  color: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
                  "&:hover": {
                    backgroundColor: "#8C7259",
                    boxShadow: "0 5px 16px rgba(0,0,0,0.35)",
                  },
                }}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              {/* AUTH — Logged in */}
              <Button
                onClick={openMenu}
                startIcon={
                  <Avatar
                    src={user.avatar || undefined}
                    sx={{
                      width: 32,
                      height: 32,
                      border: "2px solid #F5E6D3",
                    }}
                  >
                    {!user.avatar &&
                      (user.name?.charAt(0).toUpperCase() || "U")}
                  </Avatar>
                }
                sx={{
                  color: "#F5E6D3",
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": { color: "#FFEED9" },
                }}
              >
                {user.name}
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeMenu}
                PaperProps={{
                  sx: {
                    background: "rgba(255, 245, 230, 0.95)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
                    borderRadius: "14px",
                  },
                }}
              >
                <MenuItem disabled sx={{ py: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      src={user.avatar || undefined}
                      sx={{ width: 45, height: 45 }}
                    >
                      {!user.avatar &&
                        (user.name?.charAt(0).toUpperCase() || "U")}
                    </Avatar>

                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>
                        {user.name}
                      </Typography>
                      <Typography sx={{ fontSize: "0.8rem", opacity: 0.75 }}>
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    closeMenu();
                    router.push("/settings");
                  }}
                >
                  Settings
                </MenuItem>

                {user.role === "admin" && (
                  <MenuItem
                    onClick={() => {
                      closeMenu();
                      router.push("/admin");
                    }}
                  >
                    Admin Panel
                  </MenuItem>
                )}

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
