const router = require('express').Router();
const ExpressJoi = require('express-joi-validator');
const validation = require('./../utils/validator');
const userController = require('./../controller/userController');
 

// api routes
router.post('/signup',ExpressJoi(validation.signupValidator),userController.signup);
router.post('/login',ExpressJoi(validation.loginValidator),userController.login);
router.post('/token-login',ExpressJoi(validation.tokenLoginValidator),userController.tokenLogin);
router.get('/verify',ExpressJoi(validation.tokenValidator),userController.verify);

// Response of vaalidation eror
router.use(function (err, req, res, next) {
    if (err.isBoom) {
         return res.status(err.output.statusCode).json(err.output.payload);
    }
});

module.exports = router;