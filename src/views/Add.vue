<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex md7 offset-md3 xs12>
        <v-card>
          <v-card-text>
            <v-form ref="form" @submit.prevent>
              <!-- //for title -->
              <v-text-field v-model="title" label="Title" :rules="rules.titleRules"></v-text-field>
              <!-- //for adding new ingredient -->
              <v-text-field
                v-model="ingredientfield"
                label="Ingredients"
                append-icon="add"
                @click:append="addIngredient"
                v-on:keyup.enter="addIngredient"
              ></v-text-field>
              <!-- ingredients list -->
              <v-list>
                <div v-for="(ingredient ,index) in ingredients" :key="index">
                  <v-divider v-if="index != 0"></v-divider>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title v-text="ingredient"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <!-- for delete -->
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            fab
                            color="red darken-4 white--text"
                            v-on="on"
                            @click="removeIngredient(index)"
                          >
                            <v-icon class="subheading">delete</v-icon>
                          </v-btn>
                        </template>
                        <span>Remove</span>
                      </v-tooltip>
                    </v-list-item-icon>
                  </v-list-item>
                  <v-divider v-if="index != (ingredients.length-1)"></v-divider>
                </div>
              </v-list>
              <v-btn color="primary" @click="addSmoothie" :disabled="disablebtn">Submit</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- //loader -->
    <v-overlay :value="showloader">
      <v-progress-circular :size="70" :width="7" color="amber" indeterminate></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { smoothies } from "@/firebase/init.js";
import firebase from "firebase";
//for slug
import slugify from "slugify";
// for uuid
import uuidv1 from "uuid/v1";
export default {
  name: "Add",
  data() {
    return {
      title: "",
      slug: null,
      ingredients: [],
      ingredientfield: "",
      rules: {
        titleRules: [
          v => !!v || "Title is required"
          // v => v.length <= 10 || 'Name must be less than 10 characters'
        ]
      },
      disablebtn: false,
      showloader: false
    };
  },
  methods: {
    addSmoothie() {
      if (
        this.title == null ||
        this.title == "" ||
        this.ingredients.length == 0
      ) {
        return;
      }
      //disable add button and show loader
      this.disablebtn = true;
      this.showloader = true;

      //create slug
      var toslug = this.title + " " + uuidv1();

      this.slug = slugify(toslug, {
        replacement: "-",
        remove: /[$*_+~.()'"!\:@{}]/g,
        lower: true
      });

      var titlearray = []
      this.title.split(" ").forEach((singletitle)=>{
          titlearray.push(singletitle.toLowerCase())
      });
      var searchvalue_array = titlearray.concat(this.ingredients);
      searchvalue_array.push(this.title.toLowerCase());

      console.log(searchvalue_array);
 
      smoothies
        .add({
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug,
          searchvalue: searchvalue_array,
          created_at: firebase.firestore.FieldValue.serverTimestamp(),
          updated_at: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(docRef => {
          //added smoothie
          //enable add button and hide loader
          this.disablebtn = false;
          this.showloader = false;
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          //enable add button and hide loader
          this.disablebtn = false;
          this.showloader = false;
          console.log(error);
        });
    },
    addIngredient() {
      if (this.ingredientfield == null || this.ingredientfield == "") {
        return;
      }
      var temp_ingredient = this.ingredientfield;
      this.ingredientfield = "";
      this.ingredients.push(temp_ingredient.toLowerCase());
    },
    removeIngredient(ingredient_index) {
      if (ingredient_index == null) {
        return;
      }
      this.ingredients.splice(ingredient_index, 1);
    }
  }
};
</script>

 
<style scoped lang="scss">
</style>
