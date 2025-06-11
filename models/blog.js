const mongoose = require("mongoose");
var Schema = mongoose.Schema;


var Blog = new Schema({
  author:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  body:{
    type:String,
    required:true
  },
  date_submitted:{
    type:Date,
    required:true
  },
  images:{
    type:Array,
    required:false
  }
});



module.exports = mongoose.model("blogs",Blog);
