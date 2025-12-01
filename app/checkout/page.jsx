"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  TextField,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../components/CartProvider";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleQtyChange = (id, newQty) => {
    const qty = Number(newQty) || 0;
    if (qty <= 0) {
      // remove if user sets to 0
      removeFromCart(id);
    } else {
      updateQuantity(id, qty);
    }
  };

  const inc = (id, current) => updateQuantity(id, Number(current) + 1);
  const dec = (id, current) => {
    const next = Number(current) - 1;
    if (next <= 0) removeFromCart(id);
    else updateQuantity(id, next);
  };

  const placeOrder = async () => {
    if (!items || items.length === 0) return;
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify({ items, totalPrice }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Order failed");
      }

      const data = await res.json();
      clearCart();
      // redirect to success page with order id
      router.push(`/checkout/success?order=${encodeURIComponent(data.orderId)}`);
    } catch (err) {
      console.error("Place order failed:", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Checkout
      </Typography>

      {items.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {items.map((it) => (
            <ListItem
              key={it.id}
              alignItems="flex-start"
              sx={{ borderRadius: 1, mb: 2, boxShadow: 1 }}
              secondaryAction={
                <Stack spacing={1} direction="column" alignItems="flex-end">
                  <Typography variant="subtitle1">₱{(it.price * it.quantity).toFixed(2)}</Typography>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton
                      size="small"
                      onClick={() => dec(it.id, it.quantity)}
                      aria-label="decrease"
                    >
                      <RemoveIcon />
                    </IconButton>

                    <TextField
                      size="small"
                      value={it.quantity}
                      onChange={(e) => {
                        const v = parseInt(e.target.value || "0", 10);
                        if (!Number.isNaN(v)) handleQtyChange(it.id, v);
                      }}
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*", min: 0, style: { textAlign: "center" } }}
                      sx={{ width: 80 }}
                    />

                    <IconButton
                      size="small"
                      onClick={() => inc(it.id, it.quantity)}
                      aria-label="increase"
                    >
                      <AddIcon />
                    </IconButton>
                  </Stack>

                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => removeFromCart(it.id)}
                    aria-label="remove"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              }
            >
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  src={it.thumbnail}
                  alt={it.title}
                  sx={{ width: 72, height: 72, mr: 2 }}
                />
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {it.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    ₱{it.price.toFixed(2)} each
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h5">₱{Number(totalPrice || 0).toFixed(2)}</Typography>
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={placeOrder}
          disabled={loading || items.length === 0}
        >
          {loading ? "Placing order..." : "Place Order"}
        </Button>

        <Button variant="outlined" color="inherit" onClick={() => router.push("/products")}>
          Continue Shopping
        </Button>
      </Stack>
    </Box>
  );
}
