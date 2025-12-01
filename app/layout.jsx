"use client";

import { CssBaseline, ThemeProvider, createTheme, Container } from "@mui/material";
import Navbar from "./components/Navbar";
import { CartProvider } from "./components/CartProvider";
import Footer from "./components/Footer";
import { ToastProvider } from "./components/ToastProvider";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Roboto, Arial, sans-serif',
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <ToastProvider>
            <CartProvider>
              <Navbar />

              <Container component="main" sx={{ mt: 4, mb: 6 }}>
                {children}
              </Container>

              <Footer />
            </CartProvider>
          </ToastProvider>

        </ThemeProvider>
      </body>
    </html>
  );
}
