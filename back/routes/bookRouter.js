// routes/books.js

const express = require('express');
const router = express.Router();
const Book = require('../model/book'); // Assuming your model file is named 'book.js'

// Route to handle adding a new book
router.post('/addbook', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getallbooks', async (req, res) => {
  try {
    const allBooks = await Book.find();
    res.status(200).json(allBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.put('/updatebook/:id', async (req, res) => {
  const bookId = req.params.id;
  const updatedBookDetails = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { $set: updatedBookDetails },
      { new: true } // Return the updated document
    );

    if (!updatedBook) {
      return res.status(404).send('Book not found');
    }

    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});




router.post('/getbookbyid', async (req, res) => {
  const bookId = req.body.bookid;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).send('Book not found');
    }

    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = router;
