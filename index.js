import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';
import cors from 'cors'


const app = express();


const port = 3000;

app.use(express.json());
app.use(cors())
dotenv.config(); 

app.post('/generate', async (req, res) => {
    try {
        const genAI = new GoogleGenerativeAI("AIzaSyCpNiz9zXnzI2XkL8U26xH0-VMwH9mg9ig");
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        // const { messages } = req.body; 
        console.log(req.body.messages)
        const messages = req.body.messages;
    //     // Create the prompt
        const prompt = messages.map(msg => `${msg.sender}: ${msg.content}`).join('\n') + 
      `\n\n Above is the conversation between me and someone on bumble(datingSite),on my behalf generate what should be my next response,nothing extra should be retured. \n `;
      console.log(prompt)
      const result = await model.generateContent(prompt); // Use your language model function
      const response = await result.response;
      const text = response.text();
        
      console.log("This is the result");
      console.log(text);
      res.json({ text }); 
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

app.listen(3000, () => {
    console.log(`Starting Server on Port ${port}`);
  });