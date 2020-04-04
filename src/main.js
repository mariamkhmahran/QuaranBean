import axios from "axios";
import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import HelloWorld from "./components/HelloWorld";
// import DetailsView from "./components/DetailsView/DetailsView";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HelloWorld }
  // { path: "/pokemon/:name", component: DetailsView, props: true }
];
const router = new VueRouter({ routes });
const cache = window.caches;

Vue.mixin({
  data() {
    return {
      next: "https://pokeapi.co/api/v2/pokemon/"
    };
  },
  methods: {
    async checkCache(url) {
      return cache
        .match(url, { cacheName: "pokedox", ignoreVary: true })
        .then(response => {
          if (response) {
            return response.json();
          } else {
            return axios.get(url).then(res => res.data);
          }
        });
    },
    async getPokemon(name, withDescription = false) {
      var pokemon = await this.getPokemonBaseData(name);
      var extraInfo = withDescription
        ? await this.getPokemonExtraInfo(name)
        : null;

      return {
        ...pokemon,
        ...extraInfo
      };
    },
    async getPokemonBaseData(name) {
      var pokemon;
      var id;
      var spriteURL;
      var types;
      var abilities;
      var height;
      var weight;
      var baseExp;
      var stats;
      var url = `https://pokeapi.co/api/v2/pokemon/${name}`;
      await this.checkCache(url).then(async pokemon => {
        id = pokemon.id;
        spriteURL = pokemon.sprites.front_default;
        types = pokemon.types.map(t => t.type.name);
        abilities = pokemon.abilities.map(t => t.ability.name);
        height = pokemon.height / 10;
        weight = pokemon.weight / 10;
        baseExp = pokemon.base_experience;
        stats = pokemon.stats.map(s => ({
          name: s.stat.name,
          value: s.base_stat
        }));

        await caches.open("pokedox").then(cache => cache.add(url));
      });
      return {
        pokemon,
        id,
        spriteURL,
        types,
        abilities,
        height,
        weight,
        baseExp,
        stats
      };
    },
    async getPokemonExtraInfo(name) {
      var desc;
      var evolutionChain;
      var url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
      await this.checkCache(url).then(async res => {
        desc = res.flavor_text_entries.find(t => {
          return t.language.name === "en";
        }).flavor_text;
        evolutionChain = await this.getEvolutionChain(res.evolution_chain.url);
        await caches.open("pokedox").then(cache => cache.add(url));
      });
      return { desc, evolutionChain };
    },
    async getEvolutionChain(url) {
      var evolutions = [];
      await this.checkCache(url).then(async res => {
        var chain = res.chain;
        while (chain != null) {
          evolutions.push(chain.species);
          chain = chain.evolves_to.length > 0 ? chain.evolves_to[0] : null;
        }
      });
      var evolutionChain = evolutions.map(evol => {
        var id = evol.url.split("/");
        id = id[id.length - 2];
        return { name: evol.name, id };
      });
      return evolutionChain;
    },
    async loadNextPage() {
      var newPokemons;
      await this.checkCache(this.next).then(async res => {
        newPokemons = res.results.map(pokemon => {
          return pokemon.name;
        });

        await caches.open("pokedox").then(cache => cache.add(this.next));
        this.next = res.next;
      });
      return newPokemons;
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
