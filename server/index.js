const express = require('express');
const mysql = require('mysql2');
const app = express();


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"blog"

})

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

    