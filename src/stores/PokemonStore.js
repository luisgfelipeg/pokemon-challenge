import { defineStore } from 'pinia';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    findPokemon: true,
    pokemonName: '',
    speciesLink: '',
    selfie: '',
    type: '',
    stats: [],
    evolutionOne: {},
    evolutionTwo: {},
    evolutionThree: {},
  }),
  getters: {},
  actions: {
    addPokemon(
      name,
      species,
      selfie,
      type,
      stats,
      evolutionOne,
      evolutionTwo,
      evolutionThree
    ) {
      this.pokemonName = name;
      this.speciesLink = species;
      this.selfie = selfie;
      this.type = type;
      this.stats.push(stats);
      this.findPokemon = false;
      this.evolutionOne = evolutionOne;
      this.evolutionTwo = evolutionTwo;
      this.evolutionThree = evolutionThree;
    },
  },
});
