<script>
import PokemonDiscovery from '../components/PokemonDiscovery.vue';
import PokemonDetails from '../components/PokemonDetails.vue';
export default {
  name: 'HomeView',
  components: {
    PokemonDiscovery,
    PokemonDetails,
  },
};
</script>

<template>
  <main>
    <video autoplay loop muted plays-inline class="back-video">
      <source src="../assets/background.mp4" type="video/mp4" />
    </video>
    <PokemonDiscovery />
    <PokemonDetails />
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
