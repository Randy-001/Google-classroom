const express = require('express');
const api = require('../controllers/api')
const router = express.Router();

router.post('/login',api.login)
router.post('/signup',api.signup)
router.get('/teacherdashboard',api.teacherdashboard)
router.post('/createclassroom',api.createclassroom)
router.get('/studentdashboard',api.studentdashboard)
router.post('/joinclass',api.joinclass)
router.post('/testform',api.testform)
router.post("/send_cls_details",api.send_cls_details)
router.post('/getData',api.classData)
//router.get('/teacherdashboard',api.studentdashboard)

module.exports = router