<template>
  <v-card width="600px" outlined light style="padding: 15px">
    <v-btn absolute dark fab top right color="primary" @click="$emit('close')">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-list-item four-line>
      <v-list-item-content>
        <div class="overline mb-4">Details</div>
        <v-list-item-title class="headline mb-1">
          {{ label }}
        </v-list-item-title>
        <v-col
          justify="start"
          cols="5"
          style="padding: 12px 0px"
          align-self="start"
        >
          <v-list-item-subtitle>KCAL: {{ ENERC_KCAL }}</v-list-item-subtitle>
          <v-list-item-subtitle>Protein: {{ PROCNT }}</v-list-item-subtitle>
          <v-list-item-subtitle>Fat: {{ FAT }}</v-list-item-subtitle>
        </v-col>
        <v-col
          justify="start"
          cols="5"
          style="padding: 12px 0px"
          align-self="start"
        >
          <v-list-item-subtitle>Carbs: {{ CHOCDF }}</v-list-item-subtitle>
          <v-list-item-subtitle>Fiber: {{ FIBTG }}</v-list-item-subtitle>
        </v-col>
        <v-list-item-title style="color: #990D35"
          >Available donations: {{ donations }}</v-list-item-title
        >
      </v-list-item-content>

      <v-list-item-avatar tile size="150" color="grey">
        <v-img class="white--text align-end" height="200px" :src="image" />
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-row justify="start">
        <v-col style="maxWidth: 22%">
          <v-menu transition="slide-x-transition" bottom right>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on" margin-right="10px">
                Donate
                <v-icon right dark>mdi-account-heart</v-icon>
              </v-btn>
            </template>

            <v-card class="c-scrollbar" height="300px">
              <v-list>
                <v-list-item
                  v-for="i in 50"
                  :key="i"
                  @click="
                    () => {
                      donate(i);
                    }
                  "
                >
                  <v-list-item-title>{{ i }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </v-col>
        <v-col>
          <v-menu transition="slide-x-transition" bottom right>
            <template v-slot:activator="{ on }">
              <v-btn color="secondary" dark v-on="on">
                Add To Cart
                <v-icon right dark>mdi-cart</v-icon>
              </v-btn>
            </template>

            <v-card class="c-scrollbar" height="300px">
              <v-list>
                <v-list-item
                  v-for="i in 100"
                  :key="i"
                  @click="
                    () => {
                      addToCart(i);
                    }
                  "
                >
                  <v-list-item-title>{{ i }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["food"],
  data: () => {
    return {
      label: "",
      ENERC_KCAL: "",
      PROCNT: "",
      FAT: "",
      CHOCDF: "",
      FIBTG: "",
      image: "",
      donations: 0,
      donationIndex: 0
    };
  },
  mounted() {
    this.label = this.food.label;
    this.ENERC_KCAL = this.food.nutrients.ENERC_KCAL;
    this.PROCNT = this.food.nutrients.PROCNT;
    this.FAT = this.food.nutrients.FAT;
    this.CHOCDF = this.food.nutrients.CHOCDF;
    this.FIBTG = this.food.nutrients.FIBTG;
    this.image = this.food.image;
    this.getDonations();
  },
  methods: {
    getDonations() {
      var myStorage = window.localStorage;
      var dons = localStorage.getItem("donations");
      if (dons) {
        var allDons = JSON.parse(dons);
        var found = false;
        for (let i = 0; i < Object.keys(allDons).length; i++) {
          if (allDons[i].foodId === this.food.foodId) {
            found = true;
            this.donations = allDons[i].amount;
            this.donationIndex = i;
          }
        }
        if (!found) {
          this.donationIndex = Object.keys(allDons).length;
          allDons[Object.keys(allDons).length] = {
            foodId: this.food.foodId,
            amount: 0
          };
          myStorage.setItem("donations", JSON.stringify(allDons));
        }
      } else {
        var newDonation = { 0: { foodId: this.food.foodId, amount: 0 } };
        myStorage.setItem("donations", JSON.stringify(newDonation));
      }
    },
    donate(i) {
      this.donations += i;
      var myStorage = window.localStorage;
      var dons = localStorage.getItem("donations");
      var oldDons = JSON.parse(dons);
      oldDons[this.donationIndex].amount += i;
      dons = JSON.stringify(oldDons);
      myStorage.setItem("donations", dons);
      this.addToCart(i, true);
      this.$emit("close", "d");
    },
    addToCart(amnt, donation = false) {
      var cart = localStorage.getItem("myCart");
      var addition = { food: this.food, amount: amnt, donation };
      if (cart) {
        var oldCart = JSON.parse(cart);
        var found = false;
        for (let i = 0; i < Object.keys(oldCart).length; i++) {
          if (oldCart[i].food.foodId === this.food.foodId) {
            found = true;
            oldCart[i].amount += amnt;
          }
        }

        if (!found) {
          var index = Object.keys(oldCart).length;
          oldCart[index] = addition;
        }
        cart = JSON.stringify(oldCart);
      } else {
        cart = JSON.stringify({ 0: addition });
      }
      localStorage.setItem("myCart", cart);
      this.$emit("close", "c");
    }
  }
};
</script>

<style>
.c-scrollbar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.c-scrollbar::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
</style>
