const mongoose = require('mongoose');
const Book = require('../models/Book');
const asyncHandler = require('../utils/asyncHandler');

const createBook = asyncHandler(async (req, res) => {
  const { title, author, category, status } = req.body;

  if (!title || !author || !category) {
    return res.status(400).json({
      success: false,
      message: 'Please provide title, author and category',
    });
  }

  const book = await Book.create({
    title,
    author,
    category,
    status: status || 'Available',
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: book,
  });
});

const getBooks = asyncHandler(async (req, res) => {
  const { search } = req.query;

  let query = {};

  if (search) {
    const searchRegex = new RegExp(search, 'i');
    query = {
      $or: [{ title: searchRegex }, { author: searchRegex }],
    };
  }

  const books = await Book.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
  });
});

const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: 'Resource not found - invalid ID',
    });
  }

  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found',
    });
  }

  const { title, author, category, status } = req.body;

  book.title = title || book.title;
  book.author = author || book.author;
  book.category = category || book.category;
  book.status = status || book.status;

  const updatedBook = await book.save();

  res.status(200).json({
    success: true,
    data: updatedBook,
  });
});

const updateBookStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: 'Resource not found - invalid ID',
    });
  }

  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found',
    });
  }

  book.status = book.status === 'Available' ? 'Issued' : 'Available';

  const updatedBook = await book.save();

  res.status(200).json({
    success: true,
    data: updatedBook,
  });
});

const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: 'Resource not found - invalid ID',
    });
  }

  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found',
    });
  }

  await book.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Book deleted successfully',
    deletedId: id,
  });
});

module.exports = {
  createBook,
  getBooks,
  updateBook,
  updateBookStatus,
  deleteBook,
};
