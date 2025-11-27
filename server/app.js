require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require("./config/database");

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const occasionRoutes = require('./routes/occasionRoutes');
const genderRoutes = require('./routes/genderRoutes');
const cakesizesRoutes = require('./routes/cakesizesRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/occasions', occasionRoutes);
app.use('/genders', genderRoutes);
app.use('/cakesizes', cakesizesRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
