const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const fileMetadata = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };

  res.json(fileMetadata);
});

const port = 8080;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port + '.');
});
