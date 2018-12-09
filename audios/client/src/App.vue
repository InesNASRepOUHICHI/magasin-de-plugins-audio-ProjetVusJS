<template>
  <div id="app">
    <AppAudio/>
    <AddAudio/>
  </div>
</template>
<script>
import AppAudio from './components/AppAudio'
import AddAudio from './components/AddAudio'

export default {
  name: 'App',
  components: {
    AppAudio,
    AddAudio
  }
}
</script>

