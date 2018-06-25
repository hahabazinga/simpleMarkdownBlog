<template>
  <div id="app">
    <blog-header></blog-header>
    <div class="container">
      <div class="leftNav">
        <el-table :data="form" @cell-click="onItemClick($event)" highlight-current-row @current-change="handleCurrentChange">
          <el-table-column prop="label" highlight-current-row="highlightRow">
          </el-table-column>
        </el-table>
        <el-button style="margin-top: 10px;" @click="nextPage()">下一页</el-button>
        <el-button style="margin-top: 10px;" @click="prePage()">上一页</el-button>
      </div>
      <p class="title">{{title}}</p>
      <div class="markdown-body" v-html="content"></div>
    </div>
    <blog-footer></blog-footer>
  </div>
</template>
<script>
import blogHeader from './components/blogHeader.vue'
import blogFooter from './components/blogFooter.vue'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/github-gist.css'

export default {
  name: 'App',
  data () {
    return {
      form: [
        {
          value: '20180622',
          label: '文本1'
        },
        {
          value: '20180623',
          label: '文本1'
        }
      ],
      content: '',
      title: '',
      currentPage: 1,
      currentRow: null
    }
  },
  mounted: function () {
    fetch('http://localhost:3000/api/getList?pageId=' + this.currentPage)
      .then(res => res.json())
      .then(data => {
        this.form = data.data
      })
  },
  components: {
    blogHeader,
    blogFooter
  },
  methods: {
    handleCurrentChange: function (val) {
      this.currentRow = val
    },
    onItemClick: function (v) {
      let that = this
      that.title = v.label
      fetch('http://localhost:3000/api/getData?blogId=' + v.value, {
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          that.content = data.data
        })
        .catch(function (e) {
          console.log('oops! error!', e)
        })
    },
    nextPage: function () {
      this.currentPage++
      fetch('http://localhost:3000/api/getList?pageId=' + this.currentPage)
        .then(res => res.json())
        .then(data => {
          if (Object.keys(data).length > 0) {
            this.form = data.data
          } else {
            this.currentPage--
          }
        })
    },
    prePage: function () {
      if (this.currentPage > 1) {
        this.currentPage--
      }
      console.log(this.currentPage)
      fetch('http://localhost:3000/api/getList?pageId=' + this.currentPage)
        .then(res => res.json())
        .then(data => {
          this.form = data.data
        })
    }
  }
}
</script>

<style>
  html, body, #app{
    min-height: 100%;
  }
  .container{
    min-height: 77%;
    width: 100%;
    position: relative;
    margin: 0;
    padding: 0;
  }
  .markdown-body{
    max-width: 80%;
    margin-left: 25%;
  }
  .markdown-body::after{
    display: none;
  }
  .markdown-body::before{
    display: none;
  }
  .leftNav{
    margin: 5% 0;
    width: 20%;
    position: absolute
  }
  .title{
    width: 100%;
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
  @media screen and (max-width: 380px){
    .leftNav{
      position: relative;
      width: 100%;
    }
    .markdown-body{
      margin: 0;
      max-width: 100%;
    }
  }
</style>
