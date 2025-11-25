const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/userRoutes');
const sequelize = require("./config/database");
const categoryRoutes = require('./routes/categoryRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
