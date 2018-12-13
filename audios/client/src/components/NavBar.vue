<template>
  <div>
  <b-navbar toggleable="md" type="dark" variant="info">
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
  <b-navbar-brand style= "font-size:1.5em" href="#">Plugins - MOD Devices</b-navbar-brand>
  <b-collapse is-nav id="nav_collapse">
    
    <!-- Right aligned nav items -->
     <b-navbar-nav class="ml-auto">
          <b-nav-item  style= "font-size:1.5em" href="/">Home</b-nav-item>
          <b-nav-item  style= "font-size:1.5em" v-if="this.$session.exists()" href="/addAudio" >Add Audio</b-nav-item>
          <b-nav-item  style= "font-size:1.5em" v-if="this.$session.exists()" href="/author">My Plugins</b-nav-item>
          <b-nav-item  style= "font-size:1.5em" v-if="this.$session.exists()" href="/pluginShop" >Plugin Shop</b-nav-item>
           <b-nav-item style= "font-size:1.5em" v-if="!this.$session.exists()" href="/login">Login</b-nav-item>
           <b-nav-item style= "font-size:1.5em" v-if="this.$session.exists()" v-on:click="logout()">Logout</b-nav-item>
     </b-navbar-nav>
  </b-collapse>
</b-navbar>
</div>
</template>
<script>
export default {
  name: 'Navbar',
  methods: {
     logout: function () {
         this.$session.destroy()
         this.$router.push('/login')
                
       }
     }
};

</script>