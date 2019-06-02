<template>
  <div id="app">
    <v-app> 
      <nav-bar></nav-bar> 
      <router-view/>
    </v-app>
  </div>
</template>

 <script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'

export default { 
  components: {
    'nav-bar':Navbar
  }
}
</script>


<style lang="scss">
 
</style>