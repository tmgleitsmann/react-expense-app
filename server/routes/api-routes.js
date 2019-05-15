const router = require('express').Router();

//import controller
const expenseController = require('../controller/expenseController');

//expense routes
router.route('/')
    .get(expenseController.index)
    .post(expenseController.new);

router.route('/edit/:id')
    .put(expenseController.update)
    .delete(expenseController.delete);



module.exports = router;