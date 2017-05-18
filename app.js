const express = require("express");
const exhbs = require('express-handlebars');
const body = require('body-parser');
var app = express();
app.use(body());
app.use(express.static('public'));
app.engine("hbs", exhbs({defaultLayout:"main",
                         extname:"hbs"}));
app.set("view engine","hbs");

app.get("/",function(req,res) {
  res.render("form");
});

app.post('/', function(req, res) {
  console.log(req.body.name);
  var igama = req.body.name;
  res.render("form",{name:igama});
  // res.end();
});
app.listen(3000);
