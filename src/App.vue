<template>
  <v-app>
    <Header :cart="cart" />
    <v-content>
      <router-view @cartAction="cartSize"></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import Home from "./components/Home";
import Header from "./components/Header";

export default {
  name: "App",

  components: {
    Header
  },
  data() {
    return {
      cart: 0
    };
  },
  beforeMount() {
    this.cartSize();
  },
  methods: {
    cartSize() {
      var currCart = localStorage.getItem("myCart");

      this.cart = currCart ? Object.keys(JSON.parse(currCart)).length : 0;
    }
  }
};
</script>
