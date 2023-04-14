const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const router = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

app.use("/public", express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(router);

mongoose.connect('mongodb://127.0.0.1:27017/test', {})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

app.listen(3000, function(){
    console.log("Server listening on port 3000!");
});
