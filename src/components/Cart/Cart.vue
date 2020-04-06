<template>
  <v-container>
    <v-card v-if="this.foods" style="margin-top:30px" class="mx-auto">
      <v-col :cols="12">
        <cart-row
          :key="i"
          v-for="(food, i) in foods"
          :product="food"
          :index="i"
          @deletion="deleteItem"
        />
      </v-col>
    </v-card>
    <v-card v-if="this.foods" style="margin: 20px 0">
      <v-row justify="space-between" style="padding: 10px 20px">
        <p class="price font-weight-bold">{{ total }} EGP</p>
        <v-dialog persistent max-width="440px">
          <template v-slot:activator="{ on }">
            <v-btn
              @click="pay"
              v-on="on"
              color="secondary"
              class="ma-2 white--text"
            >
              <v-icon left>mdi-cash-multiple</v-icon>
              Pay
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline"
              >Thank you for choosing us.</v-card-title
            >
            <v-card-text
              >This is a demo website. Most of the functionalities, like
              payment, are still under construction. Until it's all done this on
              is one the house.<v-icon right
                >mdi-emoticon-wink-outline</v-icon
              ></v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="redirectHome"
                >Done</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-card>
    <v-card v-else><v-card-text>The Cart isEmpty</v-card-text> </v-card>
  </v-container>
</template>

<script>
import cartRow from "./cartRow";
export default {
  components: {
    cartRow
  },
  data: () => ({
    amount: 0,
    foods: [],
    total: 0
  }),
  beforeMount() {
    this.update();
  },
  methods: {
    update() {
      this.foods = JSON.parse(localStorage.getItem("myCart"));
      this.getTotal();
    },
    getTotal() {
      for (let i = 0; i < Object.keys(this.foods).length; i++) {
        const item = this.foods[i];
        this.total +=
          (item.amount - item.donationAmount) *
          parseInt(item.food.nutrients.PROCNT * 2);
        console.log(
          (item.amount - item.donationAmount) *
            parseInt(item.food.nutrients.PROCNT * 2)
        );
      }
    },
    deleteItem() {
      var cart = JSON.parse(localStorage.getItem("myCart"));
      var newCart = {};
      for (let i = 0, j = 0; i < Object.keys(cart).length; i++, j++) {
        if (cart[i].amount === 0) {
          j--;
        } else {
          newCart[j] = cart[i];
        }
      }
      console.log(cart, newCart);
      localStorage.setItem("myCart", JSON.stringify(newCart));
      this.update;
      this.$emit("cartAction");
    },
    checkDonations() {
      var myStorage = window.localStorage;
      var dons = localStorage.getItem("donations");
      var allDons = JSON.parse(dons);
      for (let i = 0; i < Object.keys(allDons).length; i++) {
        if (allDons[i].foodId === this.food.foodId) {
          this.donations = allDons[i].amount;
          this.donationIndex = i;
        }
      }
      var newDonation = { 0: { foodId: this.food.foodId, amount: 0 } };
      myStorage.setItem("donations", JSON.stringify(newDonation));
    },
    pay() {
      localStorage.removeItem("myCart");
      this.$emit("cartAction");
    },
    redirectHome() {
      this.$router.replace({ path: `/` });
    }
  }
};
</script>

<style></style>
