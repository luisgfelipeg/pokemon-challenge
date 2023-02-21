<script>
import axios from 'axios';
import { ref } from 'vue';
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
      componentKey: 0,
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
          name: res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1),
          selfie: res.data.sprites.front_default,
        }));

      this.evolutionTwo = await axios
        .get(evolutionChain)
        .then((res) => res.data.chain.evolves_to[0].species.name)
        .then((name) => Api.get(`pokemon/${name}`))
        .then((res) => ({
          name: res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1),
          selfie: res.data.sprites.front_default,
        }));

      this.evolutionThree = await axios
        .get(evolutionChain)
        .then((res) => res.data.chain.evolves_to[0].evolves_to[0].species.name)
        .then((name) => Api.get(`pokemon/${name}`))
        .then((res) => ({
          name: res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1),
          selfie: res.data.sprites.front_default,
        }));

      this.selfie = await (
        await Api.get(`pokemon/${this.pokemon}`)
      ).data.sprites.front_default;

      this.type =
        (await (
          await Api.get(`pokemon/${this.pokemon}`)
        ).data.types[0].type.name
          .charAt(0)
          .toUpperCase()) +
        (await (
          await Api.get(`pokemon/${this.pokemon}`)
        ).data.types[0].type.name.slice(1));

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
    async getPokemon(name) {
      await this.$router.push(`${name.toLowerCase()}`);
      this.pokemon = this.$route.params.pokemonName;
      this.componentKey += 1;
      await this.getPokemonInfo();
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
  <div :key="componentKey" class="container">
    <div class="containerCard">
      <div class="cardm">
        <h2>{{ pokemon.charAt(0).toUpperCase() + pokemon.slice(1) }}</h2>
        <img :src="selfie" alt="foto de pokemon" class="selfie" />
        <p>Elemento Principal: {{ type }}</p>
      </div>
      <div class="cards">
        <h3>Status:</h3>
        <ul>
          <li v-for="stat in stats">
            <p>
              <span
                :class="
                  stat.stat.name == 'hp'
                    ? 'hp'
                    : stat.stat.name == 'attack'
                    ? 'atk'
                    : stat.stat.name == 'defense'
                    ? 'def'
                    : stat.stat.name == 'special-attack'
                    ? 'special-atk'
                    : stat.stat.name == 'special-defense'
                    ? 'special-def'
                    : 'speed'
                "
                >{{ stat.stat.name }}</span
              >: +{{ stat.base_stat }}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="containerEvolutions">
      <h3>Evolução</h3>
      <ul class="evolutions">
        <li v-for="evolution in evolutions">
          <button v-on:click="getPokemon(evolution.name)">
            <img :src="evolution.selfie" />
            {{ evolution.name }}
          </button>
        </li>
      </ul>
    </div>
    <button v-on:click="resetApp" class="button">
      <span>Nova Pesquisa</span>
      <svg viewBox="0 0 13 10" height="10px" width="15px">
        <path d="M1,5 L11,5"></path>
        <polyline points="8 1 12 5 8 9"></polyline>
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  text-align: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .containerCard {
    display: flex;
    justify-content: center;
    align-items: center;
    .cardm {
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: center;
      height: 300px;
      padding: 20px;
      border-radius: 1.5rem;
      background-color: whitesmoke;
      z-index: 10;
      .selfie {
        width: 200px;
      }
    }
    .cards {
      background-color: #92ff8b;
      z-index: 9;
      height: 290px;
      width: 180px;
      position: relative;
      left: -9px;
      border-top-right-radius: 1.5rem;
      border-bottom-right-radius: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .containerEvolutions {
    width: 400px;
    background-color: #f6e7e7;
    position: relative;
    bottom: 13px;
    right: 5px;
    display: flex;
    flex-direction: column;
    border-bottom-left-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
    h3 {
      margin-top: 15px;
    }
  }
}
.evolutions {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6e7e7;
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
  li {
    display: flex;
    flex-direction: column;
    background-color: #f6e7e7;
    border-bottom-left-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
    button {
      background-color: #f6e7e7;
      cursor: pointer;
      border-bottom-left-radius: 1.5rem;
      border-bottom-right-radius: 1.5rem;
    }
  }
}
.hp {
  background-size: 10px;
  background-image: url('../assets/icons/hp.svg');
  background-repeat: no-repeat;
  background-position: left;
  padding-left: 15px;
}
.atk {
  background-size: 10px;
  background-image: url('../assets/icons/atk.svg');
  background-repeat: no-repeat;
  background-position: left;
  padding-left: 15px;
}
.def {
  background-size: 10px;
  background-image: url('../assets/icons/def.svg');
  background-repeat: no-repeat;
  background-position: left;
  padding-left: 15px;
}
.special-atk {
  background-size: 10px;
  background-image: url('../assets/icons/special-atk.svg');
  background-repeat: no-repeat;
  background-position: left;
  padding-left: 15px;
}
.special-def {
  background-size: 10px;
  background-image: url('../assets/icons/special-def.svg');
  background-repeat: no-repeat;
  background-position: left;
  padding-left: 15px;
}
.speed {
  background-size: 10px;
  background-image: url('../assets/icons/speed.svg');
  background-repeat: no-repeat;
  background-position: left;
  padding-left: 15px;
}
.button {
  position: relative;
  margin: 10px;
  padding: 12px 18px;
  transition: all 0.2s ease;
  border: none;
  background: none;
  cursor: pointer;
}

.button:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  border-radius: 50px;
  background: #b1dae7;
  width: 45px;
  height: 45px;
  transition: all 0.3s ease;
}

.button span {
  position: relative;
  font-family: 'Ubuntu', sans-serif;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #000000;
}

.button svg {
  position: relative;
  top: 0;
  margin-left: 10px;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: #234567;
  stroke-width: 2;
  transform: translateX(-5px);
  transition: all 0.3s ease;
}

.button:hover:before {
  width: 100%;
  background: #b1dae7;
}

.button:hover svg {
  transform: translateX(0);
}

.button:active {
  transform: scale(0.95);
}
</style>
