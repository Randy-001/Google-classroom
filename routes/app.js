const express = require('express');
const api=require('../controllers/api')
const router = express.Router();

router.post('/login',api.login)
router.post('/signup',api.signup)
router.get('/teacherdashboard',api.teacherdashboard)
router.post('/createclassroom',api.createclassroom)
router.get('/studentdashboard',api.studentdashboard)
router.post('/joinclass',api.joinclass)
<<<<<<< HEAD
router.post('/getData',api.classData)
=======
router.post('/testform',api.testform)
router.post("/send_cls_details",api.send_cls_details)
>>>>>>> a391aca3be1346a059e2cf220338ac924d605644
//router.get('/teacherdashboard',api.studentdashboard)

module.exports=router