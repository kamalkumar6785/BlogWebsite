const express = require('express');
const mysql = require('mysql2');
const app = express();
const authRoutes = require('./routes/authRoute')
const blogRoutes = require('./routes/blogRoute')
const likeRoutes = require('./routes/likeRoutes')
const cors = require('cors');
const cookieParser = require('cookie-parser');


app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
  }));
  

const port = 4000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/like", likeRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
