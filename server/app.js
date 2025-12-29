require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const occasionRoutes = require('./routes/occasionRoutes');
const branchRoutes = require('./routes/branchRoutes');
const genderRoutes = require('./routes/genderRoutes');
const cookiesRoutes = require('./routes/cookiesRoutes');
const iceCreamRoutes = require('./routes/iceCreamRoutes');
const cakeRoutes = require('./routes/cakeRoutes');


const app = express();

// CORS setup
const allowedOrigins = [
  "http://localhost:3000",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/occasions', occasionRoutes);
app.use('/branches', branchRoutes);
app.use('/genders', genderRoutes);
app.use('/cookies', cookiesRoutes);
app.use('/icecreams', iceCreamRoutes);
app.use('/cakes', cakeRoutes);

// Database and server setup
const sequelize = require("./config/database");
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
