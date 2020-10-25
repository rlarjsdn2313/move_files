const express = require("express"); // import express module
const app = express(); // make app object

const path = require("path"); // to parse path

const fs = require("fs"); // to read files

app.set("view engine", "ejs"); // set view to ejs

app.get('/', function(req, res) {
    res.render("main.ejs") // render main.ejs
})

app.get('/drive/:user', function(req, res) {
    var id = req.params.user; // get user name
    id = path.parse(id).base; // parse path

    console.log(id + " Entered To Drive");

    var drive_folder = `./drive/${id}`;
    console.log(drive_folder)
    var file_list = fs.readdirSync(drive_folder); // get file_list
    console.log(file_list)

    var file_list_ = ''; // list that will have real put
    var i = 0; // to count

    while (i < file_list.length) {
        file_list_ = file_list_ + file_list[i] + '<br>';
        i = i + 1;
    }

    res.render("drive.ejs", {user:id, list:file_list_})
})
app.listen(3000); // listen from 3000 port

console.log("Listen From 3000 port")