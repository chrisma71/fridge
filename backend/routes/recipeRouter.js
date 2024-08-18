// routes/recipeRouter.js
import express from 'express';
import Recipe from '../models/Recipe.js';

const router = express.Router();

router.post('/recipes', async (req, res) => {
  try {
    const { recipeId, title, ingredients, steps, calories, protein } = req.body;

    const recipe = new Recipe({
      recipeId,
      title,
      ingredients,
      steps,
      calories,
      protein
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/recipes/:recipeId', async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ recipeId: req.params.recipeId });
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.json(recipe);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
// Delete a recipe by ID
router.delete('/recipes/:recipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({ recipeId: req.params.recipeId });
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
