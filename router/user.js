const express = require('express')
const path = require('path');
const router = express.Router()


//暴露用户控制业务模块
const ctrl = require(path.join(__dirname,'../controller/user.js'))

//用户请求的是登录页面
router.get('/login',ctrl.showLoginPage)

//用户请求的是注册页面
router.get('/register',ctrl.showRegisterPage)

//注册新用户
router.post('/register',ctrl.register)

//监听登录事件
router.post('/login',ctrl.login)

//监听注销事件
router.get('/logout',ctrl.logout)

module.exports = router