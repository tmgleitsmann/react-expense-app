const router = require('express').Router();

// router.get('/', function(req, res){
//     res.json({
//         status:'API is working',
//         message:'Welcome to RESThub'
//     });
// });

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