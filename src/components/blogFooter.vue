<template>
  <footer class="footer">
    <span>{{ msg }}</span>
    <a v-bind:href="githubUrl"><img title="github" alt="github" :src="githubPng"></a>
    <span>与我联系<img title="wechat点击放大" alt="wechat" :class="{ wechatCodeSM: !isBigger, webchatCodeBig: isBigger }" :src="wechatCode" @click="bigger($event)"></span>
  </footer>
</template>

<script>
export default {
  name: 'myHeader',
  data () {
    return {
      msg: '所有权利归作者所有',
      githubUrl: 'https://github.com/hahabazinga/simpleMarkdownBlog',
      githubPng: '../../static/img/github.png',
      wechatCode: '../../static/img/weixin.jpg',
      isBigger: false
    }
  },
  methods: {
    bigger: function (ev) {
      this.isBigger = !this.isBigger
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .footer{
    //position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    text-align: center;
    background-color: #cccccc;
    clear: both;
  }
  span{
    line-height: 100px;
  }
  span:nth-last-child(1){
    padding-left: 50px;
  }
  .wechatCodeSM{
    width: 32px;
    height: 32px;
  }
  .webchatCodeBig{
    position: relative;
    margin-top: -80px;
    width: 150px;
    height: 150px;
  }
</style>
