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
  async created() {
    try {
      const response = await Api.get('pokemon?limit=20&offset=0');
      this.results = response.data.results;

      for (const itm of this.results) {
        const pokemonRes = await axios.get(itm.url);
        const weaknessRes = await axios.get(pokemonRes.data.types[0].type.url);
        this.pokeList.push({
          name:
            pokemonRes.data.name.charAt(0).toUpperCase() +
            pokemonRes.data.name.slice(1),
          selfie: pokemonRes.data.sprites.front_default,
          weakness: weaknessRes.data.damage_relations.double_damage_from.map(
            (type) => {
              return type.name.charAt(0).toUpperCase() + type.name.slice(1);
            }
          ),
          type:
            pokemonRes.data.types.length == 1
              ? [
                  pokemonRes.data.types[0].type.name.charAt(0).toUpperCase() +
                    pokemonRes.data.types[0].type.name.slice(1),
                ]
              : [
                  pokemonRes.data.types[0].type.name.charAt(0).toUpperCase() +
                    pokemonRes.data.types[0].type.name.slice(1),
                  pokemonRes.data.types[1].type.name.charAt(0).toUpperCase() +
                    pokemonRes.data.types[1].type.name.slice(1),
                ],
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<template>
  <main>
    <div class="container">
      <div v-for="pokemon in pokeList" class="cardm">
        <button
          class="card"
          @click="getPokemonClick(pokemon.name.toLowerCase())"
        >
          <img :src="pokemon.selfie" alt="Foto do pokemon" class="selfie" />
          <h2 class="pokemonName">{{ pokemon.name }}</h2>
        </button>
        <div class="card2">
          <div :class="pokemon.type.length == 1 ? 'altUpper' : 'upper'">
            <div class="type">
              <img
                class="typeIcon"
                src="../assets/icons/type.svg"
                alt="tipo do pokemon"
              />
              <p
                v-if="pokemon.type.length == 1"
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
            </div>
          </div>
          <div class="lower">
            <div class="weakness">
              <img
                class="weaknessIcon"
                src="../assets/icons/weakness.svg"
                alt="weakness"
              />
              <div class="listWeakness">
                <p
                  v-for="weak in pokemon.weakness"
                  :class="
                    (weak == 'Grass' && 'grass') ||
                    (weak == 'Poison' && 'poison') ||
                    (weak == 'Water' && 'water') ||
                    (weak == 'Bug' && 'bug') ||
                    (weak == 'Fire' && 'fire') ||
                    (weak == 'Flying' && 'flying') ||
                    (weak == 'Normal' && 'normal') ||
                    (weak == 'Ground' && 'ground') ||
                    (weak == 'Electric' && 'electric') ||
                    (weak == 'Ice' && 'ice')
                  "
                >
                  {{ weak }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- <h2>
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
          </div> -->
      </div>
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
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1980' height='1080' preserveAspectRatio='none' viewBox='0 0 1980 1080'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1203%26quot%3b)' fill='none'%3e%3crect width='1980' height='1080' x='0' y='0' fill='rgba(21%2c 67%2c 96%2c 1)'%3e%3c/rect%3e%3cpath d='M0%2c928.815C171.06%2c922.919%2c262.608%2c725.207%2c405.904%2c631.598C547.723%2c538.954%2c738.711%2c520.259%2c836.817%2c382.162C941.564%2c234.718%2c976.178%2c42.366%2c951.823%2c-136.851C927.377%2c-316.74%2c828.149%2c-477.716%2c702.197%2c-608.458C580.458%2c-734.827%2c428.328%2c-852.224%2c253.138%2c-862.109C86.471%2c-871.513%2c-42.051%2c-729.211%2c-193.498%2c-658.995C-318.676%2c-600.958%2c-465.602%2c-585.882%2c-559.901%2c-485.157C-655.804%2c-382.719%2c-689.519%2c-240.819%2c-714.302%2c-102.701C-739.817%2c39.499%2c-756.035%2c186.783%2c-704.701%2c321.826C-651.573%2c461.587%2c-537.58%2c562.633%2c-424.293%2c660.212C-294.844%2c771.712%2c-170.748%2c934.7%2c0%2c928.815' fill='%2311364d'%3e%3c/path%3e%3cpath d='M1980 1729.8809999999999C2149.399 1774.859 2311.218 1906.674 2479.259 1856.862 2651.487 1805.809 2783.006 1643.433 2842.929 1474.087 2901.212 1309.376 2827.943 1134.436 2795.6459999999997 962.728 2764.823 798.861 2760.924 623.672 2658.258 492.28599999999994 2553.318 357.991 2397.811 248.15300000000002 2227.807 236.04700000000003 2065.0190000000002 224.45500000000004 1932.567 352.317 1789.261 430.404 1676.283 491.966 1581.762 569.081 1477.718 644.77 1338.741 745.8720000000001 1137.1 789.596 1075.147 949.902 1012.592 1111.765 1056.597 1316.977 1165.815 1451.826 1271.5720000000001 1582.402 1467.275 1576.0810000000001 1626.289 1630.386 1744.591 1670.788 1859.175 1697.8 1980 1729.8809999999999' fill='%23195073'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1203'%3e%3crect width='1980' height='1080' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
  .container {
    display: flex;
    flex: 1;
    height: 90%;
    margin: 5%;
    margin-left: 318px;
    flex-wrap: wrap;
    overflow: scroll;
    justify-content: center;
    align-items: center;

    .cardm {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 220px;
      &:nth-child(1) {
        margin-top: 40px;
      }
      &:nth-child(2) {
        margin-top: 40px;
      }
      .card {
        position: relative;
        width: 250px;
        height: 130px;
        border-radius: 30px;
        background: whitesmoke;
        color: black;
        z-index: 2;
        transition: 0.4s ease-in-out;
        display: flex;
        align-items: center;
        &:hover {
          background-color: #ffe87c;
          cursor: pointer;
        }
        .selfie {
          position: relative;
          width: 140px;
        }
        .pokemonName {
          position: relative;
          left: -30px;
          font-size: 20px;
        }
      }
      .card2 {
        position: relative;
        left: -245px;
        display: flex;
        flex-direction: row;
        width: 240px;
        height: 130px;
        border-radius: 40px;
        background: white;
        z-index: 1;
        transition: 0.4s ease-in-out;
        align-items: start;
        .upper {
          display: flex;
          flex-direction: row;
          position: relative;
          color: black;
          left: 4.5em;
          top: 1em;
          .type {
            display: flex;
            justify-content: center;
            align-items: center;
            .typeIcon {
              width: 30px;
              color: beige;
            }
            .types {
              display: flex;
              flex-direction: column;
              gap: 5px;
              p {
                border-radius: 10px;
                padding: 5px;
              }
            }
          }
        }
        .altUpper {
          display: flex;
          flex-direction: row;
          position: relative;
          color: black;
          left: 5.5em;
          top: 2em;
          .type {
            display: flex;
            justify-content: center;
            align-items: center;
            .typeIcon {
              width: 30px;
              color: beige;
            }
            p {
              border-radius: 10px;
              padding: 5px;
            }
          }
        }
        .lower {
          display: flex;
          flex-direction: row;
          position: relative;
          text-align: center;
          color: black;
          left: -3em;
          top: 1em;
          margin-top: 0.7em;
          font-size: 0.7em;
          transition: 0.4s ease-in-out;
          .weakness {
            display: flex;
            justify-content: center;
            align-items: center;
            .weaknessIcon {
              width: 30px;
            }
            .listWeakness {
              display: flex;
              margin-left: 10px;
              gap: 4px;
              flex-wrap: wrap;
              p {
                border-radius: 10px;
                padding: 5px;
              }
            }
          }
        }
      }
      .card:hover + .card2 {
        height: 300px;
        border-bottom-left-radius: 40px;
        border-bottom-right-radius: 40px;
      }
      .card:hover + .card2 .lower {
        top: 20.2em;
      }
    }
    .discovery {
      position: fixed;
      top: 50%;
      left: calc(50% - 96px);
      z-index: 10;
    }
  }
}
</style>
