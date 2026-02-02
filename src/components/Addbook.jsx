import React, { useState } from "react";
import { BookOpen, Upload, X, Image } from "lucide-react";
import API from "../api/axios";
import { toast } from "react-toastify";

const Addbook = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    category: "",
    condition: "",
    price: "",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImages(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      Object.entries(bookData).forEach(([key, value]) =>
        formData.append(key, value)
      );

      images.forEach((img) => formData.append("images", img));

      await API.post("/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Book added successfully");

      setBookData({
        title: "",
        author: "",
        price: "",
        condition: "",
        category: "",
      });
      setImages([]);
      setPreviews([]);
    } catch (error) {
      toast.error("Failed to add book");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-400 flex items-center justify-center px-4 py-8 overflow-x-hidden">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg">

        {/* HEADER */}
        <div className="flex items-center gap-3 px-4 sm:px-8 py-5 sm:py-6 border-b">
          <BookOpen className="text-indigo-600" size={26} />
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Add New Book
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-6">

          {/* INPUT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <Input
              label="Book Title"
              name="title"
              value={bookData.title}
              onChange={handleChange}
            />
            <Input
              label="Author"
              name="author"
              value={bookData.author}
              onChange={handleChange}
            />
            <Input
              label="Price (₹)"
              type="number"
              name="price"
              value={bookData.price}
              onChange={handleChange}
            />
            <Input
              label="Category"
              name="category"
              value={bookData.category}
              onChange={handleChange}
            />

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Condition
              </label>
              <select
                name="condition"
                value={bookData.condition}
                onChange={handleChange}
                className="w-full rounded-lg border border-indigo-500 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">Select condition</option>
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="used">Used</option>
              </select>
            </div>
          </div>

          {/* IMAGE UPLOAD */}
          <div className="border-2 border-dashed rounded-xl p-4 sm:p-6 bg-gray-50">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="images"
            />

            <label
              htmlFor="images"
              className="flex flex-col items-center justify-center gap-2 cursor-pointer text-gray-600 text-center"
            >
              <Image size={34} />
              <span className="font-medium">
                Click to upload book images
              </span>
              <span className="text-sm text-gray-400">
                Max 5 images • JPG / PNG
              </span>
            </label>

            {previews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mt-5">
                {previews.map((src, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={src}
                      alt="preview"
                      className="h-24 sm:h-28 w-full object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={uploading}
            className="w-full py-3 rounded-xl text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
    />
  </div>
);

export default Addbook;
