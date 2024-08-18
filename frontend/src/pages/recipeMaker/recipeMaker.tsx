import React, { useState, useEffect } from 'react';
import Sidebar from '../goals&info/components/sidebar';
import Search from './assets/Vector.png';
import Cookies from 'js-cookie';
import axios from 'axios';

interface Recipe {
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

  useEffect(() => {
    const userId = Cookies.get('userId');
    if (userId) {
      fetchUserData(userId);
    }
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
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
        
        Ensure that ingredients are separated by semicolons and steps are separated by semicolons. Do not number the steps. Include estimated calories and protein. Finally, for the ingredients, make sure you show how much it is for each.
      `;

      const response = await axios.post('http://localhost:5000/api/upload', { prompt });
      const rawRecipeData = response.data.description;
      
      console.log('Raw response data:', rawRecipeData);
      
      const jsonString = rawRecipeData
        .replace(/```json\n|\n```/g, '')
        .trim();
      
      const recipeData = JSON.parse(jsonString);
      
      console.log('Parsed recipe data:', recipeData);
      
      const title = recipeData.title || 'Generated Recipe Title';
      const ingredientsText = recipeData.ingredients || '';
      const stepsText = recipeData.steps || '';
      const calories = recipeData.calories || 0;
      const protein = recipeData.protein || 0;

      console.log(calories);
      console.log(protein);

      const ingredients: string[] = ingredientsText
        .split(';')
        .map((ingredient: string) => ingredient.trim())
        .filter((ingredient: string) => ingredient.length > 0);
      
      const steps: string[] = stepsText
        .split(';')
        .map((step: string) => step.trim())
        .filter((step: string) => step.length > 0);
      
      setRecipe({
        title,
        ingredients,
        steps,
        calories,
        protein
      });
    } catch (error) {
      console.error('Error generating recipe:', error);
    }
  };

  const handleSearch = () => {
    if (searchQuery && userPreferences && fridgeItems.length > 0) {
      generateRecipe(userPreferences, fridgeItems, searchQuery);
    } else {
      alert('Please enter a search query and ensure user data is loaded.');
    }
  };

  const handleAddToTracker = async () => {
    const userId = Cookies.get('userId');
    if (userId && recipe) {
      try {
        await axios.post(`http://localhost:5000/api/users/${userId}/meals`, {
          name: recipe.title,
          calories: recipe.calories,
          protein: recipe.protein
        });
        alert('Recipe added to Nutrition Tracker!');
      } catch (error) {
        console.error('Error adding recipe to tracker:', error);
        alert('Failed to add recipe to Nutrition Tracker.');
      }
    } else {
      alert('No recipe to add or user not logged in.');
    }
  };

  return (
    <div className="flex bg-gradient-to-tr from-[#9C9AF3] to-[#FDD1E2] min-h-screen w-screen font-mali">
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
                className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-4 py-2 border-l border-l-[#9B9B9B]"
                onClick={handleSearch}
              >
                <img src={Search} alt="Search Icon" className='w-6 object-contain' />
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Section */}
        {recipe && (
          <div className="w-full bg-white rounded-lg shadow-lg p-6 mb-8 flex flex-col">
            <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>
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
