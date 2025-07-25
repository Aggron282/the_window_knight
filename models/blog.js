const mongoose = require("mongoose");
var Schema = mongoose.Schema;


var Blog = new Schema({
  author:{
    type:String,
    required:true
  },
  subtitle:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  
  style:{
    type:String,
    required:false
  },
  body:{
    type:String,
    required:true
  },
  date_submitted:{
    type:Date,
    required:true
  },
  coverImage:{
    type:String,
    required:true
  },
  gallery:{
    type:Array,
    required:false
  }
});



module.exports = mongoose.model("blogs",Blog);
