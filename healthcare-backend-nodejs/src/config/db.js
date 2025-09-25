const { Sequelize } = require('sequelize');
require('dotenv').config();

// Use the DATABASE_URL from your .env file
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false, // Set to true to see SQL queries in the console
});

module.exports = sequelize;