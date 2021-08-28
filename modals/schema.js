const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userschema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})

const User=mongoose.model('user',userschema);
module.exports=User;