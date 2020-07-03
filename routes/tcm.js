var express = require('express');
var tcmController = require('../controllers/tcm.js');
var router = express.Router();

router.get('/getAllMedicine', tcmController.searchAll);
router.get('/searchMedicine', tcmController.searchMedicineByName);
router.get('/getMedicineByZn', tcmController.searchMedicineByZn);
router.get('/getMedicineByMedicinal', tcmController.getMedicineByMedicinal);
router.get('/getMedicineContent', tcmController.getMedicineContent);
router.get('/setTcmPinyin', tcmController.setPinyin);
router.get('/getTcmPinyin', tcmController.findPinyin);
router.get('/getTcmByEff', tcmController.searchMedicineByEff);
router.get('/getTcmByPy', tcmController.searchMedicineByPy);

module.exports = router;