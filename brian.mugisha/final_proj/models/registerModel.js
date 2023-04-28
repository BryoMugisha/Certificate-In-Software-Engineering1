const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")

const registerSchema = new mongoose.Schema({
    firstname:{
        type:String,
        trim:true
    },
    lastname:{
        type:String,
        trim:true
    },
    dob:{
        type:String,
        trim:true
    },
    gender:{
        type:String,
        trim:true
    },
    country:{
        type:String,
        trim:true
    },
    state:{
        type:String,
        trim:true
    },
    town:{
        type:String,
        trim:true
    },
    zip:{
        type:String,
        trim:true
    },
    phonenumber:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true
    },
   
   
  
})


registerSchema.plugin(passportLocalMongoose,);
module.exports = mongoose.model("Register", registerSchema)