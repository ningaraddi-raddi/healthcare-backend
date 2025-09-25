const sequelize = require('../config/db');
const User = require('./user');
const Patient = require('./patient');
const Doctor = require('./doctor');
const Mapping = require('./mapping');

// User-Patient Association (One-to-Many)
// A user can have many patients. When a user is deleted, their patients are also deleted.
User.hasMany(Patient, { foreignKey: 'createdBy', onDelete: 'CASCADE' });
Patient.belongsTo(User, { foreignKey: 'createdBy' });

// Patient-Doctor Association (Many-to-Many)
// A patient can have many doctors, and a doctor can have many patients.
// The 'through' option specifies the join table.
Patient.belongsToMany(Doctor, { through: Mapping, foreignKey: 'patientId', otherKey: 'doctorId' });
Doctor.belongsToMany(Patient, { through: Mapping, foreignKey: 'doctorId', otherKey: 'patientId' });

module.exports = { sequelize, User, Patient, Doctor, Mapping };