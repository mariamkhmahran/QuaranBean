<template>
  <v-container>
    <v-text-field
      v-model="value"
      type="number"
      label="amount"
      single-line
      style="width:125px"
      outlined
      dense
      height="10px"
      readonly
    >
      <template v-slot:append-outer>
        <v-icon color="primary" @click="increment">mdi-plus-box</v-icon>
      </template>
      <template v-slot:prepend>
        <v-icon color="primary" @click="decrement">mdi-minus-box</v-icon>
      </template>
    </v-text-field>
  </v-container>
</template>

<script>
export default {
  props: ["initial"],
  data() {
    return { value: this.initial ? this.initial : 0 };
  },
  methods: {
    increment() {
      this.value = parseInt(this.value, 10) + 1;
      this.$emit("change", this.value);
    },
    decrement() {
      this.value = parseInt(this.value, 10) - 1;
      this.value = this.value < 0 ? 0 : this.value;
      this.$emit("change", this.value);
    }
  }
};
</script>

<style></style>
