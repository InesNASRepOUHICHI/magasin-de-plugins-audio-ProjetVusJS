<template>
 <b-container id="app">
    <b-row>
      <b-col>
        <navbar/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <router-view/>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>

import NavBar from './components/NavBar'
export default {
  name: 'App',
  components: { 
    'Navbar':NavBar
}
}
</script>