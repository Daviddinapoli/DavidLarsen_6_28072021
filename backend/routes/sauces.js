const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

const sauceCtrl = require("../controllers/sauces");

const Sauce = require("../models/createsauce");

router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, multer, sauceCtrl.likeSauce)

module.exports = router;

