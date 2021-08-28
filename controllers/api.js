const db=require("../modals/schema")

const login=(req,res)=>{
    db.find({ email: req.body.email, password: req.body.password}, function (err, docs) {
        if(err) throw err
        console.log(docs)
    });
    return res.json({success:true})
}
const signup=(req,res)=>{
    db.find({ email: req.body.email}, function (err, docs) {
        if(err) throw err
        console.log(docs)
        if(docs.length===0){
            const fg= new db({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password
            })
            fg.save()
            .then(res=>{
                console.log(res)
            })
        }
    });
    
    return res.json({success:true})

}

module.exports={
    login,
    signup
}