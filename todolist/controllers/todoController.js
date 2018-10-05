var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mongoose = require('mongoose');

var config = require('../config/config')

mongoose.connect(`mongodb://${config.dbName}:${config.dbPasswd}@ds030827.mlab.com:30827/czh-todo`,{useNewUrlParser: true})

var data = [ ];

var todoSchema = new mongoose.Schema({
    item: String
})


var Todo = mongoose.model('Todo', todoSchema);


module.exports = function(app){
    app.get('/todo',function(req,res){

        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
          });

        // res.render('todo',{todos:data})
    })
    app.post('/todo',urlencodedParser,function(req,res){
        // data.push(req.body);
        // res.json({'msg':'ok'});
        var itemOne = Todo(req.body).save(function(err, data) {
            if (err) throw err;
            res.json({'msg':'ok'});
          });


    })
    app.delete('/todo/:item',function(req,res){

        // data = data.filter(function(todo) {
        //     return todo.item.replace(/ /g, "-") !== req.params.item;
        // });
        // data = data.filter(function(todo,index) {
        //     return index != req.params.item;
        // });
        // res.json({'msg':'ok'});
        Todo.find({item: req.params.item.replace(/-/g, " ")}).remove(function(err, data) {
            if (err) throw err;
            res.json({'msg':'ok'})
        });

    })
}
