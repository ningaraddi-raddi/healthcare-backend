const { Mapping, Patient, Doctor } = require('../models');

// POST /api/mappings/
exports.assignDoctor = async (req, res) => {
    try {
        const { patientId, doctorId } = req.body;
        // Validate that the patient and doctor exist
        const patient = await Patient.findByPk(patientId);
        const doctor = await Doctor.findByPk(doctorId);
        if (!patient || !doctor) return res.status(404).json({ message: 'Patient or Doctor not found' });
        // Optional: Ensure the authenticated user owns this patient record before mapping
        if (patient.createdBy !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
        // Check if the mapping already exists
        const existing = await Mapping.findOne({ where: { patientId, doctorId } });
        if (existing) return res.status(400).json({ message: 'Doctor is already assigned to this patient' });
        const mapping = await Mapping.create({ patientId, doctorId });
        res.status(201).json(mapping);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// GET /api/mappings/
exports.getMappings = async (req, res) => {
    try {
        const mappings = await Mapping.findAll();
        res.json(mappings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// GET /api/mappings/<patientId>/
exports.getDoctorsForPatient = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.patientId);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        // Ensure the authenticated user owns this patient record
        if (patient.createdBy !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
        // Use the Sequelize association method to get all related doctors
        const doctors = await patient.getDoctors();
        res.json(doctors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// DELETE /api/mappings/<id>/
exports.removeMapping = async (req, res) => {
    try {
        const mapping = await Mapping.findByPk(req.params.id);
        if (!mapping) return res.status(404).json({ message: 'Mapping not found' });
        // Ensure the user owns the patient record before deleting the mapping
        const patient = await Patient.findByPk(mapping.patientId);
        if (patient.createdBy !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
        await mapping.destroy();
        res.json({ message: 'Mapping removed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};