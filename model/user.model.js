const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    registered_on : {
        type : Date,
        default : Date.now
    }
},{
    versionKey : false
})



const UserModel = mongoose.model('users',userSchema);


module.exports = {UserModel};