const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Patient = sequelize.define('Patient', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER },
    gender: { type: DataTypes.STRING },
    notes: { type: DataTypes.TEXT },
    createdBy: { type: DataTypes.INTEGER, allowNull: false }, // Foreign Key to User
});

module.exports = Patient;