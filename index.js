require('dotenv').config();
const express = require('express');
const cors = require('cors');
//database connection
const app = express();

app.use(cors());

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(require('./routes/user'))

app.listen( 5000, () => {
  console.log(`The server is running in port 5000`);
});