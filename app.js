const express = require("express");
const exhbs = require('express-handlebars');
const body = require('body-parser');
const fs = require('fs');
var app = express();
var greeted;
if(fs.existsSync(__dirname+'/data.json')){
  console.log("Hey");
  // var data = fs.readFile('./data.json',"utf8",function(err,data) {
  //   if(err){
  //     greeted = {};
  //     return console.log(err);
  //   }else {
  //     greeted = JSON.parse(data)
  //     console.log(greeted["Siya"]);
  //   }
  // });
}
// var greeted = JSON.parse(data);
app.use(body());
app.use(express.static('public'));
app.engine("hbs", exhbs({defaultLayout:"main",
                         extname:"hbs"}));
app.set("view engine","hbs");
//*************************************************
app.get("/",function(req,res) {
  res.render("form");
});
//*************************************************
app.post('/', function(req, res) {
  igama = req.body.name;
  if(igama.length !== 0 || igama !== undefined){
    console.log("Testing: name defined");
    var msg = '<h1>Hello, '+igama+'!</h1>';
    res.render("form",{msg:msg});
    greeted[igama] += 1;
    fs.writeFile("dddd.txt","aasss ssds sdsd sdsd dd.",function(err) {
      if(err)
        return console.log(err);
      console.log("File written succesfully!");
    });
  }
  // var data = fs.readFile('./data.json',"utf8",function(err,data) {
  //   if(err){
  //     return console.log(err);
  //   }
      //  else {
  //     console.log(data);
  //   }
  // });
  // else {
  //   console.log("Testing: name is not defined");
  //   greeted[igama] = 1;
  // }
});
app.listen(3000);
