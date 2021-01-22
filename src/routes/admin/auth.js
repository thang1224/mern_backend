const express = require("express");
const { requireSignin } = require("../../common-middleware");
const { signup, signin, signout } = require("../../controller/admin/auth");
const { validateRequest, isRequestValidated, validateSigninRequest } = require("../../validators/auth");
const router = express.Router();


router.post('/admin/signup',validateRequest, isRequestValidated, signup);
router.post('/admin/signin',validateSigninRequest, isRequestValidated, signin);

router.post('/profile', requireSignin, (req, res) => {
    res.status(200).json({user: 'profile'});
}); 
router.post('/admin/signout', signout);


module.exports = router;