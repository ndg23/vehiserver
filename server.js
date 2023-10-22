const express = require('express')

const  bodyParser=require('body-parser');

 require('dotenv').config({});
require('./src/db')

const app = express();
const port = 3000; // Define the port you want to listen on

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello, World!'); // Respond with a simple message
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
