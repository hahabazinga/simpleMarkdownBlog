<template>
  <div class="comment">
    <div :model="comments">
      <div v-for="item in comments" :key="item.id">
        <div>
          <p>{{item.id + 1}}楼</p>
          <img class="icon" :src="item.icon"><span class="author">{{item.author}}</span><br /><span class="text">{{item.text}}</span><span @click="showThisReply(item.id)" class="reply">回复</span>
          <div v-show="item.id === showReplyId">
            <el-input v-model="tmpComments" placeholder="输入回复" maxlength="200"></el-input><el-button size="small" type="primary" plain @click="submitReply(item.id)">确定</el-button>
          </div>
          <div class="replies" v-for="(res, index) in item.reply" :key="index">
            <span class="replyLabel">回复{{index + 1}}</span><span>:{{res}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment',
  props: ['blogId'],
  data () {
    return {
      comments: [
        {
          text: '我是一条评论',
          author: '甲',
          icon: '../../static/img/man.png',
          id: 0,
          reply: []
        },
        {
          text: '我是二条评论',
          author: '乙',
          icon: '../../static/img/man.png',
          id: 1,
          reply: []
        }
      ],
      tmpComments: '', // 暂存回复内容
      showReplyId: -1 // 控制回复框显示
    }
  },
  methods: {
    getCommentByBlogId: function (blogId) {
      fetch('http://localhost:3000/api/getData?blogId=' + blogId, {
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          this.comments = data.data
        })
        .catch(function (err) {
          console.log('oops!', err)
        })
    },
    showThisReply: function (commentId) {
      this.showReplyId = commentId
    },
    submitReply: function (id) {
      console.log('ewr', this.tmpComments, id)
      if (!this.tmpComments) {
        this.showReplyId = -1
        return
      }
      this.comments[id].reply.push(this.tmpComments)
      this.tmpComments = ''
      this.showReplyId = -1
      console.log('clicked', this.comments)
    }
  },
  mounted: function () {
    console.log('blogId', this.blogId)
    // this.getCommentByBlogId(this.blogId)
  }
}

</script>
<style scoped>
  .comment{
    font-size: 14px;
    margin-left: 50px;
    margin-bottom: 20px;
    line-height: 25px;
  }
  .author{
    font-size: 16px;
    height: 28px;
    line-height: 28px;
    font-weight: bold;
    color: #009a61;
  }
  .text{
    word-wrap: break-word;
    color: #333;
    margin-left: 50px;
  }
  .icon{
    width: 32px;
    height: 32px;
  }
  .reply{
    color: #999;
    margin-left: 32px;
  }
  .replies{
    color: #999
  }
  .replyLabel{
    color: orangered;
    margin-left: 80px;
  }
</style>
