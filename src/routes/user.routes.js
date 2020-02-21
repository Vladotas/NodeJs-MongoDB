const { Router } = require('express');
const router = Router();

const { renderSignUpForm, renderSignInForm, signup, signin, logOut} = require('../controllers/user.controller')


//SignUp
router.get('/users/signup', renderSignUpForm);
router.post('/users/signup', signup);

//SignIn
router.get('/users/signin', renderSignInForm);
router.post('/users/signin', signin)

//LogOut
router.get('/users/logout', logOut);

module.exports = router;