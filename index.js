const express = require('express')
const app = express()
app.get('/auth',require('./routes/auth'))
app.listen(process.env.PORT||4000,function(){
    console.log('Listening ---')
})