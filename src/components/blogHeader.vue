<template>
  <div class="header">
    <span>{{ msg }}</span>
  </div>
</template>

<script>
export default {
  name: 'myHeader',
  data () {
    return {
      msg: 'Welcome to Your Bolg'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{
  width: 100%;
  height: 10%;
  background-color: #cccccc;
}
  span{
    line-height: 100px;
    margin-left: 5%;
  }
</style>
