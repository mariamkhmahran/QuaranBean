<template>
  <div class="mainHeader">
    <img alt="Pokedox logo" src="../assets/logo.png" id="logo" @click="redirectHome" />
  </div>
</template>

<script>
export default {
  methods: {
    redirectHome() {
      this.$router.replace({ path: `/` });
    }
  }
};
</script>

<style>
.mainHeader {
  width: 100%;
  height: 65px;
  background-color: black;
  box-shadow: 0px 5px 15px rgba(128, 128, 128, 0.589);
  position: fixed;
  z-index: 10;
}

.mainHeader #logo {
  height: 45px;
  margin: 10px 40px;
  cursor: pointer;
}
</style>