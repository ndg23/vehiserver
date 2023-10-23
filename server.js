const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const user = require('./routes/user.routes');
const report = require('./routes/report.routes');
const auth = require("./routes/auth.routes")
require('dotenv').config({});
require('./db')

const app = express();
const port = 3000; // Define the port you want to listen on

const corsOptions = {
  origin: true,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
  exposedHeaders: ['*'],
  headers: 'Access-Control-Allow-Headers',
  methods: ['*'],
  preflightContinue: false
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/user', user);

app.use('/api/report', report);
app.use('/api/auth', auth);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
