import { defineStore } from 'pinia';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    findPokemon: true,
    pokemonName: '',
    speciesLink: '',
    selfie: '',
    type: '',
    stats: [],
  }),
  getters: {},
  actions: {
    addPokemon(name, species, selfie, type, stats) {
      this.pokemonName = name;
      this.speciesLink = species;
      this.selfie = selfie;
      this.type = type;
      this.stats.push(stats);
      this.findPokemon = false;
    },
  },
});
