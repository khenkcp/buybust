"use client";

import { Snackbar, Alert } from "@mui/material";

export default function Toast({ open, message, severity = "info", onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{
        zIndex: 3000,
        "& .MuiSnackbarContent-root": {
          backdropFilter: "blur(12px)",
        },
      }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          width: "100%",
          borderRadius: "12px",
          px: 2,
          py: 1.5,
          fontSize: "1rem",
          boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
          background:
            severity === "success"
              ? "linear-gradient(135deg, #4CAF50, #2E7D32)"
              : severity === "error"
              ? "linear-gradient(135deg, #D32F2F, #B71C1C)"
              : severity === "warning"
              ? "linear-gradient(135deg, #ED6C02, #E65100)"
              : "linear-gradient(135deg, #1976D2, #0D47A1)",
          color: "white",
          backdropFilter: "blur(12px)",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
