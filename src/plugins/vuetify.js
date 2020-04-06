// src/plugins/vuetify.js

import Vue from "vue";
import Vuetify from "vuetify/lib";

// import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#990D35",
        secondary: "#757761",
        accent: "#E54B4B",
        header: "#FCD581"
      }
    }
  }
});
