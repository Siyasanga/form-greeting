const express = require("express");
const exhbs = require('express-handlebars');
const body = require('body-parser');
const fs = require('fs');
var app = express();
var greeted = {}; // We start with zero greeted users
app.use(body());
app.use(express.static('public'));
app.engine("hbs", exhbs({ defaultLayout:"main",
                          extname:"hbs"}));
app.set("view engine","hbs");
//**********Counting greeted users*************
var userCounter = function() {
  counter = 0;
  for(i in greeted){
    counter++;
  }
  return counter;
}; //end of userCounter
//**********Updating users by reading them from storage************
var data = fs.readFile('./data.json',"utf8",function(err,data) {
  if(err){
    console.log(err);
  }else {
    greeted = JSON.parse(data);
    console.log('Finished adding users from backup');
  }
});
//*********************Capture Name**********************
function captureName(name) {
  if(greeted[name] !== undefined){
    console.log(name+" already exists!");
    greeted[name] += 1;
    updateGreetBackup(); // write change to storage
  }else {
    console.log("New name:"+name+" recorded!");
    greeted[name] = 1;
    updateGreetBackup(); // write change to storage
  } // end else: registering new user
} // end captureName
//*********************Update greet*************************
function updateGreetBackup() {
  fs.writeFile("data.json",JSON.stringify(greeted),function(err) {
    if(err)
      return console.log(err);
    console.log("File written succesfully!");
  });// end writing file
} // end updateGreetBackup
//******************Format table Data***********************
function formatTbl(){
  output = "";
  for(var i in greeted){
    output = output+"<tr><td class='names'>"+i+"</td><td>"+greeted[i]+"</td></tr>";
  }
  return output;
} // end of formatTbl
//*****************************************************************
app.get("/",function(req,res) {
  res.render("form",{count:userCounter()+1});
});
//*****************************************************************
app.post('/', function(req,res) {
  igama = req.body.name;
  language = req.body.lang;
  if(igama.length > 0){
    console.log(igama+" Accepted!");
    captureName(igama);
    res.render("form",{msg:generateMsg(igama,language),count:userCounter()});
  }
});
function generateMsg(name,lang) {
  var htmlMsg;
  switch (lang) {
    case "IsiXhosa":
      htmlMsg = '<h1>Molo, '+igama+'!</h1>';
      break;
    case "English":
      htmlMsg = '<h1>Hello, '+igama+'!</h1>';
      break;
    case "SeSotho":
      htmlMsg = '<h1>Dumela, '+igama+'!</h1>';
      break;
  }
  return htmlMsg;
}
//*****************************************************************
app.get("/greeted", function(req,res) {
  formatTbl();
  res.render("greeted",{tbody:formatTbl()});
});
//***Start Server***
app.listen(3000);
