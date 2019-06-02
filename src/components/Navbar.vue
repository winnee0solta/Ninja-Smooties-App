<template>
  <v-toolbar color="primary white--text">
    <v-toolbar-title class="nav-title" @click="goHome" >Smoothies ❤️</v-toolbar-title> 
    <v-spacer></v-spacer> 
      <v-btn
            fab
            color="secondary white--text"
            bottom
            right
            absolute 
            @click="createNew()"
          >
            <v-icon>add</v-icon>
          </v-btn> 
  </v-toolbar>
</template>

<script>
export default { 
    name : 'Navbar', 
    methods: {
        createNew(){
            console.log('create new hit!');
            this.$router.push('/add-smoothie')
        },
        goHome(){
            this.$router.push({name:'home'})
        }
    },
}
</script>
 

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Cookie&display=swap'); 
  
.nav-title{
    font-family: 'Cookie', cursive;
    font-size: 35px;
    cursor: pointer;
}

</style>