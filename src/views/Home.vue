<template>
  <v-container fluid>
    <v-layout row v-if="smooties.length == 0">
      <v-flex xs12>
        <v-layout align-center justify-center row fill-height>
          <v-progress-circular
            :size="70"
            :width="7"
            color="amber"
            indeterminate
            class="spinner-container"
          ></v-progress-circular>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="smooties.length != 0">
      <v-flex xl4 md4 sm6 xs12 v-for="smoothie in smooties" :key="smoothie.id">
        <v-card class="mx-2 my-1 px-2">
          <v-card-title class="font-weight-bold black--text">{{smoothie.title}}</v-card-title>
          <v-card-text class="pt-2">
            <div class="text-xs-center">
              <v-chip
                v-for="(ingredient,index) in smoothie.ingredients"
                :key="index"
                class="ma-2"
              >{{ingredient}}</v-chip>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="py-3">
            <v-spacer></v-spacer>
            <!-- //for edit -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn fab color="blue darken-4 white--text" v-on="on" class="mr-2">
                  <v-icon class="subheading">edit</v-icon>
                </v-btn>
              </template>
              <span>Edit</span>
            </v-tooltip>
            <!-- for delete -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  fab
                  color="red darken-4 white--text"
                  v-on="on"
                  @click="deleteSmoothie(smoothie.id)"
                >
                  <v-icon class="subheading">delete</v-icon>
                </v-btn>
              </template>
              <span>Remove</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { smoothies } from "@/firebase/init.js";
export default {
  name: "home",
  data() {
    return {
      smooties: []
    };
  },
  methods: {
    deleteSmoothie(smoothie_id) {
      //confirm
      if (confirm("Remove Smoothie ?")) {
        smoothies
          .doc(smoothie_id)
          .delete()
          .then(() => {
            console.log("Removed");
            //refetchSmoothie
            this.fetchSmoothies();  
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    fetchSmoothies() {
      this.smooties=[]
      //fetch data from the firestore
      smoothies
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let smoothie = doc.data();
            smoothie.id = doc.id;
            this.smooties.push(smoothie);
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.fetchSmoothies();
  }
};
</script>


<style>
.spinner-container {
  min-height: 70vh;
}
</style>
