

const BookCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Image placeholder */}
      <div className="bg-gray-300 rounded-lg h-44 w-full mb-3"></div>

      {/* Text placeholders */}
      <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/3"></div>
    </div>
  )
}

export default BookCardSkeleton

