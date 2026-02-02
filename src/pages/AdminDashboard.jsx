import React, { useEffect, useState } from "react";
import API from "../api/axios";
import {
  Users,
  BookOpen,
  CheckCircle,
  Clock,
  ShoppingCart,
} from "lucide-react";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [pendingBooks, setPendingBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyers, setBuyers] = useState([]);
  const [sellers,setSellers] = useState([]);

  useEffect(()=>{
    const fetchSellers = async()=>{
      try {
        const {data} = await API.get("/admin/sellers");
        setSellers(data.sellers);
      } catch (error) {
         console.log(error);
      }
      finally{
        setLoading(false);
      }
    }
    fetchSellers();
  },[])

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const { data } = await API.get("/admin/buyers");
        setBuyers(data.buyers);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBuyers();
  }, []);


  const fetchDashboard = async () => {
    try {
      const { data } = await API.get("/admin/dashboard");
      setStats(data);
    } catch (error) {
      console.error("Failed to load dashboard stats");
    }
  };

  const fetchPendingBooks = async () => {
    try {
      const { data } = await API.get("/admin/pending-books");
      setPendingBooks(data);
    } catch (error) {
      console.error("Failed to load pending books");
    }
  };

  const handleApprove = async (id) => {
    try {
      await API.put(`/admin/approve-book/${id}`);
      fetchDashboard();
      fetchPendingBooks();
    } catch (error) {
      console.error("Failed to approve book");
    }
  };

  useEffect(() => {
    Promise.all([fetchDashboard(), fetchPendingBooks()]).finally(() =>
      setLoading(false)
    );
  }, []);

  if (loading) {
    return <div className="p-6">Loading admin dashboard...</div>;
  }

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-200 to-indigo-600 p-6">
      {/* Header */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-white shadow">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-sm opacity-90 mt-1">
          Manage users, books and approvals
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Users"
            value={stats.users.total}
            icon={<Users />}
          />
          <StatCard
            title="Total Books"
            value={stats.books.total}
            icon={<BookOpen />}
          />
          <StatCard
            title="Pending Books"
            value={stats.books.pending}
            icon={<Clock />}
          />
          <StatCard
            title="Orders"
            value={stats.orders.total}
            icon={<ShoppingCart />}
          />
        </div>
      )}

      {/* Buyers Preview */}
<div className="bg-white rounded-2xl shadow p-6 mb-10">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-semibold text-gray-800">
      Buyers ({buyers.length})
    </h2>
    <span className="text-sm text-indigo-600 font-medium cursor-pointer hover:underline">
      View all
    </span>
  </div>

  {buyers.length === 0 ? (
    <p className="text-gray-500">No buyers found</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {buyers.slice(0, 6).map((buyer) => (
        <div
          key={buyer._id}
          className="border rounded-xl p-4 hover:shadow transition"
        >
          <h3 className="font-semibold text-gray-800">
            {buyer.name}
          </h3>
          <p className="text-sm text-gray-500">{buyer.email}</p>
          <p className="text-xs text-gray-400 mt-1">
            Joined: {new Date(buyer.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )}
</div>

  {/* Seller Preview */}
<div className="bg-white rounded-2xl shadow p-6 mb-10">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-semibold text-gray-800">
      Sellers ({sellers.length})
    </h2>
    <span className="text-sm text-indigo-600 font-medium cursor-pointer hover:underline">
      View all
    </span>
  </div>

  {sellers.length === 0 ? (
    <p className="text-gray-500">No Sellers found</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sellers.slice(0, 6).map((seller) => (
        <div
          key={seller._id}
          className="border rounded-xl p-4 hover:shadow transition"
        >
          <h3 className="font-semibold text-gray-800">
            {seller.name}
          </h3>
          <p className="text-sm text-gray-500">{seller.email}</p>
          <p className="text-xs text-gray-400 mt-1">
            Joined: {new Date(seller.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )}
</div>


      {/* Pending Books */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Pending Book Approvals
        </h2>

        {pendingBooks.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            🎉 No pending books
          </div>
        ) : (
          <div className="space-y-4">
            {pendingBooks.map((book) => (
              <div
                key={book._id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border rounded-xl p-4 hover:shadow transition"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ₹{book.price} · Seller: {book.seller.name}
                  </p>
                </div>

                <button
                  onClick={() => handleApprove(book._id)}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-800 text-white px-5 py-2 rounded-lg transition"
                >
                  <CheckCircle size={18} />
                  Approve
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-5 rounded-2xl shadow hover:shadow-xl transition">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
      </div>
      <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
        {icon}
      </div>
    </div>
  </div>
);

export default AdminDashboard;
