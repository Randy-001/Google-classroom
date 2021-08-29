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
    },
    student:{
        type:Boolean,
        required:true
    },
    teacher:{
        type:Boolean,
        required:true
    }

})
const classroomschema=new Schema({
    classcode:{
        type:String,
        required:true
    },
    classname:{
        type:String,
        required:true
    },
    classowner_email:{
        type:String,
        required:true
    },
    classowner_name:{
        type:String,
        required:true
    },
    meetlink:{type:String,required:true},
    students:[String]
})

const User=mongoose.model('user',userschema);
const Classroom=mongoose.model('classroom',classroomschema);
module.exports={User,Classroom};