import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Shield, ShoppingCart, HomeIcon } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-gray-100">
        <div className="text-3xl font-semibold text-red-500">
          Please login to view profile...
        </div>
      </div>
    );
  }

  const InfoRow = ({ icon, label, value, capitalize }) => (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
      <div className="text-indigo-600">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className={`font-medium ${capitalize ? "capitalize" : ""}`}>
          {value}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-blue-50 to-indigo-600 flex items-center justify-center px-4 overflow-hidden">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-indigo-600 px-6 py-6 text-center text-white">
          <div className="mx-auto mb-3 w-20 h-20 rounded-full bg-white text-indigo-600 flex items-center justify-center text-3xl font-bold shadow">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-indigo-200 capitalize text-sm">
            {user.role} account
          </p>
        </div>

        {/* BODY */}
        <div className="p-5 space-y-3">
          <InfoRow
            icon={<User size={18} />}
            label="Full Name"
            value={user.name}
          />

          <InfoRow
            icon={<Mail size={18} />}
            label="Email Address"
            value={user.email}
          />

          <InfoRow
            icon={<Shield size={18} />}
            label="Account Role"
            value={user.role}
            capitalize
          />

          {user.role === "buyer" && (
            <InfoRow
              icon={<HomeIcon size={18} />}
              label="Address"
              value={user.address || "Not provided"}
            />
          )}

          {user.role === "seller" && (
            <div className="mt-6 p-4 rounded-xl border border-indigo-100 bg-indigo-50">
              <Link
                to="/seller/dashboard"
                className="block font-semibold text-indigo-700 hover:underline"
              >
                Seller Dashboard
              </Link>
              <p className="text-sm text-gray-600 mt-1">
                Manage your books, track sales, and update listings.
              </p>
            </div>
          )}

          {user.role === "buyer" && (
            <div className="mt-6 p-4 rounded-xl border border-indigo-100 bg-indigo-50">
              <Link
                to="/my-orders"
                className="flex items-center gap-2 font-semibold text-indigo-700 hover:underline"
              >
                <ShoppingCart size={18} />
                My Orders
              </Link>
              <p className="text-sm text-gray-600 mt-1">
                View your order history and track purchases.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
