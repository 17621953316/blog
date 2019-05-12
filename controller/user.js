const path = require('path');
const moment = require('moment');


//导入数据库的模块db/index.js
const conn = require(path.join(__dirname,'../db/index.js'))

//展示注册页面
const showLoginPage = (req,res) => {
    res.render(path.join(__dirname,'../users/login.ejs'),{})
}
//展示登录页面
const showRegisterPage = (req,res) => {
    res.render(path.join(__dirname,'../users/register.ejs'),{})
}

//注册新用户的请求函数
const register = (req,res) => {
    //完成用户注册后的业务逻辑
    const body = req.body
   // console.log(body)//拿到表单数据
    if(body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <= 0){
        return  res.send({msg:'请填入完整的表单数据之后再注册',status:501})
    }
    //查询用户名是否重复
    const sql1 = 'select count(*) as count from boke where username=?'
    conn.query(sql1,body.username,(err,result) => {
        //如果查询失败，告知客户端查询失败
        if(err) return res.send({msg:'用户名查重失败',status:502})
        if(result[0].count != 0) return res.send({msg:'请更换其他用户名之后再重新注册',status:503})

        //执行注册的业务逻辑
        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        const sql2 = 'insert into boke set ?'

        conn.query(sql2,body, (err,result) => {
            if(err) return res.send({msg:'新用户注册失败',status:504})
            //console.log(result)
            if(result.affectedRows != 1) return res.send({msg:'新用户注册失败',status:505})
            res.send({msg:'新用户注册成功',status:200})
        })

    })

}


//用户登录请求函数
const login = (req,res) => {
    //1、获取到表单中的数据
    const body = req.body
   // console.log(body)
    //2、执行sql语句查询用户是否存在
    const sql1 = 'select * from boke where username=? and password=?'
    conn.query(sql1,[body.username,body.password],(err,result) => {
        if(err) return res.send({msg:'用户登录失败',status:501})
        //console.log(result);
        if(result.length != 1) return res.send({msg:'用户登录失败',status:502})
        //把登录成功之后的  用户信息  挂载到session上
        req.session.user = result[0]
        //把登录成功之后的  结果  挂载到session上
        req.session.islogin = true

        res.send({msg:'用户登录成功',status:200})
    })
}

//注销
const logout = (req,res) => {
    req.session.destroy(function() {
        //res.resdirect 方法让客户端重新访问指定 页面
        res.redirect('/')
    })
}
module.exports ={
    showLoginPage,
    showRegisterPage,
    register,
    login,
    logout
}