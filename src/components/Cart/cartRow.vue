<template>
  <v-col style="padding-top:0px">
    <v-row>
      <v-col cols="7">
        <v-row style="margin: 20px">
          <img class="foodImg" :src="image" />
          <v-col style="padding: 0px 12px">
            <h1 class="prim">{{ food.label }}</h1>
            <amount-picker
              :initial="amount"
              @change="val => changeAmount(val)"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="5" justify="center">
        <v-row justify="space-around" style="padding: 14% 0px;">
          <p class="price font-weight-bold">{{ price }} EGP</p>
          <v-dialog v-model="dialog" persistent max-width="440px">
            <template v-slot:activator="{ on }">
              <v-btn
                @click="checkDonations"
                v-on="on"
                class="ma-2"
                outlined
                color="primary"
              >
                <v-icon left>mdi-heart</v-icon>
                Check Available Donations
              </v-btn>
            </template>
            <v-card>
              <v-card-title dark class="headline header " primary-title>
                {{ food.label }}
              </v-card-title>
              <v-card-text style="font-size: 18px;" v-if="donations">
                <br />
                <b>Available donations can cover this for you</b>
                <v-icon color="primary" right>mdi-emoticon-outline</v-icon>
              </v-card-text>
              <v-card-text v-else-if="less">
                <br />
                Only {{ donationsAmnt }} donations available
              </v-card-text>
              <v-card-text v-else>
                <br />
                Unfortuanely no donations available at the moment
                <v-icon color="secondary" right
                  >mdi-emoticon-sad-outline</v-icon
                >
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="donations || less"
                  color="primary"
                  text
                  @click="useDonations"
                >
                  Use
                </v-btn>
                <v-btn color="secondary" text @click="dialog = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-col>
</template>

<script>
import amountPicker from "./amountPicker";
import defaultimg from "../../assets/noImage.jpg";
export default {
  props: ["product", "index"],
  data() {
    return {
      food: this.product.food,
      amount: this.product.amount,
      dialog: false,
      donations: false,
      donationAmount: this.product.donationAmount,
      less: false,
      donationsIndex: 0,
      price: 0
      // label: this.food.label,
      // ENERC_KCAL: this.food.nutrients.ENERC_KCAL,
      // PROCNT: this.food.nutrients.PROCNT,
      // FAT: this.food.nutrients.FAT,
      // CHOCDF: this.food.nutrients.CHOCDF,
      // FIBTG: this.food.nutrients.FIBTG
    };
  },
  components: {
    amountPicker
  },
  computed: {
    image() {
      console.log(this.product.food, this.food);

      return this.food.image ? this.food.image : defaultimg;
    }
  },
  beforeMount() {
    this.checkDonations();
    this.getPrice();
  },
  methods: {
    getPrice() {
      this.price =
        (this.amount - this.donationAmount) *
        parseInt(this.food.nutrients.PROCNT * 2);
      console.log(
        this.amount,
        this.donationAmount,
        this.product.donationAmount
      );
    },
    changeAmount(val) {
      var cart = JSON.parse(localStorage.getItem("myCart"));
      var change = val - this.amount;

      cart[this.index].amount = val;
      this.amount = val;
      if (cart[this.index].donationAmount > cart[this.index].amount) {
        cart[this.index].amount.donationAmount += val;
        this.donationAmount += change;
      }
      localStorage.setItem("myCart", JSON.stringify(cart));
      if (val === 0) {
        this.$emit("deletion");
        this.$el.parentNode.removeChild(this.$el);
      }
      this.getPrice();
    },
    checkDonations() {
      this.donations = false;
      this.less = false;
      var dons = localStorage.getItem("donations");
      var allDons = JSON.parse(dons);
      for (let i = 0; i < Object.keys(allDons).length; i++) {
        if (allDons[i].foodId === this.food.foodId) {
          this.donationsAmnt = allDons[i].amount;
          this.donationsIndex = i;
          if (allDons[i].amount >= this.amount) {
            this.donations = true;
          } else if (allDons[i].amount > 0) {
            this.less = true;
          }
        }
      }
    },
    useDonations() {
      var dons = JSON.parse(localStorage.getItem("donations"));
      var cart = JSON.parse(localStorage.getItem("myCart"));
      var deductedAmnt = 0;
      if (this.donations) {
        dons[this.donationsIndex].amount -= this.amount;
        deductedAmnt = this.amount;
      } else {
        deductedAmnt = dons[this.donationsIndex].amount;
        dons[this.donationsIndex].amount = 0;
      }
      for (let i = 0; i < Object.keys(cart).length; i++) {
        if (cart[i].food.foodId === this.food.foodId) {
          cart[i].donationAmount += deductedAmnt;
          break;
        }
      }
      this.donationAmount += deductedAmnt;
      localStorage.setItem("donations", JSON.stringify(dons));
      localStorage.setItem("myCart", JSON.stringify(cart));
      this.getPrice();

      this.dialog = false;
    }
  }
};
</script>

<style scoped>
.foodImg {
  max-width: 150px;
  max-height: 150px;
  width: auto;
  height: auto;
}

.prim {
  color: #757761;
  margin-left: 14px;
}

.cross {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
