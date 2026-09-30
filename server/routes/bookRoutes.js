const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createBook,
  getBooks,
  updateBook,
  updateBookStatus,
  deleteBook,
} = require('../controllers/bookController');

const router = express.Router();

router.route('/').post(protect, createBook).get(getBooks);

router.route('/:id').put(protect, updateBook).delete(protect, deleteBook);

router.patch('/:id/status', protect, updateBookStatus);

module.exports = router;
