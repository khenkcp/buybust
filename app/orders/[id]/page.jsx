import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export default async function OrderDetails({ params }) {
  const { id } = await params;

  await connectDB();
  const order = await Order.findById(id).lean();

  if (!order) {
    return (
      <div
        style={{
          padding: "60px",
          textAlign: "center",
          fontFamily: "Inter, sans-serif",
          color: "#4B2E19",
        }}
      >
        <h2>Order not found</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "Inter, sans-serif",
        color: "#4B2E19",

        background: `
          radial-gradient(circle at 15% 20%, rgba(255,240,220,0.55), transparent 60%),
          radial-gradient(circle at 85% 80%, rgba(200,160,120,0.35), transparent 65%),
          #EEE5DA
        `,
        borderRadius: "18px",
      }}
    >
      {/* HEADER CARD */}
      <div
        style={{
          background: "rgba(255,255,255,0.75)",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: `
            0 16px 34px rgba(0,0,0,0.15),
            inset 0 0 18px rgba(255,255,255,0.3)
          `,
          padding: "28px",
          marginBottom: "35px",
          backdropFilter: "blur(10px)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontWeight: 900,
            fontSize: "30px",
            color: "#3A2417",
            letterSpacing: 0.5,
          }}
        >
          Order #{order._id.toString().slice(-6)}
        </h1>

        <p style={{ marginTop: "12px", fontSize: "16px" }}>
          <b>Created:</b> {new Date(order.createdAt).toLocaleString()}
        </p>

        {/* ORDER STATUS */}
        <p style={{ fontSize: "17px", marginTop: "6px" }}>
          <b>Status:</b>{" "}
          <span
            style={{
              padding: "4px 12px",
              background:
                order.status === "delivered"
                  ? "#CDE8C1"
                  : order.status === "cancelled"
                  ? "#F4C7C3"
                  : "#EBD3B0",
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "capitalize",
            }}
          >
            {order.status}
          </span>
        </p>

        {/* PAYMENT METHOD */}
        {order.paymentMethod && (
          <p style={{ marginTop: "6px" }}>
            <b>Payment:</b>{" "}
            {order.paymentMethod === "cod"
              ? "Cash on Delivery"
              : "Online Payment"}
          </p>
        )}

        {/* DELIVERY INFO */}
        {order.shipping && (
          <div style={{ marginTop: "20px" }}>
            <h3
              style={{
                marginBottom: "10px",
                color: "#3A2417",
                fontWeight: 800,
                fontSize: "20px",
              }}
            >
              Delivery Information
            </h3>

            <p><b>Name:</b> {order.shipping.fullName}</p>
            <p><b>Mobile:</b> {order.shipping.mobile}</p>
            <p><b>Address:</b> {order.shipping.address}</p>

            {order.shipping.notes && (
              <p>
                <b>Notes:</b> {order.shipping.notes}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ITEMS LIST */}
      <h2
        style={{
          marginBottom: "12px",
          color: "#3A2417",
          fontSize: "26px",
          fontWeight: 900,
        }}
      >
        Items
      </h2>

      <div
        style={{
          background: "rgba(255,255,255,0.85)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.6)",
          padding: "22px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.10)",
        }}
      >
        {order.items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              gap: "15px",
              marginBottom: "20px",
              paddingBottom: "20px",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={
                item.thumbnail ||
                item.image ||
                item.img ||
                (Array.isArray(item.images)
                  ? item.images.find((i) => i && i.trim() !== "")
                  : null) ||
                "/placeholder.png"
              }
              alt={item.title}
              style={{
                width: "75px",
                height: "75px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: "16px" }}>
                {item.title}
              </p>

              <p style={{ margin: "6px 0", opacity: 0.8 }}>
                ₱{item.price} × {item.quantity}
              </p>

              <p
                style={{
                  fontWeight: 700,
                  color: "#3A2417",
                }}
              >
                Subtotal: ₱{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <h2
        style={{
          marginTop: "35px",
          fontSize: "28px",
          fontWeight: 900,
          color: "#3A2417",
          textAlign: "right",
        }}
      >
        Total: ₱{order.totalPrice}
      </h2>
    </div>
  );
}
