"use client";

import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Container,
  Box,
} from "@mui/material";

import Navbar from "./components/Navbar";
import { CartProvider } from "./components/CartProvider";
import { ToastProvider } from "./components/ToastProvider";
import { AuthProvider } from "./components/AuthProvider";
import { usePathname } from "next/navigation";

// ----------------------------
// THEME (Cleaner + premium feel)
// ----------------------------
const theme = createTheme({
  palette: {
    primary: { main: "#6F4E37" },     // Coffee brown
    secondary: { main: "#D7B892" },   // Soft latte tone
    background: { default: "#EEE5DA" },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Roboto, Arial, sans-serif',
    h3: { fontWeight: 900, letterSpacing: 0.5 },
    h4: { fontWeight: 800 },
    body1: { lineHeight: 1.7 },
  },
  shape: { borderRadius: 12 },
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isHome =
    pathname === "/" || pathname === "" || pathname === undefined;

  // Pages that should be full width
  const isFullWidth =
    isHome ||
    pathname?.startsWith("/products") ||
    pathname?.startsWith("/product") ||
    pathname?.startsWith("/orders") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register");

  return (
    <html lang="en" style={{ overflowX: "hidden" }}>
      <body
        style={{
          overflowX: "hidden",
          margin: 0,
          padding: 0,
          background: "#EEE5DA",
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {/* Toast must wrap everything */}
          <ToastProvider>
            <CartProvider>
              <AuthProvider>

                {/* NAVBAR (always visible) */}
                <Navbar />

                {/* CONTENT AREA */}
                {isFullWidth ? (
                  <Box
                    component="main"
                    sx={{
                      width: "100vw",
                      minHeight: "calc(100vh - 64px)",
                      overflowX: "hidden",
                      p: 0,
                      m: 0,
                    }}
                  >
                    {children}
                  </Box>
                ) : (
                  <Container
                    component="main"
                    sx={{
                      mt: 4,
                      mb: 6,
                      p: 2,
                      borderRadius: 3,
                      background: "#FFF8F0",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    }}
                  >
                    {children}
                  </Container>
                )}

              </AuthProvider>
            </CartProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
