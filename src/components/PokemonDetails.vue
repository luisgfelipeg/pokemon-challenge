<script>
import { usePokemonStore } from '../stores/PokemonStore';

export default {
  name: 'PokemonDetails',
  data() {
    return {
      pokemonStore: usePokemonStore(),
    };
  },
  methods: {},
};
</script>

<template>
  <template v-if="pokemonStore.findPokemon == false">
    <div class="css">
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
  </template>
</template>

<style lang="scss" scoped>
.css {
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
</style>
