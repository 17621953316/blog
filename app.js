const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
//导入session中间件
const session = require('express-session')

//注册session中间件
//只要注册了session  中间件，那么今后只要能访问到 req 这个对象，必然能访问到req.session
app.use(session({
    secret:'这是秘钥',
    resave:false,
    saveUninitialized:false

}))

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));

//注册解析表单数据的中间件
app.use(bodyparser.urlencoded({extended:false}))


//把node_modules文件夹托管为静态资源目录
app.use('/node_modules',express.static(path.join(__dirname,'/node_modules')))

/*
//导入路由模块 router/index.js
const router1 = require(path.join(__dirname,'/router/index.js'))
app.use(router1)

//导入用户路由模块 router/user.js
const router2 = require(path.join(__dirname,'/router/user.js'))
app.use(router2)
*/

//使用循环的方式 进行路由自动注册
fs.readdir(path.join(__dirname,'/router'),(err,filename) => {
    //console.log(filename)
    if(err) return console.log('读取  router  目录的路由失败')
    //循环router目录下的每一个文件名
    filename.forEach(fname => {
        //每循环一次，就拼接成一个完整的路由模块地址
        //然后使用require导入路由这个模块
        const router = require(path.join(__dirname,'/router',fname))
        app.use(router)
    })
})





app.listen('8000',() => {
    console.log('server running at http://127.0.0.1:8000')
})