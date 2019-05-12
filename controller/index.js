const path = require('path')
const conn = require(path.join(__dirname,'../db/index.js'))

const showIndexPage = (req,res) => {
    const sq1 = 'select boke_articles.id,boke_articles.title,boke_articles.ctime,boke.nickname from boke_articles LEFT JOIN boke on boke_articles.authorid=boke.id'
    conn.query(sq1,(err,result) => {
        if(err) {
            return res.render('index.ejs',{
                user:req.session.user,
                islogin:req.session.islogin,
                //文章列表
                articles:[]
            })
        }
        res.render('index.ejs',{
            user:req.session.user,
            islogin:req.session.islogin,
            articles:[]
        })
    })


}
module.exports = {showIndexPage}