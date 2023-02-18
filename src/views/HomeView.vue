<script>
import PokemonDiscovery from '../components/PokemonDiscovery.vue';
export default {
  name: 'HomeView',
  components: {
    PokemonDiscovery,
  },
};
</script>

<template>
  <main>
    <PokemonDiscovery />
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
