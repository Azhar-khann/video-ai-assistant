const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 4000;


app.get('/', (req, res, next) => {

  res.send('hello world')
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});