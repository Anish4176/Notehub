const mongoose = require('mongoose')
const { Schema } = mongoose;

const notesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,    //way to link another model
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General",       
    },
    date:{
        type:Date,
        default:new Date,
        required:true
    },
});
module.exports =mongoose.model('Note', notesSchema);