<template>
 <div id="app">
        <router-view/>
 </div>
</template>
<script>

import AppAudio from './components/AppAudio'


export default {
  name: 'App',
 components: {
    AppAudio,
   
  }
}
</script>