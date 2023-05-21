const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:new Date,
        
    },
    password:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model('User', userSchema);