const express = require('express');
const multer = require('multer');


const upload = multer();

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  res.json({
    name: req.file.originalname, 
    type: req.file.mimetype,
    size: req.file.size
  });
});

app.listen(5555, () => {
  console.log('Your app is listening on port 5555')
});

