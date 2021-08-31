# flipr-google-cls-pro
A web application similar to google classroom with more features


Access our platform via : https://flipr-hack-gcls.herokuapp.com

**Video link of our project**

https://drive.google.com/file/d/1HO77_8_T8J3wgruywKcyUcSZqXGXS3zJ/view?usp=sharing



This is an application where students and teachers can signup and login and this platform provies a virtual classroom.

This virtual classroom allows teachers to create individual classroom for each of the classes that they handle .This platform paves teachers and students a way to work in a collobarative environment virtually.
Our platform allows teachers to create assignments , tests and post study materials.

This platform enables teachers to create tests and our platform will validate students based on their performance and automates the process of correcting answer forms and updates the grade for each and every student enrolled in that class , thereby eleminating the need for teachers to update manually.This gives teachers more time , that they can spend to mentor students.





**Usage of the platform:**

1.Sign up with you details or google account.

2.Login with the credintials or google account.

3.Based on your role (like teacher or student ) you will be redirected to your dashboard accordingly.

4.Teachers can create virtual classrooms and can share the classcode with all the students.

5.Students will be able to join the classrooms using the classcode recived through mail or from teacher.

6.Teachers can create tests and provide the test form links to the platform.

7.Students upon completing their test will be getting grades after the due time automatically.

8.Teachers can even add meating links.

**Feature of automatic mark updation on test conducted using forms:**

For test conduction , the teacher needs to create the test using google forms and will be asked to paste the link of the form .
Our system will retrive the date from the spreadsheet linked to the google form after teacher clicking the update score button and will update the marks for all the students accordingly.

Video based plagirism checker is will be implemented in the upcomming versions.





**Implementational Details :**

Database design:

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

const classroomschema = new Schema({

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
    
    students:[String],
    
    test:Object
    
})

const userClassSchema = new Schema({

    email:{
    
        type:String,
        
        required:true
        
    },
    
    classes:[String]
    
})
  





