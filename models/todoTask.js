
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoTaskSchema = new Schema({
    content: String,
    date: Date
});

const TodoTask = mongoose.model('TodoTask', todoTaskSchema);

module.exports = TodoTask;