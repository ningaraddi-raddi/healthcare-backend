const { Patient, Mapping, Doctor } = require('../models');

// POST /api/patients/
exports.createPatient = async (req, res) => {
    try {
        const { name, age, gender, notes } = req.body;
        // The createdBy field is populated from the authenticated user's ID
        const patient = await Patient.create({ name, age, gender, notes, createdBy: req.user.id });
        res.status(201).json(patient);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// GET /api/patients/
exports.getPatients = async (req, res) => {
    try {
        // Retrieve only the patients created by the authenticated user
        const patients = await Patient.findAll({ where: { createdBy: req.user.id } });
        res.json(patients);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// GET /api/patients/<id>/
exports.getPatient = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        // Ensure the authenticated user owns this patient record
        if (patient.createdBy !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
        res.json(patient);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// PUT /api/patients/<id>/
exports.updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        // Ensure the user has permission to update this record
        if (patient.createdBy !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
        await patient.update(req.body);
        res.json(patient);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// DELETE /api/patients/<id>/
exports.deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        // Ensure the user has permission to delete this record
        if (patient.createdBy !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
        await patient.destroy();
        res.json({ message: 'Patient record deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};