<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import './globalStyle/global.less'
export default {
    name: 'App'
}
</script>

<style>
  #app{
    width: 100%;
    height: 100%;
  }
</style>
