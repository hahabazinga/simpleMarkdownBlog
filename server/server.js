const express = require('express')
const fs = require('fs')
const marked = require('marked')

const serv = express()

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
}

serv.use(allowCrossDomain)

serv.get('/api/getData', function (req, res) {

  console.log('收到请求', req.query)
  let blogUrl = './static/markdown/' + req.query.blogId + '.md'
  let file = fs.readFileSync(blogUrl, 'utf-8')
  let data = {
    data: marked(file)
  }
  console.log('发送响应', data)
  res.send(data)
})
serv.listen('3000', function () {
  console.log('>server is listening on 3000')
})
