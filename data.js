const mongoose = require('mongoose');
var mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/greetingsdb";
mongoose.connect(mongoURL,function(err,result) {
  if (err) {
    console.log(err);
  }else {
    console.log("Database Connection Established!");
  }
});
var userModel = mongoose.model("user",{
  name:{type:String, unique:true},
  greetings:{type:Number}
});
module.exports = userModel;
