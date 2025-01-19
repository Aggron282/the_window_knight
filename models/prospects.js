const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Prospects = new Schema (
  {
    name:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:false
    },
    time_created:{
      type:Date,
      require:false
    },
    quote:{
      type:Number,
      required:false
    },
    status:{
      type:Number,
      required:false
    },
    phone_number:{
      type:String,
      required:false
    },
    address:{
      type:String,
      required:false
    },
    schedule:{
      type:Date,
      required:false
    },
    message:{
      type:String,
      required:false
    }
  }
)


module.exports = mongoose.model("prospects",Prospects);
