const db=require("../modals/schema")
//const session = require('express-session');
var sess;


const login=(req,res)=>{
    sess = req.session;
    const user=db.User;
    user.find({ email: req.body.username, password: req.body.password}, function (err, docs) {
        if(err) throw err
        console.log(docs)
        if(docs.length===0){
            return res.json({success:false})
        }
        else{
            sess.email=docs[0]["email"]
            //console.log(typeof(docs[0]["id"]))
            //sess.uniqueid=docs[0]["id"]
            sess.username=docs[0]["username"]
            //console.log(sess)
            return res.json({success:true})
        }
    });
}
const signup=(req,res)=>{
    const user=db.User;
    sess = req.session;
    user.find({ email: req.body.email}, function (err, docs) {
        if(err) throw err
        //console.log(docs)
        if(docs.length===0){
            sess.email=req.body.email
            sess.username=req.body.username
            const fg= new user({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                student:req.body.student,
                teacher:req.body.teacher
            })
            fg.save()
            .then(res=>{
                //console.log(res)
               
                //console.log(sess)
            })
            .catch(err=>{
               console.log(err)
               sess.destroy()
            })
            console.log(sess);
            return res.json({success:true})
        }
        else{
            return res.json({success:false})
        }
    });
    
    

}
const teacherdashboard=(req,res)=>{
    sess=req.session;
    const classroom=db.Classroom;
    classroom.find({classowner_email:sess.email},(err,docs)=>{
        if(err) throw err
        if(docs){
            return res.json({class:docs})
        }
    });
}
const createclassroom=(req,res)=>{
    sess=req.session;
    const classroom=db.Classroom;
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 6; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   console.log(sess);
    const cls=new classroom({
        classcode:result,
        classowner_email:sess.email,
        classname:req.body.classname,
        classowner_name:sess.username,
        meetlink:"Not available"
        
    })
    cls.save()
    .then(doc=>{
        console.log(doc)
        return res.json({success:true,classcode:doc.classcode})
    })
    .catch(err=>{
        console.log(err)
    })
    

}

module.exports={
    login,
    signup,
    teacherdashboard,
    createclassroom
}