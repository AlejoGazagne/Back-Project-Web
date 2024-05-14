const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3010;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const index = require('./router/index');

app.use(index)

app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});