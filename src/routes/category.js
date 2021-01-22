const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { addCategory, getCategory } = require('../controller/category');
const router = express.Router();

const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });

router.post('/category/create', requireSignin, adminMiddleware, upload.single('categoryImage'), addCategory);
router.get('/category/get', getCategory);
module.exports = router;