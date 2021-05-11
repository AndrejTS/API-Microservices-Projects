const express = require('express');
const URLModel = require('../models/URL')

const app = express();

let urlId = 1;

const httpRegex = /^(http|https)(:\/\/)/;

app.post('/api/shorturl/new', async (req, res) => {

  if (!httpRegex.test(req.body.url)) {
    return res.json({error: 'invalid url'})
  }

  let url = new URLModel({ 
    url: req.body.url, 
    short_url: urlId + ''
  });

  await url.save();

  res.json({
    original_url: req.body.url, 
    short_url: urlId + ''
  });

  urlId += 1;

});


app.get('/api/shorturl/:short', async (req, res) => {
  let url = await URLModel.find({ short_url: req.params.short });
  try {
    res.redirect(url[0].url);
  } catch (error) {
    res.send('Not found');
  }
});


module.exports = app;

