<script>
import { usePokemonStore } from '../stores/PokemonStore';

export default {
  name: 'PokemonDetails',
  computed: {
    pokemonStore() {
      return usePokemonStore();
    },
    evolutions() {
      return [
        this.pokemonStore.evolutionOne,
        this.pokemonStore.evolutionTwo,
        this.pokemonStore.evolutionThree,
      ];
    },
  },
  methods: {
    resetApp() {
      this.$router.push('/');
    },
  },
};
</script>

<template>
  <template v-if="pokemonStore.findPokemon == false">
    <div class="firstDiv">
      <div class="secondDiv">
        <div>
          <strong>{{ pokemonStore.pokemonName }}</strong
          ><img :src="pokemonStore.selfie" alt="foto de pokemon" />
          <p>Elemento Principal: {{ pokemonStore.type }}</p>
        </div>
        <div>
          <strong>Habilidades:</strong>
          <ul>
            <li v-for="stat in pokemonStore.stats[0]">
              {{ stat.stat.name }}: +{{ stat.base_stat }}
            </li>
          </ul>
        </div>
      </div>
      <div class="divEvolutions">
        <strong>Evolução</strong>
        <ul class="evolutions">
          <li v-for="evolution in evolutions">
            <img :src="evolution.selfie" />
            {{ evolution.name }}
          </li>
        </ul>
      </div>
      <button v-on:click="resetApp" class="newSearch">Nova pesquisa</button>
    </div>
  </template>
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
