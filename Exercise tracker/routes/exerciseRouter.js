const express = require('express');
const User = require('../models/user')

const app = express();

app.post('/api/exercise/new-user', async (req,res) => {

  let newUser = new User({ 
    username: req.body.username, 
    exercises: []
  });

  await newUser.save();

  res.json({
    _id: newUser._id,
    username: newUser.username
  });

});

app.get('/api/exercise/users', async (req, res) => {
  let users = await User.find();
  res.json(users);
});

app.post('/api/exercise/add', async (req, res) => {
  let user = await User.findById(req.body.userId);
  let date;
  if (req.body.date) {
    date = new Date(req.body.date).toDateString();
  } else {
    date = new Date().toDateString();
  }

  let exercise = {
    description: req.body.description, 
    duration: parseInt(req.body.duration), 
    date: date
  };
  user.exercises.push(exercise);
  await user.save();

  res.json({
    _id: user._id,
    username: user.username,
    description: exercise.description, 
    duration: exercise.duration, 
    date: exercise.date
  });

});

app.get('/api/exercise/log', async (req, res) => {
  let user = await User.findById(req.query.userId);
  let exercises = user.exercises;
  if (req.query.from) {
    exercises = exercises.filter(x => {
      exerDate = new Date(x.date);
      fromDate = new Date(req.query.from);
      fromDate.setHours(0);
      return exerDate >= fromDate;
    });
  }
  if (req.query.to) {
    exercises = exercises.filter(x => {
      exerDate = new Date(x.date);
      toDate = new Date(req.query.to);
      toDate.setHours(0);
      return exerDate <= toDate;
    });
  }
  if (req.query.limit) {
    exercises = exercises.filter((x, i) => i < parseInt(req.query.limit));
  }
  res.json({
    count: exercises.length,
    _id: user._id,
    username: user.username,
    log: exercises
  });
});

module.exports = app;

