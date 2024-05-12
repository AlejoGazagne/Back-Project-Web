const express = require('express');
const cors = require('cors');

const app = express();
const port = 3010;

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const Prueba = require('./router/home');
//const user = require('./router/user');
const Seller = require('./router/seller/routerSeller');

app.use(Prueba)
app.use(Seller)

app.use((req, res) => {
    res.status(404).send('Not found');
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});