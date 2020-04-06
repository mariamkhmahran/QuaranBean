import axios from "axios";
import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Home from "./components/Home";
import Cart from "./components/Cart/Cart";
import vuetify from "./plugins/vuetify";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/cart", component: Cart }
  // { path: "/Groceries/:name", component: DetailsView, props: true }
];
const router = new VueRouter({ routes });

Vue.mixin({
  data() {
    return {
      next:
        "https://api.edamam.com/api/food-database/parser?ingr=potato&app_id=fe6004b8&app_key=358e1b6a09fbb3d5b8a9a30a713fc5e0"
    };
  },
  methods: {
    async getGrocery(ID) {
      var Grocery = await this.getGroceryBaseData(ID);
      return {
        ...Grocery
      };
    },
    async getGroceryBaseData(ID) {
      var label;
      var nutrients;
      var category;
      var categoryLabel;
      var image;
      var url = `https://api.edamam.com/api/food-database/parser?ingr=${ID}&app_id=fe6004b8&app_key=358e1b6a09fbb3d5b8a9a30a713fc5e0`;
      await axios.get(url).then(Grocery => {
        Grocery = Grocery.data;
        label = Grocery.label;
        nutrients = Grocery.nutrients;
        category = Grocery.category;
        categoryLabel = Grocery.categoryLabel;
        image = Grocery.image;
      });
      return {
        label,
        nutrients,
        category,
        categoryLabel,
        image
      };
    },
    async loadNextPage() {
      var newGroceries;
      await axios.get(this.next).then(res => {
        res = res.data;
        newGroceries = res.hints;

        this.next = res._links.next.href;
      });
      return newGroceries;
    },
    async changeNextUrl(text) {
      this.next = `https://api.edamam.com/api/food-database/parser?ingr=${text}&app_id=fe6004b8&app_key=358e1b6a09fbb3d5b8a9a30a713fc5e0`;
    }
  }
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
