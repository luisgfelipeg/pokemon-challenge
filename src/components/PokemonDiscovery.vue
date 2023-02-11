<script>
import axios from 'axios';
import { Api } from '../services/api/axios-config';
import { usePokemonStore } from '../stores/PokemonStore';

export default {
  name: 'PokemonDiscovery',
  data() {
    return {
      pokemon: '',
      findPokemon: true,
      notFound: false,
    };
  },
  methods: {
    async getPokemon() {
      const pokemonStore = usePokemonStore();

      const name = await (
        await Api.get(`pokemon/${this.pokemon.toLowerCase()}`).catch(
          (err) => (this.notFound = true)
        )
      ).data.name;

      const species = await (
        await Api.get(`pokemon/${this.pokemon.toLowerCase()}`)
      ).data.species.url;

      const evolutionChain = await axios
        .get(species)
        .then((res) => res.data.evolution_chain.url);

      const evolutionOne = await axios
        .get(evolutionChain)
        .then((res) => res.data.chain.species.name)
        .then((name) => Api.get(`pokemon/${name}`))
        .then((res) => ({
          name: res.data.name,
          selfie: res.data.sprites.front_default,
        }));

      const evolutionTwo = await axios
        .get(evolutionChain)
        .then((res) => res.data.chain.evolves_to[0].species.name)
        .then((name) => Api.get(`pokemon/${name}`))
        .then((res) => ({
          name: res.data.name,
          selfie: res.data.sprites.front_default,
        }));

      const evolutionThree = await axios
        .get(evolutionChain)
        .then((res) => res.data.chain.evolves_to[0].evolves_to[0].species.name)
        .then((name) => Api.get(`pokemon/${name}`))
        .then((res) => ({
          name: res.data.name,
          selfie: res.data.sprites.front_default,
        }));

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

      pokemonStore.addPokemon(
        name,
        species,
        selfie,
        type,
        stats,
        evolutionOne,
        evolutionTwo,
        evolutionThree
      );

      this.findPokemon = false;
    },
  },
};
</script>

<template>
  <template v-if="findPokemon">
    <div class="firstDiv">
      <strong v-if="notFound"
        >Pokémon nao encontrado, digite um pokémon valido!</strong
      >
      <form v-on:submit.prevent="getPokemon">
        <input
          type="text"
          placeholder="Nome do pokémon"
          class="search__input"
          v-model="pokemon"
        />
        <button class="search__button">
          <svg class="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path
                d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
              ></path>
            </g>
          </svg>
        </button>
      </form></div
  ></template>
</template>

<style lang="scss" scoped>
.firstDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  strong {
    color: black;
  }
}
.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}

.search__input {
  font-family: inherit;
  font-size: inherit;
  background-color: #f4f2f2;
  border: none;
  color: #646464;
  padding: 0.7rem 1rem;
  border-radius: 30px;
  width: 12em;
  transition: all ease-in-out 0.5s;
  margin-right: -2rem;
}

.search__input:hover,
.search__input:focus {
  box-shadow: 0 0 1em #00000013;
}

.search__input:focus {
  outline: none;
  background-color: #f0eeee;
}

.search__input::-webkit-input-placeholder {
  font-weight: 100;
  color: #ccc;
}

.search__input:focus + .search__button {
  background-color: #f0eeee;
}

.search__button {
  border: none;
  background-color: #f4f2f2;
  margin-top: 0.1em;
}

.search__button:hover {
  cursor: pointer;
}

.search__icon {
  height: 1.3em;
  width: 1.3em;
  fill: #b4b4b4;
}
</style>
