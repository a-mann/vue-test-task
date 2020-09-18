<template>
  <div id="app">
    <router-view name="input"></router-view>
    <router-view name="table"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
}
</script>

<style lang="scss">
  @import "assets/resetCSS.scss";
  body{
    font-family: Arial;
    letter-spacing: 2px;
  }
</style>
