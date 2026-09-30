import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import SearchBar from '../components/SearchBar';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';
import Toast from '../components/Toast';

function BookDashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const fetchBooks = useCallback(async (search = '') => {
    setLoading(true);
    try {
      const params = search ? { search } : {};
      const response = await api.get('/books', { params });
      setBooks(response.data.data);
    } catch (error) {
      showToast('Failed to fetch books', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchBooks(term);
  };

  const handleAddBook = () => {
    setEditingBook(null);
    setIsFormOpen(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setActionLoading(true);
    try {
      if (editingBook) {
        const response = await api.put(`/books/${editingBook._id}`, formData);
        setBooks((prev) =>
          prev.map((b) => (b._id === editingBook._id ? response.data.data : b))
        );
        showToast('Book updated successfully!');
      } else {
        const response = await api.post('/books', formData);
        setBooks((prev) => [response.data.data, ...prev]);
        showToast('Book added successfully!');
      }
      setIsFormOpen(false);
      setEditingBook(null);
    } catch (error) {
      showToast(
        error.response?.data?.message || 'Operation failed',
        'error'
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async (book) => {
    setActionLoading(true);
    try {
      const response = await api.patch(`/books/${book._id}/status`);
      setBooks((prev) =>
        prev.map((b) => (b._id === book._id ? response.data.data : b))
      );
      showToast(
        `Book marked as ${response.data.data.status}`
      );
    } catch (error) {
      showToast('Failed to update status', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteRequest = (book) => {
    setDeleteConfirm(book);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;

    setActionLoading(true);
    try {
      await api.delete(`/books/${deleteConfirm._id}`);
      setBooks((prev) => prev.filter((b) => b._id !== deleteConfirm._id));
      showToast('Book deleted successfully!');
      setDeleteConfirm(null);
    } catch (error) {
      showToast(
        error.response?.data?.message || 'Failed to delete book',
        'error'
      );
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Book Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your book collection
          </p>
        </div>
        <button
          onClick={handleAddBook}
          className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          + Add Book
        </button>
      </div>

      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      {searchTerm && (
        <p className="text-sm text-gray-500 mb-4">
          Showing results for "{searchTerm}" — {books.length}{' '}
          {books.length === 1 ? 'book' : 'books'} found
        </p>
      )}

      <BookList
        books={books}
        loading={loading}
        onEdit={handleEditBook}
        onDelete={handleDeleteRequest}
        onToggleStatus={handleToggleStatus}
      />

      <BookForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingBook(null);
        }}
        onSubmit={handleFormSubmit}
        book={editingBook}
        loading={actionLoading}
      />

      {deleteConfirm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setDeleteConfirm(null)}
          ></div>
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Delete Book
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete "{deleteConfirm.title}"? This
              action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={actionLoading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {actionLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default BookDashboard;
