var express = require('express');
var prescriptionController = require('../controllers/prescription.js');
var router = express.Router();

router.get('/searchPrescription', prescriptionController.searchPrescriptionByName);
router.get('/searchPreByPy', prescriptionController.searchPrescriptionByPy);
router.get('/searchPreByEff', prescriptionController.searchPrescriptionByEff);
router.get('/searchPreByComp', prescriptionController.searchPreByComp);
router.get('/getAllPrescription', prescriptionController.getAllPrescription);
router.get('/getPreOrigin', prescriptionController.getPrescriptionOrigin);
router.get('/getPreByZn', prescriptionController.getPreByZn);
router.get('/getPreByOrigin', prescriptionController.getPreByOrigin);
router.get('/getPreContent', prescriptionController.getPreContent);
router.get('/setPrePinyin', prescriptionController.setPinyin);
router.get('/getPrePinyin', prescriptionController.findPinyin);
module.exports = router;