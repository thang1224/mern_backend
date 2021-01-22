const express = require("express");
const { requireSignin } = require("../common-middleware");
const { signup, signin } = require("../controller/auth");
const { validateRequest, isRequestValidated, validateSigninRequest } = require("../validators/auth");

const router = express.Router();


router.post('/signup', validateRequest, isRequestValidated, signup);
router.post('/signin',validateSigninRequest, isRequestValidated, signin);

 router.post('/profile', requireSignin, (req, res) => {
    res.status(200).json({user: 'profile'});
}); 

module.exports = router;