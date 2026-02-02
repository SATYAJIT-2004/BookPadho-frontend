import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { CheckCircle, Clock, XCircle, CreditCard } from "lucide-react";

const OrderInfo = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await API.get(`/orders/${id}`);
      setOrder(data);
    };
    if (id) fetchOrder();
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-gray-500">
        Loading order details...
      </div>
    );
  }

  const statusStyles = {
    pending: {
      text: "Pending",
      color: "text-yellow-600",
      icon: <Clock className="w-5 h-5" />,
      bg: "bg-yellow-50",
    },
    completed: {
      text: "Completed",
      color: "text-green-600",
      icon: <CheckCircle className="w-5 h-5" />,
      bg: "bg-green-50",
    },
    cancelled: {
      text: "Cancelled",
      color: "text-red-600",
      icon: <XCircle className="w-5 h-5" />,
      bg: "bg-red-50",
    },
  };

  const status = statusStyles[order.status];

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-indigo-500">
      <div className="w-full max-w-2xl bg-indigo-200 rounded-2xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <div className="border-b pb-3">
          <h1 className="text-2xl font-bold text-gray-800">
            Order Information
          </h1>
          <p className="text-sm text-black">
            Order ID: {order._id}
          </p>
        </div>

        {/* Book Info */}
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-800">
            {order.book.title}
          </h2>
          <p className="text-black">
            {order.book.category} • {order.book.condition}
          </p>
          <p className="text-lg font-bold text-indigo-600">
            ₹{order.price}
          </p>
        </div>

        {/* Payment Method */}
        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
          <CreditCard className="text-indigo-600" />
          <p className="text-gray-700 font-medium">
            {order.paymentMethod === "COD"
              ? "Cash on Delivery"
              : order.paymentMethod}
          </p>
        </div>

        {/* Status */}
        <div
          className={`flex items-center gap-3 p-4 rounded-lg ${status.bg}`}
        >
          <div className={status.color}>{status.icon}</div>
          <p className={`font-semibold ${status.color}`}>
            {status.text}
          </p>
        </div>

        {/* Footer */}
        <div className="text-sm text-black text-right">
          Ordered on {new Date(order.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
