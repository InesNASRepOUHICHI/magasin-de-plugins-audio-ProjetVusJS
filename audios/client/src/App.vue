<template>
  <div id="app">
    <AudiosList msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import AudiosList from './components/AudiosList.vue'
import listGrid from './components/listGrid'
import listView from './components/listView'
import gridView from './components/gridView'
export default {
  name: 'app',
  components: {
    AudiosList,listGrid, listView, gridView
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
