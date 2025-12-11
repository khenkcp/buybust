import { redirect } from "next/navigation";
import { getUserFromCookie } from "@/lib/auth-server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import Link from "next/link";

export default async function OrdersPage() {
  const user = await getUserFromCookie();

  if (!user) redirect("/login");

  await connectDB();

  const orders = await Order.find({ userId: user.id })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <Box
      sx={{
        p: { xs: 3, md: 5 },
        minHeight: "100vh",
        background: `
          radial-gradient(circle at 20% 20%, rgba(255,240,225,0.55), transparent 60%),
          radial-gradient(circle at 80% 80%, rgba(200,170,140,0.35), transparent 60%),
          #EEE5DA
        `,
      }}
    >
      {/* TITLE */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 900,
          textAlign: "center",
          color: "#4B2E19",
          mb: 5,
          letterSpacing: 0.5,
          textShadow: "0px 3px 8px rgba(0,0,0,0.15)",
        }}
      >
        Your Orders
      </Typography>

      {/* NO ORDERS */}
      {orders.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            mt: 8,
            color: "#6F4E37",
            fontSize: "1.3rem",
            fontWeight: 600,
          }}
        >
          You haven’t placed any orders yet.
        </Box>
      )}

      {/* ORDERS GRID */}
      <Grid container spacing={4} justifyContent="center">
        {orders.map((order) => {
          const firstItem = order.items?.[0] || {};
          const thumbnail =
            firstItem.thumbnail ||
            firstItem.image ||
            firstItem.img ||
            (Array.isArray(firstItem.images)
              ? firstItem.images.find((i) => i && i.trim() !== "")
              : null) ||
            "/placeholder.png";

          return (
            <Grid item key={order._id} xs={12} sm={6} md={4} lg={3}>
              <Paper
                sx={{
                  borderRadius: "22px",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  boxShadow: `
                    0 15px 35px rgba(0,0,0,0.15),
                    inset 0 0 20px rgba(255,255,255,0.3)
                  `,
                  transition: "0.25s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: `
                      0 20px 40px rgba(0,0,0,0.25),
                      inset 0 0 20px rgba(255,255,255,0.35)
                    `,
                  },
                }}
              >
                {/* IMAGE */}
                <Box
                  component="img"
                  src={thumbnail}
                  alt="Product preview"
                  sx={{
                    width: "100%",
                    height: 190,
                    objectFit: "cover",
                    borderBottom: "1px solid rgba(0,0,0,0.1)",
                  }}
                />

                {/* CONTENT */}
                <Box sx={{ p: 3 }}>
                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: 800,
                      color: "#3A2417",
                      mb: 1,
                    }}
                  >
                    Order #{order._id.toString().slice(-6)}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#4B2E19",
                      opacity: 0.75,
                      mb: 1,
                    }}
                  >
                    Placed: {new Date(order.createdAt).toLocaleString()}
                  </Typography>

                  <Typography
                    sx={{
                      mb: 2,
                      color: order.status === "delivered" ? "#2E7D32" : "#8A4B2A",
                      fontWeight: 700,
                      textTransform: "capitalize",
                    }}
                  >
                    Status: {order.status}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  {/* ORDERED ITEMS */}
                  {order.items.slice(0, 3).map((item) => (
                    <Typography
                      key={item.id}
                      sx={{
                        color: "#4B2E19",
                        fontSize: "0.95rem",
                        mt: 0.4,
                      }}
                    >
                      • {item.title} × {item.quantity}
                    </Typography>
                  ))}

                  {order.items.length > 3 && (
                    <Typography sx={{ mt: 1, opacity: 0.7 }}>
                      + {order.items.length - 3} more items
                    </Typography>
                  )}

                  <Divider sx={{ my: 2 }} />

                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: 800,
                      color: "#3A2417",
                      mb: 2,
                    }}
                  >
                    Total: ₱{order.totalPrice.toFixed(2)}
                  </Typography>

                  {/* VIEW BUTTON */}
                  <Link href={`/orders/${order._id}`} style={{ textDecoration: "none" }}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        py: 1.2,
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #7A4E2C, #5C3A22)",
                        fontWeight: 700,
                        "&:hover": {
                          background: "linear-gradient(135deg, #5C3A22, #3A2417)",
                        },
                      }}
                    >
                      View Details
                    </Button>
                  </Link>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
