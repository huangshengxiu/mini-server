var express = require('express');
var prescriptionImgController = require('../controllers/prescriptionImg.js');
var router = express.Router();

router.get('/searchPrescriptionImg', prescriptionImgController.searchPrescriptionImgByName);
router.get('/searchPreImgByPy', prescriptionImgController.searchPrescriptionImgByPy);
router.get('/searchPreImgByEff', prescriptionImgController.searchPrescriptionImgByEff);
router.get('/getPreImgByZn', prescriptionImgController.getPrescriptionImgByZn);
router.get('/PreImgcategoryList', prescriptionImgController.categoryList);
router.get('/getAllPreImg', prescriptionImgController.getAllPrescriptionImg);
router.get('/getPreImgByCategory', prescriptionImgController.getPreImgByCategory);
router.get('/getPreImgContent', prescriptionImgController.getPreImgContent);
router.get('/getPreImgByComp', prescriptionImgController.searchPreImgByComp);
router.get('/updatePreImg', prescriptionImgController.updatePreImg);

module.exports = router;