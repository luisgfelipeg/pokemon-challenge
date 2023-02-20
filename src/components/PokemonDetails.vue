<script>
import axios from 'axios';
import { Api } from '../services/api/axios-config';
import { usePokemonStore } from '../stores/PokemonStore';
export default {
  name: 'PokemonDetails',
  data() {
    return {
      pokemonStore: usePokemonStore(),
      pokemon: this.$route.params.pokemonName,
      species: '',
      evolutionChain: '',
      selfie: '',
      type: '',
      stats: [],
      evolutionOne: {},
      evolutionTwo: {},
      evolutionThree: {},
      evolutions: [],
    };
  },
  methods: {
    async getPokemonInfo() {
      const species = await (
        await Api.get(`pokemon/${this.pokemon}`)
      ).data.species.url;

      const evolutionChain = await axios
        .get(species)
        .then((res) => res.data.evolution_chain.url);

      this.evolutionOne = await axios
        .get(evolutionChain)
        .then((res) => res.data.chain.species.name)
        .then((name) => Api.get(`pokemon/${name}`))
        .then((res) => ({
          name: res.data.name,
          selfie: res.data.sprites.front_default,
        }));
      console.log(this.evolutionOne);

      this.evolutionTwo = await axios
        .get(evolutionChain)
        .then((res) => res.data.chain.evolves_to[0].species.name)
        .then((name) => Api.get(`pokemon/${name}`))
        .then((res) => ({
          name: res.data.name,
          selfie: res.data.sprites.front_default,
        }));

      this.evolutionThree = await axios
        .get(evolutionChain)
        .then((res) => res.data.chain.evolves_to[0].evolves_to[0].species.name)
        .then((name) => Api.get(`pokemon/${name}`))
        .then((res) => ({
          name: res.data.name,
          selfie: res.data.sprites.front_default,
        }));

      this.selfie = await (
        await Api.get(`pokemon/${this.pokemon}`)
      ).data.sprites.front_default;

      this.type = await (
        await Api.get(`pokemon/${this.pokemon}`)
      ).data.types[0].type.name;

      this.stats = await (
        await Api.get(`pokemon/${this.pokemon}`)
      ).data.stats.map((stat) => {
        return stat;
      });
      this.evolutions = [
        this.evolutionOne,
        this.evolutionTwo,
        this.evolutionThree,
      ];
    },
    resetApp() {
      this.$router.push('/');
    },
  },
  created() {
    this.getPokemonInfo();
  },
};
</script>

<template>
  <div class="firstDiv">
    <div class="secondDiv">
      <div>
        <strong>{{ pokemon.charAt(0).toUpperCase() + pokemon.slice(1) }}</strong
        ><img :src="selfie" alt="foto de pokemon" />
        <p>Elemento Principal: {{ type }}</p>
      </div>
      <div>
        <strong>Habilidades:</strong>
        <ul>
          <li v-for="stat in stats">
            {{ stat.stat.name }}: +{{ stat.base_stat }}
          </li>
        </ul>
      </div>
    </div>
    <div class="divEvolutions">
      <strong>Evolução</strong>
      <ul class="evolutions">
        <li v-for="evolution in evolutions">
          <button v-on:click="getPokemon(evolution.name)">
            <img :src="evolution.selfie" />
            {{ evolution.name }}
          </button>
        </li>
      </ul>
    </div>
    <button v-on:click="resetApp" class="newSearch">Nova pesquisa</button>
  </div>
</template>

<style lang="scss" scoped>
.firstDiv {
  text-align: center;
}
.secondDiv {
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  max-height: 600px;
  width: 400px;
  padding: 20px;
  border-radius: 1.5rem;
  background-color: $gray-200;
  div {
    display: flex;
    flex-direction: column;
  }
}
.divEvolutions {
  background-color: $gray-200;
  border-radius: 1.5rem;
  margin-top: 10px;
}
.evolutions {
  display: flex;
  justify-content: center;
  align-items: center;
  li {
    display: flex;
    flex-direction: column;
  }
}
.newSearch {
  margin-top: 10px;
  padding: 5px;
  border-radius: 1rem;
  background-color: $gray-200;
  transition-duration: 500ms;
  &:hover {
    background-color: black;
    color: $gray-200;
  }
}
</style>
