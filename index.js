const express = require('express');

var bodyParser = require('body-parser');
const games = require('./routers/games');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(games);

app.get('/', (req, res) => {
  res.send('Welcome to VGDB');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
