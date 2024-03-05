const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv =  require('dotenv');
const OpenAI =  require("openai");
const getTranscriptWithTimeFrame = require('./transcripts');

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 4000;


app.get('/', (req, res, next) =>{
  res.json('its working')
})

app.post('/transcript', async (req, res, next) =>{
  const {url} = req.body
  const transcript = await getTranscriptWithTimeFrame(url)
  res.json(transcript)
})

app.post('/', async (req, res, next) => {

  const {message} = req.body
  const completion = await openai.chat.completions.create({
    messages: message,
    model: "gpt-3.5-turbo",
  });
  res.json(completion.choices[0].message.content)

  /* const completion = await openai.chat.completions.create({
    messages: message,
    model: "gpt-3.5-turbo",
  });
  res.json({
    data: completion.choices[0]
  }) */

});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});




