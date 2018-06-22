const express = require('express')
const fs = require('fs')
const marked = require('marked')
const filePath = './static/markdown/'
const FILE_LIST = []
const MAX_PER_PAGE = 10

const serv = express()

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
}

serv.use(allowCrossDomain)

fs.readdirSync(filePath).forEach(function (v) {
  console.log(v)
  FILE_LIST.push(v)
})
serv.get('/api/getList', function (req, res) {
  console.log('getList收到请求', req.query.pageId)
  let pageId = req.query.pageId
  if (FILE_LIST.length < (pageId - 1) * MAX_PER_PAGE) {
    res.send({})
  } else {
    let data = FILE_LIST.slice((pageId - 1) * MAX_PER_PAGE, pageId * MAX_PER_PAGE)
    console.log(FILE_LIST, (pageId - 1) * MAX_PER_PAGE)
    data = data.map(function (v) {
      return {
        label: v.slice(0, -3),
        value: v
      }
    })
    res.send(JSON.stringify({
      data: data
    }))
    console.log('getList发送响应', data)
  }
})
serv.get('/api/getData', function (req, res) {
  console.log('getData收到请求', req.query)
  let blogUrl = filePath + req.query.blogId
  let file = fs.readFileSync(blogUrl, 'utf-8')
  let data = {
    data: marked(file)
  }
  console.log('getData发送响应', data)
  res.send(data)
})
serv.listen('3000', function () {
  console.log('>server is listening on 3000')
})
