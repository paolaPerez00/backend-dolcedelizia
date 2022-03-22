require('dotenv').config();
const express = require('express');
const cors = require('cors');
//database connection
const app = express();

app.use(cors());

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(require('./routes/users'))
var puerto = proceso.env.PORT || 5000;
app.listen( puerto,"0.0.0.0", () => {
  console.log(`The server is running in port 5000`);
});