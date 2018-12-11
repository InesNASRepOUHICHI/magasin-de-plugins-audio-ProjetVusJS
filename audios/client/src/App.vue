<template>
 <b-container id="app">
        <router-view/>
  </b-container>
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