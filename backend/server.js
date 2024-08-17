import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Set up multer with memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI("apikeyhere");
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const fileBuffer = req.file.buffer;
    const mimeType = req.file.mimetype;

    const image = {
      inlineData: {
        data: fileBuffer.toString('base64'),
        mimeType: mimeType,
      },
    };

    const prompt = req.body.prompt || 'Describe this image';

    const result = await model.generateContent([prompt, image]);
    const description = result.response.text();

    res.json({ description });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Failed to process the file' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
