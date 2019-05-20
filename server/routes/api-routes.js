const router = require('express').Router();

const { validateBody, schemas } = require('./route-helpers');
//import controllers
const ExpenseController = require('../controller/expenseController');
const UserController = require('../controller/userController');
//import passport
const passport = require('passport');
const passportConfig = require('../passport');


//expense routes
//tested and working
router.route('/')
    .get(UserController.index)
    //.get(ExpenseController.index)
    .post(ExpenseController.new);

router.route('/:method/:email')
    .get(UserController.grabUser)
    .post(UserController.new);

router.route('/edit/:id')
    .put(ExpenseController.update)
    .delete(ExpenseController.delete);

router.route('/edit/:id/:method/:email')
    .put(UserController.modify);

//tested and working
router.route('/remove/:method/:email/:id')
    .put(UserController.removeExpense)

//exchanging email and password for token
//tested and working
router.route('/signup')
    .post(validateBody(schemas.AuthSchema), UserController.signUp);

//exchanging email and password for token
//tested and working
router.route('/signin')
    .post(validateBody(schemas.AuthSchema), passport.authenticate('local', {session:false}), UserController.signIn);

//holding token, want to access this route. Still need to Test
router.route('/secret')
    .get(passport.authenticate('jwt', { session: false }), UserController.secret);

//tested and working
router.route('/oauth-google') 
    .post(passport.authenticate('googleToken', {session:false}), UserController.googleOAuth);

module.exports = router;