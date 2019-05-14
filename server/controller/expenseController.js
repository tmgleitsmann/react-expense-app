Expense = require('../models/expenses');

exports.index = function(req, res){
    Expense.find({}, function(err, expenses){
        if(err){
            res.json({
                status:'error',
                message:err
            });
        }
        res.json({
            status:'success',
            message:'Expense retrieved successfully',
            data:expenses
        });
    });
};


exports.new = function(req, res){
    const expense = new Expense();
    expense.id = req.body.id;
    expense.amount = req.body.amount;
    expense.description = req.body.description;
    expense.createdAt = req.body.description;
    expense.note = req.body.note;

    expense.save(function(err){
        if(err)
            res.json(err);
        res.json({
            message:'new expense created',
            data:expense
        });
    });
};

exports.view = function(req, res){
    Expense.findById(req.params.id, function(err, expense){
        if(err)
            res.send(err);
        res.json({
            message:'expense details loading..',
            data:expense
        });
    });
};

exports.update = function(req, res){
    Expense.findById(req.params.id, function(err, expense){
        if(err)
            res.send(err);

        expense.amount = req.body.amount ? req.body.amount : expense.amount;
        expense.description = req.body.description ? req.body.description : expense.description;
        expense.note = req.body.note ? req.body.note : expense.note;
        expense.createdAt = req.body.createdAt ? req.body.createdAt : expense.createdAt;

        expense.save(function(err){
            if(err)
                res.json(err);
            res.json({
                message:'expense info updated',
                data:expense
            });
        });
    });
};

exports.delete = function(req, res){
    Expense.remove({
        id:req.params.id
    }, function(err, expense){
        if(err)
            res.send(err);
        res.json({
            status:'success',
            message:'expense removed'
        });
    });
};

