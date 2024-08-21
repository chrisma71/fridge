import React, { useState, useEffect } from 'react';
import Sidebar from '../goals&info/components/sidebar';
import Search from './assets/Vector.png';
import Import from './assets/Import.png'
import Cookies from 'js-cookie';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface Recipe {
  recipeId: string;
  title: string;
  ingredients: string[];
  steps: string[];
  calories: number;
  protein: number;
}

const RecipeMaker: React.FC = () => {
  const [userPreferences, setUserPreferences] = useState<any>(null);
  const [fridgeItems, setFridgeItems] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recipeUUID, setRecipeUUID] = useState<string>('');

  useEffect(() => {
    const userId = Cookies.get('userId');
    if (userId) {
      fetchUserData(userId);
    }
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await axios.get(`https://myfridge-0q77.onrender.com/api/users/${userId}`);
      const data = response.data;

      setUserPreferences({
        age: data.age,
        weight: data.weight,
        goals: data.goals,
        calorieGoal: data.calorieGoal,
        proteinGoal: data.proteinGoal,
        preferences: data.preferences
      });
      setFridgeItems(data.fridge);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const generateRecipe = async (preferences: any, fridge: string[], query: string) => {
    try {
      const prompt = `
        Create a recipe based on the following user data and fridge items. You do not need to use all the fridge items.:
        - Age: ${preferences.age}
        - Weight: ${preferences.weight}
        - Goals: ${preferences.goals}
        - Calorie Goal: ${preferences.calorieGoal}
        - Protein Goal: ${preferences.proteinGoal}
        - Preferences: ${preferences.preferences}
        - Fridge Items: ${fridge.join(', ')}
        - Search Query: ${query}

        The recipe should be designed for an intermediate cooking level.
        Only use the items listed in the fridge. Do not add any other ingredients even if it is to match other user preferences.
        Make sure to keep into account the preferences of the user - ie if the user cannot eat specific foods like vegan or halal, don't make a recipe with those ingredients. In this case, the user has these preferences: ${preferences.preferences}. If it's halal they can't eat pork, if vegan, no meats etc.
        Provide the recipe in the following format:

        {
          "title": "Recipe Title",
          "ingredients": "Ingredient 1; Ingredient 2; Ingredient 3",
          "steps": "Step 1; Step 2; Step 3",
          "calories": 500,
          "protein": 30
        }

        Ensure that ingredients are separated by semicolons and steps are separated by semicolons. Make sure there are multiple steps, and separate with semicolen.  Do not number the steps. Include estimated calories and protein. Finally, for the ingredients, make sure you show how much it is for each.
      `;

      const response = await axios.post('https://myfridge-0q77.onrender.com/api/upload', { prompt });
      const rawRecipeData = response.data.description;

      const jsonString = rawRecipeData
        .replace(/```json\n|\n```/g, '')
        .trim();

      const recipeData = JSON.parse(jsonString);

      const title = recipeData.title || 'Generated Recipe Title';
      const ingredientsText = recipeData.ingredients || '';
      const stepsText = recipeData.steps || '';
      const calories = recipeData.calories || 0;
      const protein = recipeData.protein || 0;

      const ingredients: string[] = ingredientsText
        .split(';')
        .map((ingredient: string) => ingredient.trim())
        .filter((ingredient: string) => ingredient.length > 0);

      const steps: string[] = stepsText
        .split(';')
        .map((step: string) => step.trim())
        .filter((step: string) => step.length > 0);

      const generatedRecipe = {
        recipeId: uuidv4(),  // Generate a unique ID for the recipe
        title,
        ingredients,
        steps,
        calories,
        protein
      };

      setRecipe(generatedRecipe);

      // Call function to store the generated recipe in the database
      await storeRecipe(generatedRecipe);

    } catch (error) {
      console.error('Error generating recipe:', error);
    }
  };

  // Function to store the generated recipe in the database
  const storeRecipe = async (recipe: Recipe) => {
    try {
      await axios.post('https://myfridge-0q77.onrender.com/api/recipes', recipe);
      console.log('Recipe stored successfully:', recipe);
    } catch (error) {
      console.error('Error storing recipe:', error);
      alert('Failed to store recipe.');
    }
  };

  // Function to import a recipe by its UUID
  const fetchRecipeById = async (recipeId: string) => {
    try {
      const response = await axios.get(`https://myfridge-0q77.onrender.com/api/recipes/${recipeId}`);
      setRecipe(response.data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      alert('Failed to fetch recipe. Please check the UUID.');
    }
  };

  const handleSearch = () => {
    if (searchQuery && userPreferences && fridgeItems.length > 0) {
      generateRecipe(userPreferences, fridgeItems, searchQuery);
    } else {
      alert('Please enter a search query and ensure user data is loaded.');
    }
  };

  const handleImportRecipe = () => {
    if (recipeUUID) {
      fetchRecipeById(recipeUUID);
    } else {
      alert('Please enter a recipe UUID to import.');
    }
  };

  const handleAddToTracker = async () => {
    const userId = Cookies.get('userId');
    if (userId && recipe) {
      try {
        // Optional: Add recipe metadata to the user's nutrition tracker
        await axios.post(`https://myfridge-0q77.onrender.com/api/users/${userId}/meals`, {
          name: recipe.title,
          calories: recipe.calories,
          protein: recipe.protein
        });

        alert('Recipe added to Nutrition Tracker successfully.');
      } catch (error) {
        console.error('Error adding recipe to tracker:', error);
        alert('Failed to add recipe to Nutrition Tracker.');
      }
    } else {
      alert('No recipe to add or user not logged in.');
    }
  };

  return (
    <div className="flex bg-gradient-to-tr from-[#009B96] to-[#9BF7AD] min-h-screen w-screen font-mali">
      <Sidebar />
      <div className="flex-1 p-8 flex flex-col">
        {/* Main Heading */}
        <div className='flex flex-row space-x-16'>
          {/* Top Section: Search and Settings */}
          <div className="w-full bg-white rounded-lg shadow-lg p-6 mb-8 flex justify-between items-center space-x-4">
            {/* Search Bar with Button Inside */}
            <div className="flex flex-1 items-center relative">
              <input
                type="text"
                placeholder="Make a Recipe for..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 pr-12 bg-[#D9D9D9]"
              />
              <div
                className="flex flex-row space-x-2 cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-4 py-2 border-l border-l-[#9B9B9B]"
                onClick={handleSearch}
              >
                <h3 className='text-[#8C8C8C]'>Search</h3>
                <img src={Search} alt="Search Icon" className='w-6 object-contain' />
              </div>
            </div>

            <div className="flex flex-1 items-center relative border-2">
              <input
                type="text"
                placeholder="Enter Recipe UUID to Import"
                value={recipeUUID}
                onChange={(e) => setRecipeUUID(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 pr-12 bg-[#D9D9D9]"
              />
              <div
                className="flex flex-row space-x-2 cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-4 py-2 border-l border-l-[#9B9B9B]"
                onClick={handleImportRecipe}
              >
                <h3 className='text-[#8C8C8C]'>Import</h3>
                <img src={Import} alt="Search Icon" className='w-6 object-contain' />

              </div>
            </div>
          </div>
        </div>

        {/* Import Recipe Section */}

        {/* Recipe Section */}
        {recipe && (
          <div className="w-full bg-white rounded-lg shadow-lg p-6 mb-8 flex flex-col">
            <div className='w-full flex flex-row justify-between'>
              <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>
              <h2 className='text-right'>{recipe.recipeId}</h2> {/* Displaying Recipe ID */}
            </div>
            <div className="grid grid-cols-2 gap-8">
              {/* Ingredients */}
              <div className='flex flex-col'>
                <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                <ul className="list-disc pl-5 space-y-2 bg-[#D9D9D9] p-4 rounded-lg">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div className='flex flex-col'>
                <h3 className="text-xl font-semibold mb-4">Steps</h3>
                <ol className="list-decimal pl-5 space-y-2 bg-[#D9D9D9] p-4 rounded-lg">
                  {recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Section: Add to Nutrition Tracker */}
        <div className="flex justify-center mt-auto">
          <button
            className="bg-blue-500 text-white px-8 py-3 rounded-lg"
            onClick={handleAddToTracker}
          >
            Add to Nutrition Tracker
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeMaker;
