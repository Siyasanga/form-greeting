const express = require("express");
const exhbs = require('express-handlebars');
const body = require('body-parser');
const fs = require('fs');
var app = express();
app.use(body());
app.use(express.static('public'));
app.engine("hbs", exhbs({defaultLayout:"main",
extname:"hbs"}));
app.set("view engine","hbs");
//*************************************************
app.get("/",function(req,res) {
  res.render("form");
});
var greeted = {}; // This is where we store list of greeted users
if(fs.existsSync(__dirname+'/data.json')){
  var data = fs.readFile('./data.json',"utf8",function(err,data) {
    if(err){
      greeted = {};
      return console.log(err);
    }else {
      greeted = JSON.parse(data);
    }
  });
}
//*************************************************
var counter = 0;
app.post('/', function(req, res) {
  console.log(req.body);
  igama = req.body.name;
  if(igama.length > 0){
    console.log(igama+" Accepted!");
    if(greeted[igama] !== undefined){
      console.log(igama+" already exists!");
      var htmlMsg = '<h1>Hello, '+igama+'!</h1>';
      res.render("form",{msg:htmlMsg});
      greeted[igama] += 1;
      fs.writeFile("data.json",JSON.stringify(greeted),function(err) {
        if(err)
          return console.log(err);
        console.log("File written succesfully!");
      });
    }else {
      console.log("New name:"+igama+" recorded!");
      greeted[igama] = 1;
      fs.writeFile("data.json",JSON.stringify(greeted),function(err) {
        if(err)
          return console.log(err);
        console.log("File written succesfully!");
      });// end writing file
    } // end else: registering new user
  }
});
exhbs.registerHelper("usersTbl",function () {
  var output = "";
  for(i in greeted){
    output += "<tr><td>i</td><td>greeted[i]</td></tr>";
  }
  console.log(output);
  return output;
})
app.get("/greeted",function(req,res) {
  res.render("greeted",{usersTbl});
});
app.listen(3000);
