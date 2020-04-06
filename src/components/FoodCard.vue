<template>
  <v-card
    class="mx-auto"
    shaped
    style="margin= 0px 10px;"
    outlined
    hover
    ripple
    @click="$emit('showDetails')"
  >
    <v-img class="white--text align-end" height="200px" :src="img" />

    <v-card-title style="color: #757761">{{ food.label }}</v-card-title>

    <!-- <v-card-text class="text--primary"> </v-card-text> -->
    <v-row style="padding: 5px 20px;" justify="space-between">
      <v-chip dark class="ma-2" :color="chipColor">
        {{ food.categoryLabel }}
      </v-chip>
      <p class="price font-weight-bold">{{ price }} EGP</p>
    </v-row>
  </v-card>
</template>

<script>
/* eslint-disable no-console */
import defaultimg from "@/assets/noImage.jpg";

export default {
  name: "FoodCard",
  props: { food: Object },
  computed: {
    chipColor() {
      var color = this.food.categoryLabel === "food" ? "#E54B4B" : "#AD5656";
      return color;
    },
    img() {
      return this.food.image ? this.food.image : defaultimg;
    },
    price() {
      return parseInt(this.food.nutrients.PROCNT * 2);
    }
  }
};
</script>

<style scoped>
.price {
  color: #757761;
  margin: 14px;
}
</style>
