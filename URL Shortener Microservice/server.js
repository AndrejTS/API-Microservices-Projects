require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const shorturlRouter = require('./routes/shorturlRoutes')

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to database');
});

const app = express();

app.use(express.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.use(shorturlRouter);

// listen for requests :)
app.listen(5555, () => {
  console.log('Your app is listening on port 5555')
});
