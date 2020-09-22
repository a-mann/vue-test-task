<template>
  <div id="app">
    <router-view name="input"></router-view>
    <router-view name="table"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () { // зачем data если в ней ничего нет и никак не испльзуется
    return {
    }
  },
}
</script>

<style lang="scss">
  @import "assets/resetCSS.scss";
  body{
    font-family: Arial; // на случай если в системе нет шрифта Arial хорошо указвать хотя бы семейство шрифтов
    letter-spacing: 2px;
  }
</style>
