const express = require('express');
const mysql = require('mysql2');
const app = express();
const authRoutes = require('./routes/authRoute')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const blogRoutes = require('./routes/blogRoute')




app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
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
app.use("/api/blog", blogRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
