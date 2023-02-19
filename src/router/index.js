import { createRouter, createWebHistory } from 'vue-router';
import { usePokemonStore } from '../stores/PokemonStore';
import HomeView from '../views/HomeView.vue';
import PokemonView from '../views/PokemonView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/pokemon/:pokemonName',
      name: 'pokemonFind',
      component: PokemonView,
    },
  ],
});

export default router;
