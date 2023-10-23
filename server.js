const express = require('express')

const  bodyParser=require('body-parser');
const user = require('./routes/user.routes');
 require('dotenv').config({});
require('./db')

const app = express();
const port = 3000; // Define the port you want to listen on

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/user', user);
app.get('/', (req, res) => {
  res.status(202).json("Hello "); // Respond with a simple message
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
