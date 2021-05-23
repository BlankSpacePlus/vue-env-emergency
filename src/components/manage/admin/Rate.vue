<template>
  <!--虽然我写的比较丑，但Github的组件 https://github.com/customElementUI/rate 对我帮助较大-->
  <div>
    <h1>评分</h1>
    <vm-rate v-model="rateValue" :allow-half="true" size="50" show-text></vm-rate>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rateValue: 0,
    }
  }
}
</script>

<style scoped>
div {
  width:500px;
  height:300px;
  position:absolute;
  left:50%;
  top:50%;
  margin:-100px 0 0 -150px
}
</style>
