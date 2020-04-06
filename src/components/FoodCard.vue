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
    <v-img class="white--text align-end" height="200px" :src="food.image" />

    <v-card-title style="color: #757761">{{ food.label }}</v-card-title>

    <!-- <v-card-text class="text--primary"> </v-card-text> -->
    <v-row style="padding: 5px 20px;">
      <v-chip dark class="ma-2" :color="chipColor">
        {{ food.categoryLabel }}
      </v-chip>
    </v-row>
  </v-card>
</template>

<script>
/* eslint-disable no-console */

export default {
  name: "FoodCard",
  props: { food: Object },
  computed: {
    chipColor() {
      var color = this.food.categoryLabel === "food" ? "#E54B4B" : "#AD5656";
      return color;
    },
    img() {
      return this.food.image ? this.food.image : "../assets/noImage.jpg";
    }
  }
};
</script>

<style scoped>
#container {
  width: 22%;
  margin: 10px auto;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.cardBody {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  position: relative;
  top: 0px;
  right: 0px;
}

.side#container {
  width: 45%;
}

#container:hover {
  transform: scale(1.03);
  box-shadow: 0 2px 12px 0 rgba(255, 90, 96, 0.37);
}

#container:hover .sprite {
  box-shadow: 0 2px 12px 0 rgba(255, 90, 96, 0.37);
}

.cardFooter {
  height: 73px;
  padding: 8%;
  margin-top: 21%;
}

#pokeNumber {
  color: rgb(141, 140, 140);
  margin: 10px 0px;
}

#name {
  color: black;
  font-size: 20px;
}

.sprite {
  align-self: center;
  width: 80%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  background-color: white;
  position: absolute;
  z-index: 1;
  top: 5px;
  left: 11%;
  transition: 0.3s;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

#tags {
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

@media only screen and (max-width: 1200px) {
  #container {
    width: 32%;
  }

  .side#container {
    width: 97%;
  }
}
@media only screen and (max-width: 800px) {
  #container {
    width: 49%;
  }

  .side#container {
    width: 97%;
  }
}
@media only screen and (max-width: 500px) {
  #container {
    width: 99%;
  }

  .side#container {
    width: 97%;
  }
}
</style>
