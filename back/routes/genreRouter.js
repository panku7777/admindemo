// routes/genres.js

const express = require('express');
const router = express.Router();
const Genre = require('../model/genre'); // Assuming your model file is named 'genre.js'

// Route to handle adding a new genre
router.post('/add', async (req, res) => {
  try {
    const newGenre = new Genre({ genre: req.body.genre });
    const savedGenre = await newGenre.save();
    res.status(201).json(savedGenre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
    try {
      const genres = await Genre.find();
      res.json(genres);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/getgenrebyid', async (req, res) => {
    const genreId = req.body.genreId;
  
    try {
      const genre = await Genre.findById(genreId);
  
      if (!genre) {
        return res.status(404).send('Genre not found');
      }
  
      res.json(genre);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Route to update a genre
  router.put('/updategenre', async (req, res) => {
    const genreId = req.body.genreId;
    const updatedGenreDetails = req.body;
  
    try {
      const updatedGenre = await Genre.findByIdAndUpdate(
        genreId,
        { $set: updatedGenreDetails },
        { new: true } // Return the updated document
      );
  
      if (!updatedGenre) {
        return res.status(404).send('Genre not found');
      }
  
      res.json(updatedGenre);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;
