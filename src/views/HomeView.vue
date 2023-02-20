<script>
import axios from 'axios';
import PokemonDiscovery from '../components/PokemonDiscovery.vue';
import { Api } from '../services/api/axios-config';
export default {
  name: 'HomeView',
  components: {
    PokemonDiscovery,
  },
  data() {
    return {
      pokeList: [],
      results: [],
    };
  },
  methods: {
    getPokemonClick(name) {
      this.$router.push(`/pokemon/${name}`);
    },
  },
  created() {
    Api.get('pokemon?limit=32&offset=0')
      .then((res) => {
        this.results = res.data.results;
      })
      .then(() => {
        this.results.map((itm) => {
          axios.get(itm.url).then((res) => {
            this.pokeList.push({
              name:
                res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1),
              selfie: res.data.sprites.front_default,
              type:
                res.data.types.length == 1
                  ? [
                      res.data.types[0].type.name.charAt(0).toUpperCase() +
                        res.data.types[0].type.name.slice(1),
                    ]
                  : [
                      res.data.types[0].type.name.charAt(0).toUpperCase() +
                        res.data.types[0].type.name.slice(1),
                      res.data.types[1].type.name.charAt(0).toUpperCase() +
                        res.data.types[1].type.name.slice(1),
                    ],
            });
            console.log(this.pokeList);
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<template>
  <main>
    <div class="container">
      <button
        v-for="pokemon in pokeList"
        class="card"
        @click="getPokemonClick(pokemon.name.toLowerCase())"
      >
        <h2>
          {{ pokemon.name }}
        </h2>
        <img class="selfie" :src="pokemon.selfie" alt="Foto do pokemon" />
        <p>Tipo:</p>
        <p
          :class="
            (pokemon.type[0] == 'Grass' && 'grass') ||
            (pokemon.type[0] == 'Poison' && 'poison') ||
            (pokemon.type[0] == 'Water' && 'water') ||
            (pokemon.type[0] == 'Bug' && 'bug') ||
            (pokemon.type[0] == 'Fire' && 'fire') ||
            (pokemon.type[0] == 'Flying' && 'flying') ||
            (pokemon.type[0] == 'Normal' && 'normal') ||
            (pokemon.type[0] == 'Ground' && 'ground') ||
            (pokemon.type[0] == 'Electric' && 'electric')
          "
          v-if="pokemon.type.length == 1"
        >
          {{ pokemon.type[0] }}
        </p>
        <div class="types" v-if="pokemon.type.length > 1">
          <p
            :class="
              (pokemon.type[0] == 'Grass' && 'grass') ||
              (pokemon.type[0] == 'Poison' && 'poison') ||
              (pokemon.type[0] == 'Water' && 'water') ||
              (pokemon.type[0] == 'Bug' && 'bug') ||
              (pokemon.type[0] == 'Fire' && 'fire') ||
              (pokemon.type[0] == 'Flying' && 'flying') ||
              (pokemon.type[0] == 'Normal' && 'normal') ||
              (pokemon.type[0] == 'Ground' && 'ground') ||
              (pokemon.type[0] == 'Electric' && 'electric')
            "
          >
            {{ pokemon.type[0] }}
          </p>
          <p
            :class="
              (pokemon.type[1] == 'Grass' && 'grass') ||
              (pokemon.type[1] == 'Poison' && 'poison') ||
              (pokemon.type[1] == 'Water' && 'water') ||
              (pokemon.type[1] == 'Bug' && 'bug') ||
              (pokemon.type[1] == 'Fire' && 'fire') ||
              (pokemon.type[1] == 'Flying' && 'flying') ||
              (pokemon.type[1] == 'Normal' && 'normal') ||
              (pokemon.type[1] == 'Ground' && 'ground') ||
              (pokemon.type[1] == 'Electric' && 'electric')
            "
          >
            {{ pokemon.type[1] }}
          </p>
        </div>
      </button>
      <PokemonDiscovery class="discovery" />
    </div>
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
  .container {
    display: flex;
    flex: 1;
    height: 90%;
    margin: 5%;
    flex-wrap: wrap;
    overflow: scroll;
    justify-content: center;
    align-items: center;
    .card {
      margin: 5px;
      display: flex;
      flex-direction: column;
      width: 300px;
      height: 300px;
      justify-content: center;
      align-items: center;
      background-color: rgba(217, 217, 217, 0.58);
      border-radius: 20%;
      border: 1px solid white;
      cursor: pointer;
      transition: all 0.5s;
      user-select: none;
      &:hover {
        border: 1px solid black;
        transform: scale(1.01);
      }
      &:active {
        transform: scale(0.95) rotateZ(1.7deg);
      }
      img {
        width: 200px;
        height: auto;
      }
      p {
        padding: 5px;
        border-radius: 10px;
      }
      div {
        display: flex;
        gap: 10px;
      }
    }
    .discovery {
      position: fixed;
      top: 50%;
      left: calc(50% - 96px);
    }
  }
}
</style>
