const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv =  require('dotenv');
const OpenAI =  require("openai");
const rateLimit = require('express-rate-limit');
const getTranscriptWithTimeFrame = require('./transcripts');

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 4000;

app.set('trust proxy', 2);
app.get('/ip', (request, response) => response.send(request.ip));

// Define rate limit options
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 8, // Max 8 requests per hour per IP
  message: 'Too many requests from this IP, please try again later.',
}); 

// Custom middleware function to handle rate limiting for app.post('/')
const postLimiter = (req, res, next) => {
  // Apply the rate limiter middleware only for app.post('/')
  if (req.originalUrl === '/' && req.method === 'POST') {
    limiter(req, res, next);
  } else {
    next();
  }
};

// Apply the custom middleware function to the desired route
app.use(postLimiter);  



app.get('/', (req, res, next) =>{
  res.json('its working')
})

app.post('/transcript', async (req, res, next) =>{
  const {url} = req.body
  const transcript = await getTranscriptWithTimeFrame(url)
  res.json(transcript)
})

app.post('/', async (req, res, next) => {

  /* const {message} = req.body
  const completion = await openai.chat.completions.create({
    messages: message,
    model: "gpt-3.5-turbo",
  });
  res.json(completion.choices[0].message.content) */
  res.json('demo chatpgt reply')


});



// Error handling middleware for rate limit exceeded
app.use((err, req, res, next) => {
  if (err instanceof rateLimit.RateLimitExceeded) {
    res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
  } else {
    next(err);
  }
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});




