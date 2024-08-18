  import express from 'express';
  import upload from '../middleware/multerConfig.js';
  import { generateContent } from '../services/googleGenerativeAIService.js';

  const router = express.Router();

  router.post('/upload', upload.single('file'), async (req, res) => {
    try {
      let description;

      // Check if the request has a file
      if (req.file) {
        const fileBuffer = req.file.buffer;
        const mimeType = req.file.mimetype;

        const image = {
          inlineData: {
            data: fileBuffer.toString('base64'),
            mimeType: mimeType,
          },
        };

        // Use a default prompt if none is provided
        const prompt = req.body.prompt || 'Describe this image';
        description = await generateContent(prompt, image);
      } 
      // Check if the request has a prompt
      else if (req.body.prompt) {
        const prompt = req.body.prompt;
        description = await generateContent(prompt);
      } 
      // If neither file nor prompt is provided
      else {
        res.status(400).json({ error: 'No image or prompt provided' });
        return;
      }

      res.json({ description });
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Failed to process the request' });
    }
  });

  export default router;
