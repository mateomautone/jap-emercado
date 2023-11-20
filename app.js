const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Use the auth routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`server levantado en ${port}`);
});