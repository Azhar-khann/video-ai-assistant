const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
import dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 4000;


app.post('/', async (req, res, next) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You will help understand and clarify any content from video transcript." },
        {role: "user", content: transcript},
        {role: "user", content: "Could not understand why the terms were 2^3"}
    ],
    model: "gpt-3.5-turbo",
  });
  res.json({
    data: completion.choices[0]
  })

});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});




