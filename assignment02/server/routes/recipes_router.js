const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// GET all recipes
router.get('/', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

// POST add recipe
router.post('/', async (req, res) => {
  const newRecipe = new Recipe(req.body);
  const savedRecipe = await newRecipe.save();
  res.json(savedRecipe);
});

// GET recipe by ID
router.get('/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.json(recipe);
});

// PUT update recipe by ID
router.put('/:id', async (req, res) => {
  const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE recipe by ID
router.delete('/:id', async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
