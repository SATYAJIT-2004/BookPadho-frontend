import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  LogOut,
  User,
  PlusCircle,
  Home,
  Shield,
  Heart,
  LogInIcon,
  UserPlus2,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <BookOpen className="w-7 h-7 text-indigo-400" />
          <div className="leading-tight">
            <h1 className="text-xl font-semibold">BookPadho</h1>
            <p className="text-xs text-gray-400">Books in your budget</p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-6">

          {/* GUEST */}
          {!user && (
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link
                to="/login"
                className="flex items-center gap-1.5 text-gray-300 hover:text-indigo-400 transition"
              >
                <LogInIcon size={16} />
                Login
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-1.5 text-gray-300 hover:text-indigo-400 transition"
              >
                <UserPlus2 size={16} />
                Register
              </Link>
            </div>
          )}

          {/* AUTH USER */}
          {user && (
            <div className="flex items-center gap-6">

              {/* USER INFO */}
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-gray-400 capitalize">
                    {user.role}
                  </p>
                </div>
              </div>

              {/* LINKS */}
              <div className="flex items-center gap-5 text-sm font-medium">
                <Link to="/" className="flex items-center gap-1 hover:text-indigo-400 transition">
                  <Home size={16} /> Home
                </Link>

                {user.role === "seller" && (
                  <Link to="/add-book" className="flex items-center gap-1 hover:text-indigo-400 transition">
                    <PlusCircle size={16} /> Add Book
                  </Link>
                )}

                {user.role === "admin" && (
                  <Link to="/admin/dashboard" className="flex items-center gap-1 hover:text-indigo-400 transition">
                    <Shield size={16} /> Admin
                  </Link>
                )}

                <Link to="/profile" className="flex items-center gap-1 hover:text-indigo-400 transition">
                  <User size={16} /> Profile
                </Link>

                {user.role === "buyer" && (
                  <Link to="/wishlist" className="flex items-center gap-1 hover:text-pink-400 transition">
                    <Heart size={16} /> Wishlist
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-red-400 hover:text-red-300 transition"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-4 space-y-4 text-sm">

          {!user && (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="flex items-center gap-2 text-gray-300">
                <LogInIcon size={16} /> Login
              </Link>
              <Link to="/register" onClick={() => setOpen(false)} className="flex items-center gap-2 text-gray-300">
                <UserPlus2 size={16} /> Register
              </Link>
            </>
          )}

          {user && (
            <>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                </div>
              </div>

              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <Home size={16} /> Home
              </Link>

              {user.role === "seller" && (
                <Link to="/add-book" onClick={() => setOpen(false)} className="flex items-center gap-2">
                  <PlusCircle size={16} /> Add Book
                </Link>
              )}

              {user.role === "admin" && (
                <Link to="/admin/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2">
                  <Shield size={16} /> Admin
                </Link>
              )}

              <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <User size={16} /> Profile
              </Link>

              {user.role === "buyer" && (
                <Link to="/wishlist" onClick={() => setOpen(false)} className="flex items-center gap-2 text-pink-400">
                  <Heart size={16} /> Wishlist
                </Link>
              )}

              <button onClick={handleLogout} className="flex items-center gap-2 text-red-400">
                <LogOut size={16} /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
