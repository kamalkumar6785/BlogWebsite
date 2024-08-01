const express = require('express');
const mysql = require('mysql2');
const app = express();
const authRoutes = require('./routes/authRoute')
const cors = require('cors');
const cookieParser = require('cookie-parser');




app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies) to be sent
  }));
  

  
  const db = mysql.createConnection({
      host:"localhost",
      user:"root",
    password:"",
    database:"blog"

})

const port = 4000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
