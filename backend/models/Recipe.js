// models/Recipe.js
import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  recipeId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  steps: { type: [String], required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

export default Recipe;
