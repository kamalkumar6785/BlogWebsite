const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: 'test',
  database: "blogwebsite"
});



module.exports = {
  db
};
