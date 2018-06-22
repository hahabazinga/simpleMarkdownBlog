<template>
  <div id="app">
    <blog-header></blog-header>
    <div class="leftNav">
      <el-table :data="form" @cell-click="onItemClick($event)">
        <el-table-column prop="label">
        </el-table-column>
      </el-table>
      <el-button style="margin-top: 10px;">下一页</el-button>
    </div>

    <div class="markdown-body" v-html="content"></div>
  </div>
</template>
<script>
import blogHeader from './components/blogHeader.vue'
import 'github-markdown-css'
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
      content: ''
    }
  },
  components: {
    blogHeader
  },
  rules: {
    title: [
      { required: true, message: '必填', trigger: 'blur' }
    ]
  },
  methods: {
    onItemClick: function (v) {
      console.log(v)
      let that = this
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
    }
  }
}
</script>

<style>
  .markdown-body{
    max-width: 980px;
    margin-top: 5%;
    margin-left: 25%;
  }
  .leftNav{
    margin: 5% 0;
    width: 20%;
    position: absolute
  }
</style>
