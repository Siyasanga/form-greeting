const express = require("express");
const exhbs = require('express-handlebars');
const body = require('body-parser');
const fs = require('fs');
const user = require('./data.js');
var app = express();
app.use(body.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.engine("hbs", exhbs({ defaultLayout:"main",
                          extname:"hbs"}));
app.set("view engine","hbs");
//***********************Capture Name**************************
function captureName(inName) {
  user.findOne({name:inName}, function(err, doc) {
    if(doc){
      user.update({name:inName}, {$inc: {greetings:1}}, function(err, affected) {
        if(affected)
          console.log("Greetings for "+inName+" successfully updated.");
      });
    } // end updating greetings for the user
    else {
      var newUser = new user({name:inName, greetings:1});
      newUser.save(function(err, doc) {
      if(err)
        console.log(err);
      else
        console.log("successfully registered!\n"+doc);
      });
    } // end registering new user
  }); // end of findOne
} // end captureName
//*************************************************************
// captureName("Anele");
//*********************Format table Data***********************
function formatTbl(){
  output = "";
  var greeted;
  user.find(function(err, db) {
    greeted = db;
    for(var i in greeted){
      output = output+"<tr><td class='names'>"+greeted[i].name+"</td><td>"+greeted[i].greetings+"</td></tr>";
    }
    return output;
  });
} // end of formatTbl
console.log(formatTbl());
//*****************Generating the greeting message*********************
function generateMsg(name,lang) {
  var htmlMsg;
  switch (lang) {
    case "IsiXhosa":
      htmlMsg = '<h1>Molo, '+name+'!</h1>';
      break;
    case "English":
      htmlMsg = '<h1>Hello, '+name+'!</h1>';
      break;
    case "SeSotho":
      htmlMsg = '<h1>Dumela, '+name+'!</h1>';
      break;
  }
  return htmlMsg;
}
//********************************************************************
// app.get("/",function(req,res) {
//   res.render("form",{count:userCounter()+1});
// });
// app.get("/greeted", function(req,res) {
//   formatTbl();
//   res.render("greeted",{tbody:formatTbl()});
// });
// app.get("/deleteAll",function (req,res) {
//   greeted = {};
//   updateGreetBackup();
//   res.render("form",{count:userCounter(),deleteAnim:'<script src="deleteFunction.js" charset="utf-8"></script>'});
// });
// app.post("/deleteAll",function (req,res) {
//   res.redirect("/");
// });
// app.post('/', function(req,res) {
//   igama = req.body.name;
//   language = req.body.lang;
//   if(igama.length > 0){
//     if(language){
//       console.log(igama+" Accepted!");
//       captureName(igama);
//       res.render("form",{msg:generateMsg(igama,language),count:userCounter()});
//     }
//   }
// });
// //***Start Server***
// // var hostname = "127.0.0.1";
// var port = process.env.PORT || 3000;
// app.listen(port, function() {
//   console.log("Server running at http://localhost:"+port+"/");
// });
