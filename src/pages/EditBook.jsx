import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch existing book
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await API.get(`/books/${id}`);
        setTitle(data.book.title);
        setPrice(data.book.price);
        setCategory(data.book.category);
      } catch (error) {
        toast.error("Failed to load book details");
      } finally {
        setLoading(false);
      }
      
    };
    fetchBook();
  }, [id]);

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await API.put(`/books/${id}`, { title, price, category });
      toast.success("Book updated successfully");
      navigate("/seller/dashboard");
    } catch (error) {   
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading book details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gradient-to-r from-indigo-400 to-indigo-700 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 sm:p-8"
      >
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Book</h2>
          <p className="text-sm text-gray-500 mt-1">
            Update your book information
          </p>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Book Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter book title"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Enter price"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            placeholder="e.g. Fiction, Education"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
          >
            {submitting ? "Updating..." : "Update Book"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/seller/dashboard")}
            className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
