import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Bookmark } from "lucide-react";
import BuyBookModal from "../components/BuyBook";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await API.get("/wishlist");
        setWishlist(data.wishlist || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (bookId) => {
    await API.delete(`/wishlist/${bookId}`);
    setWishlist((prev) => prev.filter((book) => book._id !== bookId));
  };

  if (loading) return <p className="p-6">Loading wishlist...</p>;

 return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-600 px-4 py-10">
    {/* HEADER */}
    <div className="max-w-6xl mx-auto mb-8 text-center">
      <h1 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-2">
        <Bookmark className="w-7 h-7 text-indigo-600" />
        My Wishlist
      </h1>
      <p className="text-sm text-slate-500 mt-1">
        Saved items you may want to buy later
      </p>
    </div>

    {/* EMPTY STATE */}
    {wishlist.length === 0 ? (
      <div className="flex flex-col items-center justify-center mt-24 text-slate-500">
        <Bookmark className="w-14 h-14 text-slate-300 mb-4" />
        <p className="text-lg font-medium">Your wishlist is empty</p>
        <p className="text-sm mt-1">Browse books and save them here 📚</p>
      </div>
    ) : (
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-xl border border-slate-200
              shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* IMAGE */}
            <img
              src={book.images?.[0]}
              alt={book.title}
              className="h-40 w-full object-cover rounded-t-xl"
            />

            {/* CONTENT */}
            <div className="p-4 flex flex-col justify-between h-[135px]">
              <div>
                <h2 className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2">
                  {book.title}
                </h2>

                <p className="text-base font-bold text-slate-900 mt-1">
                  ₹{book.price}
                </p>

                <p className="text-xs text-slate-500">
                  by {book.author}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center justify-between mt-3">
                <button
                  onClick={() => setSelectedBook(book)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => removeFromWishlist(book._id)}
                  className="text-xs font-medium text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    {selectedBook && (
      <BuyBookModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    )}
  </div>
);

};

export default Wishlist;
