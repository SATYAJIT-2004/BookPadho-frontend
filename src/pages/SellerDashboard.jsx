import React, { useEffect, useState } from "react";
import { BookOpen, PlusCircle, List, IndianRupee, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";

const SellerDashboard = () => {
  const [bookCount, setBookCount] = useState(0);
  const [books, setBooks] = useState([]);
  const [soldBook, setSoldBook] = useState(0);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const handleDelete = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await API.delete(`/books/${bookId}`);
      setBooks((prev) => prev.filter((b) => b._id !== bookId));
      setBookCount((prev) => prev - 1);
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleConfirmOrder = async (orderId) => {
    try {
      await API.put(`/orders/seller/confirm/${orderId}`);
      toast.success("Order confirmed");
      setPendingOrders((prev) =>
        prev.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to confirm order");
    }
  };

  useEffect(() => {
    API.get("/books/my/sold-count")
      .then(({ data }) => setSoldBook(data.totalSold))
      .catch(() => {});
  }, []);

  useEffect(() => {
    API.get("/books/my")
      .then(({ data }) => setBooks(data.books || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoadingOrders(true);
    API.get("/orders/seller/pending")
      .then(({ data }) => setPendingOrders(data.orders))
      .catch(() => toast.error("Failed to load pending orders"))
      .finally(() => setLoadingOrders(false));
  }, []);

  useEffect(() => {
    API.get("/books/my/count")
      .then(({ data }) => setBookCount(data.count))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-6 overflow-x-hidden">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Seller Dashboard
        </h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          Manage your books and track performance
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Books</p>
              <h2 className="text-2xl font-bold text-gray-800">{bookCount}</h2>
            </div>
            <BookOpen className="text-indigo-600" size={28} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Books Sold</p>
              <h2 className="text-2xl font-bold text-gray-800">{soldBook}</h2>
            </div>
            <List className="text-emerald-600" size={28} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <h2 className="text-2xl font-bold text-gray-800">₹9,850</h2>
            </div>
            <IndianRupee className="text-amber-600" size={28} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500 mb-2">Quick Action</p>
          <Link
            to="/add-book"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
          >
            <PlusCircle size={18} />
            Add New Book
          </Link>
        </div>
      </div>

      {/* PENDING ORDERS */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Pending Orders
        </h2>

        {loadingOrders ? (
          <p className="text-gray-500">Loading orders...</p>
        ) : pendingOrders.length === 0 ? (
          <p className="text-gray-500">No pending orders</p>
        ) : (
          <div className="space-y-4">
            {pendingOrders.map((order) => (
              <div
                key={order._id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border rounded-lg p-4"
              >
                <div>
                  <h3 className="font-semibold">
                    {order.book ? order.book.title : "Book not available"}
                  </h3>
                  <p className="text-sm text-gray-700">
                    Buyer: {order.buyer.name}
                  </p>
                  <p className="text-sm text-gray-700">
                    Price: ₹{order.price}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-gray-700">
                    <Wallet className="size-5" />
                    Payment Method: {order.paymentMethod}
                  </p>
                </div>

                <button
                  onClick={() => handleConfirmOrder(order._id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full sm:w-auto"
                >
                  Confirm Order
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LISTED BOOKS */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
          Your Listed Books
        </h2>

        {books.length === 0 ? (
          <div className="mt-4 border border-dashed rounded-lg p-6 text-center text-gray-400">
            📚 You haven't listed any books yet
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {books.map((book) => (
              <div
                key={book._id}
                className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={book.images?.[0]}
                  alt={book.title}
                  className="h-48 w-full object-cover"
                />

                <div className="p-4">
                  {!book.isSold && (
                    <div className="flex gap-3 mt-3 justify-end">
                      <Link
                        to={`/edit-book/${book._id}`}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(book._id)}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  <h3 className="font-bold truncate mt-2">{book.title}</h3>
                  <p className="text-sm text-gray-500">₹{book.price}</p>

                  <p className="text-xs mt-1">
                    Status:{" "}
                    {book.isApproved ? (
                      <span className="text-green-600">Approved</span>
                    ) : (
                      <span className="text-yellow-600">Pending</span>
                    )}
                  </p>

                  <p className="text-xs mt-1">
                    {book.isSold ? (
                      <span className="text-gray-700">
                        Ordered by {book.orderedBy?.name}
                        <br />
                        <span className="text-gray-500">
                          Address: {book.orderedBy?.address}
                        </span>
                      </span>
                    ) : (
                      <span className="text-green-500">Available</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
