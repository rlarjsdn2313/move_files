const express = require("express"); // import express module
const app = express(); // make app object

const path = require("path"); // to parse path

const fs = require("fs"); // to read files

app.set("view engine", "ejs"); // set view to ejs

app.get('/', function(req, res) {
    res.render("main.ejs") // render main.ejs
})

app.get("/drive/:user", function(req, res) {
    var id = req.params.user; // get user name
    id = path.parse(id).base; // parse path

    console.log(id + " Entered To Drive");

    var drive_folder = `./drive/${id}`;

    var file_list = fs.readdirSync(drive_folder); // get file_list

    var file_list_ = ''; // list that will have real put
    var i = 0; // to count

    while (i < file_list.length) {
        file_list_ = `${file_list_}<a href="/download/${id}/${file_list[i]}">${file_list[i]}</a><br>`;
        i = i + 1;
    }

    res.render("drive.ejs", {user:id, list:file_list_});
});

app.get("/download/:user/:file_name", function(req, res) {
    var user_name = req.params.user; // get user name
    user_name = path.parse(user_name).base;
    var file_name = req.params.file_name;
    file_name = path.parse(file_name).base;

    var file = `${__dirname}\\drive\\${user_name}\\${file_name}`
    console.log(user_name, "Download", file_name)

    res.setHeader('Content-Length', file.length);
    res.write(file,"binary")
    // res.download(encodeURIComponent(path.basename(`./drive/${user_name}/${file_name}`)));
    res.redirect(`/drive/${user_name}`)
})

app.listen(3000); // listen from 3000 port

console.log("Listen From 3000 port")