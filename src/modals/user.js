const mongoose = require('mongoose');
var userSchema = new  mongoose.Schema({
    first_name:{
        type:String,
        required: true
    },
    last_name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    },

    isVerify:{
        type:Boolean,
        default: false
    },
    token:{
        type: String,
        default: ''
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);