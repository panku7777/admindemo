// routes/languages.js

const express = require('express');
const router = express.Router();
const Language = require('../model/language');

// Get all languages
router.get('/', async (req, res) => {
  try {
    const languages = await Language.find();
    res.json(languages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new language
router.post('/add', async (req, res) => {
  try {
    const { language } = req.body;
    if (!language) {
      return res.status(400).json({ error: 'Language is required' });
    }

    const existingLanguage = await Language.findOne({ language });
    if (existingLanguage) {
      return res.status(400).json({ error: 'Language already exists' });
    }

    const newLanguage = new Language({ language });
    const savedLanguage = await newLanguage.save();

    res.status(201).json(savedLanguage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/updatelanguage/:id', async (req, res) => {
  const languageId = req.params.id;
  const updatedLanguageDetails = req.body;

  try {
    const updatedLanguage = await Language.findByIdAndUpdate(
      languageId,
      { $set: updatedLanguageDetails },
      { new: true } // Return the updated document
    );

    if (!updatedLanguage) {
      return res.status(404).send('Language not found');
    }

    res.json(updatedLanguage);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get language by ID
router.post('/getlanguagebyid', async (req, res) => {
  const languageId = req.body.languageId;

  try {
    const language = await Language.findById(languageId);

    if (!language) {
      return res.status(404).send('Language not found');
    }

    res.json(language);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
