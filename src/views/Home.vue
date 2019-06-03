<template>
  <v-container fluid>
    <v-progress-linear indeterminate color="amber darken-2" :active="showloader"></v-progress-linear>

    <v-container fluid>
      <!-- //for search box -->
      <v-layout row wrap>
        <v-flex md6 offset-md3 xs12>
          <v-text-field
            placeholder="Search delicious shakes"
            solo
            clearable
            v-model="searchfield"
            v-on:keyup.enter="searchSmoothie()"
             @click:clear="fetchSmoothies"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <!-- /for smoothies card -->
      <v-layout row wrap v-if="smooties.length == 0">
        <v-flex md8 offset-md2 xs12>
          <v-alert type="error" class="mb-3">Sorry 🐵 stole smoothies ! 😭😭</v-alert>
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
                    @click="deleteSmoothie(smoothie.id,smoothie.searchindexer_id)"
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
  </v-container>
</template>

<script>
// @ is an alias to /src
import { smoothies } from "@/firebase/init.js";
import firebase from "firebase";
import functions from "firebase/functions";
export default {
  name: "home",
  data() {
    return {
      smooties: [],
      searchfield: null,
      showloader: false
    };
  },
  methods: {
    deleteSmoothie(smoothie_id, searchindexer_id) {
      //confirm
      if (confirm("Remove Smoothie ?")) {
        //get searchindexer_id of smothie
        this.showloader = true; //show loader
        smoothies
          .doc(smoothie_id)
          .delete()
          .then(() => {
            this.showloader = false; //hide loader
            //refetchSmoothie
            this.fetchSmoothies();
          })
          .catch(error => {
            console.log(error);
            this.showloader = false; //hide loader
          });
      }
    },
    fetchSmoothies() {
      this.showloader = true; //show loader
      this.smooties = [];
      //fetch data from the firestore
      smoothies
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let smoothie = doc.data();
            smoothie.id = doc.id;
            this.smooties.push(smoothie);
            this.showloader = false; //hide loader
          });
        })
        .catch(error => {
          console.log(error);
          this.showloader = false; //hide loader
        });
    },
    searchSmoothie() {
      if (this.searchfield == null || this.searchfield == " ") return; //donothing if empty
      var searchterm = this.searchfield.toLowerCase(); //lower case search term
      this.smooties = []; //empty array
      this.showloader = true; //show loader

      //create firebase callable function
      let searchSmoothies = firebase
        .functions()
        .httpsCallable("searchSmoothies");
      //invoke function
      searchSmoothies({ searchterm: searchterm })
        .then(result => {
          console.log(result);
          this.smooties = result.data.found_smoothies;
          this.showloader = false; //hide loader
        })
        .catch(error => {
          this.showloader = false; //hide loader
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
