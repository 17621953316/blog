const path = require('path')
const moment = require('moment')
const marked = require('marked')
const conn = require(path.join(__dirname,'../db/index.js'))

const addArticalPage = (req,res) => {
    //如果用户没有登录则不允许访问添加页
    if(!req.session.islogin) return res.redirect('/')
    res.render(path.join(__dirname,'../views/article/add.ejs'),{
        user:req.session.user,
        islogin:req.session.islogin
    })
}

//添加新文章
const addArtical = (req,res) => {

    const body = req.body
    //如果在服务器d端获取作者ID，会有问题，如果文章写了很长的的时间，则session很可能会失效
   // body.authorid = req.session.user.id
    body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        //console.log(body)
    const sq1 = 'insert into boke_articles set ?'
    conn.query(sq1,body,(err,result) => {
        if(err) return res.send({msg:'发表文章失败',status:500})
        //console.log(result)
        if(result.affectedRows !== 1) return res.send(({msg:'发表文章失败',status:501}))
        res.send(({msg:'发表文章成功',status:200,insertId:result.insertId}))
        //console.log(result)
    })
}

//展示文章详情页
const showArticalDetail =(req,res) => {
   // console.log(req.params)
    //获取文章
    const id = req.params.id
    //根据ID  查询文章信息
    const sq1 = 'select * from boke_articles where id=?'
    conn.query(sq1,id,(err,result) => {
        if(err) return res.send({msg:'获取文章失败',status:500})
        //console.log(result)
        if(result.length != 1) return res.redirect('/')
        //在调用 res.render方法之前，要先把markdown 文本转换为html文本
        const html = marked(result[0].content)
        //将转换好的html文本复制给result[0].content
        result[0].content = html
        res.render(path.join(__dirname,'../views/article/infor.ejs'),{user:req.session.user,islogin:req.session.islogin,article:result[0]})

    })

}

//展示文章编辑页面
/*const showEditPage = (req,res) ={
    res.render('/article/edit.ejs',{user:req.session.user,islogin:req.session.islogin})
}*/

module.exports = {
    addArticalPage,
    addArtical,
    showArticalDetail
}