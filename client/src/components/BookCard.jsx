function BookCard({ book, onEdit, onDelete, onToggleStatus, loading }) {
  const isAvailable = book.status === 'Available';

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5 flex flex-col">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">by {book.author}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
            {book.category}
          </span>
          <span
            className={`px-2.5 py-1 text-xs font-medium rounded-full ${
              isAvailable
                ? 'bg-green-100 text-green-700'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            {book.status}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
        <button
          onClick={() => onToggleStatus(book)}
          disabled={loading}
          className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors disabled:opacity-50 ${
            isAvailable
              ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          Mark as {isAvailable ? 'Issued' : 'Available'}
        </button>
        <button
          onClick={() => onEdit(book)}
          className="px-3 py-1.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(book)}
          disabled={loading}
          className="px-3 py-1.5 text-xs font-medium bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookCard;
