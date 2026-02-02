import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Addbook from "./components/Addbook";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import SellerRoutes from "./routes/SellerRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import AdminDashboard from "./pages/AdminDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditBook from "./pages/EditBook";
import Wishlist from "./pages/Wishlist";
import Orderinfo from "./pages/Orderinfo";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoutes>
              <Register />
            </PublicRoutes>
          }
        />

        {/* AUTHENTICATED USERS */}
        <Route
          path="/profile"
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        />

        {/* BUYER */}
        <Route
          path="/my-orders"
          element={
            <PrivateRoutes>
              <BuyerDashboard />
            </PrivateRoutes>
          }
        />

        <Route
          path="/wishlist"
          element={
            <PrivateRoutes>
              <Wishlist />
            </PrivateRoutes>
          }
        />

        <Route
          path="/order-info/:id"
          element={
            <PrivateRoutes>
              <Orderinfo />
            </PrivateRoutes>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoutes>
              <AdminDashboard />
            </AdminRoutes>
          }
        />

        {/* SELLER */}
        <Route
          path="/seller/dashboard"
          element={
            <SellerRoutes>
              <SellerDashboard />
            </SellerRoutes>
          }
        />

        <Route
          path="/add-book"
          element={
            <SellerRoutes>
              <Addbook />
            </SellerRoutes>
          }
        />

        <Route
          path="/edit-book/:id"
          element={
            <SellerRoutes>
              <EditBook />
            </SellerRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
