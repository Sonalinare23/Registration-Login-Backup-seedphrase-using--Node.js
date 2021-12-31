const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    first_name:{
        type: String,
        required : true,
    },
    last_name:{
        type: String,
        required : true,
    },
    
    email:{
        type: String,
        required : true,
        unique:true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:{
        type: String,
        required : true,
    },
    seedphrase:{
        type: String,
        
    },
    token:{
        type : String
    },
});

module.exports = mongoose.model('userdata', userSchema);