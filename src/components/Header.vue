<template>
  <v-app-bar app color="header">
    <div class="d-flex align-center">
      <img @click="redirectHome" class="banner" :src="logo" />
    </div>

    <v-spacer></v-spacer>

    <v-btn @click="openCart" text>
      <v-badge color="red" :content="cart" :value="cart">
        <v-icon height="20px">mdi-cart-outline</v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>
</template>

<script>
import banner from "../assets/banner.png";
export default {
  props: ["cart"],
  data() {
    return {
      logo: banner
    };
  },
  methods: {
    redirectHome() {
      this.$router.replace({ path: `/` });
    },
    openCart() {
      this.$router.replace({ path: "/cart" });
    }
  }
};
</script>

<style scoped>
.banner {
  margin: 0px 0px 10px 10px;
  width: 220px;
  cursor: pointer;
}
</style>
