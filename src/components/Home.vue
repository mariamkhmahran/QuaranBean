<template>
  <v-container width="80%">
    <v-col cols="12" sm="6" style="overflow: hidden;height: 90px;">
      <v-text-field
        v-model="searchValue"
        height="50px"
        outlined
        clearable
        label="Search"
        type="text"
      >
        <template v-slot:append>
          <v-icon @click="search">mdi-magnify</v-icon>
        </template>
      </v-text-field>
    </v-col>
    <v-divider></v-divider>
    <v-col class="notifications">
      <v-alert
        dismissible
        elevation="2"
        icon="mdi-heart"
        transition="scale-transition"
        :value="alert === `d`"
        color="primary"
        dark
        border="top"
        v-for="(alert, i) in alerts"
        :key="i + alert"
      >
        Thank you for your generous donation!
      </v-alert>
      <v-alert
        dismissible
        elevation="2"
        transition="scale-transition"
        :value="alert === `c`"
        dark
        border="top"
        type="success"
        v-for="(alert, i) in alerts"
        :key="i"
      >
        Item Added to Cart
      </v-alert></v-col
    >
    <v-row class="text-center">
      <v-col :key="i" v-for="(food, i) in foods" cols="4">
        <Food-Card
          :food="food.food"
          @showDetails="
            () => {
              openDetails(i);
            }
          "
        ></Food-Card>
      </v-col>
    </v-row>
    <v-overlay light :value="showDetails">
      <Details-Panel
        :food="foods[currSelected].food"
        @close="
          type => {
            showDetails = false;
            if (type === 'd' || type === 'c') this.newAlert(type);
          }
        "
      />
    </v-overlay>
  </v-container>
</template>

<script>
import FoodCard from "./FoodCard";
import DetailsPanel from "./DetailsPanel";

export default {
  name: "Home",
  components: {
    FoodCard,
    DetailsPanel
  },
  data: () => {
    return {
      foods: [],
      showDetails: false,
      currSelected: 0,
      donationDone: false,
      addedToCart: false,
      alerts: [],
      searchValue: ""
    };
  },
  beforeMount() {
    this.getGroceries().then(() => {
      window.onscroll = this.scroll;
    });
  },
  methods: {
    async getGroceries(replace) {
      await this.loadNextPage().then(newGroceries => {
        var arr = this.foods.value ? [] : this.foods;
        this.foods = replace ? newGroceries : arr.concat(newGroceries);
        console.log(this.foods);
      });
    },
    openDetails(index) {
      this.showDetails = true;
      this.currSelected = index;
    },
    newAlert(type) {
      this.alerts += [type];
      setTimeout(this.removeAlert, 6000);
      this.$emit("cartAction");
    },
    removeAlert() {
      this.alerts = this.alerts.substring(1);
    },
    async search() {
      await this.changeNextUrl(this.searchValue);
      await this.getGroceries(true);
      this.searchValue = "";
    },
    scroll() {
      console.log("scrolll");

      let bottomOfWindow =
        window.innerHeight + window.pageYOffset >= document.body.scrollHeight;
      if (bottomOfWindow) {
        this.getGroceries();
      }
    }
  }
};
</script>

<style scoped>
.notifications {
  position: fixed;
  right: 0px;
  bottom: 0;
  z-index: 2;
  width: 30%;
}
</style>
