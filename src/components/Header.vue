<template>
  <v-app-bar app color="header">
    <div class="d-flex align-center">
      <span><b>QUARANBEAN</b></span>
    </div>

    <v-spacer></v-spacer>

    <v-btn href="/cart" text>
      <v-badge color="red" :content="cart" :value="cart">
        <v-icon height="20px">mdi-cart-outline</v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: ["cart"],
  methods: {
    redirectHome() {
      this.$router.replace({ path: `/` });
    }
  }
};
</script>
