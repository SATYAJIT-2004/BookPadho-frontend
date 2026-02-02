import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import BuyBookModal from "./BuyBook";

const BookCard = ({ book }) => {
  const { user } = useAuth();
  const imageUrl =
    book.images && book.images.length > 0
      ? book.images[0]
      : "https://via.placeholder.com/300x400?text=No+Image";

  const [isWishlisted, setIsWishlisted] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);


  const toggleWishlist = async (e) => {
    e.stopPropagation();
    try {
      if (isWishlisted) {
        await API.delete(`/wishlist/${book._id}`);
        setIsWishlisted(false);
      } else {
        await API.post(`/wishlist/${book._id}`);
        setIsWishlisted(true);
      }
    } catch (err) {
      console.error("Wishlist error", err);
    }
  };

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const { data } = await API.get("/wishlist");
        setIsWishlisted(
          data.wishlist?.some((b) => b._id.toString() === book._id.toString()),
        );
      } catch (err) {
        setIsWishlisted(false);
        console.log("Wishlist check failed");
      }
    };

    if (user?.role === "buyer") {
      checkWishlist();
    }
  }, [book._id, user]);

return (
  <>
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1">
      {/* Book Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <img
          src={imageUrl}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />

        <span className="absolute top-3 right-3 bg-indigo-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
          ₹{book.price}
        </span>

        {user?.role === "buyer" && !book.isSold && (
          <button
            onClick={toggleWishlist}
            className="absolute top-2 left-2 bg-white p-2 rounded-full shadow hover:scale-105 transition"
          >
            {isWishlisted !== null && (
              <Heart
                size={18}
                className={
                  isWishlisted
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400"
                }
              />
            )}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="font-bold text-lg text-gray-800 truncate">
          {book.title}
        </h2>

        <p className="text-sm font-bold text-gray-500 mt-1 truncate">
          by {book.author}
        </p>

        <p className="text-sm text-blue-900 mt-1 truncate">
          Type - {book.category}
        </p>

        <p className="text-l text-gray-500 mt-1 truncate">
          In {book.condition} condition
        </p>

        <div className="mt-3 h-px bg-gray-200" />

        {!book.isSold && user?.role === "buyer" && (
          <button
            onClick={() => setSelectedBook(book)}
            className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-semibold transition"
          >
            Buy
          </button>
        )}
      </div>
    </div>

    {/* ✅ MODAL RENDER */}
    {selectedBook && (
      <BuyBookModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    )}
  </>
);



};

export default BookCard;
