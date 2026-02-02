import { useState } from "react";
import { toast } from "react-toastify";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const BuyBookModal = ({ book, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      const { data } = await API.post("/orders", {
        bookId: book._id,
        paymentMethod,
      });

      toast.success(`Order placed using ${paymentMethod}`);
      await API.delete(`/wishlist/${book._id}`);
      onClose();
      navigate(`/order-info/${data.order._id}`);
    } catch (err) {
      toast.error("Payment failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Select Payment Method
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Choose how you would like to pay
        </p>

        {/* Payment Options */}
        <div className="mt-5 space-y-3">
          {["COD", "CARD", "UPI", "RAZORPAY"].map((method) => (
            <label
              key={method}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition
                ${
                  paymentMethod === method
                    ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600"
                    : "border-gray-300 hover:border-indigo-400"
                }`}
            >
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
                className="accent-indigo-600"
              />
              <span className="font-medium text-gray-700">{method}</span>
            </label>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 py-2 font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            disabled={!paymentMethod}
            onClick={handlePlaceOrder}
            className="flex-1 rounded-lg bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyBookModal;
