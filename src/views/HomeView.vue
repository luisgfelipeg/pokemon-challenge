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
                  (pokemon.type[0] == 'Electric' && 'electric') ||
                  (pokemon.type[0] == 'Rock' && 'rock') ||
                  (pokemon.type[0] == 'Fighting' && 'fighting') ||
                  (pokemon.type[0] == 'Ice' && 'ice')
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
                    (pokemon.type[0] == 'Electric' && 'electric') ||
                    (pokemon.type[0] == 'Rock' && 'rock') ||
                    (pokemon.type[0] == 'Fighting' && 'fighting') ||
                    (pokemon.type[0] == 'Ice' && 'ice')
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
                    (pokemon.type[1] == 'Electric' && 'electric') ||
                    (pokemon.type[1] == 'Rock' && 'rock') ||
                    (pokemon.type[1] == 'Fighting' && 'fighting') ||
                    (pokemon.type[1] == 'Ice' && 'ice')
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
                    (weak == 'Rock' && 'rock') ||
                    (weak == 'Fighting' && 'fighting') ||
                    (weak == 'Ice' && 'ice')
                  "
                >
                  {{ weak }}
                </p>
              </div>
            </div>
          </div>
        </div>
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
  .container {
    display: grid;
    grid-template-columns: 240px 240px 240px;
    gap: 30px;
    flex: 1;
    height: 90%;
    margin: 5%;
    margin-left: 318px;
    overflow: scroll;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 1420px) {
      grid-template-columns: 240px 240px;
      margin-left: 5%;
    }
    @media screen and (max-width: 790px) {
      grid-template-columns: 240px;
    }
    .cardm {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 190px;
      &:nth-child(-n + 3) {
        margin-top: 60px;
      }
      @media screen and (max-width: 1420px) {
        &:nth-child(-n + 2) {
          margin-top: 60px;
        }
        &:nth-child(3) {
          margin-top: 0;
        }
        &:nth-child(even) {
          margin-left: 335px;
        }
        margin-left: 50px;
      }
      @media screen and (max-width: 790px) {
        &:nth-child(2) {
          margin-top: 0;
        }
      }
      @media screen and (max-width: 490px) {
        &:nth-child(even) {
          margin-left: 240px;
        }
        margin-left: 240px;
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
        flex-shrink: 0;
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
          left: -10px;
          font-size: 20px;
        }
      }
      .card2 {
        position: relative;
        left: -245px;
        display: flex;
        flex-direction: row;
        flex-shrink: 0;
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
