import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const BuyerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders/my");
        setOrders(data.orders || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-600">Loading your orders...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-indigo-600 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow p-4 flex gap-4"
            >
              {/* Book Image */}
              <img
                src={
                  order.book?.images?.[0] ||
                  "https://via.placeholder.com/120x160"
                }
                alt={order.book?.title}
                className="w-24 h-32 object-cover rounded"
              />

              {/* Order Info */}
              <div className="flex-1">
                <button
                  onClick={() => navigate(`/order-info/${order._id}`)}
                  className="mt-3 inline-block text-sm text-indigo-600 hover:underline"
                >
                  View Order Details →
                </button>

                <h2 className="font-semibold text-lg">{order.book?.title}</h2>

                <p className="text-gray-500 text-sm">Price: ₹{order.price}</p>

                <p className="text-gray-500 text-sm">
                  Seller: {order.seller?.name}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Ordered on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`self-start px-3 py-1 text-sm rounded-full ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {order.status === "pending"
                  ? "Pending Seller Confirmation"
                  : order.status === "completed"
                    ? "Order Confirmed"
                    : "Order Cancelled"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
