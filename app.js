const express = require("express");
const exhbs = require('express-handlebars');
const body = require('body-parser');
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
function captureName(inName,lang,res) {
  user.findOne({name:inName}, function(err, doc) {
    if(doc){  // username already exists
      user.update({name:inName}, {$inc: {greetings:1}}, function(err, affected) {
        if(affected) // confirm update
          console.log("*********Greetings for "+inName+" successfully updated.*********");
          user.count(function(err, result) {
              res.render("form",{msg:generateMsg(inName,lang),count:result});
          });
      });
    } // end updating greetings for the user
    else {  // we registering this new user
      var newUser = new user({name:inName, greetings:1});
      newUser.save(function(err, doc) {
        if(err)
          console.log(err);
        console.log("*********successfully registered!*********\n"+doc);
        user.count(function(err, result) {
          res.render("form",{msg:generateMsg(inName,lang),count:result});
        });
      }); // end of save
    } // end registering new user
  }); // end of findOne
} // end captureName
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
} // end of generateMsg
//*********************Format table Data***********************
function formatTbl(res){
  output = "";
  user.find(function(err, greeted) {
    for(var i in greeted){
      output = output+"<tr><td class='names'>"+greeted[i].name+"</td><td>"+greeted[i].greetings+"</td></tr>";
    }
    res.render("greeted",{tbody:output});
  });
} // end of formatTbl
//********************************************************************
app.get("/",function(req,res) {
  user.count(function(err, counter) {
    res.render("form",{count:counter});
  });
});
app.get("/greeted", function(req,res) {
  formatTbl(res);
});
app.get("/deleteAll",function (req,res) {
  user.remove({},function(err) {
    user.count(function(err, counter) {
      res.render("form",{count:counter,deleteAnim:'<script src="deleteFunction.js" charset="utf-8"></script>'});
    })
  })
});
app.post('/', function(req,res) {
    igama = req.body.name;
    language = req.body.lang;
    if(igama.length > 0){
      if(language){
        captureName(igama,language,res);
      }
    }
});
// ***Start Server***
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server running at http://localhost:"+port+"/");
});
