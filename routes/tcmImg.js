var express = require('express');
var tcmImgController = require('../controllers/tcmImg.js');
var router = express.Router();

router.get('/searchMedicineImg', tcmImgController.searchMedicineImgByName);
router.get('/searchMedicineImgByZn', tcmImgController.searchMedicineImgByZn);
router.get('/categorylist', tcmImgController.categoryList);
router.get('/getMedicineByCategory', tcmImgController.getMedicineByCategory);
router.get('/getbyNaCa', tcmImgController.getbyNaCa);
router.get('/getTcmImgContent', tcmImgController.getTcmImgContent);
router.get('/updateTcmImg', tcmImgController.updateTcmImg);
router.get('/getbyEffCa', tcmImgController.getbyEffCa);
router.get('/getbyPyCa', tcmImgController.getbyPyCa);

module.exports = router;