const mongoose = require('mongoose');

const mongoURI='mongodb://127.0.0.1:27017/inotebook';

mongoose.connect(mongoURI,{

}).then((value)=>{
    console.log('Connected to mongodb successfully');
}).catch((error)=>{
    console.log('Error connecting to mongodb '+ error);
})