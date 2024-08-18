import express from 'express';
import cors from 'cors';
import connectDB from './db.js'; 
import uploadRoute from './routes/uploadRoute.js';
import userRoutes from './routes/userRoutes.js';
import recipeRouter from './routes/recipeRouter.js';
import cookieParser from 'cookie-parser'; 
import createUserId from './middleware/createUserID.js';

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser()); 
app.use(createUserId);

app.get('/api/user-id', (req, res) => {
    res.json({ userId: req.userId });
});

app.use('/api', uploadRoute);
app.use('/api', userRoutes);
app.use('/api', recipeRouter);

app.use('/api/user-id', createUserId);  // Only apply for this route
app.use('/api/users/:userId/create', createUserId); // Apply for user creation

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
