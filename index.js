const express = require('express')
//app.get('/auth',require('./routes/auth'))
//const express=require('express');
const cors=require('cors');
const path = require('path')
const mongoose=require('mongoose')
const session = require('express-session');
const PORT = process.env.PORT || 4000;
     
const app = express();
app.use(cors());
app.use(session({secret: 'techphantom',saveUninitialized: true,resave: true}));
const dburi='mongodb+srv://project_flippr:TECHPHANTOM@cluster0.4bgb5.mongodb.net/classroom?retryWrites=true&w=majority';
mongoose.connect(dburi, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then((res)=>{
    console.log("db connected")
})
.catch((err)=>{
    console.log("db not connected")
    console.log(err)
})

app.use(express.urlencoded({extended : true}));

app.use(express.json())
app.use(require('./routes/app'));

app.use(express.static("client/build"));
app.get("*", (req, res) => {
     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
   });

app.listen(PORT,function(){
     console.log("listening.. on port "+4000);
});