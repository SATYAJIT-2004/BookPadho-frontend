import React, { useEffect, useState } from 'react'
import API from '../api/axios'
import BookCard from './BookCard'
import { SearchIcon, SlidersHorizontal } from 'lucide-react'
import Footer from './Footer'

const Home = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [Tempfilters, setTempFilters] = useState({
    keyword: '',
    category: '',
    condition: '',
    minPrice: '',
    maxPrice: '',
  })
  const [filters, setFilters] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const { data } = await API.get('/books', { params: filters })
        setBooks(data.books || [])
      } catch (err) {
        setError(err.message || 'Failed to fetch books')
        setBooks([])
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [filters])

  if (loading) return <div>Loading books...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="min-h-screen from bg-indigo-400 to-indigo-700 px-4 sm:px-6 py-8 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center mb-12 md:mb-16">
        
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-snug md:leading-tight">
            Keep reading Keep smiling...
          </h1>

          <p className="text-gray-800 mt-4 max-w-md">
            Don't let the story end on the shelf.
            Discover your next favorite book and bring new stories home today.
          </p>

          <button className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition">
            Explore →
          </button>
        </div>

        {/* RIGHT INFO PANEL */}
        <div className="bg-[#f3efe4] rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 max-w-md mx-auto md:max-w-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white font-semibold text-sm">
              GR
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 leading-tight">
                George R. R. Martin
              </h4>
              <p className="text-sm text-gray-500">Author</p>
            </div>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed">
            <span className="italic font-medium text-gray-900">
              Fire and Blood
            </span>{' '}
            explores the rise of House Targaryen, from the conquest of Westeros to the
            devastating civil war known as the Dance of the Dragons.
          </p>
        </div>
      </div>

      {/* SEARCH BUTTON */}
      <div className="fixed top-20 sm:top-24 right-4 sm:right-6 z-40">
        {!showSearch ? (
          <button
            onClick={() => setShowSearch(true)}
            className="bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg"
          >
            <SearchIcon className="size-6" />
          </button>
        ) : (
          <div className="flex items-center bg-white rounded-full shadow-xl overflow-hidden">
            <input
              type="text"
              autoFocus
              placeholder="Search book name, author..."
              className="px-4 py-2 w-48 sm:w-64 outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && setShowSearch(false)}
            />
            <button
              className="bg-gray-900 text-white px-4 py-2"
              onClick={() => {
                const cleanedFilters = Object.fromEntries(
                  Object.entries({
                    ...filters,
                    keyword: searchTerm.trim(),
                  }).filter(([_, value]) => value !== '')
                )
                setFilters(cleanedFilters)
                setShowSearch(false)
              }}
            >
              <SearchIcon className="size-5" />
            </button>
          </div>
        )}
      </div>

      {/* FILTER BUTTON */}
      <div className="fixed top-20 sm:top-24 left-4 sm:left-6 z-40">
        {!showFilters && (
          <button
            onClick={() => setShowFilters(true)}
            className="bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg"
          >
            <SlidersHorizontal className="size-6" />
          </button>
        )}
      </div>

      {/* FILTER PANEL */}
      {showFilters && (
        <div className="fixed top-20 sm:top-24 left-4 sm:left-6 z-50 w-[90vw] max-w-xs sm:w-72">
          <div className="bg-white p-4 rounded-xl shadow-xl relative">
            <button
              onClick={() => setShowFilters(false)}
              className="absolute top-2 right-2 text-gray-400"
            >
              ✕
            </button>

            <h3 className="text-base font-semibold mb-3">Filters</h3>

            <input
              type="text"
              placeholder="Category"
              className="border p-2 rounded w-full mb-3 text-sm"
              value={Tempfilters.category}
              onChange={(e) =>
                setTempFilters({ ...Tempfilters, category: e.target.value })
              }
            />

            <select
              className="border p-2 rounded w-full mb-3 text-sm"
              value={Tempfilters.condition}
              onChange={(e) =>
                setTempFilters({ ...Tempfilters, condition: e.target.value })
              }
            >
              <option value="">Any</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>

            <div className="flex gap-2 mb-4">
              <input
                type="number"
                placeholder="₹ Min"
                className="border p-2 rounded w-full text-sm"
                value={Tempfilters.minPrice}
                onChange={(e) =>
                  setTempFilters({ ...Tempfilters, minPrice: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="₹ Max"
                className="border p-2 rounded w-full text-sm"
                value={Tempfilters.maxPrice}
                onChange={(e) =>
                  setTempFilters({ ...Tempfilters, maxPrice: e.target.value })
                }
              />
            </div>

            <button
              className="bg-gray-900 text-white w-full py-2 rounded text-sm"
              onClick={() => {
                setFilters(Tempfilters)
                setShowFilters(false)
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* BOOK GRID */}
      <div className="max-w-7xl mx-auto mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  )
}

export default Home
