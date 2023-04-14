
const TodoTask = require("../models/todoTask");


const moment = require('moment-timezone');

exports.get = async function(req, res){
    try {
        const tasks = await TodoTask.find({}, null, {sort: {date: -1}}).exec();
        console.log(tasks);
        res.render("todo", { todoTasks: tasks });
    } catch (err) {
        console.error("ERROR: " + err.message());
    }
};

exports.write = async function(req, res){
    try{
        const todoTask = new TodoTask({
            content: req.body.content,
            date: moment().format("YYYY-MM-DD HH:mm:ss")
        });
        await todoTask.save();
        console.log("==== Success!! Save New TodoTask ====");
        console.table([{id: todoTask._id, content: todoTask.content, date: todoTask.date}]);
        res.redirect("/todo");
    }catch(err){
        console.error("==== Fail!! Save TodoTask ====");
        console.error(err);
        res.redirect("/todo");
    }
};

exports.edit = async function(req, res) {
    try {
        const id = req.params.id;
        const tasks = await TodoTask.find({}, null, {sort: {date: -1}}).exec();
        res.render("todo-edit", { todoTasks: tasks, idTask: id });
    } catch (err) {
        console.error(err);
    }
};

exports.update = async function(req, res){
    const id = req.params.id;
    try {
        await TodoTask.findByIdAndUpdate(id, { content: req.body.content });
        console.log("==== Success!! Update TodoTask ====");
        console.log("id: " + id + "\nchanged content: " + req.body.content);
        res.redirect("/todo");
    } catch (err) {
        console.log("==== Fail!! Update TodoTask ====");
        console.error(err);
    }
};

exports.remove = async function(req, res){
    const id = req.params.id;
    try {
        await TodoTask.findByIdAndRemove(id);
        console.log("==== Success!! Remove TodoTask ====");
        console.log("id: " + id);
        res.redirect("/todo");
    } catch (err) {
        console.log("==== Fail!! Remove TodoTask ====");
        console.error(err);
    }
};