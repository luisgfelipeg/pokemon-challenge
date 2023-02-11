<script>
import { Api } from '../services/api/axios-config';
import { usePokemonStore } from '../stores/PokemonStore';

export default {
  name: 'PokemonDiscovery',
  data() {
    return {
      pokemon: '',
      findPokemon: true,
    };
  },
  methods: {
    async getPokemon() {
      const pokemonStore = usePokemonStore();

      const name = await (
        await Api.get(`pokemon/${this.pokemon.toLowerCase()}`)
      ).data.name;

      const species = await (
        await Api.get(`pokemon/${this.pokemon.toLowerCase()}`)
      ).data.species.url;

      const selfie = await (
        await Api.get(`pokemon/${this.pokemon.toLowerCase()}`)
      ).data.sprites.front_default;

      const type = await (
        await Api.get(`pokemon/${this.pokemon.toLowerCase()}`)
      ).data.types[0].type.name;

      const stats = await (
        await Api.get(`pokemon/${this.pokemon.toLowerCase()}`)
      ).data.stats.map((stat) => {
        return stat;
      });

      pokemonStore.addPokemon(name, species, selfie, type, stats);

      this.findPokemon = false;
    },
  },
};
</script>

<template>
  <template v-if="findPokemon"
    ><form v-on:submit.prevent="getPokemon">
      <input type="text" placeholder="Nome do pokémon" v-model="pokemon" />
      <button>Pesquisar</button>
    </form></template
  >
</template>

<style lang="scss" scoped></style>
