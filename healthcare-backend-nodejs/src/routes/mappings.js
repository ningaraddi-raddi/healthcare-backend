const express = require('express');
const router = express.Router();
const mappingCtrl = require('../controllers/mappingController');
const auth = require('../middlewares/auth');

router.post('/', auth, mappingCtrl.assignDoctor);
router.get('/', auth, mappingCtrl.getMappings);
router.get('/:patientId', auth, mappingCtrl.getDoctorsForPatient);
router.delete('/:id', auth, mappingCtrl.removeMapping);

module.exports = router;