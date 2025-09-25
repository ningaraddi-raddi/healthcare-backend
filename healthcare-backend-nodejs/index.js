const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./src/models');

const authRoutes = require('./src/routes/auth');
const patientRoutes = require('./src/routes/patients');
const doctorRoutes = require('./src/routes/doctors');
const mappingRoutes = require('./src/routes/mappings');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/mappings', mappingRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    await sequelize.sync({ alter: true }); // Use migrations in production
    console.log('Database synchronized successfully.');

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Unable to start the server:', err);
    process.exit(1); // Exit with failure code
  }
}

startServer();