import express from 'express';
import User from '../models/User.js'; 

const router = express.Router();

router.get('/users/:userId/meals', async (req, res) => {
    try {
      const user = await User.findOne({ userID: req.params.userId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ meals: user.meals });
    } catch (error) {
      console.error('Error fetching meals:', error);
      res.status(500).json({ error: error.message });
    }
  });

router.post('/users/:userId/meals', async (req, res) => {
    try {
        const user = await User.findOne({ userID: req.params.userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add the meal to the user's meals array
        user.meals.push({
            name: req.body.name,
            calories: req.body.calories,
            protein: req.body.protein
        });

        // Save the user document
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error('Error adding meal:', error);
        res.status(400).json({ error: error.message });
    }
});

router.delete('/users/:userId/meals/clear', async (req, res) => {
  try {
      console.log(`Received request to clear meals for userID: ${req.params.userId}`);
      
      const user = await User.findOne({ userID: req.params.userId });
      if (!user) {
          console.log('User not found with userID:', req.params.userId);
          return res.status(404).json({ error: 'User not found' });
      }

      // Clear the meals array
      user.meals = [];

      // Save the updated user document
      await user.save();

      console.log('Meals cleared successfully for userID:', req.params.userId);
      res.status(200).json({ message: 'Meals cleared successfully', meals: user.meals });
  } catch (error) {
      console.error('Error clearing meals:', error);
      res.status(500).json({ error: error.message });
  }
});


router.post('/users/:userId/create', async (req, res) => {
    try {
        let user = await User.findOne({ userID: req.params.userId });

        if (!user) {
            // Create a new user with default values
            user = new User({
                userID: req.params.userId,
                name: 'Default Name',
                age: 0,
                weight: 0,
                goals: 'Default Goals',
                calorieGoal: 0,
                proteinGoal: 0,
                preferences: 'Default Preferences',
                createdAt: new Date(),
                meals: [], 
                fridge: [], 
            });

            console.log("UserCreated")

            // Save the new user
            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ error: error.message });
    }
});

// routes/userRoutes.js
router.post('/users/:userId/goals', async (req, res) => {
    try {
        const user = await User.findOne({ userID: req.params.userId }); // Use userID field
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user's details
        user.name = req.body.name || user.name;
        user.age = req.body.age || user.age;
        user.weight = req.body.weight || user.weight;
        user.preferences = req.body.preferences || user.preferences;
        user.calorieGoal = req.body.calorieGoal || user.calorieGoal;
        user.proteinGoal = req.body.proteinGoal || user.proteinGoal;
        user.goals = req.body.goals || user.goals;

        await user.save();
        res.json(user);
    } catch (error) {
        console.error('Error saving goals:', error);
        res.status(400).json({ error: error.message });
    }
});
  

router.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/users/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userID: req.params.userId }); // Query by userID instead of _id
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: error.message });
  }
});


router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/users/:userId/fridge', async (req, res) => {
  try {
    const user = await User.findOne({ userID: req.params.userId }); // Use userID field
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.fridge.push(req.body.item);
    await user.save();
    res.json(user.fridge);
  } catch (error) {
    console.error('Error adding item to fridge:', error);
    res.status(400).json({ error: error.message });
  }
});

router.get('/users/:userId/fridge', async (req, res) => {
  try {
    const user = await User.findOne({ userID: req.params.userId }); // Use userID field
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ fridge: user.fridge });
  } catch (error) {
    console.error('Error fetching fridge items:', error);
    res.status(400).json({ error: error.message });
  }
});

router.delete('/users/:userId/fridge/:item', async (req, res) => {
  try {
    const user = await User.findOne({ userID: req.params.userId }); // Use userID field
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.fridge = user.fridge.filter(item => item !== req.params.item);
    await user.save();
    res.json(user.fridge);
  } catch (error) {
    console.error('Error removing item from fridge:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
