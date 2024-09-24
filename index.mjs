import express from "express";

import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config'

import cors from 'cors'


const app = express();

app.use(express.json());
app.use(cors())

app.use( (req, res, next)=>{

  
  // res.setHeader('Access-Control-Allow-Origin', 'https://www.linkedin.com/*');

  
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  
  // res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  
  next();
});


app.post('/generate', async (req, res) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GENAI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        // const { messages } = req.body; 
        console.log(req.body.messages)
        const messages = req.body.messages;
    //     // Create the prompt
        const prompt = messages.map(msg => `${msg.sender}: ${msg.content}`).join('\n') + 
      `\n\n Above is the conversation between me and someone on bumble(datingSite),on my behalf generate what should be my next response,nothing extra should be retured. \n `;
      console.log(prompt)
      const result = await model.generateContent(prompt); // Use your language model function
      const response = result.response;
      const text = response.text();
        
      console.log("This is the result");
      console.log(text);
      res.json({ text }); 
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
});

app.post("/generatepost", async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GENAI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Get the prompt from the request body
    const request_data  = req.body.data;
    console.log(request_data);

    const prompt = " Goals : "+  request_data[0].goals +" Tone : "+ request_data[1].tone + " Prompt : " + request_data[3].prompt + 
      `\n\n  Above is given the Goals , tone , persona and prompt, Now create a linkedIn post from the above info and also include emojis if possible ,  i am adding some of my information , ${request_data[2].persona} also give the response in a formatted manner and dont give headings just give content without headings\n `;
      console.log(prompt)


    // Check if the prompt is provided
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // const result = await model.generateContent(prompt);
    model.generateContent(prompt).then(data=>{

      const response = data.response;
      const text = response.text();
      console.log(text);
      
      // Send the response after all the operations have completed
      res.json({ message: text });
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred in gemni code" });
  }
});
app.post("/generatepostforreact", async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GENAI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Get the prompt from the request body
    const request_data  = req.body.data;
    console.log(request_data);

    const prompt = " Goals : "+  request_data.goals +" Tone : "+ request_data.tone + " Prompt : " + request_data.prompt + 
      `\n\n  Above is given the Goals , tone , persona and prompt, Now create a linkedIn post from the above info and also include emojis if possible ,  i am adding some of my information ,  also give the response in a formatted manner and dont give headings just give content without headings\n `;
      console.log(prompt)


    // Check if the prompt is provided
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    // Send the response after all the operations have completed
    res.json({ message: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred in gemni code" });
  }
});

app.post("/generatecomment", async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GENAI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Get the prompt from the request body
    const request_data  = req.body.data;
    console.log(request_data);

    const prompt = " Goals : "+  request_data[0].goals +" Tone : "+ request_data[1].tone  + " Prompt : " + request_data[3].prompt + " PosterName: " + request_data[4].Admin + " postContent: " + request_data[5].Content + 
      `\n\n  Above is given the Goals,tone,persona,prompt,Post creator name and post content, Now create a linkedIn comment for above post ,postContent is linkedin post data .In my behalf reply in comment based on above criterias keep it short and formatted manner.Dont Return only the comment text without any additional context or instructions.without heading which are like this "**LinkedIn Comment:****Author:**", these must not be included\n `;
      // `\n\n  Above is given the Goals,tone,persona,prompt,Post creator name and post content, Now create a linkedIn comment for above post ,postContent is linkedin post data .In my behalf reply in comment based on above criterias keep it short and dont add anything extra ,  i am adding some of my information , this is my info ${request_data[2].persona} also give the response in a formatted manner and dont add name in any manner in the post and dont add tags with ** ** just comment reply\n `;
      console.log(prompt)


    // Check if the prompt is provided
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    // Send the response after all the operations have completed
    res.json({ message: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred in gemni code" });
  }
});
app.post("/generatemessage", async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GENAI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Get the prompt from the request body
    const request_data  = req.body;

    const prompt =
      " Goals : " +
      request_data[0].goals +
      " Tone : " +
      request_data[1].tone +
      " Prompt : " +
      request_data[3].prompt +
      " last message: " +
      request_data[4].Content +
      `\n\n  Above is given the Goals,tone,persona,prompt, and last message of the a user on linkedIn, Now create a linkedIn message from my behalf use my persona to mimic me and reply.keep it short and return only message nothing extra just message, i am adding some of my information , this is my info ${request_data[2].persona} also give the response in a formatted manner and  dont add name in any manner in the post make it without name\n `;
    console.log(prompt);



    // Check if the prompt is provided
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    // Send the response after all the operations have completed
    res.json({ message: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred in gemni code" });
  }
});

app.listen(process.env.PORT, () => {
    console.log(`Starting Server on Port ${process.env.PORT}`);
  });