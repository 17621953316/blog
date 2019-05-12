const express = require('express')
const path = require('path')
const router = express.Router()

//导入自己的业务处理模块
const ctrl = require(path.join(__dirname,'../controller/index.js'))

//用户请求的是首页
router.get('/', ctrl.showIndexPage)





module.exports = router