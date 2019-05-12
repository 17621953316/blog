const express = require('express')
const path = require('path')
const router = express.Router()

const ctrl = require(path.join(__dirname,'../controller/article.js'))

//监听客户端的get请求地址,显示文章添加页面
router.get('/article/add',ctrl.addArticalPage)

//监听客户端提交文章请求
router.post('/article/add',ctrl.addArtical)

//监听客户端  查看文章详情页的请求
router.get('/article/infor/:id',ctrl.showArticalDetail)

//监听 客户端请求编辑页面
//router.get('/article/edit/:id',ctrl.showEditPage)

module.exports = router