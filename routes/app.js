const express = require('express');
const api=require('../controllers/api')
const router = express.Router();

router.post('/login',api.login)
router.post('/signup',api.signup)
router.get('/teacherdashboard',api.teacherdashboard)
router.post('/createclassroom',api.createclassroom)
//router.get('/teacherdashboard',api.studentdashboard)

module.exports=router