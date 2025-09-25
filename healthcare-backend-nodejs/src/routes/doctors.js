const express = require('express');
const router = express.Router();
const doctorCtrl = require('../controllers/doctorController');
const auth = require('../middlewares/auth');

router.post('/', auth, doctorCtrl.createDoctor);
router.get('/', doctorCtrl.getDoctors);
router.get('/:id', doctorCtrl.getDoctor);
router.put('/:id', auth, doctorCtrl.updateDoctor);
router.delete('/:id', auth, doctorCtrl.deleteDoctor);

module.exports = router;