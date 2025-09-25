const express = require('express');
const router = express.Router();
const patientCtrl = require('../controllers/patientController');
const auth = require('../middlewares/auth');

router.post('/', auth, patientCtrl.createPatient);
router.get('/', auth, patientCtrl.getPatients);
router.get('/:id', auth, patientCtrl.getPatient);
router.put('/:id', auth, patientCtrl.updatePatient);
router.delete('/:id', auth, patientCtrl.deletePatient);

module.exports = router;